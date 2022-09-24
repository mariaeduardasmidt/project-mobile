import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, SafeAreaView, ScrollView, View, Text } from "react-native";
import { Provider as PaperProvider, Button } from "react-native-paper";

import KittenCard from "./components/KittenCard";
import ListaCompras from "./components/ListaCompras";

function Contador() {
  const [count, setCount] = useState(0);

  return(
    <View style={styles.contador}>
      <Text style={styles.contadorLabel}>Você clicou {count}</Text>
        <View style={{ padding: 21 }}>
          <Button mode="contained" onPress={() => setCount(count + 1)}>
            Clique aqui
          </Button>
        </View>
    </View>
  )
}

export default function App() {
  return (
    <PaperProvider>
      <StatusBar style="auto" translucent={false} />
        <SafeAreaView style={{ flex: 1 }}>
          <ScrollView>
            <Contador />
            <ListaCompras />
            <KittenCard
              style={{ marginBottom: 22 }}
              image="https://placekitten.com/390/242"
              title="Teste do primeiro gatinho"
              buttonPress={() => {
                alert("Clicou no primeiro botão");
              }}
            >
              <Text>
                Texto de apoio falando sobre o gatinho bonito
              </Text>
            </KittenCard>
            <KittenCard
              style={{ marginBottom: 22 }}
              image="https://placekitten.com/390/246"
              title="Teste do outro gatinho"
              buttonPress={() => {
                alert("Clicou no gatinho");
              }}
            />
            <KittenCard
              style={{ marginBottom: 22 }}
              image="https://placekitten.com/390/244"
              title="Teste do terceiro"
              text="Texto de apoio falando sobre o gatinho bonito"
              buttonPress={() => {
                alert("Clicou no último");
              }}
            />
          </ScrollView>
        </SafeAreaView>
      </PaperProvider>
    );
  }

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  contador: {
    padding: 16,
    marginBottom: 21
  },
  contadorLabel: {
    fontSize: 18,
    textAlign: "center"
  }
});