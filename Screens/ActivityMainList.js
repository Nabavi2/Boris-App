import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Share,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ActivityMainList(props) {
  const [favoriteList, setFavoriteList] = useState([]);
  const [archiveList, setArchiveList] = useState([]);

  const getFavoriteList = async () => {
    const list = await AsyncStorage.getItem("addedLikedItems");
    setFavoriteList(JSON.parse(list).addedLikedItems);
  };
  useEffect(() => {
    getFavoriteList();
  }, []);

  const onHandleFinishedActivity = (index, data) => {
    const secondFavoriteList = favoriteList.filter((item, ind) => {
      archiveList.push(item);
      let archivelist = { archiveList: archiveList };
      AsyncStorage.setItem("archiveList", JSON.stringify(archivelist));
      return ind != index;
    });
    console.log("ARCHIVE LIST", archiveList);
    setFavoriteList(secondFavoriteList);
  };
  const onShare = async (data) => {
    try {
      const sharedActivity = JSON.stringify(data);
      await Share.share({
        message:
          "This my activity for today that I want to share with you " +
          sharedActivity,
      });
      console.log("DATATATATATshare", JSON.stringify(data));
    } catch (error) {
      alert(error.message);
    }
  };
  const Item = ({ data, index }) => {
    return (
      <View style={styles.cart}>
        <Text>Accessibility: {data.accessibility}</Text>
        <Text>Activity: {data.activity}</Text>
        <Text>Key: {data.key}</Text>
        <Text>Participants: {data.participants}</Text>
        <Text>Price: {data.price}</Text>
        <Text>Type: {data.type}</Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            alignSelf: "flex-end",
          }}
        >
          <FontAwesome
            name="share-square-o"
            size={28}
            color="black"
            onPress={() => onShare(data)}
          />
          <TouchableOpacity
            onPress={() => {
              onHandleFinishedActivity(index, data);
              props.navigation.navigate("ArchiveListScreen");
            }}
            style={styles.finishBtn}
          >
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>
              Finish
            </Text>
          </TouchableOpacity>
        </View>
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
      <Text style={styles.title}>Main List</Text>
      <FlatList
        contentContainerStyle={{ paddingBottom: 20 }}
        data={favoriteList}
        renderItem={({ item, index }) => <Item data={item} index={index} />}
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
  cart: {
    paddingHorizontal: 10,
    paddingTop: 10,
    marginTop: 10,
    backgroundColor: "#b4b8b5",
    elevation: 0.5,
    width: "95%",
    borderRadius: 10,
    alignSelf: "center",
    // marginBottom: -50,
  },
  finishBtn: {
    width: 70,
    height: 34,
    backgroundColor: "#fc8d30",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    alignSelf: "flex-end",
    marginBottom: 10,
    marginLeft: 30,
  },
});
