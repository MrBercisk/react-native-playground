import { View, Text, StyleSheet, Alert, Pressable } from "react-native";
import Input from "@/components/Input";
import { useState, useEffect } from "react";
import { Picker } from "@react-native-picker/picker";
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

  const handleSave = () => {
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

    if (isEditMode) {
      updateTransaction(Number(id), data);
    } else {
      addTransaction(data);
    }

    router.back();
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.backButton} onPress={() => router.back()} hitSlop={10}>
        <Text style={styles.backIcon}>←</Text>
        <Text style={styles.backText}>Back</Text>
      </Pressable>

      <Text style={styles.title}>
        {isEditMode ? "Edit Transaction" : "Add Transaction"}
      </Text>

      <Input
        label="Title"
        placeholder="Contoh: Makan"
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

      <Picker selectedValue={category} onValueChange={setCategory}>
        {CATEGORIES.map((item) => (
          <Picker.Item key={item.value} label={item.label} value={item.value} />
        ))}
      </Picker>

      <Picker
        selectedValue={type}
        onValueChange={(value) => setType(value as "income" | "expense")}
      >
        <Picker.Item label="Expense 💸" value="expense" />
        <Picker.Item label="Income 💵" value="income" />
      </Picker>

      <Button
        title={isEditMode ? "Update Transaction" : "Save Transaction"}
        backgroundColor={COLORS.primary}
        onPress={handleSave}
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
    marginBottom: 25,
  },
});