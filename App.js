import { Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../app-mobile/screens/HomeScreen";
import DetalhesScreen from "./screens/DetalhesScreen";
import ContatoScreen from "./screens/ContatoScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: "Bem-vindo!" }} />
          <Stack.Screen name="Detalhes" component={DetalhesScreen} />
          <Stack.Screen name="Contato" component={ContatoScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}