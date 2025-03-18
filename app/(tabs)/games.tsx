import { View, Text } from "react-native";

export default function Games() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>Juegos</Text>
      <Text style={{ fontSize: 16, color: "#666" }}>
        Aquí puedes jugar juegos divertidos.
      </Text>
    </View>
  );
}