// src/components/AnimatedTabBar.tsx
import React, { useRef, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Animated,
  Text,
  StyleSheet,
} from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";

const AnimatedTabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const translateX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(translateX, {
      toValue: state.index * 80, // tab width, adjust
      useNativeDriver: true,
    }).start();
  }, [state.index]);

  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel ?? options.title ?? route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          if (!isFocused) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            style={styles.tab}
            activeOpacity={0.7}
          >
            {typeof label === "function" ? (
              label({
                focused: isFocused,
                color: isFocused ? "#3498db" : "#888",
                position: "below-icon",
                children: route.name,
              })
            ) : (
              <Text style={{ color: isFocused ? "#3498db" : "#888" }}>
                {label}
              </Text>
            )}
          </TouchableOpacity>
        );
      })}

      {/* Animated underline */}
      <Animated.View
        style={[styles.underline, { transform: [{ translateX }] }]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 60,
    backgroundColor: "#fff",
    elevation: 5,
    position: "relative",
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  underline: {
    position: "absolute",
    bottom: 0,
    width: 80, // tab width
    height: 3,
    backgroundColor: "#3498db",
  },
});

export default AnimatedTabBar;
