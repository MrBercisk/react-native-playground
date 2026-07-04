import {View, Text, StyleSheet, Pressable} from 'react-native';
import Button from '@/components/Button';
import Input from '@/components/Input';
import { useState } from 'react';
import { COLORS } from '@/constants/colors';


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

    const handleLogin = () =>{
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            alert("Berhasil");
        }, 2000);
    }
 
    return (
    <View style={styles.container}>
        <Text style={styles.logo}>💰</Text>
        <Text style={styles.title}>Money Tracker</Text>
        <Text style={styles.subtitle}>
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

    logo: {
        fontSize:60,
        textAlign:"center",
    },

    title:{
        fontSize:32,
        fontWeight:"bold",
        textAlign:"center",
        marginTop:15,
    },

    subtitle:{
        fontSize:16,
        color:"#6B7280",
        textAlign:"center",
        marginBottom:35,
    },
    error: {
        color: "red",
        marginBottom: 15,
        marginLeft: 5,
    }
});