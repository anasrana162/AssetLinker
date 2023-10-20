import {
  StyleSheet,
  Text,
  TextInput,
  View,
  NativeModules,
  Dimensions,
} from "react-native";
import React from "react";
import { Colors } from "../../config";
import { Image } from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FlatList } from "react-native";
import { ImagePath } from "../../api/AssetLinkers";

const {
  StatusBarManager: { HEIGHT },
} = NativeModules;
const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height - HEIGHT;

const AccountsList = ({ route }) => {
  const data = route.params.data;
  // console.log(data, "~~~~~~~~~~~~~");

  return (
    <View style={styles.mainContainer}>
      <SearchBar />
      <FlatList
        data={data}
        renderItem={({ item, index }) => {
          console.log(item, "~~~~~~ITEM~~~~~~~");
          return <CustomerContainer data={item} key={index} />;
        }}
      />
    </View>
  );
};

export default AccountsList;

const SearchBar = ({ onChangeText }) => (
  <View style={styles.searchbar}>
    <TextInput
      style={styles.searchTextInput}
      placeholder="Search here..."
      placeholderTextColor="grey"
      onChangeText={onChangeText}
    />
  </View>
);

const CustomerContainer = ({ data }) => {
  const navigation = useNavigation();
  const { user_id, created_at } = data?.detail[0];
  return (
    <View style={styles.customerMain}>
      <View style={{ width: "22%" }}>
        <Image
          source={
            data?.image
              ? { uri: `${ImagePath}/${data?.image}` }
              : require("../../../assets/placeholder.jpeg")
          }
          style={styles.img}
        />
      </View>

      <View style={styles.box2}>
        <Text style={styles.name}>{data?.name}</Text>
        <View style={styles.tagContainer}>
          <Text style={styles.tagLabel}>
            {data?.user_type.replace("_", " ")}
          </Text>
        </View>
      </View>

      <View style={styles.box3}>
        <Text style={styles.msID}>MS #{data?.ms_id}</Text>
        <TouchableOpacity
          onPress={() =>
            navigation.push("AccountDetail", {
              user_id: user_id,
              created_at: created_at,
              image: data?.image,
              name: data?.name,
            })
          }
          activeOpacity={0.5}
          style={styles.viewBTN}
        >
          <Text style={styles.viewBTNlabel}>View Project</Text>
          <Entypo name="chevron-thin-right" size={14} color={Colors.blue} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: width,
    height: height,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "white",
    rowGap: 10,
  },
  searchbar: {
    width: width,
    height: 52,
    backgroundColor: Colors.apple,
    padding: 5,
    paddingHorizontal: 10,
  },
  searchTextInput: {
    color: "#000",
    backgroundColor: "#fff",
    borderRadius: 50,
    paddingHorizontal: 20,
  },
  customerMain: {
    width: width - 20,
    height: 80,
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  img: { width: 60, height: 60, borderRadius: 10 },
  name: { color: "#000", fontWeight: "600", fontSize: 16 },
  tagContainer: {
    backgroundColor: Colors.blue,
    borderRadius: 20,
    width: 100,
  },
  tagLabel: {
    color: "#fff",
    fontSize: 12,
    textTransform: "capitalize",
    paddingVertical: 3,
    textAlign: "center",
  },
  msID: {
    color: "#0005",
    fontWeight: "600",
    fontSize: 16,
  },
  box2: { width: "48%", rowGap: 15 },
  box3: { width: "30%", rowGap: 15, paddingLeft: 15 },
  viewBTN: {
    flexDirection: "row",
    alignItems: "center",
  },
  viewBTNlabel: {
    color: Colors.blue,
    fontWeight: "400",
    fontSize: 14,
  },
});
