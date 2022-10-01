import { View, Text } from "react-native";
import { Button } from "react-native-paper";

export default function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 21, marginBottom: 16 }}>Tela Inicial</Text>
        <Button mode="contained" onPress={() => navigation.navigate('Detalhes')}>
          Ir para Detalhes
        </Button>
    </View>
  );
}