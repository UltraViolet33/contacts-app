import { View, Text, StyleSheet, Pressable } from "react-native";

export default Contact = ({ contact, index, deleteContact }) => {
  const handleDelete = (index) => {
    deleteContact(index);
  };

  const showInfo = () => {
    alert("Nom : " + contact.name);
  };

  return (
    <Pressable onPress={showInfo}>
      <View style={styles.contactContainer}>
        <Text style={styles.phone}>☎</Text>
        <View style={styles.info}>
          <Text style={styles.name}>{contact.name}</Text>
          {contact.phone ? <Text>Tel : {contact.phone}</Text>: <Text></Text>}
          {contact.email ? <Text>Email : {contact.email}</Text>: <Text></Text>}
        </View>
        <Text style={styles.phone}
          onPress={() => {
            handleDelete(index);
          }}
        >
          ❌
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  contactContainer: {
    backgroundColor: "#278ae1",
    margin: 10,
    padding: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems:"center",
    borderRadius:10,
  },
  info:{
    flex:3,
  },
  name: {
    fontSize: 25,
  },
  phone:{
    flex:1,
    fontSize:30,
  }
});
