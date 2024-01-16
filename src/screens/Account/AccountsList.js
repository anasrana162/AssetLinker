import {
  StyleSheet,
  Text,
  TextInput,
  View,
  NativeModules,
  Dimensions,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useState } from "react";
import { Colors } from "../../config";
import Entypo from "react-native-vector-icons/Entypo";
import { useNavigation } from "@react-navigation/native";
import { ImagePath } from "../../api/AssetLinkers";
import { useEffect } from "react";
import AntDesign from 'react-native-vector-icons/AntDesign'
const {
  StatusBarManager: { HEIGHT },
} = NativeModules;
const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height - HEIGHT;

const AccountsList = (props) => {
  const [searchInput, setSearchInput] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const data = props.route?.params?.data;

  // console.log(searchInput, "~~~~~~~~~~~~~", filteredData.length);
  const delay = setTimeout(() => {
    const normalizedInput = searchInput.toLowerCase();

    const filteredUser = data.filter((user) => {
      const matchesName = user?.name?.toLowerCase().includes(normalizedInput);

      const matchesDetail = user?.detail.some((detail) => {
        return (
          detail?.real_estate_name?.toLowerCase().includes(normalizedInput) ||
          detail?.frim_name?.toLowerCase().includes(normalizedInput)
        );
      });

      return matchesName || matchesDetail;
    });

    if (filteredUser.length > 0) {
      setFilteredData(filteredUser);
    }
  }, 300);

  useEffect(() => {
    return () => clearTimeout(delay);
  }, [searchInput]);

  return (
    <View style={styles.mainContainer}>
      <SearchBar onChangeText={(i) => setSearchInput(i)} navProps={props?.navigation} />
      <FlatList
        data={filteredData.length == 0 ? data : filteredData}
        renderItem={({ item, index }) => {
          // console.log(item, "~~~~~~ITEM~~~~~~~");
          return <CustomerContainer data={item} key={index} />;
        }}
      />
    </View>
  );
};

export default AccountsList;

const SearchBar = ({ onChangeText, navProps }) => (
  <View style={styles.searchbar}>
    {/* Back Button */}
    <TouchableOpacity
      onPress={() => navProps?.pop()}
      style={{
        position: "absolute",
        top: 10,
        left: 10,
      }}>
      <AntDesign name="leftcircleo" size={30} color="black" />
    </TouchableOpacity>
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
              : require("../../../assets/placeholderPost.jpeg")
          }
          style={styles.img}
        />
      </View>

      <View style={styles.box2}>
        <Text style={styles.name}>
          {data?.detail[0]?.real_estate_name ||
            data?.detail[0]?.frim_name ||
            data?.name}
        </Text>
        {data?.detail[0]?.designation == undefined || data?.detail[0]?.designation == "" ? <></> :
          <View style={{
            width: 50,
            height: 20,
            borderRadius: 10,
            justifyContent: "center",
            alignItems: 'center',
            backgroundColor: Colors.blue,
          }}>
            <Text style={styles.designation}>
              {data?.detail[0]?.designation}
            </Text>
          </View>}
        <View style={styles.tagContainer}>
          <Text style={styles.tagLabel}>
            {data?.user_type == "estate_agent" ? "Est Cons" : data?.user_type.replace("_", " ")}
          </Text>
        </View>
      </View>

      {/* View Project Button */}
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
    height: 50,
    backgroundColor: Colors.apple,
    padding: 5,
    paddingHorizontal: 10,
    paddingTop: 30
  },
  searchTextInput: {
    color: "#000",
    width: "85%",
    height: 35,
    fontSize: 12,
    backgroundColor: "#fff",
    borderRadius: 50,
    paddingHorizontal: 20,
    position: "absolute",
    top: 10,
    right: 10
  },
  customerMain: {
    width: width - 20,
    height: 90,
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  img: { width: 60, height: 60, borderRadius: 10 },
  name: { color: "black", fontWeight: "600", fontSize: 16 },
  designation: { color: "white", fontWeight: "600", fontSize: 14, letterSpacing: 1 },
  tagContainer: {
    backgroundColor: Colors.blue,
    borderRadius: 20,
    width: 110,
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
  box2: { width: "48%", rowGap: 3 },
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

// frim_name
// real_estate_name
// name
