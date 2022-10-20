import { useState, useEffect } from "react";
import { StyleSheet, Keyboard, View, Text } from "react-native";
import { TextInput, Button } from "react-native-paper";

/* Com a necessidade de utilizarmos o AsyncStorage para armazenar dados simples, não podemos esquecer de
 * instalá-lo e importá-lo nas telas necessárias. */
import AsyncStorage from "@react-native-async-storage/async-storage";

/* A biblioteca 'Formik' visa organizar o conjunto de campos do formulário da melhor maneira possível,
 * e, principalmente, criar validações consistentes de formulários. */
import { Formik } from "formik";

/* 'Yup' é uma biblioteca que trabalha junto com a 'Formik' para criar 'esquemas de validação'. Normalmente
 * possui um conjunto de regras que nos dizem o que é um 'objeto válido'.*/
 import * as Yup from "yup";

/* Este é um componente que serve para controlar quando o teclado do dispositivo deve ou não estar exposto
 * em tela. */

import KeyboardAvoidingView from "../components/KeyboardAvoidingView";

  /* Abaixo temos duas funções não-componentes criadas exclusivamente para lidar com dados. Como elas
   * são funções lógicas e que não produzem componentes visuais (ex: retornar uma <View /> ou <Text />)
   * elas podem ser isoladas e definidas fora da função principal da tela de 'AsyncHomeScreen'.

   * A primeira função, 'salvarUsuario', recebe um objeto bruto que pode conter quantos campos tiver em nosso esquema 
   * de 'O que faz parte de um usuário?'. Neste exemplo um usuário possui apenas 'nome' e 'email', como propriedades
   * internas. 

   * Como já dito em sala de aula a biblioteca AsyncStorage só consegue armazenar dados simples, do tipo string.
   * Logo sempre que formos lidar como um objeto JavaScript complexo, ou uma matriz/array (lista de itens) que precisam
   * ser salvos no AsyncStorage, é recomendado converter os mesmos para um formato serializado, do tipo 'String',
   * algo fácil de virar string e também fácil de revertermos seu formato complexo no momento de seu resgate.

   * Em sala de aula foi recomendado utilizar o método nativo do JavaScript 'JSON.stringify' para converter qualquer tipo
   * de dado em String, e no resgate, usar o método 'JSON.parse', para voltar ser um objeto rico e complexo em nível de
   * compreensão do interpretador do JS.

   * Por fim, a função 'salvarUsuario' recebe um parâmetro contendo o pacote de dados do usuário que desejamos salvar
   * na memória do AsyncStorage. */

const salvarUsuario = async usuarioData => {
  try {

    /* Aqui convertermos nossos dados para um formato primitivo do tipo 'String'. */

    const jsonValue = JSON.stringify(usuarioData);

    /* Em 'setItem' é preciso definir uma chave e um valor, essa relação nos dará a possibilidade de resgatar o mesmo
     * valor armazenado após salvo, desde que utilizemos a função 'getItem' e a mesma chave para resgate. */

    await AsyncStorage.setItem("@usuario", jsonValue);

    /* Acima utilizamos o termo técnico 'await', como um indicativo de que algumas funções não tem conclusão
     * instantanea (podem demorar em sua execução), logo, inserindo o `await` (quando sabermos que podemos),
     * indicamos ao interpretador do JS que ele deve dar uma 'pequena pausa', até ter certeza de que o item foi salvo 
     * na memória do disposito. Caso tenhamos algum problema registrado neste processo, receberemos um retorno do tipo
     * 'Exception'. */

    return true;
  } catch (err) {

    /* Caso ocorra algum problema no dispositivo ou com o App no momento de salvar o 'setItem', receberemos
     * uma variável 'err' para descobrir o que houve. */
  }

  return false;
};

  /* Essa segunda função é utilizada para resgatar um possível usuário salvo anteriormente. A função 'getItem' da 
   * AsyncStorage também precisa de um 'await', pois não sabemos quanto tempo o dispositivo irá levar para nos devolver
   * os dados salvos no disco. Se possuirmos, anteriormente, algma informação com a chave "@usuario" salva, podemos partir
   * para o seu tratamento. */

const getUsuario = async () => {
  try {

    /* O uso de 'await' garante que a variável 'jsonValue' só será preenchida após o tempo necessário para resgatar essa
     * infomação do disco do dispositivo. */

    const jsonValue = await AsyncStorage.getItem("@usuario");
    if (jsonValue !== null) {

      /* Se o 'jsonValue' recuperado for diferente de null, sabemos então que já havia sido salvo anteriormente. Logo,
       * podemos transformá-lo de volta em um objeto complexo, utilizando 'JSON.parse'. */

      const usuarioRecuperado = JSON.parse(jsonValue);

      return usuarioRecuperado;
    }
  } catch (e) {
    /* Leitor de erros. */
  }

  return {
    nome: "",
    email: "",
  };
};

  /* Esse é o schema que irá validar se o 'usuário' é válido. Regras como: 
   * nome e e-mail obrigatórios; 
   * regras de validação de e-mail (possuir @, ., etc). */ 

const UsuarioSchema = Yup.object().shape({
  nome: Yup.string().min(2, "Mínimo de 2 letras").required("Campo nome obrigatório"),
  email: Yup.string().email("E-mail inválido").required("Campo e-mail obrigatório"),
});

  /* Como a tendência é possuirmos muitos campos em um formulário, é valido a criação de um componente
   * reutilizável para cada campo. Isso visa sub-aproveitar mecânicas comuns, como: controle de valores,
   * exibir ou não uma mensagem de erro, etc. */

function MyTextInput({ error = null, ...props }) {
  return (
    <View style={{ paddingBottom: 6 }}>
      <TextInput error={!!error} {...props} />
      {!!error && typeof error === "string" && <Text style={styles.formInputError}>{error}</Text>}
    </View>
  );
}

export default function AsyncHomeScreen({ navigation }) {
  const [usuarioSalvo, setUsuarioSalvo] = useState(null);

  /* Traz o 'usuário' de volta do armazenamento, e envia o mesmo direto para o state 'usuarioSalvo', com
   * a função de escrita 'setUsuarioSalvo'. */

  async function restoreUsuarioSalvo() {
    const restoredUsuario = await getUsuario();
    setUsuarioSalvo(restoredUsuario);
  }

  async function salvaUsuario(formData) {
    /* Ao chamarmos essa função, significa que estamos preparados para salvar os dados inputados na memória.
     * Iremos resgatar o argumento de 'formData', que contém os valores do formulário, e salvá-lo no disco
     * do dispositivo.

    /* O método 'dismiss' do pacote 'Keyboard' serve para esconder o teclado virtual do dispotivo. */

    Keyboard.dismiss();

    /* Chamamos a função utilitária para registrar os dados no disco do dispositivo. */

    const success = await salvarUsuario(formData);

    /* Se nenhum erro ocorrer ao salvarmos, o 'sucess' acima, será 'true'. */

    if (success) {

      /* Atualizamos também a segunda 'variável-estado' utilizada, com o novo valor digitado de 'usuário'. */

      setUsuarioSalvo(formData);
    }
  }

  /* O hook de efeito serve como ação automática mediante a algumas condições. Sempre que algo for atualizado,
   * ou sempre que um componente for 'mostrado em tela', etc. Nesse caso, usando a dependência vazia '[]', estamos
   * solicitando que esse 'efeito' rode apenas 1 vez, quando a tela for aberta. É exatamente o momento mais adequado de
   * restauramos alguma informação ao App. */

  useEffect(() => {
    restoreUsuarioSalvo();
  }, []);

  return (
    <KeyboardAvoidingView>
      <Formik
        initialValues={{
          nome: "",
          email: "",
        }}
        validationSchema={UsuarioSchema}
        onSubmit={async (values, actions) => {
          await salvaUsuario(values);

          /* Irá limpar os campos do formulário, deixando o form pronto para outra interação. */

          actions.resetForm();
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, touched, errors, values }) => {
          return (
            <View style={styles.formContainer}>
              <Text style={styles.title}>Registrando informações</Text>
              <MyTextInput
                autoCorrect={false}
                label="Informe seu nome"
                onChangeText={handleChange("nome")}
                onBlur={handleBlur("nome")}
                value={values.nome}
                error={touched.nome && errors.nome}
              />
              <MyTextInput
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                label="Informe seu e-mail"
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
                error={touched.email && errors.email}
              />
              <Button onPress={handleSubmit} mode="contained" style={{ marginTop: 12 }}>
                Registrar em Async
              </Button>
              <View style={{ backgroundColor: "#fff", marginTop: 32, padding: 12 }}>
                <Text style={{ fontSize: 18 }}>Dados do Formulário: {`\n\n` + JSON.stringify(values, null, 2)}</Text>
              </View>
              <View style={{ backgroundColor: "#fff", marginTop: 32, padding: 12 }}>
                <Text style={{ fontSize: 18 }}>
                  Dados Salvos na Memória: {`\n\n` + JSON.stringify(usuarioSalvo, null, 2)}
                </Text>
              </View>
            </View>
          );
        }}
      </Formik>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer: {
    padding: 21,
  },
  formInputError: {
    fontSize: 13,
    color: "#C00",
    paddingVertical: 5,
    paddingHorizontal: 9,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 6,
    marginBottom: 18,
  },
});