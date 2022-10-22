import { KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform, 
  ScrollView, View } from "react-native";

export default function CustomKeyboardAvoidingView({ children, style, containerProps,
  scrollEnabled = true, ...props }) {

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