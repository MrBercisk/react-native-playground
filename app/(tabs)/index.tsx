import { View, Text, StyleSheet, FlatList, Pressable, Alert, Platform, ActivityIndicator, Image } from "react-native";
import SummaryCard from "@/components/SummaryCard";
import TransactionItem from "@/components/TransactionItem";
import { useTransaction } from "@/contexts/TransactionContext";
import { COLORS } from "@/constants/colors";
import { FONTS } from "@/constants/fonts";
import { Link, router } from "expo-router";
import { useAuth } from "@/contexts/AuthContext";

const HORIZONTAL_PADDING = 16;

// ambil inisial dari nama
const getInitials = (name: string) =>
  name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

const today = new Date();

const formattedDate = today.toLocaleDateString("en-US", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});

const formatAmount = (amount: number) =>
  Math.abs(amount).toLocaleString("id-ID");
export default function HomeScreen() {
  const { transactions, summary, loading, deleteTransaction } = useTransaction();
  const { user } = useAuth();
  const displayName = user?.name ?? "User";
  if (loading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }
  const totalBalance = transactions.reduce((total, t) => {
    return t.type === "income" ? total + t.amount : total - t.amount;
  }, 0);

  const handleDelete = (id: number) => {
    const confirmDelete = async () => {
      try {
        await deleteTransaction(id);
      } catch (error: any) {
        Alert.alert("Gagal menghapus", error.message || "Terjadi kesalahan");
      }
    };

    if (Platform.OS === "web") {
      const confirmed = window.confirm("Yakin mau hapus transaksi ini?");
      if (confirmed) confirmDelete();
    } else {
      Alert.alert("Hapus Transaksi", "Yakin mau hapus transaksi ini?", [
        { text: "Batal", style: "cancel" },
        { text: "Hapus", style: "destructive", onPress: confirmDelete },
      ]);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <>
            {/* Full width, keluar dari padding */}
            <View style={styles.logoContainer}>
              <View style={styles.logoLeft}>
                <View style={styles.logoBadge}>
                  <Image
                    source={require("@/assets/images/logo_apps.png")}
                    style={styles.logoImage}
                  />
                </View>
                <Text style={styles.logo}>MoraTrack</Text>
              </View>

              <Link href="/(tabs)/profile" asChild>
                <Pressable style={styles.avatarWrapper}>
                  <View style={styles.avatarCircle}>
                    <Text style={styles.avatarInitials}>
                      {getInitials(displayName)}
                    </Text>
                  </View>
                  {/* dot indikator kecil, opsional - bisa buat status online/notifikasi */}
                  <View style={styles.avatarDot} />
                </Pressable>
              </Link>
            </View>
            <View style={styles.heroContainer}>
              <Text style={styles.walletLabel}>Main Wallet</Text>
              <View style={styles.walletAmountRow}>
                <Text style={styles.walletCount}>IDR </Text>
                <Text style={styles.walletCount}>{formatAmount(totalBalance)}</Text>
              </View>
            </View>

            <View style={styles.header}>
              <View>
                <Text style={styles.welcome}>Welcome Back 👋</Text>
                <Text style={styles.name}>{displayName}</Text>
              </View>
            </View>

            <Text style={styles.date}>{formattedDate}</Text>

            {summary.map((item) => (
              <SummaryCard
                key={item.title}
                title={item.title}
                amount={item.amount}
                color={item.color}
              />
            ))}

            <Pressable
              style={styles.sectionHeader}
              onPress={() => router.push("/(tabs)/transaction")}
            >
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
            date={item.date}
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
    backgroundColor: "#F8FAFC",
  },
  centered: {
    justifyContent: "center",
    alignItems: "center",
  },
  listContent: {
    paddingHorizontal: HORIZONTAL_PADDING,
    paddingBottom: 100, // biar item terakhir gak ketutup tombol +
  },

  logoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: -HORIZONTAL_PADDING,
    paddingHorizontal: HORIZONTAL_PADDING,
    paddingVertical: 12,
    backgroundColor: COLORS.primary,
  },
  heroContainer: {
    marginHorizontal: -HORIZONTAL_PADDING,
    paddingHorizontal: HORIZONTAL_PADDING,
    marginBottom: 20,
    paddingVertical: 8,
    backgroundColor: COLORS.primary,
  },
  walletLabel: {
    color: COLORS.border,
    fontSize: 14,
    fontFamily: FONTS.medium,
    marginBottom: 6,
  },
  walletAmountRow: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  walletCount: {
    fontSize: 27,
    fontFamily: FONTS.extraBold,
    color: COLORS.surface,
  },
  logoLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoBadge: {
    width: 38,
    height: 48,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  logoImage: {
    width: 50,
    height: 55,
  },
  logo: {
    fontSize: 24,
    color: "#FFFFFF",
    fontFamily: FONTS.bold,
  },

  // --- Avatar ---
  avatarWrapper: {
    position: "relative",
  },
  avatarCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.6)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  avatarInitials: {
    fontSize: 15,
    fontFamily: FONTS.bold,
    color: COLORS.primary,
  },
  avatarDot: {
    position: "absolute",
    bottom: -2,
    right: -2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.success,
    borderWidth: 2,
    borderColor: COLORS.surface,
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
    fontFamily: FONTS.regular,
  },
  name: {
    fontSize: 28,
    fontFamily: FONTS.bold,
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
    fontFamily: FONTS.bold,
  },
  seeAll: {
    color: COLORS.primary,
    fontFamily: FONTS.semiBold,
  },
  date: {
    color: "#6B7280",
    marginBottom: 20,
    fontFamily: FONTS.regular,
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
    fontFamily: FONTS.bold,
  },
});