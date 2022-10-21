import { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Button } from "react-native-paper";

export default function ShopList() {
  const [lista, setLista] = useState([]);

  console.log(`debug`, lista);

  return (
    <View style={styles.shopList}>
      {lista.map(item => {
        return (
          <Text key={item} style={{ fontSize: 16, padding: 4 }}>
            {item}
          </Text>
        );
      })}
      <View style={{ padding: 21 }}>
        <Button
          mode="contained"
          onPress={() => {
            setLista([...lista, "Queijo"]);
          }}
        >
          Adicionar Queijo
        </Button>
        <Button
          mode="contained"
          onPress={() => {
            setLista([...lista, "Leite"]);
          }}
        >
          Adicionar Leite
        </Button>
        <Button
          mode="contained"
          onPress={() => {
            setLista([...lista, "Pão"]);
          }}
        >
          Adicionar Pão
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  shopList: {
    padding: 16,
    borderWidth: 2,
    borderColor: "green",
    marginBottom: 21,
  },
});