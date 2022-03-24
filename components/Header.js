import { View, Text, StyleSheet } from "react-native";

export default Header = () => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.textHeader}>Contact App</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
   height:60,
   backgroundColor:"#0862b1",
   alignItems:"center",
   justifyContent:"center",
  },
  textHeader:{
    fontSize:30,
    color:"white",
  }
 
});

