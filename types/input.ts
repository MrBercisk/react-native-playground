
export type Input = {
    label: string;
    placeholder: string;
    value: string;
    onChangeText: (text: string) => void;
    secureTextEntry?: boolean;
    keyboardType?:
        | "default"
        | "email-address"
        | "numeric"
        | "phone-pad";
    error?: string;
};
