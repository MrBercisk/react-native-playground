import {TextInput, View, Text, StyleSheet}  from 'react-native';
import { Input } from "@/types/input";
type InputProps = Input;

export default function input({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = "default",
  error,
}: InputProps){return(
  <View style={styles.container}>
    <Text style={styles.label}>{label}</Text>
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize="none"
        autoCorrect={false}
        style={styles.input}
      />

      {error && (
        <Text style={styles.error}>
          {error}
        </Text>
      )}

  </View>  
)};

const styles = StyleSheet.create({
  container: {
    marginBottom: 18,
  },

  label: {
    fontWeight: "600",
    marginBottom: 6,
  },

  input: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 12,
    padding: 15,
    backgroundColor: "#FFF",
  },

  error: {
    color: "#EF4444",
    marginTop: 5,
    marginLeft: 5,
    fontSize: 13,
  },
});