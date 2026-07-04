import { View, Text, StyleSheet } from "react-native";
import SummaryCard from "@/components/SummaryCard";
import { summary } from "@/data/summary";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        Hi, Berlin 👋
      </Text>

      {summary.map((item) => (
        <SummaryCard
          key={item.id}
          title={item.title}
          amount={item.amount}
          color={item.color}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F8FAFC",
  },

  header: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 25,
  },
});