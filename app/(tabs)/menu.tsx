import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { FontAwesome5, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useUserLevel } from "../context/UserLevelContext";
import { useTheme } from "../context/ThemeContext";
import styles from '../styles/MenuStyles';

const Menu = () => {
  const router = useRouter();
  const { block } = useUserLevel();
  const { theme } = useTheme();

  const beginnerActivities = [
    {
      icon: FontAwesome5,
      iconName: "tasks",
      title: "Tareas Diarias",
      description: "Aprende a contar y reconocer números",
      path: "/tasks" as const,
    },
    {
      icon: Ionicons,
      iconName: "game-controller", 
      title: "Juegos Educativos",
      description: "Diviértete con juegos de números",
      path: "/games" as const,
    },
    {
      icon: MaterialCommunityIcons,
      iconName: "trophy", 
      title: "Logros",
      description: "Mira tus medallas y progreso",
      path: "/achievements" as const,
    },
  ];

  const intermediateActivities = [
    {
      icon: FontAwesome5,
      iconName: "tasks",
      title: "Tareas Diarias",
      description: "Practica sumas con números del 1 al 10",
      path: "/tasks" as const,
    },
    {
      icon: Ionicons,
      iconName: "game-controller",
      title: "Juegos Educativos",
      description: "Juegos divertidos para practicar sumas",
      path: "/games" as const,
    },
    {
      icon: MaterialCommunityIcons,
      iconName: "trophy",
      title: "Logros",
      description: "Mira tus medallas y progreso",
      path: "/achievements" as const,
    },
  ];

  const advancedActivities = [
    {
      icon: FontAwesome5,
      iconName: "tasks",
      title: "Tareas Diarias",
      description: "Practica operaciones más complejas",
      path: "/tasks" as const,
    },
    {
      icon: Ionicons,
      iconName: "game-controller",
      title: "Juegos Educativos",
      description: "Desafíos matemáticos divertidos",
      path: "/games" as const,
    },
    {
      icon: MaterialCommunityIcons,
      iconName: "trophy",
      title: "Logros",
      description: "Mira tus medallas y progreso",
      path: "/achievements" as const,
    },
  ];

  const menuItems =
    block === "1" ? beginnerActivities : block === "2" ? intermediateActivities : advancedActivities;

  return (
    <ScrollView style={[styles.container, theme === 'light' ? styles.lightContainer : styles.darkContainer]}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={[styles.title, theme === 'light' ? styles.lightText : styles.darkText]}>
            ¡Hola, Estudiante!
            {block === "1" && " (Nivel Principiante)"}
            {block === "2" && " (Nivel Intermedio)"}
            {block === "3" && " (Nivel Avanzado)"}
          </Text>
          <Text style={[styles.subtitle, theme === 'light' ? styles.lightText : styles.darkText]}>
            ¿Qué quieres aprender hoy?
          </Text>
        </View>
      </View>

      {/* Actividades */}
      <View style={styles.activitiesContainer}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => router.push(item.path)}
            style={[styles.activityCard, theme === 'light' ? styles.lightCard : styles.darkCard]}
          >
            <View style={styles.iconContainer}>
              <item.icon name={item.iconName} size={24} color={theme === 'light' ? "#3182ce" : "#BB86F2"} />
            </View>
            <View style={styles.textContainer}>
              <Text style={[styles.activityTitle, theme === 'light' ? styles.lightText : styles.darkText]}>
                {item.title}
              </Text>
              <Text style={[styles.activityDescription, theme === 'light' ? styles.lightText : styles.darkText]}>
                {item.description}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export default Menu;