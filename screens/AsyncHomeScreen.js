import { useState, useEffect } from "react";
import { StyleSheet, Keyboard, View, Text } from "react-native";
import { TextInput, Button } from "react-native-paper";

import KeyboardAvoidingView from "../components/KeyboardAvoidingView";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Formik } from "formik";
import * as Yup from "yup";

const salvarUsuario = async usuarioData => {
  try {
    const jsonValue = JSON.stringify(usuarioData);

    await AsyncStorage.setItem("@usuario", jsonValue);
    return true;

  } catch (err) {}
  return false;
};

const getUsuario = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("@usuario");

    if (jsonValue !== null) {
      const usuarioRecuperado = JSON.parse(jsonValue);

      return usuarioRecuperado;
    }
  } catch (e) {}

  return {
    nome: "",
    email: "",
  };
};

const UsuarioSchema = Yup.object().shape({
  nome: Yup.string().min(2, "Mínimo de 2 letras").required("Campo nome obrigatório"),
  email: Yup.string().email("E-mail inválido").required("Campo e-mail obrigatório"),
});

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

  async function restoreUsuarioSalvo() {
    const restoredUsuario = await getUsuario();
    setUsuarioSalvo(restoredUsuario);
  }

  async function salvaUsuario(formData) {
    Keyboard.dismiss();
    const success = await salvarUsuario(formData);

    if (success) {
      setUsuarioSalvo(formData);
    }
  }

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