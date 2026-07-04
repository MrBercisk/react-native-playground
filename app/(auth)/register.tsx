import { View, Text } from "react-native";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { COLORS } from "@/constants/colors";
import { useState } from "react";
import { Link } from "expo-router";
import { authStyles } from '@/styles/auth';

export default function RegisterScreen(){
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return(
        <View style={authStyles.container}>

            <Text style={authStyles.logo}>💰</Text>

            <Text style={authStyles.title}>
                Create Account
            </Text>

            <Text style={authStyles.subtitle}>
                Register to continue
            </Text>

            <Input
                label="Nama"
                placeholder="Masukkan Nama"
                value={name}
                onChangeText={setName}
            />

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
                title="Register"
                backgroundColor={COLORS.success}
                onPress={() => {}}
            />
            <View style={{ marginTop: 20, alignItems: "center" }}>
                <Text>Sudah punya akun?</Text>

                <Link href="/login">
                    <Text
                        style={{
                            color: COLORS.primary,
                            fontWeight: "bold",
                            marginTop: 5,
                        }}
                    >
                        Login
                    </Text>
                </Link>
            </View>

        </View>
    )
            
}
