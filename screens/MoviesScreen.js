import { useState, useEffect } from "react";
import { StyleSheet, TouchableHighlight, PixelRatio, FlatList, Image, View, Text } from "react-native";
import { Searchbar, ActivityIndicator } from "react-native-paper";

function FilmeItem({ item, onPress }) {
  // uma pequena checagem, nesta API se o filme tem um poster
  // a variável .Poster além de preenchida tem que ser diferente
  // do valor "N/A". Caso não tenha poster estou exibindo uma
  // <View /> fake no local com fundo cinza
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

// lista vazia exibimos isso
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
    // pequena verificação para verificar se o usuário inputou algo na busca
    if (!busca || busca.trim() === "") {
      // se o usuário não informou nada no campo de busca podemos
      // emitir um alert('xxx') com alguma mensagem ou simplesmente
      // executar nada, como estou fazendo aqui
      return;
    }

    // antes de iniciarmos a comunicação com o servidor iremos marcar como "carregando"
    setLoading(true);

    try {
      // a função `fetch` e a responsável por estabelecermos uma conexão com o servidor
      // ao final de seu retorno recebemos na variável `response` detalhes sobre o download
      // nesta resposta da requisição podemos convertar para um formato compreensível para o JS
      // usando a outra função .json()
      const response = await fetch("https://www.omdbapi.com/?s=" + busca + "&apikey=1cd66749");
      const dados = await response.json(); // traduzindo para o formato JSON

      // uma vez que a requisição/resposta já foi tratada e agora está no formato JSON
      // cabe a nós sabermos quais tipos de dado a API entrega, neste caso aqui entrega
      // uma chave chamada `.Search` contendo a lista de filme encontrados.
      // Jogamos essa lista para dentro da variavel-state lista afim de atualizar a tela
      setLista(dados.Search);

      // se chegarmos até aqui teremos os dados recebidos em `dados` e podemos "esconder"
      // o indicador de "carregando" de tela, basta setar como false:
      setLoading(false);
    } catch (err) {
      // se chegar aqui é porque deu erro, e também temos que "tirar" o carregando
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
    height: 1 / PixelRatio.get(), // altura automática do separador
  },
  rowSeparatorHide: {
    opacity: 0.0,
  },
});