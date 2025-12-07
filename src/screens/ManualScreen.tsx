import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Alert,
  TextInput,
  TouchableOpacity,
} from "react-native";
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
        <TouchableOpacity
          style={styles.btnStyles}
          onPress={() => showMode("date")}
        >
          <Text style={styles.btnText}>Pick Date</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnStyles}
          onPress={() => showMode("time")}
        >
          <Text style={styles.btnText}>Pick Time</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.preview}>Selected: {date.toLocaleString()}</Text>
      <TouchableOpacity onPress={handleSave} style={styles.saveButtonStyles}>
        <Text style={styles.btnText}>Save Event</Text>
      </TouchableOpacity>

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
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
    justifyContent: "flex-start",
  },
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
  btnStyles: {
    borderRadius: 20,
    backgroundColor: "green",
    width: 120,
    height: 64,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  saveButtonStyles: {
    borderRadius: 20,
    backgroundColor: "#4CAF50",
    // width: 120,
    height: 64,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    fontSize: 20,
    color: "white",
  },

  preview: { textAlign: "center", marginBottom: 20, fontSize: 16 },
});
