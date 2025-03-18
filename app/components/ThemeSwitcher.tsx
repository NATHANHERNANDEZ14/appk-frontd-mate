import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        theme === 'light' ? styles.lightButton : styles.darkButton,
      ]}
      onPress={toggleTheme}
    >
      {theme === 'light' ? (
        <MaterialIcons name="nights-stay" size={24} color="black" />
      ) : (
        <MaterialIcons name="wb-sunny" size={24} color="white" />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    top: 40,
    right: 20,
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  lightButton: {
    backgroundColor: 'white',
  },
  darkButton: {
    backgroundColor: 'black',
  },
});

export default ThemeSwitcher;