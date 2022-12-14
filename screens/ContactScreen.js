import { View, Text } from "react-native";
import { Button } from "react-native-paper";

export default function ContactScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 21, marginBottom: 9 }}> Ligue já! </Text>
      <Button 
        mode="contained" 
        style={{ marginBottom: 9 }} 
        onPress={() => navigation.goBack()}
      >
        Voltar
      </Button>
      <Button 
        mode="contained"
        style={{ marginBottom: 9 }}
        onPress={() => navigation.navigate('Home')}
      >
        Voltar Home
      </Button>
      <Button 
        mode="contained"
        style={{ marginBottom: 9 }} 
        onPress={() => navigation.navigate('AsyncTab')}
      >
        Ir para Async
      </Button>
    </View>
  );
}