import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useRouter, Stack } from "expo-router";
import axios from "axios";
import styles from "../styles/styles";

const BASE_URL = "https://tu-backend.com/api";

const Login = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert("Error", "Por favor ingresa tus credenciales.");
      return;
    }

    try {
      const response = await axios.post(`${BASE_URL}/login`, {
        username,
        password,
      });

      if (response.data.success) {
        Alert.alert("Éxito", "Inicio de sesión exitoso");
        router.push("/menu");
      } else {
        Alert.alert("Error", response.data.message || "Credenciales incorrectas");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Ocurrió un problema con el servidor");
    }
  };

  return (
    <>
      {/* Oculta el Header */}
      <Stack.Screen options={{ headerShown: false }} />

      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>Iniciar Sesión</Text>
          <TextInput
            placeholder="Nombre de usuario"
            value={username}
            onChangeText={setUsername}
            style={styles.input}
          />
          <TextInput
            placeholder="Contraseña"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            style={styles.input}
          />
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Iniciar Sesión</Text>
          </TouchableOpacity>

          <Text style={styles.switchText}>
            ¿No tienes cuenta?
            <TouchableOpacity onPress={() => router.push("/auth/register")}>
              <Text style={styles.switchButton}> Regístrate</Text>
            </TouchableOpacity>
          </Text>
        </View>
      </View>
    </>
  );
};

export default Login;
