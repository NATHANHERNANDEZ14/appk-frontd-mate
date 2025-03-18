import { View, Text } from "react-native";

export default function Tasks() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>Tareas</Text>
      <Text style={{ fontSize: 16, color: "#666" }}>
        Aquí puedes ver tus tareas.
      </Text>
    </View>
  );
}