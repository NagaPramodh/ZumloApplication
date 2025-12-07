import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { CalendarService } from "../services/CalendarService";
import { format } from "date-fns";

const SUGGESTIONS = [
  { id: "1", title: "Morning Yoga", minutes: 15 },
  { id: "2", title: "Lunch Walk", minutes: 20 },
  { id: "3", title: "Evening Meditation", minutes: 10 },
];

export default function ScheduledScreen() {
  const handleAdd = async (title: string, minutes: number) => {
    try {
      const hasPerm = await CalendarService.getPermissions();
      if (!hasPerm) return Alert.alert("Error", "No permission");

      const startDate = new Date();
      startDate.setHours(startDate.getHours() + 1, 0, 0, 0);
      const endDate = new Date(startDate.getTime() + minutes * 60000);

      await CalendarService.addEvent(
        title,
        startDate,
        endDate,
        "Scheduled via App"
      );
      Alert.alert(
        "Added!",
        `${title} scheduled for ${format(startDate, "h:mm a")}`
      );
    } catch (e) {
      Alert.alert("Error", "Could not add event");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Quick Suggestions</Text>
      <Text style={styles.subHeader}>Tap to schedule for today</Text>

      {SUGGESTIONS.map((item) => (
        <View key={item.id} style={styles.card}>
          <View>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text>{item.minutes} mins</Text>
          </View>
          <TouchableOpacity
            style={styles.addBtn}
            onPress={() => handleAdd(item.title, item.minutes)}
          >
            <Text style={styles.btnText}>+ Add</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { fontSize: 24, fontWeight: "bold", marginBottom: 5 },
  subHeader: { color: "gray", marginBottom: 20 },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
  },
  cardTitle: { fontSize: 18, fontWeight: "600" },
  addBtn: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  btnText: { color: "white", fontWeight: "bold" },
});
