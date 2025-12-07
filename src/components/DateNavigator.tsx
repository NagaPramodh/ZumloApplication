import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { format } from "date-fns";

interface Props {
  date: Date;
  onPrev: () => void;
  onNext: () => void;
  canGoPrev: boolean;
  canGoNext: boolean;
}

export const DateNavigator: React.FC<Props> = ({
  date,
  onPrev,
  onNext,
  canGoPrev,
  canGoNext,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPrev} disabled={!canGoPrev}>
        <Ionicons
          name="chevron-back"
          size={24}
          color={canGoPrev ? "black" : "gray"}
        />
      </TouchableOpacity>

      <Text style={styles.dateText}>{format(date, "EEE, MMM d, yyyy")}</Text>

      <TouchableOpacity onPress={onNext} disabled={!canGoNext}>
        <Ionicons
          name="chevron-forward"
          size={24}
          color={canGoNext ? "black" : "gray"}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    marginBottom: 10,
  },
  dateText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
