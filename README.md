This Repo Contains Two Applications inside a React Native Application build using Expo CLI
# -Calendar & Planner
# -Mood Tracker


### Link for Android Application : https://expo.dev/artifacts/eas/juNoBT28zPXfmc2uJEYwxk.apk


# 📅 Wellness Calendar App

A React Native (Expo) application designed to integrate wellness activities directly with your device's native calendar (Google Calendar, iCloud Calendar, etc.).

## ✨ Features

- **Native Integration:** Reads and writes directly to the iOS/Android device calendar.
- **Manual Scheduling:** Pick specific dates and times for custom wellness events.
- **Quick Suggestions:** One-tap scheduling for common activities (Yoga, Meditation, Walking).
- **Calendar View:** View daily events with day-by-day navigation.
- **Event Management:** Delete events directly from the app with safety confirmation.
- **Permissions Handling:** Graceful handling of OS-level calendar permissions.

## 🧠 Mood Tracker Features

- **"Living" UI Elements:** Uses `react-native-reanimated` to create organic animations—icons "breathe" when calm, "pulse" when stressed, and "bounce" when energetic.
- **Adaptive Atmosphere:** The entire screen background and Status Bar smoothly interpolate colors to match the selected mood context.
- **Emotional Themes:** distinct visual identities for moods (e.g., Cool Cyan for Calm, Deep Charcoal for Stress, Vibrant Orange for Energy).
- **Interactive Feedback:** Instant visual response with Lucide icons (Cloud, Zap, Alert) and dynamic descriptions.

## 🛠 Tech Stack

- **Framework:** React Native (Expo SDK 50+)
- **Language:** TypeScript
- **Navigation:** React Navigation (Bottom Tabs)
- **Calendar Bridge:** `expo-calendar`
- **Date Management:** `date-fns`
- **UI Components:** `react-native-screens`, `@expo/vector-icons`

---

## 🚀 Installation & Setup

### 1. Clone the repository
```bash
git clone <your_repository_url>
cd wellness-calendar
```
### 2. Install Dependencies
```bash
npm install
```
### 3. Start the Server
```bash
npm start
```
### 4. Run on android
```
a
```
or
### 5.Run on IOS
```
i
```

## Folder Structure
```bash
src/
├── components/           # Reusable UI Components
│   └── DateNavigator.tsx # Controls date switching (< Date >)
├── constants/            # App-wide values (Colors, Strings)
├── navigation/           # Navigation Configuration
│   ├── AppNavigator.tsx  # Bottom Tab setup
|   ├── RootNavigator.tsx # Navigates Between Two Applications
├── screens/              # Screen Logic
│   ├── ManualScreen.tsx  # Complex form logic
│   ├── ScheduledScreen.tsx # List logic
|   ├── ZumloMoodScreen.tsx # Contains All MoodScreens Logic and Animations Related Things
│   └── CalendarViewScreen.tsx # Data fetching & state logic
├── services/             # API & Native Bridge Logic
│   └── CalendarService.ts # The ONLY file that talks to expo-calendar
├── types/                # TypeScript Interfaces
│   ├── calendar.ts
│   └── navigation.ts
└── utils/                # Pure helper functions
```
