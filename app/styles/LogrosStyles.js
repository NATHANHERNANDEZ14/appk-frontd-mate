import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
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
  trophyContainer: {
    backgroundColor: '#FFECB3', // Fondo amarillo pastel
    padding: 12,
    borderRadius: 24,
  },
  achievementsContainer: {
    marginBottom: 24,
  },
  achievementCard: {
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1, // Contorno negro
    borderColor: 'black', // Contorno negro
  },
  lightCard: {
    backgroundColor: 'white',
  },
  darkCard: {
    backgroundColor: '#333333',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  textContainer: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  achievementDescription: {
    fontSize: 14,
    color: '#666',
  },
  iconContainer: {
    marginLeft: 16,
  },
  progressContainer: {
    marginTop: 12,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  lightProgressBar: {
    backgroundColor: '#E0E0E0',
  },
  darkProgressBar: {
    backgroundColor: '#424242',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  lightProgressFill: {
    backgroundColor: '#2196F3', // Azul claro
  },
  darkProgressFill: {
    backgroundColor: '#64B5F6', // Azul oscuro
  },
  progressText: {
    fontSize: 12,
    marginTop: 4,
  },
});