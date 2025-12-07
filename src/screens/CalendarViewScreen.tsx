import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { CalendarService } from "../services/CalendarService";
import { DateNavigator } from "../components/DateNavigator";
import { addDays, subDays, subMonths, addMonths } from "date-fns";

export default function CalendarViewScreen() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<[]>([]);
  const [loading, setLoading] = useState(false);

  const today = new Date();
  const minDate = subMonths(today, 1);
  const maxDate = addMonths(today, 1);

  const loadEvents = async (date: Date) => {
    setLoading(true);
    const hasPerm = await CalendarService.getPermissions();
    if (hasPerm) {
      const fetchedEvents = await CalendarService.getEventsForDate(date);
      setEvents(fetchedEvents);
    }
    setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      loadEvents(currentDate);
    }, [currentDate])
  );

  const handlePrev = () => {
    const newDate = subDays(currentDate, 1);
    if (newDate >= minDate) setCurrentDate(newDate);
  };

  const handleNext = () => {
    const newDate = addDays(currentDate, 1);
    if (newDate <= maxDate) setCurrentDate(newDate);
  };

  const handleDelete = (eventId: string) => {
    Alert.alert(
      "Delete Event",
      "Are you sure you want to remove this event from your calendar?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await CalendarService.deleteEvent(eventId);
              loadEvents(currentDate);
            } catch (e) {
              Alert.alert("Error", "Failed to delete event.");
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <DateNavigator
        date={currentDate}
        onPrev={handlePrev}
        onNext={handleNext}
        canGoPrev={currentDate > minDate}
        canGoNext={currentDate < maxDate}
      />

      {loading ? (
        <ActivityIndicator size="large" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={events}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No events for this day.</Text>
          }
          renderItem={({ item }) => (
            <View style={styles.eventCard}>
              <View style={styles.eventInfo}>
                <Text style={styles.eventTitle}>{item.title}</Text>
                <Text style={styles.eventTime}>
                  {new Date(item.startDate).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}{" "}
                  -
                  {new Date(item.endDate).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Text>
              </View>

              <TouchableOpacity
                onPress={() => handleDelete(item.id)}
                style={styles.deleteBtn}
              >
                <Ionicons name="trash-outline" size={24} color="#FF3B30" />
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  emptyText: { textAlign: "center", marginTop: 20, color: "gray" },
  eventCard: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderLeftWidth: 5,
    borderLeftColor: "#007AFF",
    elevation: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  eventInfo: { flex: 1 },
  eventTitle: { fontSize: 16, fontWeight: "bold" },
  eventTime: { color: "gray", marginTop: 4 },
  deleteBtn: { padding: 5 },
});
