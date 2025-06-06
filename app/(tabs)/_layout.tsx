import { Tabs } from "expo-router";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome5, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";
import { UserLevelProvider } from "../context/UserLevelContext";
import ThemeSwitcher from "../components/ThemeSwitcher";
import LogoutButton from "../components/LogoutButton"; 
import { useState } from "react";

export default function TabsLayout() {
  const { theme } = useTheme();
  const [reload, setReload] = useState(false);

  return (
    <UserLevelProvider>
      <View style={[styles.container, theme === 'light' ? styles.lightContainer : styles.darkContainer]}>
        {/* Configuración de las pestañas */}
        <Tabs
          screenOptions={{
            tabBarStyle: {
              backgroundColor: "#F0DEC3", 
              borderTopColor: "#DBA975", 
              borderTopWidth: 2, 
            },
            tabBarActiveTintColor: "#BB86F2", 
            tabBarInactiveTintColor: "#A0A0A0", 
          }}
        >
          {/* Pestaña de Inicio */}
          <Tabs.Screen
            name="menu"
            options={{
              headerShown: false,
              tabBarLabel: "Inicio",
              tabBarIcon: ({ color, size }) => (
                <FontAwesome5 name="home" size={size} color={color} />
              ),
            }}
          />

          {/* Pestaña de Logros */}
          <Tabs.Screen
            name="achievements"
            options={{
              headerShown: false,
              tabBarLabel: "Logros",
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="trophy" size={size} color={color} />
              ),
            }}
          />

          {/* Pestaña de Tareas */}
          <Tabs.Screen
            name="tasks"
            options={{
              headerShown: false,
              tabBarLabel: "Tareas",
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="clipboard-list" size={size} color={color} />
              ),
              tabBarButton: (props) => (
                <TouchableOpacity
                  {...props}
                  onPress={() => setReload(!reload)} // Cambia el estado para recargar la pantalla de tareas
                />
              ),
            }}
          />

          {/* Pestaña de Perfil */}
          <Tabs.Screen
            name="profile"
            options={{
              headerShown: false,
              tabBarLabel: "Perfil",
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="person" size={size} color={color} />
              ),
              tabBarButton: (props) => (
                <TouchableOpacity
                  {...props}
                  onPress={() => setReload(!reload)} // Cambia el estado para recargar la pantalla de perfil
                />
              ),
            }}
          />
        </Tabs>

        <ThemeSwitcher />
        <LogoutButton />
      </View>
    </UserLevelProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative', 
  },
  lightContainer: {
    backgroundColor: 'white',
  },
  darkContainer: {
    backgroundColor: 'black',
  },
});

