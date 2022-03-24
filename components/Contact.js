import { View, Text, StyleSheet, Pressable } from "react-native";

export default Contact = ({ contact, index, deleteContact }) => {
  const handleDelete = (index) => {
    deleteContact(index);
  };

  const showInfo = () => {
    alert("Nom du contact : " + contact.name);
  };

  return (
    <Pressable onPress={showInfo}>
      <View style={styles.contactContainer}>
        <Text style={styles.icon}>☎</Text>
        <View style={styles.info}>
          <Text style={styles.name}>{contact.name}</Text>
          {contact.phone ? <Text>Tel : {contact.phone}</Text> : null}
          {contact.email ? <Text>Email : {contact.email}</Text> : null}
        </View>
        <Text
          style={styles.icon}
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
    alignItems: "center",
    borderRadius: 10,
  },
  info: {
    flex: 3,
  },
  name: {
    fontSize: 25,
    fontWeight:"bold",
  },
  icon: {
    flex: 1,
    fontSize: 30,
  },
});
