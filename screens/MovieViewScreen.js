import { useState, useEffect } from "react";
import { StyleSheet, ScrollView, View, Image, Text } from "react-native";
import { ActivityIndicator } from "react-native-paper";

export default function MovieViewScreen({ route, navigation }) {
  const [loading, setLoading] = useState(true);
  const [filme, setFilme] = useState(null);

  const { imdbID } = route.params;
  const temPoster = !!filme?.Poster && filme?.Poster !== "N/A";

  async function carregaFilme() {
    setLoading(true);

    try {
      const response = await fetch("https://www.omdbapi.com/?i=" + imdbID + "&apikey=1cd66749");

      const filme = await response.json();
      setFilme(filme);

      navigation.setOptions({ title: filme?.Title });
      setLoading(false);

    } catch (err) {
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