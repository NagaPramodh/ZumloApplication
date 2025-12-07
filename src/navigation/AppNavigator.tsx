import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import ManualScreen from "../screens/ManualScreen";
import ScheduledScreen from "../screens/ScheduledScreen";
import CalendarViewScreen from "../screens/CalendarViewScreen";
import { RootTabParamList } from "../types/navigation";

const Tab = createBottomTabNavigator<RootTabParamList>();

export default function AppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = "calendar";

          if (route.name === "Manual")
            iconName = focused ? "create" : "create-outline";
          else if (route.name === "Scheduled")
            iconName = focused ? "list" : "list-outline";
          else if (route.name === "CalendarView")
            iconName = focused ? "calendar" : "calendar-outline";

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#007AFF",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name="Manual"
        component={ManualScreen}
        options={{ title: "Manual Entry" }}
      />
      <Tab.Screen
        name="Scheduled"
        component={ScheduledScreen}
        options={{ title: "Quick Plan" }}
      />
      <Tab.Screen
        name="CalendarView"
        component={CalendarViewScreen}
        options={{ title: "My Calendar" }}
      />
    </Tab.Navigator>
  );
}
