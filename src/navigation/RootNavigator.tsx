import React from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import AppNavigator from "./AppNavigator";
import ZumloMoodScreen from "../screens/ZumloMoodScreen";

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Zumlo Applications</Text>
        <Text style={styles.headerSubtitle}>Calendar & Mood Tracker</Text>
      </View>
      <View style={styles.separator} />

      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

export default function RootNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerStyle: { backgroundColor: "#f5f5f5" },
        drawerActiveTintColor: "#6200ee",
        drawerInactiveTintColor: "#333",
      }}
    >
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

const styles = StyleSheet.create({
  headerContainer: {
    padding: 20,
    backgroundColor: "#f6f6f6",
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
  headerSubtitle: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
  separator: {
    height: 1,
    backgroundColor: "#e0e0e0",
    marginHorizontal: 10,
    marginBottom: 10,
  },
});
