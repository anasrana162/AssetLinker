import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity, NativeModules } from 'react-native'
import React, { useState } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';

const { StatusBarManager: { HEIGHT } } = NativeModules;
const width = Dimensions.get("screen").width
const height = Dimensions.get("screen").height - HEIGHT

const ConstructionStatus = ({
    constructionStatus_corner,
    constructionStatus_open,
    valueCorner,
    valueOpen,
    selected_constructionStatus_corner,
    selected_constructionStatus_open,
}) => {

    const [cornerDropDown, setCornerDropDown] = useState(valueCorner || "Select Open")
    const [openDropDown, setOpenDropDown] = useState(valueOpen || "Select Open")
    const [dropDownOpenedOf, setDropDownOpenedOf] = useState('')
    const [cornerDropDownOpen, setCornerDropDownOpen] = useState(false)
    const [openDropDownOpen, setOpenDropDownOpen] = useState(false)

    const showDropDowns = (key) => {
        switch (key) {
            case "corner":
                setImmediate(() => {
                    setCornerDropDownOpen(!cornerDropDownOpen)
                    setDropDownOpenedOf("corner")
                    setOpenDropDownOpen(false)
                })
                break;
            case "open":
                setImmediate(() => {
                    setOpenDropDownOpen(!openDropDownOpen)
                    setDropDownOpenedOf("open")
                    setCornerDropDownOpen(false)
                })
                break;
        }
    }

    const valueSelected = (item, key) => {
        switch (key) {
            case "corner":
                setCornerDropDownOpen(!cornerDropDownOpen)
                setCornerDropDown(item)
                selected_constructionStatus_corner(item)
                break;
            case "open":
                setOpenDropDownOpen(!openDropDownOpen)
                setOpenDropDown(item)
                selected_constructionStatus_open(item)
                break;
        }
    }


    const SmallDropDown = ({ data }) => {
        return (
            <View style={styles.dropDown_main_cont}>
                {
                    data.map((item, index) => {
                        console.log(item)
                        return (
                            <TouchableOpacity
                                onPress={() => valueSelected(item, dropDownOpenedOf)}
                                style={styles.item_cont}>
                                <Text style={styles.item_text}>{item}</Text>
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
        )
    }

    return (
        <View style={styles.construction_status_cont}>
            <Text
                style={styles.construction_status_text}>
                Construction Status
            </Text>
            {/* Corner */}
            <View style={styles.construction_status_small_cont}>

                <TouchableOpacity
                    onPress={() => showDropDowns("corner")}
                    style={styles.small_dropdown}>
                    <Text style={styles.small_dropdown_value_text}>{cornerDropDown == "Null" ? "Select Corner" : cornerDropDown}</Text>
                    <AntDesign name="down" size={20} color="grey" />
                </TouchableOpacity>

                {cornerDropDownOpen && <SmallDropDown data={constructionStatus_corner} />}

            </View>

            {/* Open */}
            <View style={styles.construction_status_small_cont}>

                <TouchableOpacity
                    onPress={() => showDropDowns("open")}
                    style={styles.small_dropdown}>
                    <Text style={styles.small_dropdown_value_text}>{openDropDown == "Null" ? "Select Open" : openDropDown}</Text>
                    <AntDesign name="down" size={20} color="grey" />
                </TouchableOpacity>

                {openDropDownOpen && <SmallDropDown data={constructionStatus_open} />}

            </View>
        </View>
    )
}

export default ConstructionStatus



const styles = StyleSheet.create({
    construction_status_text: {
        color: 'black',
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '500',
        position: "absolute",
        // left: 10,
        top: 0
    },
    small_dropdown_value_text: {
        fontSize: 16,
        fontWeight: "500",
        color: "black",
    },
    construction_status_cont: {
        width: width - 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        // borderWidth: 1,
        marginTop: 10,
        marginBottom: 20,
    },
    construction_status_small_cont: {
        width: "42%",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 35,
        // height: 30,
    },
    small_dropdown: {
        width: 140,
        height: 40,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        borderWidth: 1
    },
    dropDown_main_cont: {
        marginTop: 5,

        width: 140,
        alignItems: "center",
        // padding: 5,
        borderWidth: 1
    },
    item_cont: {
        width: "100%",
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        borderBottomWidth: 1,
    },
    item_text: {
        fontSize: 16,
        fontWeight: "500",
        color: 'rgb(0,88,200)',
    }
})