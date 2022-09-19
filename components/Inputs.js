import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Input from "./Input";

export default Inputs = ({
  handleAddName,
  handleAddEmail,
  handleAddPhone,
  addContact,
  contact,
}) => {
  return (
    <View style={styles.inputsContainer}>
      <Input
        onChange={handleAddName}
        placeHold="Entrez le nom du contact"
        valueInput={contact.name}></Input>
      <Input
        onChange={handleAddEmail}
        placeHold="Entrez son @email"
        valueInput={contact.email}></Input>
      <Input
        onChange={handleAddPhone}
        placeHold="Entrez son numéro de téléphone"
        valueInput={contact.phone}></Input>
      <TouchableOpacity style={styles.button} onPress={addContact}>
        <Text style={styles.textBtn}>Valider</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  inputsContainer: {
    padding: 10,
    backgroundColor: "#0862b1",
  },
  button: {
    height: 60,
    width: 100,
    backgroundColor: "#1b9729",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  textBtn: {
    color: "white",
    fontSize: 20,
  },
});
