import { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, Alert, Keyboard } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Formik } from "formik";

import { Movie } from "../components";
import { styles } from './styles';
import * as Yup from "yup";

const saveMovie = async movieData => {
  try {
    const jsonValue = JSON.stringify(movieData);

    await AsyncStorage.setItem("@movie", jsonValue);
    return true;

  } catch (err) {}
  return false;
};

const getMovie = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("@movie");

    if (jsonValue !== null) {
      const movieRecover = JSON.parse(jsonValue);

      return movieRecover;
    }
  } catch (e) {}

  return {
    movie: ""
  };
};

const MovieSchema = Yup.object().shape({
  movie: Yup.string().min(2, "Mínimo de 2 caracteres.").required("Campo 'Filme' obrigatório."),
});

export function Home () {
  const [movies, setMovies] = useState<string[]>([])
  const [movieName, setMovieName] = useState('')
  const [movieSaved, setMovieSaved] = useState(null);

  async function restoreMovieSaved() {
    const restoredMovie = await getMovie();
    setMovieSaved(restoredMovie);
  }

  async function saveMovie(formData) {
    Keyboard.dismiss();
    const success = await saveMovie(formData);
  }

  useEffect(() => {
    restoreMovieSaved();
  }, []);

    function handleMovieAdd() {
      if (movies.includes(movieName)) {
        return Alert.alert('Registro já existe',
          'Já existe um filme com esse nome na lista!')
      }
        setMovies(preveState => [...preveState, movieName])
        setMovieName('')
    }

    function handleMovieRemove(name: string) {
      Alert.alert('Remover',
        `Deseja remover o filme "${name}"?`, [
      {
        text: 'Não',
        style: 'cancel'
      },
      {
        text: 'Sim', onPress: () => setMovies (prevState =>
          prevState.filter(
            movie => movie !== name
          )
        )
      }
        ])
      }

    return (
      <Formik
        initialValues={{
          nome: "",
          email: "",
        }}
        validationSchema={MovieSchema}
        onSubmit={async (values, actions) => {
          await saveMovie(values);
          actions.resetForm();
        }}
      >
        <View style={styles.container}>
          <Text style={styles.listTitle}>
            Watchlist
          </Text>
          <Text style={styles.listSubtitle}>
            Adicione filmes que deseja ver.
          </Text>
            <View style={styles.form}>
              <TextInput
                style={styles.input}
                placeholder='Nome do filme'
                placeholderTextColor='#fff'
                onChangeText={setMovieName}
                value={movieName}
              />
              <TouchableOpacity style={styles.button} onPress={handleMovieAdd}>
                <Text style={styles.buttonText}>
                  +
                </Text>
              </TouchableOpacity>
            </View>

          <FlatList
            data={movies}
            keyExtractor={item => item}
            renderItem={({ item }) => (
              <Movie
                key={item}
                name={item}
                onRemove={() => handleMovieRemove(item)}
              />
            )}
            showsHorizontalScrollIndicator={false}
            ListEmptyComponent={() => (
              <Text style={styles.listEmptyText}>
                Watchlist vazia, adicione filmes desejados.
              </Text>
            )}
          />
      </View>
    </Formik>
  )
}