import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, SafeAreaView, FlatList } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ActivityMainList(props) {
  const [favoriteList, setFavoriteList] = useState();

  const getFavoriteList = async () => {
    const list = await AsyncStorage.getItem("addedLikedItems");
    setFavoriteList(JSON.parse(list).addedLikedItems);
  };
  useEffect(() => {
    getFavoriteList();
  }, []);

  const Item = ({ data }) => {
    return (
      <View style={styles.cart}>
        <Text>Accessibility: {data.accessibility}</Text>
        <Text>Activity: {data.activity}</Text>
        <Text>Key: {data.key}</Text>
        <Text>Participants: {data.participants}</Text>
        <Text>Price: {data.price}</Text>
        <Text>Type: {data.type}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <AntDesign
        name="arrowleft"
        size={24}
        color="black"
        style={styles.backArrow}
        onPress={() => props.navigation.pop()}
      />
      <Text style={{ marginLeft: 10, marginTop: 10, fontWeight: "bold" }}>
        Main List
      </Text>
      <FlatList
        contentContainerStyle={{ paddingBottom: 20 }}
        data={favoriteList}
        renderItem={(data) => <Item data={data.item} />}
        keyExtractor={(item) => item.key}
        // ItemSeparatorComponent={() => <View style={styles.separator}></View>}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
  },
  backArrow: {
    marginTop: 10,
    marginLeft: 5,
  },
  separator: {
    width: "90%",
    height: 1,
    backgroundColor: "grey",
    alignSelf: "center",
    marginTop: 5,
  },
  cart: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginTop: 10,
    backgroundColor: "#b4b8b5",
    elevation: 0.5,
    width: "95%",
    borderRadius: 10,
    alignSelf: "center",
  },
});
