import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Share,
  TextInput,
} from "react-native";
import { Menu, RadioButton } from "react-native-paper";

import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Header from "../Components/Header";

export default function ActivityMainList(props) {
  const [favoriteList, setFavoriteList] = useState([]);
  const [archiveList, setArchiveList] = useState([]);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [isClick, setIsClick] = useState(false);
  const [activityText, setActivityText] = useState("activity");
  const [searchItem, setSearchItem] = useState("");
  const [newItems, setNewItems] = useState(favoriteList);

  const [filterList, setFilterList] = useState([
    { name: "Activity", isSelected: true, text: "activity" },
    { name: "Accessibility", isSelected: false, text: "accessibility" },
    { name: "Participants", isSelected: false, text: "participants" },
    { name: "Type", isSelected: false, text: "type" },
    { name: "Price", isSelected: false, text: "price" },
  ]);
  {
    /* Get Liked Activity list Handler */
  }
  let list;
  const getLikedList = async () => {
    list = await AsyncStorage.getItem("addedLikedItems");
    setFavoriteList(JSON.parse(list).addedLikedItems);
    setNewItems(JSON.parse(list).addedLikedItems);
  };
  useEffect(() => {
    getLikedList();
  }, []);
  {
    /* Finished task handler*/
  }
  const onHandleFinishedActivity = (index, data) => {
    const secondFavoriteList = favoriteList.filter((item, ind) => {
      if (ind == index) {
        archiveList.push(item);
        AsyncStorage.removeItem("addedLikedItems");
      }

      let archivelist = { archiveList: archiveList };
      AsyncStorage.setItem("archiveList", JSON.stringify(archivelist));
      return ind != index;
    });
    setFavoriteList(secondFavoriteList);
  };
  {
    /* Share task handler*/
  }
  const onShare = async (data) => {
    try {
      const sharedActivity = JSON.stringify(data);
      await Share.share({
        message:
          "This my activity for today that I want to share with you " +
          sharedActivity,
      });
    } catch (error) {
      alert(error.message);
    }
  };
  {
    /* To Do list tasks handler*/
  }
  const onFilterHandleChange = (ind, text) => {
    let newArray = filterList.map((item, index) => {
      index == ind ? (item.isSelected = true) : (item.isSelected = false);
      setActivityText(text);
      return { ...item };
    });
    setFilterList(newArray);
  };

  const onSearchQueryChange = (text) => {
    console.log("NEW ITEMS", newItems);
    setSearchItem(text);

    const newActivities = favoriteList.filter((activity) => {
      return activity[activityText]
        .toString()
        .toLowerCase()
        .includes(text.toString().toLowerCase());
    });
    setFavoriteList(text ? newActivities : newItems);
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
      <Header title="Main List" navigation={props.navigation} />
      <View
        style={{
          flexDirection: "row",
          alignSelf: "center",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={styles.inputContainer}>
          <TextInput
            value={searchItem}
            placeholder={`Add ${activityText}`}
            onChangeText={onSearchQueryChange}
            style={styles.searchInput}
          />
          <MaterialIcons
            name="search"
            size={28}
            color="black"
            onPress={() => {
              setIsClick(true);
              // onSearchQueryChange(searchItem);
            }}
          />
        </View>

        {/* Filter Container */}
        <View style={styles.filterBtnContainer}>
          <Menu
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 10,
            }}
            visible={showFilterMenu}
            contentStyle={{ backgroundColor: "white", paddingRight: 20 }}
            onDismiss={() => setShowFilterMenu(false)}
            anchor={
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => setShowFilterMenu(true)}
              >
                <MaterialCommunityIcons
                  name="filter"
                  size={28}
                  color="#fc8d30"
                />
              </TouchableOpacity>
            }
          >
            <View>
              {filterList.map((item, index) => (
                <>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <RadioButton.Android
                      color="#fc8d30"
                      status={item.isSelected ? "checked" : "unchecked"}
                      onPress={() => {
                        setSearchItem("");
                        setIsClick(false);
                        onFilterHandleChange(index, item.text);
                      }}
                    />
                    <Text>{item.name}</Text>
                  </View>
                </>
              ))}
            </View>
          </Menu>
        </View>
      </View>
      <FlatList
        contentContainerStyle={{ paddingBottom: 20 }}
        data={favoriteList}
        renderItem={({ item, index }) => <Item data={item} index={index} />}
        keyExtractor={(item) => item.key}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
  },
  inputContainer: {
    width: "85%",
    height: 37,
    borderRadius: 8,
    borderColor: "grey",
    borderWidth: 1,
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 10,
    marginLeft: 20,
  },
  searchInput: {
    width: "85%",
    height: 37,
    borderRadius: 8,
    borderColor: "grey",
    paddingHorizontal: 7,
  },
  filterBtnContainer: {
    width: "15%",
    height: 37,
    borderRadius: 8,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
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
