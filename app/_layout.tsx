// _layout.tsx
import React from "react";
import { Stack } from "expo-router";
import { ThemeProvider } from "../app/context/ThemeContext";
import { AuthProvider } from "../app/context/AuthContext"; // Asegúrate de que la ruta sea correcta
import ThemeSwitcher from "../app/components/ThemeSwitcher";

export default function RootLayout() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <ThemeSwitcher />
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="auth/welcome" options={{ headerShown: false }} />
          <Stack.Screen name="auth/login" options={{ headerShown: false }} />
          <Stack.Screen name="auth/survey" options={{ headerShown: false }} />
          <Stack.Screen name="auth/register" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="achievements" options={{ headerShown: false }} />
        </Stack>
      </ThemeProvider>
    </AuthProvider>
  );
}
