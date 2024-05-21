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
    ScrollView,
} from "react-native";
import { useState } from "react";
import { Colors } from "../../config";
import AssetLinkers, { ImagePath } from "../../api/AssetLinkers";
import { Component } from "react";

{
    /* {---------------Icons------------} */
}
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from "react-native-vector-icons/Entypo";
import Feather from "react-native-vector-icons/Feather";
{
    /* {---------------Redux Imports------------} */
}
import { connect } from "react-redux";
import * as userActions from "../../redux/actions/user";
import { bindActionCreators } from "redux";
import LoadingModal from "../../components/LoadingModal";

const {
    StatusBarManager: { HEIGHT },
} = NativeModules;
const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height - HEIGHT;

class BlockedUsers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blockedUsers: null,
            loader: false,
        };
    }


    onPress = (key) => {
        switch (key) {
            case "goback":
                this.props.navigation.goBack();
                break;
        }
    };

    componentDidMount = () => {
        this.fetchBlockedUsers()
    }

    fetchBlockedUsers = () => {
        var { userData: { user } } = this.props
        // console.log("User Data",user);
        setImmediate(() => {
            this.setState({
                loader: true,
            })
        })
        AssetLinkers.post("/all_block_users", {
            user_id: user?.id
        }).then((res) => {
            // console.log("Res Fetch Blocked users:", res?.data?.response);
            if (res?.data?.success == true) {

                setImmediate(() => {
                    this.setState({
                        blockedUsers: res?.data?.response,
                        loader: false,
                    })
                })
            } else {
                setImmediate(() => {
                    this.setState({

                        loader: false,
                    })
                })
            }
        }).catch((err) => {
            setImmediate(() => {
                this.setState({
                    loader: false,
                })
            })
            console.log("Err Fetch Blocked users:", err);
        })
    }

    unBlock = (user_id) => {
        console.log("Unblock Function", user_id);
        var { userData: { user } } = this.props
        this.setState({
            loader: true
        })
        AssetLinkers.post("Unblock_user", {
            "user_id": user?.id,
            "unblock_user_id": user_id
        }).then((res) => {
            if (res?.data?.success == true) {
                console.log("Res Unbloack User", res?.data);
                this.setState({
                    loader: false,
                })
                this.fetchBlockedUsers()
            } else {
                alert(res?.data?.message)
                this.setState({
                    loader: false,
                })
            }

        }).catch((err) => {
            console.log("Err Unblock User", err);
            this.setState({
                loader: false,
            })
        })

    }

    CustomerContainer = ({ data }) => {

        const { user_id, created_at } = data?.detail[0];
        var user_type = "";
        switch (data?.user_type) {
            case "buyer_seller":
                user_type = "Buyer/Seller";
                break;
            case "estate_agent":
                user_type = "Consultant";
                break;
            case "builder":
                user_type = "Builder";
                break;
        }
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
                        <>
                            <View style={styles.tagContainer}>
                                <Text numberOfLines={1} style={styles.designation}>
                                    {data?.detail[0]?.designation}
                                </Text>
                            </View>
                        </>
                    }
                    <View style={styles.tagContainer}>
                        <Text style={styles.tagLabel}>
                            {user_type}
                        </Text>
                    </View>
                </View>


                {/* View Project Button */}
                <View style={styles.box3}>
                    <Text style={styles.msID}>MS #{data?.ms_id}</Text>
                    <TouchableOpacity
                        onPress={() => this.unBlock(data?.id)}
                        activeOpacity={0.5}
                        style={styles.viewBTN}
                    >
                        <Text style={styles.viewBTNlabel}>Unblock</Text>
                        <Entypo name="chevron-thin-right" size={14} color={Colors.blue} />
                    </TouchableOpacity>
                </View>
            </View>
        );
    };
    render() {


        return (
            <View style={styles.mainContainer}>
                {this.state.loader && <LoadingModal />}
                {/* Header */}
                <View style={styles.headerCont}>
                    {/* Back Button */}
                    <TouchableOpacity
                        style={{ position: "absolute", left: 10 }}
                        onPress={() => this.onPress("goback")}
                    >
                        <Feather name="chevron-left" size={30} color="white" />
                    </TouchableOpacity>

                    {/* Title */}
                    <Text style={styles.headerTitle}>Blocked Users</Text>

                </View>

                <ScrollView >

                    <FlatList
                        data={this.state.blockedUsers}
                        scrollEnabled={false}
                        contentContainerStyle={{
                            width: width - 20,
                            alignSelf: "center",
                            alignItems: "center"
                        }}
                        ListEmptyComponent={() => {
                            return (
                                <>
                                    {
                                        this.state.loader == true ?
                                            <>
                                            </>
                                            :
                                            <View style={styles.emptyitemCont}>
                                                <Text style={[styles.headerTitle,{color:'black'}]}>List is Empty</Text>
                                            </View>
                                    }
                                </>
                            )
                        }}
                        renderItem={({ item, index }) => {
                            return <this.CustomerContainer data={item} key={index} />;
                        }}
                    />

                </ScrollView>

            </View>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(BlockedUsers);
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
    headerCont: {
        width: width,
        height: 60,
        paddingVertical: 5,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.blue,
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: "600",
        color: "white",
    },
    emptyitemCont: {
        width: width - 20,
        height: 120,
        backgroundColor: "white",
        justifyContent:"center",
        alignItems:"center",
        marginVertical: 10
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
    designation: { color: "white", fontWeight: "700", fontSize: 12, textAlign: "center", paddingVertical: 3, letterSpacing: 1 },
    tagContainer: {
        backgroundColor: Colors.blue,
        borderRadius: 20,
        width: 110,
        paddingHorizontal: 10,
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
    box2: { width: "48%", rowGap: 3, },
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
})