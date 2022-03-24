import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect } from "react";
import Contact from "./components/Contact";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Header from "./components/Header";

export default function App() {
  const [contacts, setContacts] = useState([
    { name: "test", email: "test", phone: "test" },
    { name: "test", email: "test", phone: "test" },
    { name: "test", email: "test", phone: "test" },
    { name: "test", email: "test", phone: "test" },
  ]);

  const [contact, setContact] = useState({});

  const handleAddName = (name) => {
    console.log(name);
    const tmpContact = { ...contact };
    tmpContact.name = name;
    setContact(tmpContact);
  };

  const handleAddEmail = (email) => {
    const tmpContact = { ...contact };
    tmpContact.email = email;
    console.log(email);
    setContact(tmpContact);
  };

  const handleAddPhone = (phone) => {
    const tmpContact = { ...contact };
    tmpContact.phone = phone;
    console.log(phone);
    setContact(tmpContact);
  };

  const addContact = () => {
    if (contact.name != "" && contact.name != undefined) {
      const tmpContacts = [...contacts];
      tmpContacts.push(contact);
      setContacts(tmpContacts);
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
      const newcontacts = JSON.parse(jsonContacts || "[]");
      console.log(newcontacts);
      setContacts(newcontacts);
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
        <FlatList
          data={contacts}
          renderItem={({ item, index }) => (
            <Contact
              contact={item}
              index={index}
              deleteContact={deleteContact}
            ></Contact>
          )}
          keyExtractor={(item, index) => index.toString()}
        ></FlatList>
      </View>
      <View style={styles.inputsContainer}>
        <TextInput
          onChangeText={handleAddName}
          placeholder="enter the name"
          style={styles.input}
        ></TextInput>
        <TextInput
          onChangeText={handleAddEmail}
          placeholder="enter the email"
          style={styles.input}
        ></TextInput>
        <TextInput
          onChangeText={handleAddPhone}
          placeholder="enter the phone"
          style={styles.input}
        ></TextInput>
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
    flex: 2,
  },
  inputsContainer: {
    padding: 10,
    backgroundColor: "black",
    flex:2,
  },
  input: {
    backgroundColor: "white",
    height: 50,
    margin: 5,
    padding: 5,
  },
  button: {
    height: 50,
    width: 100,
    backgroundColor: "blue",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  textBtn: {
    color: "white",
  },
});
