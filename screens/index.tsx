import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, Alert } from "react-native";
import { Movie } from "../components";
import { styles } from './styles';

export function Home() {
  const [movies, setMovies] = useState<string[]>([])
  const [movieName, setMovieName] = useState('')

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
    )
  }