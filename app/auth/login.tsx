import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useRouter, Stack } from "expo-router";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from "../styles/styles";

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Por favor ingresa tus credenciales.");
      return;
    }

    try {
      console.log("Intentando iniciar sesión con:", { email, password });
      
      const response = await axios.post(`${apiUrl}/auth/login`, {
        email,
        password,
      });

      console.log("Respuesta del servidor:", response.data);

      if (response.data && response.data.token) {
        await AsyncStorage.removeItem('userToken'); 
        await AsyncStorage.setItem('token', response.data.token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
        const savedToken = await AsyncStorage.getItem('token');
        console.log("Token guardado:", savedToken);
        
        Alert.alert("Éxito", "Inicio de sesión exitoso");
        router.push("/menu");
      } else {
        const errorMsg = response.data?.msg || response.data?.message || "Credenciales incorrectas";
        Alert.alert("Error", errorMsg);
      }
    } catch (error: any) {
      console.error("Error en login:", error);
      
      let errorMessage = "Error al conectar con el servidor";
      
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.error || 
                      error.response?.data?.message || 
                      error.message || 
                      "Error de conexión";
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      Alert.alert("Error", errorMessage);
    }
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />

      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>Iniciar Sesión</Text>
          <TextInput
            placeholder="Correo"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            autoCapitalize="none"
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