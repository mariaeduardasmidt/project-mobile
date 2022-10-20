import { StatusBar } from "expo-status-bar";
import { Provider as PaperProvider, IconButton } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import AsyncHomeScreen from "./screens/AsyncHomeScreen";
import SqlHomeScreen from "./screens/SqlHomeScreen";
import SqlAddScreen from "./screens/SqlAddScreen";

import HomeScreen from "./screens/HomeScreen";
import DetalhesScreen from "./screens/DetalhesScreen";
import ContatoScreen from "./screens/ContatoScreen";
import MoviesScreen from "./screens/MoviesScreen";
import MovieViewScreen from "./screens/MovieViewScreen";

/* Neste arquivo há a configuração central do App, junto do sistema de navegação que coordenará 
 * o fluxo entre telas. Estou utilizando o componente StackNavigator para armazenar e indicar cada
 * aba do App no createBottomTabNavigator. */

const StackAsync = createNativeStackNavigator();

/** Aqui possuímos a primeira Stack, responsável pela primeira aba do App. Nela aninham-se todas as
 *  telas que estão ao redor do fluxo de telas.
 **/

function AsyncNavigator() {
  return (
    <StackAsync.Navigator initialRouteName="AsyncHome">
      <StackAsync.Screen
        name="AsyncHome"
        component={AsyncHomeScreen}
        options={{
          title: "Ex Async Storage",
        }}
      />
    </StackAsync.Navigator>
  );
}

const StackSql = createNativeStackNavigator();

/* Aqui há a Stack da segunda aba do App, mesmo funcionamento da primeira, permitindo a
 * navegação entre todas as Stacks/abas possíveis. */

function SqlNavigator() {
  return (
    <StackSql.Navigator initialRouteName="SqlHome">
      <StackSql.Screen
        name="SqlHome"
        component={SqlHomeScreen}
        options={({ navigation }) => ({
          title: "Ex expo-sqlite",
          headerRight: () => (
            <IconButton
              style={{ marginTop: 0, marginRight: -12 }}
              icon="plus-box"
              onPress={() => navigation.navigate("SqlAdd")}
              size={28}
              color="#333"
            />
          ),
        })}
      />
      <StackSql.Screen
        name="SqlAdd"
        component={SqlAddScreen}
        options={{
          title: "Adicionando Item",
        }}
      />
    </StackSql.Navigator>
  );
}

const StackMovies = createNativeStackNavigator();

function MoviesNavigator() {
  return (
    <StackMovies.Navigator initialRouteName="Movies">
      <StackMovies.Screen
        name="Movies"
        component={MoviesScreen}
        options={({ navigation }) => ({
          title: "Ex fetch",
        })}
      />
      <StackMovies.Screen
        name="MovieView"
        component={MovieViewScreen}
        options={{
          title: "Carregando...",
        }}
      />
    </StackMovies.Navigator>
  );
}

const Tab = createBottomTabNavigator();

/* Essa função serve para customizar o navegador principal que é do tipo "BottomTab". Esse navegador 
 *  do tipo 'tabs' = abas recebe parâmetros customizáveis, como ícone, por exemplo. Assim, é possível 
 *  setar e diferenciar ícones à aba que está aberta no momento, igualmente à cores, indicando em qual 
 *  tela o usuário está focado no momento. */

function tabScreenOptions({ route }) {
  return {
    headerShown: false,
    tabBarIcon: ({ focused, color, size }) => {
      let iconName;

      if (route.name === "AsyncTab") {
        iconName = focused ? "database-arrow-down" : "database-arrow-down-outline";
      }
      else if (route.name === "SqlTab") {
        iconName = focused ? "database-plus" : "database-plus-outline";
      }
      else if (route.name === "MoviesTab") {
        iconName = focused ? "movie-settings" : "movie-settings-outline";
      }
      else if (route.name === "Contato") {
        iconName = focused ? "database-plus" : "database-plus-outline";
      }
      else if (route.name === "Home") {
        iconName = focused ? "database-plus" : "database-plus-outline";
      }
      else if (route.name === "Detalhes") {
        iconName = focused ? "database-plus" : "database-plus-outline";
      }

      return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
    },
  };
}

/* A função 'App' é a principal em um aplicativo desenvolvido em Expo. Ela é a primeira
 * função a ser executada no momento que o aplicativo é aberto. Dessa forma, por ser a
 * função principal e primeira a ser executada, informarmos configurações iniciais de
 * navegadores, temas visuais e componentes complexos, como o 'react-native-paper', nessa tela.
 * 
 * A utilização do 'BottomTab Navigator' como navegador padrão, nos permite configurar
 * abaixo para que cada 'Tab.Screen' represente as abas do navegador principal do App. */

export default function App() {
  return (
    <PaperProvider>
        <NavigationContainer>
          <Tab.Navigator screenOptions={tabScreenOptions}>
            <Tab.Screen name="SqlTab" component={SqlNavigator} options={{ tabBarLabel: "SQLite" }} />
            <Tab.Screen name="MoviesTab" component={MoviesNavigator} options={{ tabBarLabel: "Movies" }} />
            <Tab.Screen name="AsyncTab" component={AsyncNavigator} options={{ tabBarLabel: "Async" }} />
            <Tab.Screen name="Contato" component={ContatoScreen} options={{ tabBarLabel: "Contato" }} />
            <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarLabel: "Home" }} />
          </Tab.Navigator>
        </NavigationContainer>
        <StatusBar style="auto" />
    </PaperProvider>
  );
}