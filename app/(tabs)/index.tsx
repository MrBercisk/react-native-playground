import {StyleSheet, View, Text, Pressable } from  'react-native';

export default function HomeScreen() {
 return (
<View style={styles.container}>
  <View style={styles.card}>
    <Text style={styles.emoji}>👤</Text>

    <Text style={styles.title}>
      Berlin Bercisk
    </Text>

    <Text style={styles.subtitle}>
      Software Engineer
    </Text>

    <Pressable
      style={styles.button}
      onPress={() => alert("Edit Profile")}
    >
      <Text style={styles.buttonText}>
        Edit Profile
      </Text>
    </Pressable>
  </View>
</View>
  );
}

const styles = StyleSheet.create({
 container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  row: {
    // kalau row nanti kesamping kalau column kebawah
    flexDirection: "column",
    gap: 15,
  },

  border: {
    fontSize: 20,
    textAlign: "center",
  },
  emoji: {
    fontSize: 40,
    textAlign: "center",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
  },
  card:{
      width:320,
      backgroundColor:"white",
      padding:25,
      borderRadius:20,
      alignItems:"center",
      elevation:5
  },
  button: {
    backgroundColor: "#3B82F6",
    padding: 10,
    borderRadius: 12,
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});