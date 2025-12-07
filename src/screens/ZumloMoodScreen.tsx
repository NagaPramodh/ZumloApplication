import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  StatusBar,
  StyleProp,
  ViewStyle,
  Platform,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
  Easing,
  interpolateColor,
} from "react-native-reanimated";
import { Cloud, Zap, AlertCircle, LucideProps } from "lucide-react-native";

const { width, height } = Dimensions.get("window");

type MoodKey = "CALM" | "STRESSED" | "ENERGETIC";

interface MoodTheme {
  label: string;
  colors: [string, string, string];
  textColor: string;
  accentColor: string;
  icon: React.FC<LucideProps>;
  animationType: "BREATHE" | "PULSE_FAST" | "BOUNCE";
  description: string;
}

const MOOD_THEMES: Record<MoodKey, MoodTheme> = {
  CALM: {
    label: "Calm",
    colors: ["#E0F7FA", "#80DEEA", "#4DD0E1"],
    textColor: "#006064",
    accentColor: "#FFFFFF",
    icon: Cloud,
    animationType: "BREATHE",
    description: "Slow, deep ocean waves...",
  },
  STRESSED: {
    label: "Stressed",
    colors: ["#263238", "#37474F", "#455A64"],
    textColor: "#FFCCBC",
    accentColor: "#BF360C",
    icon: AlertCircle,
    animationType: "PULSE_FAST",
    description: "Rapid, sharp focus...",
  },
  ENERGETIC: {
    label: "Energetic",
    colors: ["#FFF3E0", "#FFB74D", "#FF9800"],
    textColor: "#E65100",
    accentColor: "#FFF",
    icon: Zap,
    animationType: "BOUNCE",
    description: "Vibrant, high amplitude!",
  },
};

interface LivingElementProps {
  mood: MoodKey;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

const LivingElement: React.FC<LivingElementProps> = ({
  mood,
  children,
  style,
}) => {
  const scale = useSharedValue(1);

  useEffect(() => {
    scale.value = 1;

    switch (mood) {
      case "CALM":
        scale.value = withRepeat(
          withTiming(1.05, {
            duration: 4000,
            easing: Easing.inOut(Easing.ease),
          }),
          -1,
          true
        );
        break;

      case "STRESSED":
        scale.value = withRepeat(
          withSequence(
            withTiming(1.02, { duration: 100 }),
            withTiming(1.0, { duration: 100 }),
            withTiming(1.02, { duration: 100 }),
            withTiming(1.0, { duration: 800 })
          ),
          -1,
          false
        );
        break;

      case "ENERGETIC":
        scale.value = withRepeat(
          withTiming(1.1, {
            duration: 600,
            easing: Easing.bezier(0.175, 0.885, 0.32, 1.275),
          }),
          -1,
          true
        );
        break;
    }
  }, [mood]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View style={[style, animatedStyle]}>{children}</Animated.View>
  );
};

interface AdaptiveBackgroundProps {
  currentMood: MoodKey;
}

const AdaptiveBackground: React.FC<AdaptiveBackgroundProps> = ({
  currentMood,
}) => {
  const progress = useSharedValue(0);

  useEffect(() => {
    const targetValue =
      currentMood === "CALM" ? 0 : currentMood === "STRESSED" ? 1 : 2;
    progress.value = withTiming(targetValue, { duration: 1000 });
  }, [currentMood]);

  const animatedStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1, 2],
      [
        MOOD_THEMES.CALM.colors[0],
        MOOD_THEMES.STRESSED.colors[0],
        MOOD_THEMES.ENERGETIC.colors[0],
      ]
    );
    return { backgroundColor };
  });

  return (
    <Animated.View style={[StyleSheet.absoluteFill, animatedStyle]}>
      <LinearGradient
        colors={["rgba(255,255,255,0.4)", "transparent"]}
        style={StyleSheet.absoluteFill}
      />
    </Animated.View>
  );
};

export default function ZumloMoodScreen() {
  const [mood, setMood] = useState<MoodKey>("CALM");
  const theme = MOOD_THEMES[mood];
  const Icon = theme.icon;

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={mood === "STRESSED" ? "light-content" : "dark-content"}
      />

      <AdaptiveBackground currentMood={mood} />

      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Text style={[styles.headerTitle, { color: theme.textColor }]}>
              Mood Tracker
            </Text>
            <Text
              style={[
                styles.headerDate,
                { color: theme.textColor, opacity: 0.7 },
              ]}
            >
              Dec 05
            </Text>
          </View>

          <View style={styles.content}>
            <LivingElement mood={mood} style={styles.organismContainer}>
              <View
                style={[
                  styles.moodOrb,
                  {
                    backgroundColor: theme.colors[1],
                    shadowColor: theme.colors[2],
                  },
                ]}
              >
                <Icon size={64} color={theme.accentColor} />
              </View>
            </LivingElement>

            <Animated.View style={styles.textContainer}>
              <Text style={[styles.moodLabel, { color: theme.textColor }]}>
                I am feeling {theme.label}
              </Text>
              <Text style={[styles.moodDesc, { color: theme.textColor }]}>
                {theme.description}
              </Text>
            </Animated.View>
          </View>

          <View style={styles.controls}>
            {(Object.keys(MOOD_THEMES) as Array<MoodKey>).map((moodKey) => {
              const m = MOOD_THEMES[moodKey];
              const isActive = mood === moodKey;

              return (
                <TouchableOpacity
                  key={moodKey}
                  onPress={() => setMood(moodKey)}
                  activeOpacity={0.8}
                  style={[
                    styles.button,
                    isActive && styles.buttonActive,
                    {
                      backgroundColor: isActive
                        ? m.textColor
                        : "rgba(255,255,255,0.5)",
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.buttonText,
                      { color: isActive ? "#fff" : "#333" },
                    ]}
                  >
                    {m.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E0F7FA",
  },
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 30 : 0,
  },

  scrollContainer: {
    flexGrow: 1,
    justifyContent: "space-between",
    paddingBottom: 20,
  },
  header: {
    padding: 24,
    marginTop: 20,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "800",
    letterSpacing: -0.5,
  },
  headerDate: {
    fontSize: 16,
    fontWeight: "500",
    marginTop: 4,
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 40,
  },
  organismContainer: {
    marginBottom: 40,
  },
  moodOrb: {
    width: width * 0.6,
    height: width * 0.6,
    borderRadius: (width * 0.6) / 2,
    justifyContent: "center",
    alignItems: "center",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  textContainer: {
    alignItems: "center",
    paddingHorizontal: 40,
  },
  moodLabel: {
    fontSize: 28,
    fontWeight: "600",
    marginBottom: 8,
  },
  moodDesc: {
    fontSize: 16,
    textAlign: "center",
    opacity: 0.8,
  },
  controls: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    padding: 20,
    paddingBottom: 40,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    minWidth: 100,
    alignItems: "center",
  },
  buttonActive: {
    transform: [{ scale: 1.1 }],
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "700",
  },
});
