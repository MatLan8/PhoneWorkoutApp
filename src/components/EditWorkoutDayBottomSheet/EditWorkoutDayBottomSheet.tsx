import React from "react";
import { Pressable, Text, View } from "react-native";
import BottomSheet from "../BottomSheet/BottomSheet";
import { styles } from "./EditWorkoutDayBottomSheet.styles";
import { colors } from "../../styles/workoutColors";

interface EditWorkoutDayBottomSheetProps {
  visible: boolean;
  onClose: () => void;
}

const EditWorkoutDayBottomSheet: React.FC<EditWorkoutDayBottomSheetProps> = ({
  visible,
  onClose,
}) => {
  return (
    <BottomSheet
      visible={visible}
      onClose={onClose}
      title="Edit Workout Day"
      snapMultiplier={0.2}
    >
      <Text style={{ color: "white" }}>This is Edit Workout Day content</Text>
      {Object.entries(colors).map(([paletteName, palette]) => (
        <View style={styles.ColorRow} key={paletteName}>
          {Object.entries(palette as Record<string, string>).map(
            ([shadeName, shadeColor]) => (
              <Pressable
                key={shadeColor}
                style={[styles.ColorOption, { backgroundColor: shadeColor }]}
                onPress={() => console.log("Selected color:", shadeColor)}
              />
            ),
          )}
        </View>
      ))}
    </BottomSheet>
  );
};

export default EditWorkoutDayBottomSheet;
