import { useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity, Keyboard, View, Text } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { Formik } from "formik";
import * as Yup from "yup";

import KeyboardAvoidingView from "../components/KeyboardAvoidingView";

import { executeSql } from "../db";

const ProdutoSchema = Yup.object().shape({
  name: Yup.string().min(2, "Mínimo de 2 letras").required("Campo obrigatório"),
  qtd: Yup.number().min(1, "Qtd inválida"),
});

function MyTextInput({ error = null, ...props }) {
  return (
    <View style={{ paddingBottom: 6 }}>
      <TextInput error={!!error} {...props} />
      {!!error && typeof error === "string" && <Text style={styles.formInputError}>{error}</Text>}
    </View>
  );
}

function MyQtdInput({ label, onChange, value = 1, error = null, ...props }) {
  return (
    <View style={{ paddingBottom: 6 }}>
      <View style={styles.formQtdInput}>
        <Text style={styles.formQtdLabel}>{label}</Text>
        <View style={{ flexDirection: "row", marginTop: 6, marginBottom: 1 }}>
          <TouchableOpacity onPress={() => onChange(value + 1)} style={styles.formQtdAction}>
            <Text style={{ color: "#fff" }}>+</Text>
          </TouchableOpacity>
          <Text style={styles.formQtdShadow}>{value}</Text>
          <TouchableOpacity onPress={() => onChange(value - 1)} style={styles.formQtdAction}>
            <Text style={{ color: "#fff" }}>-</Text>
          </TouchableOpacity>
        </View>
      </View>
      {!!error && typeof error === "string" && <Text style={styles.formInputError}>{error}</Text>}
    </View>
  );
}

export default function SqlAddScreen({ navigation }) {
  return (
    <KeyboardAvoidingView>
      <Formik
        initialValues={{
          name: "",
          qtd: 1,
        }}
        validationSchema={ProdutoSchema}
        onSubmit={async (values, actions) => {
          try {
            const rs = await executeSql("INSERT INTO produtos (name, qtd) VALUES(?, ?)", [values.name, values.qtd]);
            navigation.navigate("SqlHome", { novoItem: rs.insertId });
          } catch (err) {
            console.error(err);
          }
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, setFieldValue, touched, errors, values }) => {
          return (
            <View style={styles.formContainer}>
              <MyTextInput
                autoCorrect={false}
                label="Adicione o filme"
                onChangeText={handleChange("name")}
                onBlur={handleBlur("name")}
                value={values.name}
                error={touched.name && errors.name}
              />
              <Button onPress={handleSubmit} mode="contained" style={{ marginTop: 12 }}>
                Confirmar
              </Button>
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
  formQtdInput: {
    backgroundColor: "rgba(231, 224, 236, 1)",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(121, 116, 126, 1)",
  },
  formQtdLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: "#666",
  },
  formQtdShadow: {
    fontSize: 15,
    fontWeight: "600",
    color: "#363636",
    backgroundColor: "#ddd",
    paddingVertical: 2,
    paddingHorizontal: 9,
    marginHorizontal: 3,
    borderRadius: 9,
    textAlign: "center",
    overflow: "hidden",
  },
  formQtdAction: {
    backgroundColor: "rgba(103, 80, 164, 1)",
    paddingVertical: 2,
    paddingHorizontal: 9,
    borderRadius: 9,
    overflow: "hidden",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 6,
    marginBottom: 18,
  },
});
