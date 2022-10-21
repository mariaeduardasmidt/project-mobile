import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 24
  },
  listTitle: {
    color: '#1F1E25',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 48
  },
  listSubtitle: {
    color: '#6B6B6B',
    fontSize: 16
  },
  input: {
    flex: 1,
    backgroundColor: '#3e1f47',
    color: '#fff',
    height: 56,
    borderRadius: 5,
    padding: 16,
    fontSize: 16,
    marginRight: 10
  },
  buttonText: {
    color: '#fff',
    fontSize: 24
  },
  button: {
    width: 56,
    height: 56,
    borderRadius: 5,
    backgroundColor: '#3e1f47',
    alignItems: 'center',
    justifyContent: 'center'
  },
  form: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 36,
    marginBottom: 42
  },
  listEmptyText: {
    color: '#1F1E25',
    textAlign: 'center',
    fontSize: 12
  }
})