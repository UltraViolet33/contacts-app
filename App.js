import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "./components/Header";
import Contact from "./components/Contact";
import Inputs from "./components/Inputs";

export default function App() {
  //STATE
  const [contacts, setContacts] = useState([]);
  const [contact, setContact] = useState({});

  // handle the name/email/phone number for contact
  const handleAddName = name => {
    const tmpContact = { ...contact };
    tmpContact.name = name;
    setContact(tmpContact);
  };

  const handleAddEmail = email => {
    const tmpContact = { ...contact };
    tmpContact.email = email;
    setContact(tmpContact);
  };

  const handleAddPhone = phone => {
    const tmpContact = { ...contact };
    tmpContact.phone = phone;
    setContact(tmpContact);
  };

  // add a contact to contacts
  const addContact = () => {
    if (contact.name === undefined || contact.name === "") {
      alert("Veuillez renseigner un nom !");
      return;
    } else if (contact.phone === "" || contact.phone === undefined) {
      alert("Veuillez renseigner un numéro de téléphone valide !");
      return;
    } else if (contact.email === "" || contact.email === undefined) {
      alert("Veuillez rensigner une adresse email valide !");
      return;
    } else {
      const tmpContacts = [...contacts];
      tmpContacts.push(contact);
      setContacts(tmpContacts);
      setContact({});
    }
  };

  // delete a contact
  const deleteContact = index => {
    const tmpContacts = [...contacts];
    tmpContacts.splice(index, 1);
    setContacts(tmpContacts);
  };

  //get the contacts from the asyncStorage or return []
  useEffect(() => {
    AsyncStorage.getItem("contacts").then(jsonContacts => {
      const newContacts = JSON.parse(jsonContacts || "[]");
      setContacts(newContacts);
    });
  }, []);

  // save the contacts
  useEffect(() => {
    AsyncStorage.setItem("contacts", JSON.stringify(contacts))
      .then(() => {
        console.log("save ok");
      })
      .catch(err => {
        console.log(err.message);
      });
  }, [contacts]);

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
              deleteContact={deleteContact}></Contact>
          )}
          keyExtractor={(item, index) => index}></FlatList>
      </View>
      <Inputs
        handleAddName={handleAddName}
        handleAddEmail={handleAddEmail}
        handleAddPhone={handleAddPhone}
        addContact={addContact}
        contact={contact}
      />
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
});
