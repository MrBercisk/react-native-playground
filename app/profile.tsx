import { View, Text, StyleSheet } from "react-native";
import { COLORS } from "@/constants/colors";

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.avatarWrapper}>
        <Text style={styles.avatar}>👤</Text>
      </View>

      <Text style={styles.name}>Berlin Bercisk</Text>
      <Text style={styles.email}>berlin@example.com</Text>

      <View style={styles.infoCard}>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>App Version</Text>
          <Text style={styles.infoValue}>1.0.0</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Member Since</Text>
          <Text style={styles.infoValue}>Juli 2026</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F8FAFC",
    alignItems: "center",
  },
  avatarWrapper: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
    marginBottom: 15,
  },
  avatar: {
    fontSize: 50,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
  },
  email: {
    color: "#6B7280",
    marginBottom: 25,
  },
  infoCard: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    elevation: 2,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  infoLabel: {
    color: "#6B7280",
  },
  infoValue: {
    fontWeight: "600",
  },
});