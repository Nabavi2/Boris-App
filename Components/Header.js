import React from "react";
import { Text, View, StyleSheet } from "react-native";

import AntDesign from "react-native-vector-icons/AntDesign";

const Header = (props) => {
  return (
    <View style={styles.container}>
      <AntDesign
        name="arrowleft"
        size={24}
        color="black"
        style={styles.backArrow}
        onPress={() => props.navigation.pop()}
      />
      <Text style={styles.title}>{props.title}</Text>
    </View>
  );
};
export default Header;
const styles = StyleSheet.create({
  container: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  backArrow: {
    marginTop: 10,
    marginLeft: 7,
    marginRight: 100,
  },
  title: {
    marginLeft: 10,
    marginTop: 10,
    fontWeight: "bold",
    fontSize: 18,
  },
});
