import { View, StyleSheet, TextInput } from "react-native";

export default Input = ({ onChange, placeHold, valueInput }) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        onChangeText={onChange}
        placeholder={placeHold}
        value={valueInput}
        style={styles.input}></TextInput>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    margin: 10,
  },
  input: {
    backgroundColor: "white",
    height: 50,
    borderRadius: 20,
    padding: 10,
    borderWidth: 2,
  },
});
