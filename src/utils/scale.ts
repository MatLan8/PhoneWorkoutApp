import { Dimensions } from "react-native";

const baseWidth = 360;
const { width } = Dimensions.get("window");

export const scale = (size: number) => (width / baseWidth) * size;
