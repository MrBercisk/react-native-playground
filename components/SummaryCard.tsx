import {View, Text, StyleSheet} from 'react-native';
import { Summary } from "@/types/summary";
type SummaryCardProps = Omit<Summary, "id">;

export default function SummaryCard({
    title,
    amount,
    color
}: SummaryCardProps){
    return(
          <View style={[styles.card, { backgroundColor: color }]}>
            <Text style={styles.title}>{title}</Text>

            <Text style={styles.amount}>
                Rp {amount.toLocaleString("id-ID")}
            </Text>
        </View>
    );
}
const styles = StyleSheet.create({
    card: {
        padding: 18,
        borderRadius: 15,
        marginBottom: 15,
    },

    title: {
        color: "white",
        fontSize: 15,
    },

    amount: {
        color: "white",
        fontSize: 24,
        fontWeight: "bold",
        marginTop: 5,
    },
});