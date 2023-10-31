import {
  Text,
  StyleSheet,
  View,
  NativeModules,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { Component } from "react";
import Colors from "../../config/Colors";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesign from 'react-native-vector-icons/AntDesign'
import AssetLinkers from "../../api/AssetLinkers";
import LoadingModal from "../../components/LoadingModal";

const {
  StatusBarManager: { HEIGHT },
} = NativeModules;
const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height - HEIGHT;

export default class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buyerSeller: [],
      builder: [],
      consultant: [],
      all: [],
    };
  }

  async allUser() {
    try {
      const res = await AssetLinkers.get("/allUser");
      const data = res?.data?.response;
      this.setState({ all: data });
      data.map((item, index) => {
        if (item?.user_type === "buyer_seller") {
          this.setState({ buyerSeller: [item] });
          console.log(item, "=========Buyer Seller===========");
        } else if (item?.user_type === "estate_agent") {
          this.setState({ consultant: [item] });
          console.log(item, "=========Consultant===========");
        } else if (item?.user_type === "builder") {
          this.setState({ builder: [item] });
          console.log(item, "=========builder===========");
        }
      });
    } catch (error) {
      console.log("All Users Api Error: ", error);
    }
  }

  handler(label) {
    let stateToNavigate = null;
    switch (label) {
      case "buyer / seller":
        stateToNavigate = this.state.buyerSeller;
        break;
      case "builder":
        stateToNavigate = this.state.builder;
        break;
      case "consultant":
        stateToNavigate = this.state.consultant;
        break;
      case "all":
        stateToNavigate = this.state.all;
    }

    this.props.navigation.navigate("AccountsList", { data: stateToNavigate });
  }

  componentDidMount() {
    this.allUser();
  }

  render() {
    // console.log(this.state.all, "=========All Users===========");
    const accountCategory = ["buyer / seller", "builder", "consultant", "all"];
    const LongButton = ({ label }) => (
      <TouchableOpacity
        onPress={() => this.handler(label)}
        activeOpacity={0.8}
        style={styles.longBTN}
      >
        <Text style={styles.btnTitle}>{label}</Text>
        <MaterialCommunityIcons
          name="chevron-right-circle"
          size={25}
          color={"#0006"}
        />
      </TouchableOpacity>
    );

    const loading = this.state.all.length > 0 ? false : true;
    return (
      <>
        <LoadingModal loading={loading} />
        <View style={styles.mainContainer}>
          <TouchableOpacity
            onPress={() => this.props?.navigation.pop()}
            style={{
              alignSelf: "flex-start",
              flexDirection: "row",
              alignItems: "center",
              marginLeft:10,
              marginBottom:20
            }}>
            <AntDesign name="leftcircleo" size={30} color="black" />
            <Text style={{ fontSize: 14, color: "black", fontWeight: "500", marginLeft: 5, }}>Go Back</Text>
          </TouchableOpacity>
          {accountCategory.map((catName, index) => (
            <LongButton label={catName} key={index} />
          ))}
        </View>
      </>
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
    paddingTop: 20,
  },
  longBTN: {
    backgroundColor: Colors.apple,
    height: 45,
    width: width - 20,
    marginBottom: 10,
    elevation: 5,
    borderRadius: 10,
    paddingHorizontal: 20,
    borderWidth: 0.5,
    borderColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  btnTitle: {
    color: "#000",
    fontSize: 16,
    // fontWeight: "400",
    textTransform: "uppercase",
  },
});
