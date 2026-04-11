// components/LiquidGlassScreen.tsx
import React, { createContext, useContext, useState, useCallback } from "react";
import { StyleSheet, View, useWindowDimensions } from "react-native";
import {
  Canvas,
  Skia,
  Fill,
  Shader,
  vec,
  Group,
  rrect,
  rect,
} from "@shopify/react-native-skia";

// ─── Glass Shader ─────────────────────────────────────────────────────────────

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

    float transition = smoothstep(0.0, 1.0, rb1 + rb2);

    half4 originalColor = iChannel0.eval(uv * iResolution.xy);

    if (transition <= 0.0) {
        return originalColor;
    }

    float zoom = max(0.0, 1.0 - roundedBox * ${zoomStrength.toFixed(3)});
    float2 lens = ((uv - 0.5) * zoom + 0.5);

    half4 blurredColor = half4(0.0);
    float total = 0.0;

    for (float x = -4.0; x <= 4.0; x++) {
        for (float y = -4.0; y <= 4.0; y++) {
            float2 pixelSize = 1.0 / iResolution.xy;
            float2 offset = float2(x, y) * pixelSize * ${blurSpread.toFixed(3)} * 20.0;
            blurredColor += iChannel0.eval((offset + lens) * iResolution.xy);
            total += 1.0;
        }
    }

    blurredColor /= total;

    float2 m2 = (uv - mouse / iResolution.xy);
    float gradient =
        clamp((clamp(m2.y, 0.0, 0.2) + 0.1) / 2.0, 0.0, 1.0) +
        clamp((clamp(-m2.y, -1000.0, 0.2) * rb1 + 0.1) / 2.0, 0.0, 1.0);

    half4 lighting = clamp(
        blurredColor + half4(rb1) * gradient + half4(rb2) * 0.3,
        0.0,
        1.0
    );

    return mix(originalColor, lighting, transition);
}
`);

// ─── Context ──────────────────────────────────────────────────────────────────

interface CardLayout {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

interface GlassContextValue {
  registerCard: (layout: CardLayout) => void;
  unregisterCard: (id: string) => void;
}

const GlassContext = createContext<GlassContextValue | null>(null);

// ─── Props (UPDATED) ─────────────────────────────────────────────────────────

interface LiquidGlassScreenProps {
  backgroundShader: any; // SkRuntimeEffect
  backgroundUniforms: any;

  zoomStrength?: number;
  blurSpread?: number;

  children: React.ReactNode;
}

// ─── Screen ──────────────────────────────────────────────────────────────────

export function LiquidGlassScreen({
  backgroundShader,
  backgroundUniforms,

  zoomStrength = 0.15,
  blurSpread = 0.5,

  children,
}: LiquidGlassScreenProps) {
  const { width, height } = useWindowDimensions();
  const [cards, setCards] = useState<CardLayout[]>([]);

  const glassShader = React.useMemo(
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

  if (!backgroundShader || !glassShader) return null;

  return (
    <GlassContext.Provider value={{ registerCard, unregisterCard }}>
      <View style={styles.container}>
        <Canvas style={StyleSheet.absoluteFill} pointerEvents="none">
          {/* ─── Background (SHADER, NOT IMAGE) ─── */}
          <Fill>
            <Shader source={backgroundShader} uniforms={backgroundUniforms} />
          </Fill>

          {/* ─── Glass Cards ─── */}
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
                16,
                16,
              )}
            >
              <Fill>
                <Shader
                  source={glassShader}
                  uniforms={{
                    iResolution: vec(width, height),
                    iMouse: vec(card.x, card.y),
                    glassDimensions: vec(card.width, card.height),
                  }}
                >
                  {/* IMPORTANT: feed same shader background */}
                  <Shader
                    source={backgroundShader}
                    uniforms={backgroundUniforms}
                  />
                </Shader>
              </Fill>
            </Group>
          ))}
        </Canvas>

        {children}
      </View>
    </GlassContext.Provider>
  );
}

// ─── GlassCard (unchanged) ───────────────────────────────────────────────────

export function GlassCard({ children, style }: any) {
  const context = useContext(GlassContext);
  const id = React.useRef(`glass_${Date.now()}_${Math.random()}`).current;
  const ref = React.useRef<View>(null);

  React.useEffect(() => {
    return () => context?.unregisterCard(id);
  }, []);

  const onLayout = useCallback(() => {
    if (!ref.current || !context) return;

    ref.current.measure((_fx, _fy, width, height, pageX, pageY) => {
      context.registerCard({
        id,
        x: pageX + width / 2,
        y: pageY + height / 2,
        width,
        height,
      });
    });
  }, []);

  return (
    <View ref={ref} onLayout={onLayout} style={style}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
