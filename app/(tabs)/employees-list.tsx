import { useAuth } from "@/providers/AuthProvider";
import { useFocusEffect } from "@react-navigation/native";
import { router } from "expo-router";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { auth, db } from "../../config/firebase";

type Employee = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

export default function EmployeesListScreen() {
  const [employees, setEmployees] = useState<Employee[]>([]);

  const { user, logout } = useAuth();
  useEffect(() => {
    if (!user) {
      router.replace("/");
    }
  }, [user]);

  async function fetchEmployees() {
    const user = auth.currentUser;
    if (!user) return;

    const q = query(
      collection(db, "employees"),
      where("userId", "==", user.uid),
    );

    const querySnapshot = await getDocs(q);

    const data = querySnapshot.docs.map((doc) => {
      const employee = doc.data();

      return {
        id: doc.id,
        firstName: employee.firstName,
        lastName: employee.lastName,
        email: employee.email,
        phone: employee.phone,
      };
    });
    setEmployees(data);
  }

  useFocusEffect(
    useCallback(() => {
      fetchEmployees();
    }, []),
  );

  return (
    <View style={styles.container}>
      <Text style={styles.brand}>FormFlow</Text>
      <Text style={styles.title}>Employee List</Text>
      <Text style={styles.subtitle}>
        Your saved employee information is displayed below.
      </Text>

      <FlatList
        data={employees}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No employee records found.</Text>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>
              {item.firstName} {item.lastName}
            </Text>

            <View style={styles.divider} />

            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>{item.email}</Text>

            <Text style={styles.label}>Phone</Text>
            <Text style={styles.value}>{item.phone}</Text>
          </View>
        )}
      />

      <Pressable style={styles.button} onPress={() => logout()}>
        <Text style={styles.buttonText}>Logout</Text>
      </Pressable>
    </View>
  );
}

const COLORS = {
  background: "#26233F",
  surface: "#1A1830",
  primary: "#169BFF",
  text: "#FFFFFF",
  mutedText: "#C8C5D2",
  border: "#807987",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 72,
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
    marginBottom: 25,
  },

  list: {
    paddingBottom: 40,
  },

  card: {
    backgroundColor: COLORS.surface,
    borderColor: COLORS.border,
    borderWidth: 1,
    borderRadius: 12,
    padding: 18,
    marginBottom: 16,
  },

  name: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
  },

  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginBottom: 14,
  },

  label: {
    color: COLORS.mutedText,
    fontSize: 12,
    fontWeight: "600",
    marginTop: 8,
    marginBottom: 4,
  },

  value: {
    color: COLORS.text,
    fontSize: 14,
  },

  emptyText: {
    color: COLORS.mutedText,
    textAlign: "center",
    marginTop: 40,
    fontSize: 14,
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
