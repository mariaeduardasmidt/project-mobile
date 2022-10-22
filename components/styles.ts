import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#8b2f13',
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },
  name: {
    flex: 1,
    color:'#fff',
    fontSize: 16,
    marginLeft: 16
  },
  buttonText: {
    color: '#fff',
    fontSize: 24,
  },
  button: {
    width: 56,
    height: 56,
    borderRadius: 5,
    backgroundColor: '#8b2f13',
    alignItems: 'center',
    justifyContent: 'center'
  },
})