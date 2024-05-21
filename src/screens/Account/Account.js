import {
  Text,
  StyleSheet,
  View,
  NativeModules,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { Component } from "react";
import Colors from "../../config/Colors";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesign from 'react-native-vector-icons/AntDesign'
import AssetLinkers, { ImagePath } from "../../api/AssetLinkers";
import LoadingModal from "../../components/LoadingModal";
import moment from "moment";

{
  /* {---------------Redux Imports------------} */
}
import { connect } from "react-redux";
import * as userActions from "../../redux/actions/user";
import { bindActionCreators } from "redux";

const {
  StatusBarManager: { HEIGHT },
} = NativeModules;
const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height - HEIGHT;

class Account extends Component {
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
    var { buyerSeller, consultant, builder } = this.state
    try {
      const res = await AssetLinkers.post("/allUser/details", {
        "current_user_id": this.props?.userData?.user?.detail[0]?.user_id
      });
      const data = res?.data?.response;
      this.setState({ all: data });
      data.map((item, index) => {
        if (item?.user_type === "buyer_seller") {
          buyerSeller.push(item)
          this.setState({ buyerSeller });
          console.log(item, "=========Buyer Seller===========");
        } else if (item?.user_type === "estate_agent") {
          consultant.push(item)
          this.setState({ consultant });
          console.log(item, "=========Consultant===========");
        } else if (item?.user_type === "builder") {
          builder.push(item)
          this.setState({ builder });
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
    this.checkCallBacks()
  }

  checkCallBacks = () => {
    this.props.navigation.addListener("focus", async () => {
      // console.log("checkcallbacks", this.props?.route?.params);
      if (this.props?.route?.params == undefined) {
        console.log("No callabacks");
      } else {
        var { refresh } = this.props?.route?.params;
        // console.log("refresh", refresh)
        if (refresh == "refresh") {
          console.log("Callbacks initiated");
          this.props.navigation.setParams({ refresh: null });
          this.setState({
            buyerSeller: [],
            builder: [],
            consultant: [],
            all: [],
          })
          this.allUser();
        }

        //this.ScrollToRefresh();
      }
      //  console.log("Refreshing");
    });
  };

  render() {

    // var { user_id, name, image, created_at, designation } = this.props?.route?.params;
    console.log("userData", this.props?.userData?.user?.detail[0]?.user_id)

    var { userData: { user: { name, image, created_at, detail } } } = this.props
    const memberSince = moment(created_at).format("YYYY/MM/DD");

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
          {/* Go back */}
          <TouchableOpacity
            onPress={() => this.props?.navigation.pop()}
            style={{
              alignSelf: "flex-start",
              flexDirection: "row",
              alignItems: "center",
              marginLeft: 10,
              marginBottom: 0
            }}>
            <AntDesign name="leftcircleo" size={30} color="black" />
            <Text style={{ fontSize: 14, color: "black", fontWeight: "500", marginLeft: 5, }}>Go Back</Text>
          </TouchableOpacity>


          {/* Profile Info Cont */}

          <View style={styles.pContainer}>
            <Image
              source={{ uri: `${ImagePath}/${image}` }}
              style={styles.image}
            />
            {/* {console.log("designation", designation)} */}
            <View style={styles.inner_cont}>
              <Text style={styles.text}>{name}</Text>
              {detail[0]?.designation == "" || detail[0]?.designation == undefined ? <></> :
                <View style={{
                  width: 60,
                  height: 25,
                  backgroundColor: Colors.blue,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 5,
                  marginVertical: 3
                  // marginVertical: 3
                }}>
                  <Text style={[styles.text, { fontWeight: "800", fontSize: 15, color: "white", letterSpacing: 1 }]}>{detail[0]?.designation}</Text>
                </View>}
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  columnGap: 5,
                }}>
                <Text
                  style={[styles.text, { fontSize: 13, fontWeight: "300" }]}>
                  Member Since:
                </Text>
                <Text
                  style={[styles.text, { fontSize: 13, fontWeight: "300" }]}>
                  {memberSince}
                </Text>
              </View>
            </View>
          </View>



          {accountCategory.map((catName, index) => (
            <LongButton label={catName} key={index} />
          ))}
        </View>
      </>
    );
  }
}
/* {---------------redux State ------------} */

const mapStateToProps = (state) => ({
  userData: state.userData,
});

{
  /* {---------------redux Actions ------------} */
}
const ActionCreators = Object.assign({}, userActions);
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Account);

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
  pContainer: {
    width: width,
    height: 130,
    // borderWidth: 1,
    marginVertical: 20,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  inner_cont: {
    width: "60%",
    height: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    // borderWidth: 1
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 80,
    marginLeft: 10,
    marginRight: 30,
  },
  text: {
    fontSize: 20,
    fontWeight: "600",
    color: Colors.black,
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
