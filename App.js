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

  // add a contact to contacts
  const addContact = () => {
    const regexEmail = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
    const regexPhoneNumber = /^((\+)33|0)[1-9](\d{2}){4}$/;

    //check the name
    if (contact.name === "" || contact.name === undefined) {
      alert("Vous devez entrez un nom valide ! ");
      //check the email
    } else if (contact.email !== undefined && !regexEmail.test(contact.email)) {
      alert("Vous devez entrez une adresse email valide ! ");
      const tmpContact = { ...contact };
      tmpContact.email = undefined;
      setContact(tmpContact);
      // check the phone number
    } else if (
      contact.phone !== undefined &&
      !contact.phone.match(regexPhoneNumber)
    ) {
      alert("Vous devez entrez un numéro de téléphone valide ! ");
      const tmpContact = { ...contact };
      tmpContact.phone = undefined;
      setContact(tmpContact);
    } else {
      // add the contact to the state contacts
      const tmpContacts = [...contacts];
      tmpContacts.push(contact);
      setContacts(tmpContacts);
      setContact({});
    }
  };

  // delete a contact
  const deleteContact = (index) => {
    const tmpContacts = [...contacts];
    tmpContacts.splice(index, 1);
    setContacts(tmpContacts);
  };

  //get the contacts from the asyncStorage or return []
  useEffect(() => {
    AsyncStorage.getItem("contacts").then((jsonContacts) => {
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
