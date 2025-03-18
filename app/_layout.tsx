import { Stack } from "expo-router";
import { ThemeProvider } from "../app/context/ThemeContext";
import ThemeSwitcher from "../app/components/ThemeSwitcher";

export default function RootLayout() {
  return (
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
  );
}