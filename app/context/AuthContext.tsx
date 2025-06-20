import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

// Definir la interfaz del usuario
interface User {
  id: string;
  username: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Función para cargar el usuario desde el backend
  const loadUser = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('token');
      console.log('Token almacenado:', token);

      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }

      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      const response = await axios.get(`${apiUrl}/auth/me`);

      console.log('Usuario autenticado:', response.data);
      setUser(response.data);
    } catch (error: any) {
      console.error('Error al cargar usuario:', error?.response?.data || error.message);
      setUser(null);

      if (error.response?.status === 401) {
        await AsyncStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
      }
    } finally {
      setLoading(false);
    }
  };

  // Función para iniciar sesión
  const login = async (token: string) => {
    try {
      console.log('Guardando token:', token);
      await AsyncStorage.setItem('token', token);
      await loadUser();
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  };
  

  // 🔒 Función para cerrar sesión (actualizada)
  const logout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
      setUser(null);
      console.log('Sesión cerrada correctamente');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  // Al montar el componente, cargamos al usuario
  useEffect(() => {
    loadUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
