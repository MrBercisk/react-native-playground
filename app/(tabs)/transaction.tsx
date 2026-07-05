import { View, Text, StyleSheet, FlatList, Pressable, Alert, Platform } from "react-native";
import { useState } from "react";
import TransactionItem from "@/components/TransactionItem";
import { useTransaction } from "@/contexts/TransactionContext";
import { CATEGORIES } from "@/constants/categories";
import { COLORS } from "@/constants/colors";
import { router } from "expo-router";

export default function TransactionScreen() {
  const { transactions, deleteTransaction } = useTransaction();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filteredTransactions =
    selectedCategory === "all"
      ? transactions
      : transactions.filter((t) => t.category === selectedCategory);

  
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
      <Text style={styles.title}>All Transactions</Text>

      <FlatList
        data={[{ label: "All", value: "all" }, ...CATEGORIES]}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.value}
        style={styles.filterList}
        renderItem={({ item }) => {
          const isActive = selectedCategory === item.value;
          return (
            <Pressable
              style={[styles.filterItem, isActive && { backgroundColor: COLORS.primary }]}
              onPress={() => setSelectedCategory(item.value)}
            >
              <Text style={[styles.filterText, isActive && { color: "#FFF" }]}>
                {item.label}
              </Text>
            </Pressable>
          );
        }}
      />

      <FlatList
        data={filteredTransactions}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={styles.empty}>Belum ada transaksi di kategori ini</Text>
        }
        renderItem={({ item }) => (
          <TransactionItem
            title={item.title}
            category={item.category}
            amount={item.amount}
            date={item.date}
            type={item.type}
            onPress={() => router.push(`/add-transaction?id=${item.id}`)}
            onDelete={() => handleDelete(item.id)} 
          />
        )}
      />
    </View>
  );
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
  filterList: {
    flexGrow: 0,
    marginBottom: 15,
  },
  filterItem: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: "#E5E7EB",
    marginRight: 10,
  },
  filterText: {
    fontWeight: "600",
    color: "#374151",
  },
  list: {
    paddingBottom: 20,
  },
  empty: {
    textAlign: "center",
    color: "#9CA3AF",
    marginTop: 30,
  },
});