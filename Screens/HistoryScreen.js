import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, SafeAreaView, FlatList } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HistoryScreen(props) {
  const [historyList, setHistoryList] = useState();

  const getHistoryList = async () => {
    const list = await AsyncStorage.getItem("searchHistory");
    setHistoryList(JSON.parse(list).searchHisList);
  };
  useEffect(() => {
    getHistoryList();
  }, []);

  const Item = ({ data }) => {
    return (
      <View style={{ paddingHorizontal: 18, marginTop: 10 }}>
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
        Searched History
      </Text>
      <FlatList
        contentContainerStyle={{ paddingBottom: 20 }}
        data={historyList}
        renderItem={(data) => <Item data={data.item} />}
        keyExtractor={(item) => item.key}
        ItemSeparatorComponent={() => <View style={styles.separator}></View>}
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
});
