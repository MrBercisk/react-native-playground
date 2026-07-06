import { StyleSheet } from "react-native";
import { COLORS } from "@/constants/colors";

export const authStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 25,
        backgroundColor: COLORS.primary,
     
    },

    logo: {
        fontSize: 60,
        textAlign: "center",
    },

    title: {
        fontSize: 32,
        fontWeight: "bold",
        textAlign: "center",
        marginTop: 15,
        color: COLORS.surface
    },

    subtitle: {
        fontSize: 16,
        textAlign: "center",
        marginBottom: 35,
        color: COLORS.card
    },
});