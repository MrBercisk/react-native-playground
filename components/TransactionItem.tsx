
import {View, StyleSheet, Text} from 'react-native';
import { Transaction } from "@/types/transaction";

// ambil semua kecuali id
type TransactionItemProps = Omit<Transaction, "id">;

export default function TransactionItem({
    title,
    amount,
    type,
    category
}: TransactionItemProps){
    const getIcon = () => {
        switch(category){

            case "food":
                return "🍔";

            case "transport":
                return "⛽";

            case "salary":
                return "💰";

            case "freelance":
                return "💻";

            default:
                return "📦";
        }
    }
    return (
        <View style={styles.container}>

            <View style={styles.left}>
                <Text style={styles.icon}>
                    {getIcon()}
                </Text>

                <Text style={styles.title}>
                    {title}
                </Text>
            </View>

            <Text
                style={[
                    styles.amount,
                    {
                        color:
                            type === "income"
                                ? "#22C55E"
                                : "#EF4444",
                    },
                ]}
            >
                {type === "income" ? "+" : "-"} Rp{" "}
                {amount.toLocaleString("id-ID")}
            </Text>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,

        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",

        elevation: 2,
    },
     left: {
        flexDirection: "row",
        alignItems: "center",
    },

    icon: {
        fontSize: 26,
        marginRight: 12,
    },

    title: {
        fontSize: 16,
        fontWeight: "600",
    },

    amount: {
        fontSize: 16,
        fontWeight: "bold",
    },
});