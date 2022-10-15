import { KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform, ScrollView, View } from "react-native";

/* Este componente é utilizado para determinados controles automáticos de teclado.
 * Em telas que possuem formulários, utiliza-se o componente `KeyboardAvoidingView`
 * como base do próprio 'react-native' sendo possível anexar funcionalidades como
 * possuir ou não a barra de rolagem em determinado local. */

export default function CustomKeyboardAvoidingView({
  children,
  style,
  containerProps,
  scrollEnabled = true,
  ...props
}) {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : null}
      style={!!style ? style : { flex: 1 }}
      keyboardVerticalOffset={120}
      {...props}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        {!!scrollEnabled ? (
          <ScrollView {...containerProps}>{children}</ScrollView>
        ) : (
          <View {...containerProps}>{children}</View>
        )}
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}