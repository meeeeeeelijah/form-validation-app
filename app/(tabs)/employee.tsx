import { Formik } from "formik";
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

const employeeSchema = Yup.object({
  firstName: Yup.string()
    .min(2, "First name must be at least 2 characters")
    .required("First name is required"),
  lastName: Yup.string()
    .min(2, "Last name must be at least 2 characters")
    .required("Last name is required"),
  address: Yup.string()
    .min(5, "Address must be at least 5 characters")
    .required("Address is required"),
  email: Yup.string()
    .email("Enter a valid email address")
    .required("Email is required"),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
    .required("Phone number is required"),
});

export default function EmployeeScreen() {
  return (
    <KeyboardAvoidingView
      style={styles.keyboardView}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.brand}>FormFlow</Text>
        <Text style={styles.title}>Employee Information</Text>
        <Text style={styles.subtitle}>
          Please fill and keep all personal details up-to-date.
        </Text>

        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            address: "",
            email: "",
            phone: "",
          }}
          validationSchema={employeeSchema}
          onSubmit={(values) => {
            console.log(values);
            Alert.alert("Saved!", `You have updated your information!`);
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View style={styles.form}>
              <View>
                <Text style={styles.label}>First Name</Text>
                <TextInput
                  style={[
                    styles.input,
                    touched.firstName && errors.firstName && styles.inputError,
                  ]}
                  placeholder="Enter your first name..."
                  placeholderTextColor={COLORS.mutedText}
                  value={values.firstName}
                  onChangeText={handleChange("firstName")}
                  onBlur={handleBlur("firstName")}
                  autoCapitalize="words"
                />
                {touched.firstName && errors.firstName && (
                  <Text style={styles.errorText}>{errors.firstName}</Text>
                )}
              </View>
              <View>
                <Text style={styles.label}>Last Name</Text>
                <TextInput
                  style={[
                    styles.input,
                    touched.lastName && errors.lastName && styles.inputError,
                  ]}
                  placeholder="Enter your last name..."
                  placeholderTextColor={COLORS.mutedText}
                  value={values.lastName}
                  onChangeText={handleChange("lastName")}
                  onBlur={handleBlur("lastName")}
                  autoCapitalize="words"
                />
                {touched.lastName && errors.lastName && (
                  <Text style={styles.errorText}>{errors.lastName}</Text>
                )}
              </View>
              <View>
                <Text style={styles.label}>Address</Text>
                <TextInput
                  style={[
                    styles.input,
                    touched.address && errors.address && styles.inputError,
                  ]}
                  placeholder="Enter your home address..."
                  placeholderTextColor={COLORS.mutedText}
                  value={values.address}
                  onChangeText={handleChange("address")}
                  onBlur={handleBlur("address")}
                  autoCapitalize="words"
                />
                {touched.address && errors.address && (
                  <Text style={styles.errorText}>{errors.address}</Text>
                )}
              </View>
              <View>
                <Text style={styles.label}>Email</Text>
                <TextInput
                  style={[
                    styles.input,
                    touched.email && errors.email && styles.inputError,
                  ]}
                  placeholder="Enter your email..."
                  placeholderTextColor={COLORS.mutedText}
                  value={values.email}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  autoCapitalize="words"
                />
                {touched.email && errors.email && (
                  <Text style={styles.errorText}>{errors.email}</Text>
                )}
              </View>
              <View>
                <Text style={styles.label}>Phone Number</Text>
                <TextInput
                  style={[
                    styles.input,
                    touched.phone && errors.phone && styles.inputError,
                  ]}
                  placeholder="Enter your phone number..."
                  placeholderTextColor={COLORS.mutedText}
                  value={values.phone}
                  onChangeText={handleChange("phone")}
                  onBlur={handleBlur("phone")}
                  autoCapitalize="words"
                />
                {touched.phone && errors.phone && (
                  <Text style={styles.errorText}>{errors.phone}</Text>
                )}
              </View>

              <Pressable style={[styles.button]} onPress={() => handleSubmit()}>
                <Text style={[styles.buttonText]}>Save</Text>
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
    marginBottom: 15,
  },
  input: {
    backgroundColor: COLORS.surface,
    borderColor: COLORS.border,
    borderWidth: 1,
    borderRadius: 12,
    color: COLORS.text,
    fontSize: 14,
    height: 40,
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  inputError: {
    borderColor: COLORS.error,
    borderWidth: 2,
  },
  errorText: {
    color: COLORS.error,
    fontSize: 12,
    paddingLeft: 10,
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
