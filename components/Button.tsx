import {Text, StyleSheet, Pressable} from 'react-native';
import { ButtonType } from "@/types/button";
type ButtonProps = ButtonType;

export default function Button({
    title, 
    backgroundColor = "#3B82F6", 
    onPress,
    disabled = false
}: ButtonProps) {
  return (
    <Pressable disabled={disabled} 
    style={[styles.button, 
    { 
        backgroundColor: disabled ? "#9CA3AF" : backgroundColor
    }
]} 
    onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
    button:{
        width: "100%",
        marginTop: 15,
        paddingVertical: 14,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    buttonText: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center"
    },
});