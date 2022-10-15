import { useState, useEffect } from "react";
import { StyleSheet, Keyboard, View, Text } from "react-native";
import { TextInput, Button } from "react-native-paper";

// na necessidade de usarmos o AsyncStorage para armazenar dados simples
// não podemos esquecer de instala-lo e importa-lo nas telas necessárias
import AsyncStorage from "@react-native-async-storage/async-storage";

// não tive tempo de detalhar em sala de aula mas a biblioteca `Formik`
// serve para organizar melhor o conjunto de campos do formulário e
// principalmente criar validações consistentes de formulários
import { Formik } from "formik";

// Yup é uma biblioteca que trabalha junto com a `Formik` para criar
// o que chamos de "esquema de validação" normalmente é um conjunto
// de regras que juntas nos dizem o que é um "objeto" válido
import * as Yup from "yup";

// esse é um componente "nosso" serve para controlar melhor quando
// o teclado do dispositivo deve ou não estar exposto em tela
// dentro do arquivo desse componente aí têm mais explicações
import KeyboardAvoidingView from "../components/KeyboardAvoidingView";

/**
 * Abaixo temos duas funções não-componentes criadas exclusivamente
 * para lidar com dados. Como elas são funções lógicas e que não
 * produzem componentes visuais (ex: retornar uma <View /> ou <Text />)
 * elas podem ser isoladas e definidas fora da função principal de nossa
 * tela `AsyncHomeScreen`.
 *
 * A primeira função `salvarUsuario` recebe um objeto bruto que pode conter
 * quantos campos tiver em nosso esquema de "o que faz parte de um usuário?",
 * neste exemplo de tela um usuário possui apenas `nome` e `email` como propriedades
 * internas. Como já dito em sala de aula a biblioteca AsyncStorage só consegue
 * armazenar dados simples, do tipo string. Logo sempre que formos lidar como um
 * objeto javascript complexo, ou uma matriz/array (lista de itens) que precisem
 * ser salvos no AsyncStorage, recomendo converter os mesmos para um formato serializado
 * do tipo "string" algo fácil de virar string e também fácil de fazermos a operação
 * reversa de transforma-lo de volta em seu formato complexo no momento de seu resgate.
 *
 * Em sala de aula eu recomendei usar o método nativo do javascript `JSON.stringify` para
 * converter qualquer tipo de dado em string e no resgate usar o método `JSON.parse` para
 * voltar ser um objeto rico e complexo em nível de compreensão do interpretador do JS.
 *
 * Por fim a função `salvarUsuario` recebe um parametro contendo o pacote de dados do usuário
 * que desejamos salvar na memória do AsyncStorage.
 **/
const salvarUsuario = async usuarioData => {
  try {
    // convertendo nossos dados para um formato primitivo do tipo string
    const jsonValue = JSON.stringify(usuarioData);
    // aqui na função `setItem` do AsyncStorage precisamo definir uma chave
    // e um valor, essa relação nos dará a possibilidade de resgatar o mesmo
    // valor armazenado após salvo desde que usamos a função `getItem` e a
    // mesma chave para resgate.
    await AsyncStorage.setItem("@usuario", jsonValue);
    // no método acima usamos o termo técnico `await` como um indicativo de
    // que algumas funções não tem conclusão instantanea (podem demorar em sua
    // execução, logo inserindo o `await` (quando sabermos que podemos) indicamos
    // ao interpretador do JS que ele deve dar uma "pequena" pausa até ter certeza
    // que o item foi salvo na memória do disposito. Caso tenhamos algum problema
    // registrado neste "salvamento" recebermos um retorno do tipo `Exception`
    return true;
  } catch (err) {
    // nesse trecho específico de nosso código receberemos um possível erro de salvamento
    // caso de algum problema no celular do usuário (ou com nosso código) na hora de salvar
    // o setItem, poderemos aqui analisar a variável `err` e descobrir o que houve
  }

  return false;
};

/**
 * Essa segunda função é usada para resgatar um possível usuário salvo anteriormente
 * a função getItem da AsyncStorage também precisa de `await` pois não sabemos quanto tempo
 * o celular vai levar para nos devolver os dados salvos em seu disco (tem aparelho que é lento).
 * Se anteriormente algo já tiver sido salvo com a chave "@usuario" podemos partir para o tratamento do mesmo.
 **/
const getUsuario = async () => {
  try {
    // o uso de `await` garante que a variável `jsonValue` só será preenchida após o tempo
    // certo e necessário para resgatar isso do "disco" do celular
    // caso já haviamos salvo algo antes com a chave `@usuario` (nosso exemplo aqui) o valor dela
    // será diferente de null, caso não tenhamos usado nada ainda, será `null` mesmo, por isso o
    // IF mais abaixo checando se já teve algo antes na memória
    const jsonValue = await AsyncStorage.getItem("@usuario");
    if (jsonValue !== null) {
      // se o jsonValue recuperado for diferente de null, quer dizer que já havia sido salvo anteriormente.
      // logo podemos transformar de volta em um objeto complexo com `JSON.parse`
      const usuarioRecuperado = JSON.parse(jsonValue);

      // e aqui retoramos para quem pediu, os dados que foram resgatados
      return usuarioRecuperado;
    }
  } catch (e) {
    // error reading value
  }

  // caso essa função `getItem` chegue até essa linha é porque nada acima foi
  // encontrado para retornar, ai por padrão resolvi retornar um "modelo" de
  // usuário vazio ao invés de null
  return {
    nome: "",
    email: "",
  };
};

// esse é o schema de validação que iremos usar para dizer que é ou não
// um `usuario` válido para poder ser salvo. Regras como nome e e-mail
// obrigatórios e também validar um e-mail válido com @ . e etc
const UsuarioSchema = Yup.object().shape({
  nome: Yup.string().min(2, "Mínimo de 2 letras").required("Campo nome obrigatório"),
  email: Yup.string().email("E-mail inválido").required("Campo e-mail obrigatório"),
});

// como a tendencia é ter muitos campos em um formulário sempre é valido criar
// um componente reutilizável de cada campo com o fim de sub-aproveitar mecânicas
// comuns controle de valores, exibir ou não mensagem de erro e etc
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

  // funçãozinha atalho básica só para trazermos nosso usuário
  // de volta do armazenamento e jogar o mesmo para dentro do
  // state `usuarioSalvo` com a função de escrita `setUsuarioSalvo`
  async function restoreUsuarioSalvo() {
    const restoredUsuario = await getUsuario();
    setUsuarioSalvo(restoredUsuario);
  }

  async function salvaUsuario(formData) {
    // se chegarmos a chamar essa função quer dizer que estamos preparados
    // para salvar os dados inputados na memória, iremos pegar o argumento
    // `formData` que contem os valores de nosso formulário e salva-lo
    // no disco do celular

    // o método `dismiss` do pacote `Keyboard` serve para esconder o teclado
    // virtual dos dispotivos, caso a pessoa aperte o botão no meio de uma
    // digitação em um campo é bacana escondermos o teclado de propósito
    // para ela entender que o que ela estava fazendo foi "parado" e agora
    // estamos fazendo outra coisa
    Keyboard.dismiss();

    // aqui sim chamamos a nossa função utilitária lá de cima para registrar
    // os dados no disco
    const success = await salvarUsuario(formData);

    // se não der nenhum erro no salvamento acima `success` será verdadeiro
    if (success) {
      // ai já atualizamos também a nossa segunda variável-estado usada em tela
      // com o novo valor digitado de usuário
      setUsuarioSalvo(formData);
    }
  }

  // o hook de efeito como já visto em sala de aula serve como ação
  // automática mediante a algumas condições, sempre que algo for
  // atualizado, ou sempre que um componente for "mostrado em tela"
  // e etc. Nesse caso aqui usando a dependencia vazia `[]` estamos
  // solicitando que esse "efeito" rode apenas uma vez, quando a
  // tela for aberta, porque é exatamente o momento mais adequado de
  // restauramos algo e trazarmos ele de volta pra "jogada".
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
          // limpando os campos do formulário para deixar o form pronto para outra interação
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
