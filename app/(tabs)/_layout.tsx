import { Tabs } from "expo-router";
import { View, StyleSheet } from "react-native";
import { FontAwesome5, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";
import { UserLevelProvider } from "../context/UserLevelContext";
import ThemeSwitcher from "../components/ThemeSwitcher";
import LogoutButton from "../components/LogoutButton"; 

export default function TabsLayout() {
  const { theme } = useTheme(); 

  return (
    <UserLevelProvider>
      <View style={[styles.container, theme === 'light' ? styles.lightContainer : styles.darkContainer]}>
        {/* Configuración de las pestañas */}
        <Tabs
          screenOptions={{
            tabBarStyle: {
              // Fondo amarillo pastel (fijo)
              backgroundColor: "#F0DEC3", 
              // Borde superior amarillo (fijo)
              borderTopColor: "#DBA975", 
              // Grosor del borde
              borderTopWidth: 2, 
            },
            // Color morado para íconos y texto activos
            tabBarActiveTintColor: "#BB86F2", 
            // Color gris para íconos y texto inactivos
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
            }}
          />

          {/* Pestaña de Juegos */}
          <Tabs.Screen
            name="games"
            options={{
              headerShown: false,
              tabBarLabel: "Juegos",
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="game-controller" size={size} color={color} />
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
    backgroundColor: 'white', // Fondo blanco para el modo claro
  },
  darkContainer: {
    backgroundColor: 'black', // Fondo negro para el modo oscuro
  },
});