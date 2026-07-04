import {StyleSheet, View, Text } from  'react-native';
import Button from '@/components/Button';
import { useState } from 'react';
import { COLORS } from '@/constants/colors';


export default function HomeScreen() {

  const names = ["Berlin Bercisk", "Bimo", "Satrio"];
  const [index, setIndex] = useState(0);
  
 return (
<View style={styles.container}>
  <View style={styles.card}>
    <Text style={styles.emoji}>👤</Text>

    <Text style={styles.title}>
      {names[index]}
  </Text>

    <Text style={styles.subtitle}>
      Software Engineer
    </Text>

    <Button
        title="Ganti Nama"
        backgroundColor={COLORS.primary}
        onPress={() => {
            setIndex((index + 1) % names.length);
        }}
    />
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
  }
});