import { Tabs } from "expo-router";
import React from "react";

import { useAuth } from "@/app/AuthProvider"; //
import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { user } = useAuth(); //

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />

      {!user && (
        <>
          <Tabs.Screen name="sign-in" options={{ title: "Sign In" }} />
          <Tabs.Screen name="sign-up" options={{ title: "Sign Up" }} />
        </>
      )}

      {user ? (
        <Tabs.Screen name="employee" options={{ title: "Employee" }} />
      ) : (
        <Tabs.Screen
          name="employee"
          options={{ href: null }} // hides tab entirely
        />
      )}
    </Tabs>
  );
}
