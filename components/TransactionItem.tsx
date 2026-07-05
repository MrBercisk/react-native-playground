import { View, StyleSheet, Text, Pressable } from 'react-native';
import { Transaction } from "@/types/transaction";

type TransactionItemProps = Omit<Transaction, "id"> & {
  onPress?: () => void;
  onDelete?: () => void;
};

// helper: ubah "2026-07-05T10:57:59.000000Z" jadi "5 Jul 2026"
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

export default function TransactionItem({
  title,
  amount,
  type,
  category,
  date,
  onPress,
  onDelete,
}: TransactionItemProps) {
  const getIcon = () => {
    switch (category) {
      case "food": return "🍔";
      case "transport": return "⛽";
      case "salary": return "💰";
      case "freelance": return "💻";
      default: return "📦";
    }
  };

  const numericAmount = Number(amount); 

  return (
    <View style={styles.container}>
      <Pressable style={styles.mainArea} onPress={onPress}>
        <View style={styles.left}>
          <Text style={styles.icon}>{getIcon()}</Text>
          <View>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.date}>{formatDate(date as any)}</Text>
          </View>
        </View>

        <Text
          style={[
            styles.amount,
            { color: type === "income" ? "#22C55E" : "#EF4444" },
          ]}
        >
          {type === "income" ? "+" : "-"} Rp {numericAmount.toLocaleString("id-ID")}
        </Text>
      </Pressable>

      <Pressable onPress={onDelete} hitSlop={12} style={styles.deleteButton}>
        <Text style={styles.deleteIcon}>🗑️</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    elevation: 2,
  },
  mainArea: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
  date: {
    fontSize: 12,
    color: "#9CA3AF",
    marginTop: 2,
  },
  amount: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 12,
  },
  deleteButton: {
    padding: 6,
  },
  deleteIcon: {
    fontSize: 18,
  },
});