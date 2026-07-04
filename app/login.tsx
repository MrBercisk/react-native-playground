import {View, Text, StyleSheet, TextInput} from 'react-native';
import Button from '@/components/Button';
import { useState } from 'react';
import { COLORS } from '@/constants/colors';

export default function LoginScreen(){
    // menyimpan isi text input, isi text input berasal dari state
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // validasi email pass
    const isEmailValid = email.trim() !== "" && email.includes("@");
    const isPasswordValid = password.length >= 8;
    const canLogin = isEmailValid && isPasswordValid;
    const handleLogin = () => {
        alert("Login berhasil");
    };

    return (
    <View style={styles.container}>
        <Text style={styles.title}>Login</Text>

        <TextInput
        placeholder="Masukkan Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      {email.length > 0 && !isEmailValid && (
        <Text style={styles.error}>
            Email tidak valid
        </Text>
      )}

      <TextInput
        placeholder="Masukkan Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />
      {password.length > 0 && !isPasswordValid && (
        <Text style={styles.error}>
            Password minimal 8 karakter
        </Text>
        )}

      <Button
        title="Login"
        backgroundColor={COLORS.primary}
        disabled={!canLogin}
        onPress={handleLogin}
      />
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 25,
        backgroundColor: "#F8FAFC",
    },

    title: {
        fontSize: 30,
        fontWeight: "bold",
        marginBottom: 25,
    },

    input: {
        borderWidth: 1,
        borderColor: "#D1D5DB",
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        backgroundColor: "#FFF",
    },
    error: {
        color: "red",
        marginBottom: 15,
        marginLeft: 5,
    }
});