import {View, Text, Pressable} from 'react-native';
import Button from '@/components/Button';
import Input from '@/components/Input';
import { useState} from 'react';
import { COLORS } from '@/constants/colors';
import { authStyles } from '@/styles/auth';
import { Link , router} from "expo-router";


export default function LoginScreen(){
    // menyimpan isi text input, isi text input berasal dari state
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);

    // validasi email pass
    const isEmailValid = email.trim() !== "" && email.includes("@");
    const isPasswordValid = password.length >= 8;
    const canLogin = isEmailValid && isPasswordValid;

    const [loading, setLoading] = useState(false);

    const handleLogin = () => {
        setLoading(true);

        setTimeout(() => {
            setLoading(false);

            // Login dihapus dari history jadi ga bisa back, kalau pake push() bisa back ke login
            router.replace("/");

        }, 2000);
    };
 
    return (
    <View style={authStyles.container}>
        <Text style={authStyles.logo}>💰</Text>
        <Text style={authStyles.title}>Money Tracker</Text>
        <Text style={authStyles.subtitle}>
            Welcome Back
        </Text>


        <Input
            label="Email"
            placeholder="Masukkan Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            error={
                email.length > 0 && !isEmailValid
                    ? "Email tidak valid"
                    : undefined
            }
        />

        <Input
            label="Password"
            placeholder="Masukkan Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            error={
                password.length > 0 && !isPasswordValid
                    ? "Password minimal 8 karakter"
                    : undefined
            }
         />

       <Pressable onPress={() => setShowPassword(prev => !prev)}>
            <Text>
                {showPassword ? "Hide Password" : "👁 Show Password"}
            </Text>

       </Pressable>
        <Button
            backgroundColor={COLORS.primary}
            disabled={!canLogin || loading}
            onPress={handleLogin}
            title={loading ? "Loading..." : "Login"}
        />
      
        <View style={{ marginTop: 20, alignItems: "center" }}>
            <Text>Belum punya akun?</Text>

            <Link href="/register">
                <Text
                    style={{
                        color: COLORS.primary,
                        fontWeight: "bold",
                        marginTop: 5,
                    }}
                >
                    Register
                </Text>
            </Link>
        </View>
    </View>
    
    );
}

