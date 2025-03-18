import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import styles from "../styles/Formulario.Styles";

interface Question {
  id: number;
  text: string;
  image: string;
  options: { text: string; value: number }[];
}

const questions: Question[] = [
  {
    id: 1,
    text: "¿Puedes contar del 1 al 10?",
    image: "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=500&auto=format&fit=crop",
    options: [
      { text: "Sí, muy bien", value: 3 },
      { text: "Más o menos", value: 2 },
      { text: "Necesito ayuda", value: 1 },
    ],
  },

  {
    id: 2,
    text: '¿Sabes sumar números pequeños?',
    image: "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=500&auto=format&fit=crop",
    options: [
      { text: "Sí, del 1 al 10", value: 3 },
      { text: "Solo números del 1 al 5", value: 2 },
      { text: "Todavía no'", value: 1 },
    ],
  },

  {
    id: 3,
    text: '¿Conoces las formas geométricas básicas?',
    image: "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=500&auto=format&fit=crop",
    options: [
      { text: "Sí, todas", value: 3 },
      { text: "Algunas", value: 2 },
      { text: "No muy bien", value: 1 },
    ],
  },
  
  
];

const Survey: React.FC = () => {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [score, setScore] = useState<number>(0);

  const handleAnswer = (value: number) => {
    setScore((prev) => prev + value);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      //Aqui lo Redirige al finalizar el cuestionario 
      router.push("/menu"); 
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.card}>
          <Text style={styles.title}>Evaluación Inicial</Text>
          <Image source={{ uri: questions[currentQuestion].image }} style={styles.image} />
          <Text style={styles.question}>{questions[currentQuestion].text}</Text>
          {questions[currentQuestion].options.map((option, index) => (
            <TouchableOpacity key={index} style={styles.optionButton} onPress={() => handleAnswer(option.value)}>
              <Text style={styles.optionText}>{option.text}</Text>
              <MaterialCommunityIcons name="arrow-right" size={24} color="#3b82f6" />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default Survey;
