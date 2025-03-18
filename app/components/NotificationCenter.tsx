import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Notification = ({ message }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
    margin: 10,
  },
  message: {
    color: "#FFFFFF",
    textAlign: "center",
  },
});

export default Notification;