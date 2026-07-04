import {Text, StyleSheet, Pressable} from 'react-native';

// ? = properti bersifat optional
// void = tidak mengembalikan nilai apa apa. contoh function tambah(a: number) ,megmembalikan angka tipe nya number bukan void
type ButtonProps = {
    title: string;
    backgroundColor?: string;
    onPress: () => void;
};

export default function Button({title, backgroundColor, onPress}: ButtonProps) {
  return (
    <Pressable style={[styles.button, { backgroundColor }]} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
    button:{
        fontSize: 16,
        backgroundColor: '#2563EB',
        paddingVertical: 14,
        borderRadius: 5,
    },
    buttonText: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "bold",
    },
});