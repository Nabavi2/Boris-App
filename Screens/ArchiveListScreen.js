import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, SafeAreaView, FlatList } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
      <AntDesign
        name="arrowleft"
        size={24}
        color="black"
        style={styles.backArrow}
        onPress={() => props.navigation.pop()}
      />
      <Text style={styles.title}>Archive List</Text>
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
  backArrow: {
    marginTop: 10,
    marginLeft: 5,
  },
  title: {
    marginLeft: 10,
    marginTop: 10,
    fontWeight: "bold",
    fontSize: 18,
  },
  separator: {
    width: "90%",
    height: 1,
    backgroundColor: "grey",
    alignSelf: "center",
    marginTop: 5,
  },
});
