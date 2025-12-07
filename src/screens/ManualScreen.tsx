import React, { useState } from "react";
import { View, Text, Button, StyleSheet, Alert, TextInput } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { CalendarService } from "../services/CalendarService";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootTabParamList } from "../types/navigation";

export default function ManualScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootTabParamList>>();

  const [date, setDate] = useState(new Date());
  const [title, setTitle] = useState("Manual Wellness Session");
  const [showPicker, setShowPicker] = useState(false);
  const [mode, setMode] = useState<"date" | "time">("date");

  const onChange = (event: any, selectedDate?: Date) => {
    setShowPicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const showMode = (currentMode: "date" | "time") => {
    setShowPicker(true);
    setMode(currentMode);
  };

  const handleSave = async () => {
    try {
      const hasPerm = await CalendarService.getPermissions();
      if (!hasPerm) {
        Alert.alert("Permission Error", "Please allow calendar access");
        return;
      }

      const endDate = new Date(date.getTime() + 30 * 60000);

      await CalendarService.addEvent(title, date, endDate);
      Alert.alert("Success", "Event added to calendar!");

      navigation.navigate("CalendarView");
    } catch (e: any) {
      Alert.alert("Error", e.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add Manual Activity</Text>

      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Activity Name"
      />

      <View style={styles.btnGroup}>
        <Button onPress={() => showMode("date")} title="Pick Date" />
        <Button onPress={() => showMode("time")} title="Pick Time" />
      </View>

      <Text style={styles.preview}>Selected: {date.toLocaleString()}</Text>

      <Button
        title="Save & View Calendar"
        onPress={handleSave}
        color="#4CAF50"
      />

      {showPicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          onChange={onChange}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  btnGroup: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  preview: { textAlign: "center", marginBottom: 20, fontSize: 16 },
});
