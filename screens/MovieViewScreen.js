import { useState, useEffect } from "react";
import { StyleSheet, ScrollView, View, Image, Text } from "react-native";
import { ActivityIndicator } from "react-native-paper";

export default function MovieViewScreen({ route, navigation }) {
  const [loading, setLoading] = useState(true);
  const [filme, setFilme] = useState(null);

  // sempre que a lista de filme nos manda para cá, recebemos junto um parametro
  // com o id do filme que queremos exibir a "ficha completa"
  const { imdbID } = route.params;

  // após o filme estar "preenchido" com os dados que puxamos da API online
  // podemos testar se é um filme com poster
  const temPoster = !!filme?.Poster && filme?.Poster !== "N/A";

  async function carregaFilme() {
    // antes de iniciarmos a comunicação com o servidor iremos marcar como "carregando"
    setLoading(true);

    try {
      // a função `fetch` e a responsável por estabelecermos uma conexão com o servidor
      // ao final de seu retorno recebemos na variável `response` detalhes sobre o download
      // nesta resposta da requisição podemos convertar para um formato compreensível para o JS
      // usando a outra função .json()
      const response = await fetch("https://www.omdbapi.com/?i=" + imdbID + "&apikey=1cd66749");
      const filme = await response.json(); // traduzindo para o formato JSON

      setFilme(filme);

      // setando o título da janela para o nome do filme que acabou de ser carregado...
      navigation.setOptions({ title: filme?.Title });

      // se chegarmos até aqui teremos os dados recebidos em `dados` e podemos "esconder"
      // o indicador de "carregando" de tela, basta setar como false:
      setLoading(false);
    } catch (err) {
      // se chegar aqui é porque deu erro, e também temos que "tirar" o carregando
      setLoading(false);
    }
  }

  useEffect(() => {
    carregaFilme();
  }, []);

  return (
    <View style={styles.container}>
      {!!loading ? (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <ActivityIndicator animating={true} size="large" />
        </View>
      ) : (
        <ScrollView style={{ flex: 1, paddingVertical: 12, paddingHorizontal: 16 }}>
          <Text style={styles.title}>{filme.Title}</Text>
          <Text style={styles.year}>{filme.Year}</Text>
          {temPoster && (
            <View style={{ marginBottom: 18, alignItems: "center", justifyContent: "center" }}>
              <Image
                resizeMode="cover"
                source={{ uri: filme.Poster }}
                style={{ borderWidth: 1, borderColor: "#666", width: 120 * 1.75, height: 172 * 1.75 }}
              />
            </View>
          )}
          <View style={{ marginVertical: 6 }}>
            <Text style={styles.textBase}>
              <Text style={styles.textLabel}>Lançamento:</Text> {filme.Released}
            </Text>
            <Text style={styles.textBase}>
              <Text style={styles.textLabel}>Gênero:</Text> {filme.Genre}
            </Text>
            <Text style={styles.textBase}>
              <Text style={styles.textLabel}>Diretor:</Text> {filme.Director}
            </Text>
            <Text style={styles.textBase}>
              <Text style={styles.textLabel}>Idioma:</Text> {filme.Language}
            </Text>
          </View>
        </ScrollView>
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
    marginTop: 6,
  },
  year: { fontSize: 16, marginTop: 6, marginBottom: 18 },
  textBase: {
    fontSize: 16,
    lineHeight: 21,
    marginBottom: 7,
  },
  textLabel: {
    fontWeight: "bold",
  },
});