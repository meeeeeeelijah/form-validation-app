import { useAuth } from "@/providers/AuthProvider";
import { router } from "expo-router";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
} from "react-native";

export default function HomeScreen() {
  const { user, logout } = useAuth();

  return (
    <KeyboardAvoidingView
      style={styles.keyboardView}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.brand}>FormFlow</Text>

        {!user && (
          <Pressable
            style={styles.button}
            onPress={() => router.push("/sign-up")}
          >
            <Text style={styles.buttonText}>Sign up</Text>
          </Pressable>
        )}

        {!user && (
          <Pressable
            style={styles.button}
            onPress={() => router.push("/sign-in")}
          >
            <Text style={styles.buttonText}>Sign In</Text>
          </Pressable>
        )}

        {user && (
          <Pressable style={styles.button} onPress={() => logout()}>
            <Text style={styles.buttonText}>Logout</Text>
          </Pressable>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const COLORS = {
  background: "#26233F",
  surface: "#1A1830",
  primary: "#169BFF",
  text: "#FFFFFF",
  mutedText: "#C8C5D2",
  border: "#807987",
  error: "#FF4D4F",
};

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 72,
    paddingBottom: 40,
    backgroundColor: COLORS.background,
  },
  brand: {
    color: COLORS.text,
    fontSize: 32,
    fontWeight: "700",
    fontStyle: "italic",
    textAlign: "center",
    marginBottom: 42,
  },
  button: {
    alignItems: "center",
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    marginTop: 8,
    paddingVertical: 16,
  },
  buttonText: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: "700",
  },
});
