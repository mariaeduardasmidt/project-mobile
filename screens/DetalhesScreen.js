import { View, Text } from "react-native";
import { Button } from "react-native-paper";

import ContatoScreen from "./ContatoScreen";

export default function DetalhesScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 21, marginBottom: 16 }}>
        Outra tela, agora detalhes.
      </Text>
        <Button mode="contained" style={{ marginBottom: 9 }} onPress={() => navigation.navigate('Contato')}>
            Entrar em contato
        </Button>
        <Button mode="contained" onPress={() => navigation.goBack()}>
            Voltar
        </Button>
    </View>
  );
}