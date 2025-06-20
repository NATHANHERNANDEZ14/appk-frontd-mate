import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import axios from 'axios';
import Collapsible from 'react-native-collapsible';
import * as Animatable from 'react-native-animatable';
import * as Progress from 'react-native-progress';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../context/AuthContext'; // Asegúrate de que esta ruta sea correcta

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

const TareasScreen = () => {
  const auth = useContext(AuthContext);
  const [tareasPorBloque, setTareasPorBloque] = useState({});
  const [bloqueActivo, setBloqueActivo] = useState(null);
  const [progreso, setProgreso] = useState([]);
  const [bloquesDesbloqueados, setBloquesDesbloqueados] = useState([1]);

  const bloques = [1, 2, 3, 4, 5, 6];

  useEffect(() => {
    bloques.forEach((bloque) => {
      axios
        .get(`${apiUrl}/tarea/tareas/bloque/${bloque}`)
        .then((response) => {
          setTareasPorBloque((prev) => ({ ...prev, [bloque]: response.data }));
        });
    });
  }, []);

  useEffect(() => {
    const fetchProgreso = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!auth?.user || !token) return;

        const response = await axios.get(
          `${apiUrl}/progreso/progreso/${auth.user.id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setProgreso(response.data);
      } catch (error) {
        console.error('Error al obtener el progreso:', error);
      }
    };

    fetchProgreso();
  }, [auth?.user]);

  useEffect(() => {
    const nuevosDesbloqueados = [1];

    bloques.forEach((bloque, index) => {
      const tareas = tareasPorBloque[bloque] || [];
      const completadas = tareas.filter((tarea) =>
        progreso.find((p) => p.id_tarea?._id === tarea._id)
      );

      const progresoBloque = tareas.length > 0 ? completadas.length / tareas.length : 0;

      if (progresoBloque >= 1 && index + 1 < bloques.length) {
        const siguienteBloque = bloques[index + 1];
        if (!nuevosDesbloqueados.includes(siguienteBloque)) {
          nuevosDesbloqueados.push(siguienteBloque);
        }
      }
    });

    setBloquesDesbloqueados(nuevosDesbloqueados);
  }, [progreso, tareasPorBloque]);

  const toggleBloque = (bloque) => {
    setBloqueActivo(bloqueActivo === bloque ? null : bloque);
  };

  const calcularProgresoBloque = (bloque) => {
    const tareas = tareasPorBloque[bloque] || [];
    const completadas = tareas.filter((tarea) =>
      progreso.find((p) => p.id_tarea?._id === tarea._id)
    );
    return tareas.length > 0 ? completadas.length / tareas.length : 0;
  };

  const calcularProgresoTotal = () => {
    let totalTareas = 0;
    let totalCompletadas = 0;

    bloques.forEach((bloque) => {
      const tareas = tareasPorBloque[bloque] || [];
      totalTareas += tareas.length;
      totalCompletadas += tareas.filter((tarea) =>
        progreso.find((p) => p.id_tarea?._id === tarea._id)
      ).length;
    });

    return totalTareas > 0 ? totalCompletadas / totalTareas : 0;
  };

  const renderTareasDeBloque = (bloque) => {
    const tareas = tareasPorBloque[bloque] || [];
    const progresoBloque = calcularProgresoBloque(bloque);
    const desbloqueado = bloquesDesbloqueados.includes(bloque);
    const completadas = tareas.filter((tarea) =>
      progreso.find((p) => p.id_tarea?._id === tarea._id)
    );

    return (
      <View key={bloque} style={styles.bloqueContainer}>
        <TouchableOpacity onPress={() => toggleBloque(bloque)} disabled={!desbloqueado}>
          <Animatable.View
            animation={desbloqueado && bloqueActivo !== bloque ? 'bounceIn' : undefined}
            style={[styles.bloqueBoton, { backgroundColor: desbloqueado ? '#DBA975' : '#ccc' }]}>
            <Text style={styles.bloqueTitulo}>
              {desbloqueado ? '🔓' : '🔒'} Bloque {bloque}
            </Text>
          </Animatable.View>
        </TouchableOpacity>

        <Progress.Bar
          progress={progresoBloque}
          width={null}
          height={10}
          color="#4B3F2F"
          borderWidth={0}
          style={{ marginTop: 10 }}
        />

        <Text style={styles.progresoTexto}>
          Progreso: {completadas.length}/{tareas.length} ({Math.round(progresoBloque * 100)}%)
        </Text>

        <Collapsible collapsed={bloqueActivo !== bloque}>
          {tareas.map((tarea) => {
            const completada = progreso.find((p) => p.id_tarea?._id === tarea._id);
            return (
              <TouchableOpacity
                key={tarea._id}
                style={[
                  styles.tareaContainer,
                  completada && styles.tareaCompletada, // Se agrega la opacidad para tareas completadas
                ]}
                onPress={() =>
                  !completada &&
                  router.push({
                    pathname: '/games',
                    params: { tarea: JSON.stringify(tarea) },
                  })
                }
                activeOpacity={completada ? 1 : 0.7} // Desactivar efecto de opacidad si está completada
                disabled={!!completada} // Deshabilitar si ya fue completada
              >
                <Text style={styles.tareaPregunta}>{tarea.pregunta}</Text>
                <Text style={styles.tareaPuntaje}>Puntaje: {tarea.puntaje}</Text>
              </TouchableOpacity>
            );
          })}
        </Collapsible>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>Tareas por Bloque</Text>

      <Progress.Bar
        progress={calcularProgresoTotal()}
        width={null}
        height={12}
        color="#4B3F2F"
        borderWidth={0}
        style={{ marginBottom: 20 }}
      />

      {bloques.map((bloque) => renderTareasDeBloque(bloque))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFF8F0',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#4B3F2F',
    textAlign: 'center',
  },
  bloqueContainer: {
    marginBottom: 16,
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  bloqueBoton: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  bloqueTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4B3F2F',
  },
  tareaContainer: {
    backgroundColor: '#F7E9D7',
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
  },
  tareaPregunta: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4B3F2F',
  },
  tareaPuntaje: {
    fontSize: 14,
    color: '#4B3F2F',
    marginTop: 4,
  },
  progresoTexto: {
    marginTop: 4,
    fontSize: 14,
    fontWeight: '600',
    color: '#4B3F2F',
    textAlign: 'center',
  },
  tareaCompletada: {
    opacity: 0.4, // Esto hace que la tarea se vea más tenue cuando se completa
  },
});

export default TareasScreen;
