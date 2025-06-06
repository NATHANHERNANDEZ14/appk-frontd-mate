import React, { useContext } from 'react';
import { useRouter } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { AuthContext } from '../context/AuthContext'; // asegúrate de que la ruta esté bien

const LogoutButton = () => {
  const router = useRouter();
  const auth = useContext(AuthContext);

  const handleLogout = async () => {
    if (auth?.logout) {
      await auth.logout();
      router.replace('/auth/welcome');
    } else {
      console.warn('AuthContext no disponible');
    }
  };

  return (
    <TouchableOpacity onPress={handleLogout} style={styles.button}>
      <FontAwesome5 name="sign-out-alt" size={16} color="#ef4444" />
      <Text style={styles.buttonText}>Cerrar Sesión</Text>
    </TouchableOpacity>
  );
};

export default LogoutButton;

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 50,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    fontSize: 14,
    color: '#ef4444',
  },
});
