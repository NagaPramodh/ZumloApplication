import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import AppNavigator from "./AppNavigator";
import ZumloMoodScreen from "../screens/ZumloMoodScreen";

const Drawer = createDrawerNavigator();

export default function RootNavigator() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="ZumloCalendar"
        component={AppNavigator}
        options={{ title: "Calendar & Planner" }}
      />
      <Drawer.Screen
        name="ZumloMood"
        component={ZumloMoodScreen}
        options={{ title: "Mood Tracker" }}
      />
    </Drawer.Navigator>
  );
}
