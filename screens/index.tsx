import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, Alert } from "react-native";
import { Book } from "../components";
import { styles } from './styles';

export function Home() {
  const [books, setBooks] = useState<string[]>([])
  const [bookName, setBookName] = useState('')

    function handleBookAdd() {
      if (books.includes(bookName)) {
        return Alert.alert('Registro já existe',
          'Já existe um livro com esse nome na lista!')
      }
        setBooks(preveState => [...preveState, bookName])
        setBookName('')
    }

    function handleBookRemove(name: string) {
      Alert.alert('Remover',
        `Deseja remover o livro "${name}"?`, [
      {
        text: 'Não',
        style: 'cancel'
      },
      {
        text: 'Sim', onPress: () => setBooks(prevState =>
          prevState.filter(
            book => book !== name
          )
        )
      }
        ])
      }

    return (
      <View style={styles.container}>
        <Text style={styles.listTitle}>
          Lista de desejos
        </Text>
        <Text style={styles.listSubtitle}>
          Adicione livros desejados.
        </Text>
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder='Nome do livro'
              placeholderTextColor='#fff'
              onChangeText={setBookName}
              value={bookName}
            />
            <TouchableOpacity style={styles.button} onPress={handleBookAdd}>
              <Text style={styles.buttonText}>
                +
              </Text>
            </TouchableOpacity>
          </View>

        <FlatList
          data={books}
          keyExtractor={item => item}
          renderItem={({ item }) => (
            <Book
              key={item}
              name={item}
              onRemove={() => handleBookRemove(item)}
            />
          )}
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={() => (
            <Text style={styles.listEmptyText}>
              Lista de desejos vazia, adicione livros à lista.
            </Text>
          )}
        />
      </View>
    )
  }