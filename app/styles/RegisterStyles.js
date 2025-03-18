import { StyleSheet } from "react-native";

export default StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#3b82f6', 
  },

  lightContainer: {
    backgroundColor: '#3700B3', // Fondo azul (modo claro)
  },
  darkContainer: {
    backgroundColor: '#1E1E1E', // Fondo oscuro (modo oscuro)
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  whiteBox: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    marginTop: -50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#BB86FC',
    marginLeft: 8,
  },
  form: {
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  icon: {
    position: 'absolute',
    left: 12,
    zIndex: 1,
  },
  input: {
    flex: 1,
    paddingLeft: 48,
    paddingRight: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#BB86FC',
    fontSize: 16,
    color: '#000',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
    backgroundColor: '#BB86FC',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonIcon: {
    marginLeft: 8,
  },
  codeContainer: {
    alignItems: 'center',
  },
  codeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 16,
    color: '#BB86FC',
  },
  codeBox: {
    padding: 24,
    borderRadius: 12,
    marginVertical: 16,
    backgroundColor: '#EDE7F6',
  },
  codeText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#BB86FC',
  },
  codeSubtitle: {
    fontSize: 16,
    marginBottom: 16,
    color: '#666',
  },
  switchContainer: {
    flexDirection: 'row',
    marginTop: 24,
  },
  switchText: {
    fontSize: 16,
    color: '#666',
  },
  switchLink: {
    fontSize: 16,
    color: '#BB86FC',
    fontWeight: 'bold',
    marginLeft: 4,
  },
});
