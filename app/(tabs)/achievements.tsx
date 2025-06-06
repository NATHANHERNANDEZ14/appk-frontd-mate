import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";
import styles from '../styles/LogrosStyles';

const Achievements = () => {
  const { theme } = useTheme();
  const [logros, setLogros] = useState([]);

  useEffect(() => {
    const fetchLogros = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/logro/allogros");
        const data = await response.json();
        setLogros(data);
      } catch (error) {
        console.error("Error al obtener logros:", error);
      }
    };

    fetchLogros();
  }, []);

  return (
    <ScrollView style={[styles.container, theme === 'light' ? styles.lightContainer : styles.darkContainer]}>
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

      <View style={styles.achievementsContainer}>
        {logros.map((achievement, index) => (
          <View
            key={index}
            style={[styles.achievementCard, theme === 'light' ? styles.lightCard : styles.darkCard]}
          >
            <View style={styles.cardHeader}>
              <View style={styles.textContainer}>
                <Text style={[styles.achievementTitle, theme === 'light' ? styles.lightText : styles.darkText]}>
                  {achievement.logro}
                </Text>
                <Text style={[styles.achievementDescription, theme === 'light' ? styles.lightText : styles.darkText]}>
                  {achievement.descripcion}
                </Text>
              </View>
              <View style={styles.iconContainer}>
                <Ionicons name="checkmark-circle" size={24} color={theme === 'light' ? "#4CAF50" : "#81C784"} />
              </View>
            </View>

            <View style={styles.progressContainer}>
              <View style={[styles.progressBar, theme === 'light' ? styles.lightProgressBar : styles.darkProgressBar]}>
                <View
                  style={[
                    styles.progressFill,
                    { width: `100%` }, // Por ahora 100% desbloqueado
                    theme === 'light' ? styles.lightProgressFill : styles.darkProgressFill,
                  ]}
                />
              </View>
              <Text style={[styles.progressText, theme === 'light' ? styles.lightText : styles.darkText]}>
                100% completado
              </Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default Achievements;
