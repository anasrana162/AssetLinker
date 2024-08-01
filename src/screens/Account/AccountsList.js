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
  Modal,
  Pressable
} from "react-native";
import { useState, PureComponent } from "react";
import { Colors } from "../../config";
import Entypo from "react-native-vector-icons/Entypo";
import { useNavigation } from "@react-navigation/native";
import { ImagePath } from "../../api/AssetLinkers";
import { useEffect } from "react";
import AntDesign from 'react-native-vector-icons/AntDesign'
import { cleanSingle } from "react-native-image-crop-picker";
const {
  StatusBarManager: { HEIGHT },
} = NativeModules;
const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height - HEIGHT;

const AccountsList = (props) => {
  const [searchInput, setSearchInput] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [imageSelected, setImageSelected] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const data = props.route?.params?.data;

  // console.log(searchInput, "~~~~~~~~~~~~~", filteredData.length);
  const delay = setTimeout(() => {
    const normalizedInput = searchInput.toLowerCase();

    const filteredUser = data.filter((user) => {
      const matchesName = user?.name?.toLowerCase().includes(normalizedInput);
      const matchesMSID = user?.ms_id?.toLowerCase().includes(normalizedInput);

      const matchesDetail = user?.detail.some((detail) => {
        return (
          detail?.real_estate_name?.toLowerCase().includes(normalizedInput) ||
          detail?.frim_name?.toLowerCase().includes(normalizedInput)
        );
      });

      return matchesName || matchesDetail || matchesMSID;
    });

    if (filteredUser.length > 0) {
      setFilteredData(filteredUser);
    }
  }, 300);

  useEffect(() => {
    return () => clearTimeout(delay);
  }, [searchInput]);
  // data.sort((a, b) => a.name.localeCompare(b.name))

  const openImageDetailModal = (image) => {
    console.log("opening");
    setImageSelected(image)
    setOpenModal(!openModal)
  }

  return (
    <View style={styles.mainContainer}>
      {/* {console.log(data)} */}
      <SearchBar onChangeText={(i) => setSearchInput(i)} navProps={props?.navigation} />
      <FlatList
        data={filteredData.length == 0 ? data?.sort((a, b) => a?.name?.localeCompare(b?.name)) : filteredData?.sort((a, b) => a?.name?.localeCompare(b?.name))}
        renderItem={({ item, index }) => {
          // console.log(item, "~~~~~~ITEM~~~~~~~");
          return <CustomerContainer
            data={item}
            key={index}
            navigation={props?.navigation}
            openImageModal={(image) => openImageDetailModal(image)}
          />;
        }}
      />

      <Modal
        visible={openModal}
        transparent={true}
      >
        <View style={styles.mainModalCont}>

          <Pressable
            onPress={() => openImageDetailModal()}
            style={styles.modalBackgroundClose}>
          </Pressable>

          <View style={styles.smallModalCont}>
            <Image
              source={{ uri: imageSelected }}
              style={{ width: "95%", height: "95%" }}
            />
          </View>
        </View>


      </Modal>

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

class CustomerContainer extends PureComponent {



  getUserType = (type) => {
    switch (type) {
      case "buyer_seller":
        return "Buyer/Seller";
      case "estate_agent":
        return "Consultant";
      case "builder":
        return "Builder";
      default:
        return "";
    }
  };

  render() {
    const { data, navigation, openImageModal } = this.props;
    // console.log("this.props.navigation",this.props.navigation);
    const { user_id, created_at } = data?.detail[0];
    const user_type = this.getUserType(data?.user_type);

    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("AccountDetail", {
            user_id: user_id,
            created_at: created_at,
            image: data?.image,
            name: data?.name,
            designation: data?.detail[0]?.designation,
            user_type: user_type,
          })
        }
        style={styles.customerMain}>
        <TouchableOpacity
          onPress={() => openImageModal(`${ImagePath}/${data?.image}`)}
          style={{ width: "22%", zIndex: 20 }}>
          <Image
            source={
              data?.image
                ? { uri: `${ImagePath}/${data?.image}` }
                : require("../../../assets/placeholderPost.jpeg")
            }
            style={styles.img}
          />
        </TouchableOpacity>

        <View style={[styles.box2, { width: "48%" }]}>
          <Text style={styles.name} numberOfLines={2}>
            {data?.detail[0]?.real_estate_name ||
              data?.detail[0]?.frim_name ||
              data?.name}
          </Text>
          {data?.detail[0]?.designation ? (
            <View style={[styles.tagContainer, { backgroundColor: Colors.light_blue }]}>
              <Text numberOfLines={1} style={styles.designation}>
                {data?.detail[0]?.designation}
              </Text>
            </View>
          ) : null}
          <View style={styles.tagContainer}>
            <Text style={styles.tagLabel}>
              {user_type}
            </Text>
          </View>
        </View>

        {/* View Project Button */}
        <View style={styles.box3}>
          <Text style={styles.msID}>MS #{data?.ms_id}</Text>
          <View

            activeOpacity={0.5}
            style={styles.viewBTN}
          >
            <Text style={styles.viewBTNlabel}>View Project</Text>
            <Entypo name="chevron-thin-right" size={14} color={Colors.blue} />
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

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
  mainModalCont: {
    width: width,
    height: height,
    marginTop: HEIGHT,
    justifyContent: "center",
    alignItems: "center"
  },

  modalBackgroundClose: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(52,52,52,0.4)",
    position: "absolute",
    zIndex: 30,
  },
  smallModalCont: {
    width: width - 140,
    height: 270,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000000",
    position: "absolute",
    borderRadius:10,
    overflow:"hidden",
    zIndex: 50
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
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  img: { width: 60, height: 60, borderRadius: 10 },
  name: { color: "black", fontWeight: "700", fontSize: 15, letterSpacing: 1 },
  designation: { color: "white", fontWeight: "800", fontSize: 12, textAlign: "center", paddingVertical: 3, letterSpacing: 1 },
  tagContainer: {
    backgroundColor: Colors.blue,
    borderRadius: 20,
    // width: 110,
    paddingHorizontal: 10,
    // paddingHorizontal: 2
  },
  tagLabel: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
    textTransform: "capitalize",
    paddingVertical: 3,
    letterSpacing: 1,
    textAlign: "center",
  },
  msID: {
    color: "#0005",
    fontWeight: "600",
    fontSize: 16,
  },
  box2: {
    width: "48%",
    justifyContent: "center",
    alignItems: "flex-start",
    rowGap: 3,
  },
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
