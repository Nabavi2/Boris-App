/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
import React, { useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import axios from "axios";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Menu, RadioButton } from "react-native-paper";

export default SearchScreen = (props) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [searchItem, setSearchItem] = useState("");
  const [error, setError] = useState("");
  const [isClick, setIsClick] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [text, setText] = useState("");

  const [filterList, setFilterList] = useState([
    { name: "Activity", isSelected: true, text: "activity" },
    { name: "Accessibility", isSelected: false, text: "accessibility" },
    { name: "Participants", isSelected: false, text: "participants" },
    { name: "Type", isSelected: false, text: "type" },
    { name: "Price", isSelected: false, text: "price" },
  ]);
  {
    /* Search function handler */
  }
  const searchHandler = async (item) => {
    if (!searchItem) {
      return;
    }
    setLoading(true);

    await axios
      .get(`http://www.boredapi.com/api/activity?${text}=${item}`)
      .then((Response) => {
        if (Response.data.error) {
          setError(Response.data.error);
          setData();
        }
        setData(Response.data);
        setLoading(false);
        searchHistory.push(Response.data);
        let ob = { searchHisList: searchHistory };
        AsyncStorage.setItem("searchHistory", JSON.stringify(ob));
      })
      .catch((error) => {
        console.log(error);
      });
  };
  {
    /* Filter Function Handler*/
  }
  const onFilterHandleChange = (ind, text) => {
    let newArray = filterList.map((item, index) => {
      index == ind ? (item.isSelected = true) : (item.isSelected = false);
      setText(text);
      return { ...item };
    });
    setFilterList(newArray);
  };

  if (loading) {
    return (
      <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
        <ActivityIndicator size="large" color="#d6a242" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
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
            onChangeText={(text) => setSearchItem(text)}
            value={searchItem}
            placeholder={`Add ${text}`}
            style={styles.searchInput}
          />
          <MaterialIcons
            name="search"
            size={28}
            color="black"
            onPress={() => {
              setIsClick(true);
              searchHandler(searchItem);
            }}
          />
        </View>
        {/* History button */}
        <MaterialIcons
          name="history"
          size={28}
          color="black"
          onPress={() => {
            props.navigation.navigate("HistoryScreen");
          }}
          style={styles.historyBtn}
        />
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
                  color="#cca152"
                />
              </TouchableOpacity>
            }
          >
            <View>
              {filterList.map((item, index) => (
                <>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <RadioButton.Android
                      color="#cca152"
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
      {!searchItem && isClick ? (
        <Text style={{ marginLeft: 20, color: "red" }}>
          Please fill the form and try again
        </Text>
      ) : null}

      {data ? (
        <View style={{ paddingHorizontal: 27, marginTop: 10 }}>
          <Text>{data.accessibility}</Text>
          <Text>{data.activity}</Text>
          <Text>{data.key}</Text>
          <Text>{data.link}</Text>
          <Text>{data.participants}</Text>
          <Text>{data.price}</Text>
          <Text>{data.type}</Text>
        </View>
      ) : (
        <Text
          style={{
            marginLeft: 20,
            marginTop: 20,
            color: "black",
            fontWeight: "bold",
          }}
        ></Text>
      )}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  inputContainer: {
    width: "75%",
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
  historyBtn: {
    width: "8%",
    marginLeft: 10,
    marginRight: -10,
    marginTop: 10,
  },
  filterBtnContainer: {
    width: "15%",
    height: 37,
    borderRadius: 8,
    marginTop: 10,
    marginLeft: 6,
    justifyContent: "center",
    alignItems: "center",
  },
});
