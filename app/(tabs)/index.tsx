import { View, Text, StyleSheet, FlatList, Pressable, Alert, Platform } from "react-native";
import SummaryCard from "@/components/SummaryCard";
import TransactionItem from "@/components/TransactionItem";
import { useTransaction } from "@/contexts/TransactionContext";
import { COLORS } from "@/constants/colors";
import { router } from "expo-router";

export default function HomeScreen() {
  const { transactions, summary, deleteTransaction } = useTransaction();

 
    const handleDelete = (id: number) => {
     if (Platform.OS === "web") {
         // di web
         const confirmed = window.confirm("Yakin mau hapus transaksi ini?");
         if (confirmed) {
         deleteTransaction(id);
         }
     } else {
         // di HP/emulator
         Alert.alert("Hapus Transaksi", "Yakin mau hapus transaksi ini?", [
         { text: "Batal", style: "cancel" },
         { text: "Hapus", style: "destructive", onPress: () => deleteTransaction(id) },
         ]);
     }
     };
 

  return (
    <View style={styles.container}>
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={
          <>
            <View style={styles.header}>
              <View>
                <Text style={styles.welcome}>Welcome Back 👋</Text>
                <Text style={styles.name}>Berlin Bercisk</Text>
              </View>
              <Text style={styles.avatar}>👤</Text>
            </View>
            <Text style={styles.date}>Monday, 6 July 2026</Text>

            {summary.map((item) => (
              <SummaryCard
                key={item.title}
                title={item.title}
                amount={item.amount}
                color={item.color}
              />
            ))}

            <Pressable style={styles.sectionHeader} onPress={() => router.push("/transaction")}>
              <Text style={styles.sectionTitle}>Recent Transactions</Text>
              <Text style={styles.seeAll}>See All ›</Text>
            </Pressable>
          </>
        }
        renderItem={({ item }) => (
          <TransactionItem
            title={item.title}
            category={item.category}
            amount={item.amount}
            type={item.type}
            onPress={() => router.push(`/add-transaction?id=${item.id}`)}
            onDelete={() => handleDelete(item.id)} 
          />
        )}
      />
      <Pressable style={styles.add} onPress={() => router.push("/add-transaction")}>
        <Text style={styles.addText}>+</Text>
      </Pressable>
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
  },
  welcome: {
    color: "#6B7280",
    fontSize: 14,
  },
  name: {
    fontSize: 28,
    fontWeight: "bold",
  },
  avatar: {
    fontSize: 45,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  seeAll: {
    color: COLORS.primary,
    fontWeight: "600",
  },
  date: {
    color: "#6B7280",
    marginBottom: 20,
  },
  add: {
    position: "absolute",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.primary,
    right: 20,
    bottom: 20,
    elevation: 5,
  },
  addText: {
    color: "#FFF",
    fontSize: 32,
    fontWeight: "bold",
  },
});