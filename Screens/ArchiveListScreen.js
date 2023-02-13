import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, SafeAreaView, FlatList } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "../Components/Header";

export default function ArchiveListScreen(props) {
  const [archiveList, setArchiveList] = useState();

  const getArchiveList = async () => {
    const list = await AsyncStorage.getItem("archiveList");
    setArchiveList(JSON.parse(list).archiveList);
  };
  useEffect(() => {
    getArchiveList();
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
      <Header title="Archive List" navigation={props.navigation} />

      <FlatList
        contentContainerStyle={{ paddingBottom: 20 }}
        data={archiveList}
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

  separator: {
    width: "90%",
    height: 1,
    backgroundColor: "grey",
    alignSelf: "center",
    marginTop: 5,
  },
});
