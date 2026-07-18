import { useAuth } from "@/app/AuthProvider";
import { router } from "expo-router";
import { Formik } from "formik";
import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import * as Yup from "yup";

const signUpSchema = Yup.object({
  fullName: Yup.string()
    .trim()
    .min(2, "Full name must be at least 2 characters")
    .required("Full name is required"),
  email: Yup.string()
    .email("Enter a valid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
});

export default function SignUpScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const { signup } = useAuth();

  return (
    <KeyboardAvoidingView
      style={styles.keyboardView}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.brand}>FormFlow</Text>
        <Text style={styles.title}>Create your account</Text>
        <Text style={styles.subtitle}>
          Sign up to access your employee portal.
        </Text>

        <Formik
          initialValues={{
            fullName: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={signUpSchema}
          validateOnBlur
          validateOnChange
          onSubmit={async (values, { resetForm }) => {
            try {
              await signup(values.email, values.password);
              resetForm();
              router.replace("/employee");
            } catch (error: any) {
              Alert.alert("Sign Up Failed", error.message);
            }
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isValid,
            dirty,
          }) => (
            <View style={styles.form}>
              <View>
                <Text style={styles.label}>Full name</Text>
                <TextInput
                  style={[
                    styles.input,
                    touched.fullName && errors.fullName && styles.inputError,
                  ]}
                  placeholder="Enter your full name"
                  placeholderTextColor={COLORS.mutedText}
                  value={values.fullName}
                  onChangeText={handleChange("fullName")}
                  onBlur={handleBlur("fullName")}
                  autoCapitalize="words"
                />
                {touched.fullName && errors.fullName && (
                  <Text style={styles.errorText}>{errors.fullName}</Text>
                )}
              </View>

              <View>
                <Text style={styles.label}>Email address</Text>
                <TextInput
                  style={[
                    styles.input,
                    touched.email && errors.email && styles.inputError,
                  ]}
                  placeholder="you@example.com"
                  placeholderTextColor={COLORS.mutedText}
                  value={values.email}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                {touched.email && errors.email && (
                  <Text style={styles.errorText}>{errors.email}</Text>
                )}
              </View>

              <View>
                <Text style={styles.label}>Password</Text>
                <View
                  style={[
                    styles.passwordRow,
                    touched.password && errors.password && styles.inputError,
                  ]}
                >
                  <TextInput
                    style={styles.passwordInput}
                    placeholder="At least 8 characters"
                    placeholderTextColor={COLORS.mutedText}
                    value={values.password}
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                  />
                  <Pressable onPress={() => setShowPassword(!showPassword)}>
                    <Text style={styles.showText}>
                      {showPassword ? "Hide" : "Show"}
                    </Text>
                  </Pressable>
                </View>
                {touched.password && errors.password && (
                  <Text style={styles.errorText}>{errors.password}</Text>
                )}
              </View>

              <View>
                <Text style={styles.label}>Confirm password</Text>
                <TextInput
                  style={[
                    styles.input,
                    touched.confirmPassword &&
                      errors.confirmPassword &&
                      styles.inputError,
                  ]}
                  placeholder="Re-enter your password"
                  placeholderTextColor={COLORS.mutedText}
                  value={values.confirmPassword}
                  onChangeText={handleChange("confirmPassword")}
                  onBlur={handleBlur("confirmPassword")}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                />
                {touched.confirmPassword && errors.confirmPassword && (
                  <Text style={styles.errorText}>{errors.confirmPassword}</Text>
                )}
              </View>

              <Pressable
                style={[
                  styles.button,
                  (!isValid || !dirty) && styles.buttonDisabled,
                ]}
                onPress={() => handleSubmit()}
                disabled={!isValid || !dirty}
              >
                <Text style={styles.buttonText}>Create account</Text>
              </Pressable>

              <Pressable onPress={() => router.push("/sign-in")}>
                <Text style={styles.signInText}>
                  Already have an account?{" "}
                  <Text style={styles.signInLink}>Sign In</Text>
                </Text>
              </Pressable>
            </View>
          )}
        </Formik>
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
  title: {
    color: COLORS.text,
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 8,
  },
  subtitle: {
    color: COLORS.mutedText,
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 30,
  },
  form: {
    gap: 18,
  },
  label: {
    color: COLORS.text,
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
  },
  input: {
    backgroundColor: COLORS.surface,
    borderColor: COLORS.border,
    borderWidth: 1,
    borderRadius: 12,
    color: COLORS.text,
    fontSize: 16,
    height: 54,
    paddingHorizontal: 16,
  },
  passwordRow: {
    alignItems: "center",
    backgroundColor: COLORS.surface,
    borderColor: COLORS.border,
    borderWidth: 1,
    borderRadius: 12,
    flexDirection: "row",
    height: 54,
    paddingRight: 16,
  },
  passwordInput: {
    color: COLORS.text,
    flex: 1,
    fontSize: 16,
    height: "100%",
    paddingHorizontal: 16,
  },
  inputError: {
    borderColor: COLORS.error,
    borderWidth: 2,
  },
  errorText: {
    color: COLORS.error,
    fontSize: 12,
    marginTop: 6,
  },
  showText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: "700",
  },
  button: {
    alignItems: "center",
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    marginTop: 8,
    paddingVertical: 16,
  },
  buttonDisabled: {
    backgroundColor: "#485870",
  },
  buttonText: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: "700",
  },
  signInText: {
    color: COLORS.mutedText,
    fontSize: 14,
    textAlign: "center",
  },
  signInLink: {
    color: COLORS.primary,
    fontWeight: "700",
  },
});
