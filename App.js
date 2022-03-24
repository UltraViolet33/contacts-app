import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect } from "react";
import Contact from "./components/Contact";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "./components/Header";
import Input from "./components/Input";

export default function App() {
  const [contacts, setContacts] = useState([]);
  const [contact, setContact] = useState({});

  const handleAddName = (name) => {
    const tmpContact = { ...contact };
    tmpContact.name = name;
    setContact(tmpContact);
  };

  const handleAddEmail = (email) => {
    const tmpContact = { ...contact };
    tmpContact.email = email;
    setContact(tmpContact);
  };

  const handleAddPhone = (phone) => {
    const tmpContact = { ...contact };
    tmpContact.phone = phone;
    setContact(tmpContact);
  };

  const addContact = () => {
    if (contact.name != "" && contact.name != undefined) {
      const tmpContacts = [...contacts];
      tmpContacts.push(contact);
      setContacts(tmpContacts);
      setContact({});
    } else {
      alert("Vous devez entrer en nom valide !");
    }
  };

  const deleteContact = (index) => {
    const tmpContacts = [...contacts];
    tmpContacts.splice(index, 1);
    setContacts(tmpContacts);
  };

  useEffect(() => {
    AsyncStorage.getItem("contacts").then((jsonContacts) => {
      const newContacts = JSON.parse(jsonContacts || "[]");
      setContacts(newContacts);
    });
  }, []);

  useEffect(() => {
    AsyncStorage.setItem("contacts", JSON.stringify(contacts))
      .then(() => {
        console.log("save ok");
      })
      .catch((err) => {
        console.log(err.message);
      });
  });

  return (
    <View style={styles.container}>
      <Header></Header>
      <View style={styles.contactContainer}>
        {contacts.length === 0 ? (
          <Text style={styles.numberContact}>
            Vous n'avez aucun contact enregistré
          </Text>
        ) : (
          <Text style={styles.numberContact}>
            Nombre de contacts : {contacts.length}
          </Text>
        )}
        <FlatList
          data={contacts}
          renderItem={({ item, index }) => (
            <Contact
              contact={item}
              index={index}
              deleteContact={deleteContact}
            ></Contact>
          )}
          keyExtractor={(item, index) => index}
        ></FlatList>
      </View>
      <View style={styles.inputsContainer}>
        <Input
          onChange={handleAddName}
          placeHold="Entrez le nom du contact"
          valueInput={contact.name}
        ></Input>
        <Input
          onChange={handleAddEmail}
          placeHold="Entrez son email"
          valueInput={contact.email}
        ></Input>
        <Input
          onChange={handleAddPhone}
          placeHold="Entrez son numéro de téléphone"
          valueInput={contact.phone}
        ></Input>
        <TouchableOpacity style={styles.button} onPress={addContact}>
          <Text style={styles.textBtn}>Valider</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" hidden={true} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contactContainer: {
    margin: 10,
    flex: 1,
  },
  numberContact: {
    textAlign: "center",
    fontSize: 15,
  },
  inputsContainer: {
    padding: 10,
    backgroundColor: "#0862b1",
  },
  input: {
    backgroundColor: "white",
    margin: 5,
    padding: 5,
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
