import { View, Text, StyleSheet, SectionList } from "react-native";
import { useTransaction } from "@/contexts/TransactionContext";
import { Transaction } from "@/types/transaction";

const getMonthLabel = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("id-ID", {
    month: "long",
    year: "numeric",
  });
};

export default function ReportsScreen() {
  const { transactions } = useTransaction();
  const sections = groupByMonth(transactions);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reports</Text>
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id.toString()}
        renderSectionHeader={({ section }) => (
          <View style={styles.monthHeader}>
            <Text style={styles.monthLabel}>{section.title}</Text>
            <View style={styles.monthSummary}>
              <Text style={styles.income}>
                +Rp {section.totalIncome.toLocaleString("id-ID")}
              </Text>
              <Text style={styles.expense}>
                -Rp {section.totalExpense.toLocaleString("id-ID")}
              </Text>
            </View>
          </View>
        )}
        renderItem={({ item }) => {
          const numericAmount = Number(item.amount); // ⬅️ baru
          return (
            <View style={styles.row}>
              <Text style={styles.rowTitle}>{item.title}</Text>
              <Text
                style={[
                  styles.rowAmount,
                  { color: item.type === "income" ? "#22C55E" : "#EF4444" },
                ]}
              >
                {item.type === "income" ? "+" : "-"} Rp{" "}
                {numericAmount.toLocaleString("id-ID")}
              </Text>
            </View>
          );
        }}
        ListEmptyComponent={<Text style={styles.empty}>Belum ada transaksi</Text>}
      />
    </View>
  );
}

function groupByMonth(transactions: Transaction[]) {
  const groups: Record<string, Transaction[]> = {};

  transactions.forEach((t) => {
    const label = getMonthLabel(t.date as any);
    if (!groups[label]) {
      groups[label] = [];
    }
    groups[label].push(t);
  });

  return Object.keys(groups).map((label) => {
    const items = groups[label];
    const totalIncome = items
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + Number(t.amount), 0); 
    const totalExpense = items
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + Number(t.amount), 0);

    return {
      title: label,
      data: items,
      totalIncome,
      totalExpense,
    };
  });
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F8FAFC",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 15,
  },
  monthHeader: {
    backgroundColor: "#E5E7EB",
    padding: 12,
    borderRadius: 10,
    marginTop: 15,
    marginBottom: 8,
  },
  monthLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  monthSummary: {
    flexDirection: "row",
    gap: 12,
  },
  income: {
    color: "#22C55E",
    fontWeight: "600",
    fontSize: 13,
  },
  expense: {
    color: "#EF4444",
    fontWeight: "600",
    fontSize: 13,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "white",
    padding: 14,
    borderRadius: 10,
    marginBottom: 8,
  },
  rowTitle: {
    fontSize: 15,
  },
  rowAmount: {
    fontSize: 15,
    fontWeight: "600",
  },
  empty: {
    textAlign: "center",
    color: "#9CA3AF",
    marginTop: 30,
  },
});