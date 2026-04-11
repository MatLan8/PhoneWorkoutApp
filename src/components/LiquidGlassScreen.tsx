// components/LiquidGlassScreen.tsx
import React, { createContext, useContext, useState, useCallback } from "react";
import { StyleSheet, View, useWindowDimensions } from "react-native";
import {
  Canvas,
  ImageShader,
  Skia,
  Fill,
  Shader,
  vec,
  SkImage,
  Group,
  rrect,
  rect,
} from "@shopify/react-native-skia";

// ─── Shader ──────────────────────────────────────────────────────────────────

const makeShader = (zoomStrength: number, blurSpread: number) =>
  Skia.RuntimeEffect.Make(`
uniform float2 iResolution;
uniform float2 iMouse;
uniform shader iChannel0;
uniform float2 glassDimensions;

half4 main(float2 fragCoord) {
    float2 uv = fragCoord / iResolution.xy;
    float2 mouse = iMouse.xy;
    float2 pixel_dist = fragCoord - mouse;
    float2 norm_dist = pixel_dist / (glassDimensions / 2.0);
    float roundedBox = pow(abs(norm_dist.x), 8.0) + pow(abs(norm_dist.y), 8.0);
    float rb1 = clamp((1.0 - roundedBox) * 8.0, 0.0, 1.0);
    float rb2 = clamp((0.95 - roundedBox * 0.95) * 16.0, 0.0, 1.0)
              - clamp(pow(0.9 - roundedBox * 0.95, 1.0) * 16.0, 0.0, 1.0);
    float rb3 = clamp((1.5 - roundedBox * 1.1) * 2.0, 0.0, 1.0)
              - clamp(pow(1.0 - roundedBox * 1.1, 1.0) * 2.0, 0.0, 1.0);

    half4 fragColor;
    float transition = smoothstep(0.0, 1.0, rb1 + rb2);

    if (transition > 0.0) {
        float zoom = max(0.0, 1.0 - roundedBox * ${zoomStrength.toFixed(3)});
        float2 lens = ((uv - 0.5) * zoom + 0.5);

        half4 blurredColor = half4(0.0);
        float total = 0.0;
        for (float x = -4.0; x <= 4.0; x++) {
            for (float y = -4.0; y <= 4.0; y++) {
                float2 offset = float2(x, y) * ${blurSpread.toFixed(3)} / iResolution.xy;
                blurredColor += iChannel0.eval((offset + lens) * iResolution.xy);
                total += 1.0;
            }
        }
        blurredColor /= total;

        float2 m2 = (uv - mouse / iResolution.xy);
        float gradient = clamp((clamp(m2.y, 0.0, 0.2) + 0.1) / 2.0, 0.0, 1.0)
                       + clamp((clamp(-m2.y, -1000.0, 0.2) * rb3 + 0.1) / 2.0, 0.0, 1.0);

        half4 lighting = clamp(blurredColor + half4(rb1) * gradient + half4(rb2) * 0.3, 0.0, 1.0);
        half4 originalColor = iChannel0.eval(uv * iResolution.xy);
        fragColor = mix(originalColor, lighting, transition);
    } else {
        fragColor = iChannel0.eval(uv * iResolution.xy);
    }

    return fragColor;
}
`);

// ─── Context — cards register themselves here ─────────────────────────────────

interface CardLayout {
  id: string;
  x: number; // center X in screen space
  y: number; // center Y in screen space
  width: number;
  height: number;
}

interface GlassContextValue {
  registerCard: (layout: CardLayout) => void;
  unregisterCard: (id: string) => void;
}

const GlassContext = createContext<GlassContextValue | null>(null);

// ─── LiquidGlassScreen ────────────────────────────────────────────────────────

interface LiquidGlassScreenProps {
  backgroundImage: SkImage | null;
  /** 0.05 subtle → 0.3 strong. Default 0.15 */
  zoomStrength?: number;
  /** 0.2 sharp → 1.0 very blurry. Default 0.5 */
  blurSpread?: number;
  children: React.ReactNode;
}

export function LiquidGlassScreen({
  backgroundImage,
  zoomStrength = 0.15,
  blurSpread = 0.5,
  children,
}: LiquidGlassScreenProps) {
  const { width, height } = useWindowDimensions();
  const [cards, setCards] = useState<CardLayout[]>([]);

  // Shader is rebuilt only when zoom/blur props change
  const shader = React.useMemo(
    () => makeShader(zoomStrength, blurSpread),
    [zoomStrength, blurSpread],
  );

  const registerCard = useCallback((layout: CardLayout) => {
    setCards((prev) => {
      const existing = prev.findIndex((c) => c.id === layout.id);
      if (existing >= 0) {
        const next = [...prev];
        next[existing] = layout;
        return next;
      }
      return [...prev, layout];
    });
  }, []);

  const unregisterCard = useCallback((id: string) => {
    setCards((prev) => prev.filter((c) => c.id !== id));
  }, []);

  if (!backgroundImage || !shader) return null;

  return (
    <GlassContext.Provider value={{ registerCard, unregisterCard }}>
      <View style={styles.container}>
        {/* Skia canvas — background + all glass layers */}
        <Canvas style={StyleSheet.absoluteFill} pointerEvents="none">
          {/* Base background */}
          <Fill>
            <ImageShader
              image={backgroundImage}
              fit="cover"
              rect={{ x: 0, y: 0, width, height }}
            />
          </Fill>

          {/* One glass layer per registered card */}
          {cards.map((card) => (
            <Group
              key={card.id}
              clip={rrect(
                rect(
                  card.x - card.width / 2,
                  card.y - card.height / 2,
                  card.width,
                  card.height,
                ),
                16, // rx
                16, // ry
              )}
            >
              <Fill>
                <Shader
                  source={shader}
                  uniforms={{
                    iResolution: vec(width, height),
                    iMouse: vec(card.x, card.y),
                    glassDimensions: vec(card.width, card.height),
                  }}
                >
                  <ImageShader
                    image={backgroundImage}
                    fit="cover"
                    rect={{ x: 0, y: 0, width, height }}
                  />
                </Shader>
              </Fill>
            </Group>
          ))}
        </Canvas>

        {/* Normal RN layout on top — children go here */}
        {children}
      </View>
    </GlassContext.Provider>
  );
}

// ─── GlassCard — wrap any element with this ───────────────────────────────────

interface GlassCardProps {
  children?: React.ReactNode;
  style?: object;
}

let cardIdCounter = 0;

export function GlassCard({ children, style }: GlassCardProps) {
  const context = useContext(GlassContext);
  const id = React.useRef(`glass_card_${++cardIdCounter}`).current;
  const viewRef = React.useRef<View>(null);

  React.useEffect(() => {
    return () => context?.unregisterCard(id);
  }, []);

  const handleLayout = useCallback(() => {
    if (!viewRef.current || !context) return;
    viewRef.current.measure((_fx, _fy, width, height, pageX, pageY) => {
      context.registerCard({
        id,
        x: pageX + width / 2,
        y: pageY + height / 2,
        width,
        height,
      });
    });
  }, [context, id]);

  return (
    <View ref={viewRef} style={style} onLayout={handleLayout}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
