import React from "react";
import { View, Text, ScrollView} from "react-native";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";
import styles from '../styles/LogrosStyles'; 

const achievements = [
  {
    title: "Matemático Estrella",
    description: "Completa 10 ejercicios perfectamente",
    unlocked: true,
    progress: 100,
  },
  {
    title: "Rey de las Sumas",
    description: "Resuelve 20 sumas correctamente",
    unlocked: true,
    progress: 100,
  },
  {
    title: "Experto en Restas",
    description: "Completa el módulo de restas",
    unlocked: false,
    progress: 75,
  },
  {
    title: "Maestro del Tiempo",
    description: "Completa 5 ejercicios en menos de 1 minuto",
    unlocked: false,
    progress: 40,
  },
];

const Achievements = () => {
  const { theme } = useTheme(); 

  return (
    <ScrollView style={[styles.container, theme === 'light' ? styles.lightContainer : styles.darkContainer]}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={[styles.title, theme === 'light' ? styles.lightText : styles.darkText]}>
            Mis Logros
          </Text>
          <Text style={[styles.subtitle, theme === 'light' ? styles.lightText : styles.darkText]}>
            ¡Sigue aprendiendo para desbloquear más!
          </Text>
        </View>
        <View style={styles.trophyContainer}>
          <MaterialCommunityIcons name="trophy" size={24} color={theme === 'light' ? "#f6ad55" : "#FFD700"} />
        </View>
      </View>

      {/* Lista de Logros */}
      <View style={styles.achievementsContainer}>
        {achievements.map((achievement, index) => (
          <View
            key={index}
            style={[styles.achievementCard, theme === 'light' ? styles.lightCard : styles.darkCard]}
          >
            <View style={styles.cardHeader}>
              <View style={styles.textContainer}>
                <Text style={[styles.achievementTitle, theme === 'light' ? styles.lightText : styles.darkText]}>
                  {achievement.title}
                </Text>
                <Text style={[styles.achievementDescription, theme === 'light' ? styles.lightText : styles.darkText]}>
                  {achievement.description}
                </Text>
              </View>
              <View style={styles.iconContainer}>
                {achievement.unlocked ? (
                  <Ionicons name="checkmark-circle" size={24} color={theme === 'light' ? "#4CAF50" : "#81C784"} />
                ) : (
                  <MaterialCommunityIcons name="lock" size={24} color={theme === 'light' ? "#9E9E9E" : "#757575"} />
                )}
              </View>
            </View>

            {/* Barra de Progreso */}
            <View style={styles.progressContainer}>
              <View style={[styles.progressBar, theme === 'light' ? styles.lightProgressBar : styles.darkProgressBar]}>
                <View
                  style={[
                    styles.progressFill,
                    { width: `${achievement.progress}%` },
                    theme === 'light' ? styles.lightProgressFill : styles.darkProgressFill,
                  ]}
                />
              </View>
              <Text style={[styles.progressText, theme === 'light' ? styles.lightText : styles.darkText]}>
                {achievement.progress}% completado
              </Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default Achievements;