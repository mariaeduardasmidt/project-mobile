import { useState, useEffect } from "react";
import { StyleSheet, TouchableHighlight, PixelRatio, FlatList, Image, View, Text } from "react-native";
import { Searchbar, ActivityIndicator } from "react-native-paper";

function FilmeItem({ item, onPress }) {

  /* Teremos uma checagem na API de filmes. Nela, se o filme possui um poster registrado, a variável
   * '.Poster' é preenchida e diferente do valor 'N/A'. Caso o filme não possua poster, exibimos uma
   * <View /> vazia, para preenchimento do espaço do poster. */

  const temPoster = !!item.Poster && item.Poster !== "N/A";

  return (
    <TouchableHighlight underlayColor="#dfdfdf" onPress={onPress}>
      <View style={styles.filmeItem}>
        {temPoster ? (
          <Image resizeMode="cover" source={{ uri: item.Poster }} style={{ width: 120, height: 172 }} />
        ) : (
          <View style={{ backgroundColor: "#D0D0D0", width: 120, height: 172 }} />
        )}
        <View style={{ flex: 1, marginLeft: 12, paddingVertical: 12 }}>
          <Text numberOfLines={2} style={{ width: "100%", fontSize: 21, fontWeight: "bold", marginBottom: 4 }}>
            {item.Title}
          </Text>
          <Text style={{ fontSize: 16 }}>{item.Year}</Text>
        </View>
      </View>
    </TouchableHighlight>
  );
}

function ListEmptyFilmes({ onEmptyPress }) {
  return (
    <View style={{ paddingVertical: 26, paddingHorizontal: 16 }}>
      <Text style={{ fontSize: 14, lineHeight: 18, textAlign: "center", marginTop: 9, marginBottom: 28 }}>
        <Text style={{ fontSize: 15, fontWeight: "bold" }}>Nenhum filme encontrado</Text>
        {`\n`}
        Por favor revise seus termos de busca ou cheque sua conexão
      </Text>
    </View>
  );
}

export default function MoviesScreen({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [lista, setLista] = useState([]);
  const [busca, setBusca] = useState("spider man");

  async function carregaListaFilmes() {

    if (!busca || busca.trim() === "") {
      return;
    }

    setLoading(true);

    try {

      /* A função 'fetch' é responsável por estabelecermos uma conexão com o servidor. Ao final de seu retorno 
       * recebemos na variável 'response' os detalhes sobre o download. Nesta resposta, podemos convertê-la
       * para um formato compreensível para o JS, utilizando outra função '.json()'. */

      const response = await fetch("https://www.omdbapi.com/?s=" + busca + "&apikey=1cd66749");

      /* Traduz para o 'JSON'. */

      const dados = await response.json();

      /* Uma vez que a requisição/resposta já foi tratada e agora está no formato JSON, cabe a nós sabermos quais
       * tipos de dado a API entrega. Neste caso aqui, recebemos uma chave chamada '.Search', que contém a lista de
       * filmes encontrados. */

      setLista(dados.Search);
      setLoading(false);

    } catch (err) {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregaListaFilmes();
  }, []);

  return (
    <View style={styles.container}>
      <View style={{ paddingHorizontal: 16, paddingBottom: 12 }}>
        <Text style={styles.title}>Lista de Movies</Text>
        <Text style={{ fontSize: 13, lineHeight: 18, marginBottom: 18 }}>
          Neste exemplo estamos usando uma API online de filmes com acesso gratuito (omdbapi) a ideia aqui é buscar por
          filmes através de seu título.
        </Text>
        <Searchbar
          autoCorrect={false}
          placeholder="Encontre um Filme"
          onChangeText={text => setBusca(text)}
          onIconPress={() => carregaListaFilmes()}
          onSubmitEditing={() => carregaListaFilmes()}
          value={busca}
        />
      </View>
      {!!loading ? (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <ActivityIndicator animating={true} size="large" />
        </View>
      ) : (
        <FlatList
          data={lista}
          keyExtractor={item => item.imdbID}
          ListEmptyComponent={ListEmptyFilmes}
          ItemSeparatorComponent={({ highlighted }) => (
            <View style={[styles.rowSeparator, highlighted && styles.rowSeparatorHide]} />
          )}
          renderItem={({ item }) => (
            <FilmeItem item={item} onPress={() => navigation.navigate("MovieView", { imdbID: item.imdbID })} />
          )}
          style={{ flex: 1 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 17,
    marginBottom: 16,
  },
  filmeItem: {
    flexDirection: "row",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  rowSeparator: {
    backgroundColor: "#cdcdcd",
    height: 1 / PixelRatio.get(), /* Altura automática do separador. */
  },
  rowSeparatorHide: {
    opacity: 0.0,
  },
});