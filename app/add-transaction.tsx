import { View, Text, StyleSheet, Alert, Pressable, ScrollView } from "react-native";
import Input from "@/components/Input";
import { useState, useEffect } from "react";
import Button from "@/components/Button";
import { COLORS } from "@/constants/colors";
import { CATEGORIES } from "@/constants/categories";
import { useTransaction } from "@/contexts/TransactionContext";
import { router, useLocalSearchParams } from "expo-router";

export default function AddTransactionScreen() {
  const { transactions, addTransaction, updateTransaction } = useTransaction();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const isEditMode = !!id;

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("food");
  const [type, setType] = useState<"income" | "expense">("expense");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isEditMode) {
      const existing = transactions.find((t) => t.id.toString() === id);
      if (existing) {
        setTitle(existing.title);
        setAmount(existing.amount.toString());
        setCategory(existing.category);
        setType(existing.type);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleSave = async () => {
    if (!title.trim()) {
      Alert.alert("Oops", "Title wajib diisi");
      return;
    }

    const numericAmount = Number(amount);
    if (!amount.trim() || isNaN(numericAmount) || numericAmount <= 0) {
      Alert.alert("Oops", "Amount harus angka lebih dari 0");
      return;
    }

    const data = {
      title,
      amount: numericAmount,
      category: category as any,
      type,
    };

    setSaving(true);
    try {
      if (isEditMode) {
        await updateTransaction(Number(id), data);
      } else {
        await addTransaction(data);
      }
      router.back();
    } catch (error: any) {
      Alert.alert("Gagal menyimpan", error.message || "Terjadi kesalahan");
    } finally {
      setSaving(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Pressable style={styles.backButton} onPress={() => router.back()} hitSlop={10}>
        <Text style={styles.backIcon}>←</Text>
        <Text style={styles.backText}>Back</Text>
      </Pressable>

      <Text style={styles.title}>
        {isEditMode ? "Edit Transaction" : "Add Transaction"}
      </Text>

      {/* Type selector: Expense / Income */}
      <View style={styles.typeSelector}>
        <Pressable
          style={[
            styles.typeButton,
            type === "expense" && styles.typeButtonExpenseActive,
          ]}
          onPress={() => setType("expense")}
        >
          <Text style={[styles.typeIcon, type === "expense" && styles.typeTextActive]}>
            💸
          </Text>
          <Text style={[styles.typeText, type === "expense" && styles.typeTextActive]}>
            Expense
          </Text>
        </Pressable>

        <Pressable
          style={[
            styles.typeButton,
            type === "income" && styles.typeButtonIncomeActive,
          ]}
          onPress={() => setType("income")}
        >
          <Text style={[styles.typeIcon, type === "income" && styles.typeTextActive]}>
            💵
          </Text>
          <Text style={[styles.typeText, type === "income" && styles.typeTextActive]}>
            Income
          </Text>
        </Pressable>
      </View>

      <View style={styles.card}>
        <Input
          label="Title"
          placeholder="Contoh: Makan Siang"
          value={title}
          onChangeText={setTitle}
        />
        <Input
          label="Amount"
          placeholder="25000"
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
        />

        <Text style={styles.label}>Category</Text>
        <View style={styles.categoryGrid}>
          {CATEGORIES.map((item) => {
            const isActive = category === item.value;
            return (
              <Pressable
                key={item.value}
                style={[styles.categoryChip, isActive && styles.categoryChipActive]}
                onPress={() => setCategory(item.value)}
              >
                <Text style={[styles.categoryText, isActive && styles.categoryTextActive]}>
                  {item.label}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      <Button
        title={saving ? "Saving..." : isEditMode ? "Update Transaction" : "Save Transaction"}
        backgroundColor={COLORS.primary}
        onPress={handleSave}
        disabled={saving}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    marginBottom: 15,
  },
  backIcon: {
    fontSize: 22,
    color: COLORS.primary,
    marginRight: 6,
  },
  backText: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.primary,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },

  // Type selector
  typeSelector: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 20,
  },
  typeButton: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 14,
    paddingVertical: 18,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#E5E7EB",
  },
  typeButtonExpenseActive: {
    backgroundColor: "#FEF2F2",
    borderColor: "#EF4444",
  },
  typeButtonIncomeActive: {
    backgroundColor: "#F0FDF4",
    borderColor: "#22C55E",
  },
  typeIcon: {
    fontSize: 24,
    marginBottom: 6,
  },
  typeText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6B7280",
  },
  typeTextActive: {
    color: "#111827",
  },

  // Card wrapper
  card: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 18,
    marginBottom: 20,
    elevation: 2,
  },
  label: {
    fontWeight: "600",
    marginBottom: 10,
    marginTop: 4,
    color: "#374151",
  },

  // Category chips
  categoryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  categoryChip: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: "#F3F4F6",
    borderWidth: 1.5,
    borderColor: "transparent",
  },
  categoryChipActive: {
    backgroundColor: "#EFF6FF",
    borderColor: COLORS.primary,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#6B7280",
  },
  categoryTextActive: {
    color: COLORS.primary,
    fontWeight: "700",
  },
});