import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, Alert } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";
import { useRouter } from "expo-router";
import axios from "axios"; 
import styles from "../styles/RegisterStyles";

const apiUrl = process.env.EXPO_PUBLIC_API_URL;


const Register = () => {
  const { theme } = useTheme();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCode, setShowCode] = useState(false);
  const [code, setCode] = useState("");
  const [isLogin, setIsLogin] = useState(false);

  const register = async () => {
    if (!username || !password || !confirmPassword) {
      Alert.alert("Error", "Todos los campos son obligatorios.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Las contraseñas no coinciden.");
      return;
    }

    try {
      const response = await axios.post(`${apiUrl}/auth/register`, {
        username,
        email,
        password,
      });


    //Aqui Guardaremos el código mágico recibido de nuesro backend
      setCode(response.data.code); 
      setShowCode(true);
    } catch (error) {
      Alert.alert("Error", "No se pudo registrar. Inténtalo de nuevo.");
      console.error("Error en el registro:", error);
    }
  };

  const handleStartAdventure = () => {
    router.push("/auth/survey");
  };

  const handleLoginRedirect = () => {
    router.push("/auth/login");
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer} style={[styles.container, theme === "light" ? styles.lightContainer : styles.darkContainer]}>
      <View style={styles.whiteBox}>
        {!showCode ? (
          <>
            <Image source={require("../../assets/images/register.png")} style={styles.image} resizeMode="contain" />
            <View style={styles.header}>
              <MaterialCommunityIcons name="star-four-points" size={32} color="#BB86FC" />
              <Text style={styles.title}>¡Únete a la diversión!</Text>
            </View>
            <View style={styles.form}>
              <View style={styles.inputContainer}>
                <MaterialCommunityIcons name="account-circle" size={24} color="#BB86FC" style={styles.icon} />
                <TextInput placeholder="Nombre de usuario" placeholderTextColor="#666" value={username} onChangeText={setUsername} style={styles.input} />
              </View>
              <View style={styles.inputContainer}>
                <MaterialCommunityIcons name="account-circle" size={24} color="#BB86FC" style={styles.icon} />
                <TextInput placeholder="Correo" placeholderTextColor="#666" value={email} onChangeText={setEmail} style={styles.input} />
              </View>
              <View style={styles.inputContainer}>
                <MaterialCommunityIcons name="lock" size={24} color="#BB86FC" style={styles.icon} />
                <TextInput placeholder="Contraseña" placeholderTextColor="#666" value={password} onChangeText={setPassword} secureTextEntry style={styles.input} />
              </View>
              <View style={styles.inputContainer}>
                <MaterialCommunityIcons name="lock" size={24} color="#BB86FC" style={styles.icon} />
                <TextInput placeholder="Confirmar contraseña" placeholderTextColor="#666" value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry style={styles.input} />
              </View>
              <TouchableOpacity onPress={register} style={styles.button}>
                <Text style={styles.buttonText}>Registro</Text>
                <MaterialCommunityIcons name="star-four-points" size={24} color="white" style={styles.buttonIcon} />
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <View style={styles.codeContainer}>
            <MaterialCommunityIcons name="star-four-points" size={64} color="#BB86FC" />
            <Text style={styles.codeTitle}>¡Tu código mágico es!</Text>
            <View style={styles.codeBox}>
              <Text style={styles.codeText}>{code}</Text>
            </View>
            <Text style={styles.codeSubtitle}>¡Guarda este código mágico para entrar a tu cuenta!</Text>
            <TouchableOpacity onPress={handleStartAdventure} style={styles.button}>
              <Text style={styles.buttonText}>¡Comenzar la aventura!</Text>
            </TouchableOpacity>
          </View>
        )}
        <View style={styles.switchContainer}>
          <Text style={styles.switchText}>{isLogin ? "¿Primera vez aquí?" : "¿Ya tienes una cuenta?"}</Text>
          <TouchableOpacity onPress={handleLoginRedirect}>
            <Text style={styles.switchLink}>{isLogin ? "¡Regístrate!" : "¡Inicia sesión!"}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Register;
