import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./styles";

type Props = {
  name: String;
  onRemove: () => void;
}

export function Book({name, onRemove}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>
        {name}
      </Text>
    
      <TouchableOpacity style={styles.button} onPress={onRemove}>
        <Text style={styles.buttonText}>
          -
        </Text>
      </TouchableOpacity>
    </View>
  )
}