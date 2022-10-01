import { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Button } from "react-native-paper";

export default function CardPessoa() {
  const [pessoa, setPessoa] = useState({
    nome: "Maria Eduarda",
    sobrenome: "Smidt",
    idade: 20,
    email: "m.eduardasmidt@gmail.com",
    cpf: null,
  });

  console.log("pessoa =>", pessoa);

  return (
    <View style={styles.cardPessoa}>
      <Text style={styles.pessoaLabel}>
        Nome: {pessoa.nome} {pessoa.sobrenome}
      </Text>
      <Text style={styles.pessoaLabel}>
        E-mail: {pessoa.email}
      </Text>
      <Text style={styles.pessoaLabel}>
        Idade: {pessoa.idade}
      </Text>
      <View style={{ padding: 21 }}>
        <Button
          mode="contained"
          onPress={() => {
            setPessoa({ ...pessoa, nome: "Rafael" });
          }}
          style={{ marginBottom: 9 }}
        >
          Mudar nome para Rafael
        </Button>
        <Button
          mode="contained"
          onPress={() => {
            setPessoa({ ...pessoa, idade: 23 });
          }}
          style={{ marginBottom: 9 }}
        >
          Mudar idade para 23
        </Button>
        <Button
          mode="contained"
          onPress={() => {
            setPessoa({ ...pessoa, cpf: "00.00.00" });
          }}
        >
          Adicionar CPF
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardPessoa: {
    padding: 16,
    borderWidth: 2,
    borderColor: "blue",
    marginBottom: 21,
  },
  pessoaLabel: {
    fontSize: 21,
    fontWeight: "bold",
    marginBottom: 4,
  },
});