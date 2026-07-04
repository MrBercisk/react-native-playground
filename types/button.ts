// ? = properti bersifat optional
// void = tidak mengembalikan nilai apa apa. contoh function tambah(a: number) ,megmembalikan angka tipe nya number bukan void
export type ButtonType = {
    title: string;
    backgroundColor?: string;
    onPress: () => void;
    disabled?: boolean;
};