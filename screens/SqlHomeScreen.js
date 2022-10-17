import { useEffect, useState } from "react";
import { StyleSheet, Alert, FlatList, PixelRatio, View, Text } from "react-native";
import { List, Button } from "react-native-paper";

import { executeSql } from "../db";

  /* Este componente reaproveitável irá representar e exibir os itens presentes na lista 
   * de compras do App. */

function ProdutoItem({ item, onPress, onLongPress }) {
  const comprado = !!item?.comprado && item.comprado === "S";

  return (
    <List.Item
      title={item.name}
      titleStyle={{ fontWeight: "500", fontStyle: comprado ? "italic" : "normal", color: comprado ? "#666" : "#333" }}
      style={{ padding: 16 }}
      onPress={onPress}
      onLongPress={onLongPress}
      left={props => (
        <View {...props} style={[styles.itemCircular, comprado && { backgroundColor: "#CCC" }]}>
          <Text style={[styles.itemCircularText, comprado && { color: "#696969" }]}>{item.qtd}</Text>
        </View>
      )}
    />
  );
}

/* Onde lidamos com listas vazias. */

function ListEmptyProdutos({ onEmptyPress }) {
  return (
    <View style={{ paddingVertical: 26, paddingHorizontal: 16 }}>
      <Text style={{ fontSize: 15, textAlign: "center", marginTop: 9, marginBottom: 28 }}>
        Nenhum item adicionado em sua lista de compra
      </Text>
      <Button mode="contained" onPress={onEmptyPress}>
        Adicionar item
      </Button>
    </View>
  );
}

export default function SqlHomeScreen({ route, navigation }) {
  const [lista, setLista] = useState([]);

  async function recuperaListaCompras() {
    const rs = await executeSql("SELECT * FROM produtos ORDER BY comprado ASC");
    setLista(rs.rows._array);
  }

  function excluirItem(id) {
    const _runDeleteQuery = async () => {
      await executeSql("DELETE FROM produtos WHERE id = ?", [id]);
      recuperaListaCompras();
    };

    Alert.alert(
      "Remover item da lista",
      `Você confirma a exclusão deste item?`,
      [
        {
          text: "Cancelar",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: _runDeleteQuery },
      ],
      { cancelable: false }
    );
  }

  async function marcarComoNaoComprado(id) {
    await executeSql("UPDATE produtos SET comprado = 'N' WHERE id = ?", [id]);
    recuperaListaCompras();
  }

  async function marcarComoComprado(id) {
    await executeSql("UPDATE produtos SET comprado = 'S' WHERE id = ?", [id]);
    recuperaListaCompras();
  }

  /* O useEffect abaixo realiza a tarefa de monitorar novos itens presentes na lista. No momento
   * em que ele é acionado, a variável 'novoItem' é testada. Caso seu resultado seja 'true', sabemos
   * que a lista deve ser atualizada, puxando assim possíveis novos itens e exibindo-os. */

  useEffect(() => {
  /* Caso identifique/receba um novo item, atualiza a lista de compras. */
  if (!!route.params?.novoItem) {
      recuperaListaCompras();
    }
  }, [route.params?.novoItem]);

  useEffect(() => {
  /* Esse useEffect roda o 'recuperaListaCompras' ao abrirmos a tela pela primeira vez. */
    recuperaListaCompras();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Lista de Compras</Text>
        <Text style={styles.textInfo}>
          Neste exemplo contamos com duas telas, uma será de formulário e nesta aqui listaremos os itens já adicionados
          na lista. Se clicar em um item da lista ele será marcado como comprado.
        </Text>
      </View>
      <FlatList
        data={lista}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={({ highlighted }) => (
          <View style={[styles.rowSeparator, highlighted && styles.rowSeparatorHide]} />
        )}
        ListEmptyComponent={() => <ListEmptyProdutos onEmptyPress={() => navigation.navigate("SqlAdd")} />}
        renderItem={({ item }) => (
          <ProdutoItem
            item={item}
            onPress={() => {
              if (item?.comprado === "N") {
                marcarComoComprado(item.id);
              } else {
                marcarComoNaoComprado(item.id);
              }
            }}
            onLongPress={() => excluirItem(item.id)}
          />
        )}
        style={{ flex: 1 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    backgroundColor: "#fff",
    paddingVertical: 9,
    paddingHorizontal: 16
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 6,
    marginBottom: 12
  },
  textInfo: {
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 4
  },
  itemCircular: {
    backgroundColor: "rgba(231, 224, 236, 1)",
    marginRight: 3,
    paddingVertical: 9,
    paddingHorizontal: 11,
    borderRadius: 11,
    overflow: "hidden"
  },
  itemCircularText: { 
    fontSize: 16, 
    fontWeight: "500", 
    color: "#333"
  },
  rowSeparator: {
    backgroundColor: "#cdcdcd",
    height: 1 / PixelRatio.get()  /* Altura automática do separador. */
  },
  rowSeparatorHide: {
    opacity: 0.0
  },
});