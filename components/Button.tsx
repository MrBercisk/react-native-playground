import {Text, StyleSheet, Pressable} from 'react-native';

// ? = properti bersifat optional
// void = tidak mengembalikan nilai apa apa. contoh function tambah(a: number) ,megmembalikan angka tipe nya number bukan void
type ButtonProps = {
    title: string;
    backgroundColor?: string;
    onPress: () => void;
};

export default function Button({title, backgroundColor = "#3B82F6", onPress}: ButtonProps) {
  return (
    <Pressable style={[styles.button, { backgroundColor }]} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
    button:{
        marginTop: 15,
        paddingVertical: 14,
        paddingHorizontal: 20,
        borderRadius: 10,
        width: "100%"
    },
    buttonText: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center"
    },
});