import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function GameScreen() {
  const { tarea } = useLocalSearchParams();
  const [tareaObj, setTareaObj] = useState(null);
  const [selected, setSelected] = useState(null);
  const [respondido, setRespondido] = useState(false);
  const [correcta, setCorrecta] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ultimaTarea, setUltimaTarea] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (tarea) {
      try {
        const parsed = JSON.parse(tarea);
        setTareaObj(parsed);
      } catch (error) {
        console.error('Error al interpretar la tarea');
      }
    }
  }, [tarea]);

  const verificarRespuesta = (opcion) => {
    setLoading(true);
    setSelected(opcion);

    setTimeout(async () => {
      const respuestaUsuario = opcion.trim().toLowerCase();
      const respuestaCorrecta = tareaObj.respuestaCorrecta.trim().toLowerCase();
      const esCorrecta = respuestaUsuario === respuestaCorrecta;

      setCorrecta(esCorrecta);
      setRespondido(true);
      setLoading(false);

      if (esCorrecta) {
        await saveProgress(opcion);
      }
    }, 1000);
  };

  const saveProgress = async (respuestaUsuario) => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.post(
        `http://127.0.0.1:5000/api/tarea/${tareaObj._id}/responder`,
        { respuesta: respuestaUsuario },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const { siguiente_tarea } = response.data;

      if (siguiente_tarea) {
        setTimeout(() => {
          setTareaObj(siguiente_tarea);
          setSelected(null);
          setRespondido(false);
          setCorrecta(false);
        }, 2000);
      } else {
        // Ya no hay más tareas
        setTimeout(() => {
          setUltimaTarea(true);
        }, 2000);
      }
    } catch (error) {
      console.error('Error al guardar el progreso', error);
    }
  };

  if (!tareaObj && !ultimaTarea) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Cargando tarea...</Text>
      </View>
    );
  }

  if (ultimaTarea) {
    return (
      <View style={styles.centered}>
        <Ionicons name="trophy" size={80} color="#FFD700" />
        <Text style={styles.finishedText}>¡Ya no hay más tareas disponibles!</Text>
        <TouchableOpacity style={styles.homeButton} onPress={() => router.push('/tasks')}>
          <Text style={styles.homeButtonText}>Volver al inicio</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{tareaObj.pregunta}</Text>

      {tareaObj.opciones.map((opcion, index) => {
        const isSelected = selected === opcion;
        const isCorrect = opcion === tareaObj.respuestaCorrecta;

        let backgroundColor = '#F0F0F0';
        if (respondido) {
          if (isSelected && isCorrect) backgroundColor = '#A2F2B2';
          else if (isSelected && !isCorrect) backgroundColor = '#F2A2A2';
          else if (isCorrect) backgroundColor = '#CFFFCF';
        }

        return (
          <TouchableOpacity
            key={index}
            style={[styles.optionButton, { backgroundColor }]}
            disabled={respondido}
            onPress={() => verificarRespuesta(opcion)}
          >
            <Text style={styles.optionText}>{opcion}</Text>
          </TouchableOpacity>
        );
      })}

      {loading && <ActivityIndicator size="large" color="#BB86F2" style={{ marginTop: 20 }} />}

      {respondido && (
        <View style={styles.feedbackContainer}>
          <Ionicons
            name={correcta ? 'checkmark-circle' : 'close-circle'}
            size={64}
            color={correcta ? '#4CAF50' : '#F44336'}
          />
          <Text style={styles.feedbackText}>
            {correcta ? '¡Correcto! 🎉' : 'Incorrecto 😕'}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFF8E1',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#8B5CF6',
  },
  optionButton: {
    padding: 15,
    borderRadius: 10,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#D8B878',
  },
  optionText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#333',
  },
  feedbackContainer: {
    alignItems: 'center',
    marginTop: 30,
  },
  feedbackText: {
    fontSize: 20,
    marginTop: 10,
    color: '#555',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 18,
  },
  finishedText: {
    fontSize: 22,
    textAlign: 'center',
    marginTop: 20,
    color: '#444',
    fontWeight: 'bold',
  },
  homeButton: {
    backgroundColor: '#8B5CF6',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 25,
  },
  homeButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
});
