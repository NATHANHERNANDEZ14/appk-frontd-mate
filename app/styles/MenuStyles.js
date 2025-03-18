import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFFFF0', // Fondo del menú en #FFFFF0
  },
  lightContainer: {
    backgroundColor: '#FFFFF0', // Fondo del menú en #FFFFF0 (modo claro)
  },
  darkContainer: {
    backgroundColor: 'black', // Fondo del menú en negro (modo oscuro)
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 60, 
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  lightText: {
    color: 'black',
  },
  darkText: {
    color: 'white',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },

  pointsText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },
  activitiesContainer: {
    marginBottom: 24,
  },
  activityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1, // Contorno negro
    borderColor: 'black', // Contorno negro
  },
  lightCard: {
    backgroundColor: '#f0f4f8',
  },
  darkCard: {
    backgroundColor: '#333333',
  },
  iconContainer: {
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  activityDescription: {
    fontSize: 14,
    color: '#666',
  },
  nextLessonContainer: {
    padding: 16,
    borderRadius: 8,
    borderWidth: 1, // Contorno negro
    borderColor: 'black', // Contorno negro
  },
  nextLessonTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  nextLessonText: {
    fontSize: 16,
  },
});