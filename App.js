import { StatusBar } from "react-native";
import { Provider as PaperProvider, IconButton } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import AsyncHomeScreen from "./screens/AsyncHomeScreen";
import SqlHomeScreen from "./screens/SqlHomeScreen";
import SqlAddScreen from "./screens/SqlAddScreen";

import Reviews from "./screens/Reviews";
import { Home } from "./screens";
import MoviesScreen from "./screens/MoviesScreen";
import MovieViewScreen from "./screens/MovieViewScreen";

const StackAsync = createNativeStackNavigator();

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
              icon="plus-circle"
              onPress={() => navigation.navigate("SqlAdd")}
              size={26}
            />
          ),
        })}
      />
      <StackSql.Screen
        name="SqlAdd"
        component={SqlAddScreen}
        options={{
          title: "Ex sql",
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
        options={{ headerShown: false}} 
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

function tabScreenOptions({ route }) {
  return {
    headerShown: false,
    tabBarIcon: ({ focused, color, size }) => {
      let iconName;

      if (route.name === "Reviews") {
        iconName = focused ? "comment-bookmark" : "comment-bookmark-outline";
        color = "#0a0a0a"; 
      }
      else if (route.name === "Home") {
        iconName = focused ? "star" : "star-outline";
        color = "#0a0a0a"; 
      }
      else if (route.name === "MoviesScreen") {
        iconName = focused ? "movie" : "movie-outline";
        color = "#0a0a0a"; 
      }

      return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
    },
  };
}

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Tab.Navigator screenOptions={tabScreenOptions}>
          <Tab.Screen name ="Home" component={Home} options={{ tabBarShowLabel: false}} />
          <Tab.Screen name="MoviesScreen" component={MoviesNavigator} options={{ tabBarShowLabel: false}} />
          <Tab.Screen name="Reviews" component={Reviews} options={{ tabBarShowLabel: false}} />
        </Tab.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </PaperProvider>
  );
}