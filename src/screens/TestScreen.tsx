import { Text, StyleSheet, View } from "react-native";
import { useWindowDimensions } from "react-native";
import {
  LiquidGlassScreen,
  GlassCard,
} from "../components/LiquidGlassScreenShader";

import { useAnimatedMeshGradient } from "../reactitcx_Components/AnimatedMeshgradient/useAnimatedMeshGradient";

export default function TestScreen() {
  const { width, height } = useWindowDimensions();

  // ─── Animated background shader ────────────────────────────────
  const { shader, uniforms } = useAnimatedMeshGradient({
    width,
    height,
    speed: 0.3,
    noise: 0.15,
    blur: 0.4,
    contrast: 0,
  });

  return (
    <LiquidGlassScreen
      backgroundShader={shader}
      backgroundUniforms={uniforms}
      zoomStrength={0.15}
      blurSpread={1}
    >
      <View style={s.scroll}>
        <GlassCard style={s.card}>
          <Text style={s.title}>Profile</Text>
          <Text style={s.body}>Glass card with real distortion</Text>
        </GlassCard>

        <Text style={s.plainText}>Regular text, no glass</Text>

        <GlassCard style={s.card}>
          <Text style={s.title}>Stats</Text>
          <Text style={s.body}>Another wrapped card</Text>
        </GlassCard>

        <GlassCard style={[s.card, s.wideCard]}>
          <View style={s.row}>
            <View style={s.stat}>
              <Text style={s.statNum}>128</Text>
              <Text style={s.statLabel}>Posts</Text>
            </View>
            <View style={s.stat}>
              <Text style={s.statNum}>4.2k</Text>
              <Text style={s.statLabel}>Followers</Text>
            </View>
            <View style={s.stat}>
              <Text style={s.statNum}>312</Text>
              <Text style={s.statLabel}>Following</Text>
            </View>
          </View>
        </GlassCard>

        <GlassCard style={[s.card, s.narrowCard]}>
          <View style={s.row}>
            <View style={s.stat}>
              <Text style={s.statNum}>128</Text>
              <Text style={s.statLabel}>Posts</Text>
            </View>
            <View style={s.stat}>
              <Text style={s.statNum}>4.2k</Text>
              <Text style={s.statLabel}>Followers</Text>
            </View>
            <View style={s.stat}>
              <Text style={s.statNum}>312</Text>
              <Text style={s.statLabel}>Following</Text>
            </View>
          </View>
        </GlassCard>
      </View>
    </LiquidGlassScreen>
  );
}

const s = StyleSheet.create({
  scroll: { padding: 24, gap: 16, paddingTop: 60 },
  card: { padding: 20, borderRadius: 16 },
  wideCard: { padding: 24 },
  title: { fontSize: 20, fontWeight: "700", color: "#fff", marginBottom: 6 },
  body: { fontSize: 14, color: "rgba(255,255,255,0.85)" },
  plainText: { color: "#fff", fontSize: 16, textAlign: "center", opacity: 0.7 },
  row: { flexDirection: "row", justifyContent: "space-around" },
  stat: { alignItems: "center" },
  statNum: { fontSize: 22, fontWeight: "700", color: "#fff" },
  statLabel: { fontSize: 12, color: "rgba(255,255,255,0.7)", marginTop: 2 },
  normal: { backgroundColor: "red", width: 50, height: 50 },
  narrowCard: { width: 200 },
});
