import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import styles from "../styles/styles";

const Welcome = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Oculto el Header */}
      <Stack.Screen options={{ headerShown: false }} />
      
      {/* Aui pondre un Ícono animado */}
      <View style={styles.iconContainer}>
        <Ionicons name={"happy-outline"} size={80} color="white" />
      </View>

      {/* Aqui esta el  Título y descripción */}
      <Text style={styles.title}>¡Matemáticas Divertidas!</Text>
      <Text style={styles.subtitle}>Aprende matemáticas jugando y divirtiéndote</Text>

      {/* Va el Botón de inicio */}
      <TouchableOpacity onPress={() => router.push("/auth/login")} style={styles.button}>
        <Text style={styles.buttonText}>¡Comenzar!</Text>
      </TouchableOpacity>

      {/* Direccion de Imágenes ilustrativas */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&auto=format&fit=crop&q=60" }}
          style={styles.image}
        />
        <Image
          source={{ uri: "https://images.unsplash.com/photo-1503676382389-4809596d5290?w=800&auto=format&fit=crop&q=60" }}
          style={styles.image}
        />
      </View>
    </View>
  );
};

export default Welcome;