import { View, Text, Alert } from "react-native";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { COLORS } from "@/constants/colors";
import { useState } from "react";
import { Link, router } from "expo-router";
import { authStyles } from '@/styles/auth';
import { register } from "@/services/authService";
import { useTransaction } from "@/contexts/TransactionContext";

export default function RegisterScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { refreshTransactions } = useTransaction();

  const handleRegister = async () => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      Alert.alert("Oops", "Semua field wajib diisi");
      return;
    }
    if (password.length < 8) {
      Alert.alert("Oops", "Password minimal 8 karakter");
      return;
    }

    setLoading(true);
    try {
      await register(name, email, password); // manggil API
      await refreshTransactions();
      router.replace("/");
    } catch (error: any) {
      Alert.alert("Register Gagal", error.message || "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={authStyles.container}>
      <Text style={authStyles.logo}>💰</Text>
      <Text style={authStyles.title}>Create Account</Text>
      <Text style={authStyles.subtitle}>Register to continue</Text>

      <Input label="Nama" placeholder="Masukkan Nama" value={name} onChangeText={setName} />
      <Input
        label="Email"
        placeholder="Masukkan Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <Input
        label="Password"
        placeholder="Masukkan Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Button
        title={loading ? "Loading..." : "Register"}
        backgroundColor={COLORS.success}
        onPress={handleRegister}
        disabled={loading}
      />

      <View style={{ marginTop: 20, alignItems: "center" }}>
        <Text>Sudah punya akun?</Text>
        <Link href="/login">
          <Text style={{ color: COLORS.primary, fontWeight: "bold", marginTop: 5 }}>
            Login
          </Text>
        </Link>
      </View>
    </View>
  );
}