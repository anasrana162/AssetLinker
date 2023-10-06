import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity } from 'react-native'
import React from 'react'

const width = Dimensions.get("screen").width

const SelectType = ({ Property_Types, Category_Selected, sale_Rent }) => {

    const [selected_cat, setSelected_cat] = React.useState("Commercial")

    const SelectedCategory = (val) => {
        // console.log("selected Value", val)
        switch (val) {
            case "Commercial":
                setSelected_cat(val)
                Category_Selected(val)
                break;
            case "Residential":
                setSelected_cat(val)
                Category_Selected(val)
                break;
            case "Plot":
                setSelected_cat(val)
                Category_Selected(val)
                break;
        }
    }

    return (
        <View style={styles.mainContainer}>
            {/* Title */}
            <Text style={styles.title}>Select Type*</Text>

            {/* Type Options */}
            <View style={styles.inner_container}>

                {/* Icon Container */}
                <View style={styles.home_icon_cont}>
                    <Image
                        source={require('../../../../assets/SvgHouse.png')}
                        style={{ height: 35, width: 35 }}
                    />
                </View>

                {/* Types Container */}
                <View style={styles.property_types_cont}>
                    <Text style={[styles.title, { fontSize: 16 }]}>Property For Sale</Text>

                    {/* Type list */}
                    <View style={styles.horizontal_list_cont}>
                        {
                            Property_Types.map((type, index) => {
                                // console.log("type", sale_Rent,index)
                                return (
                                    <View key={String(index)}>
                                        {sale_Rent == "Rent" ?
                                            <>
                                                {index <= 1 && <TouchableOpacity
                                                    onPress={() => SelectedCategory(type?.type)}
                                                    style={[styles.type_btn, {
                                                        backgroundColor: type?.type == selected_cat ? '#144272' : '#2C74B3'
                                                    }]}
                                                >
                                                    <Text style={styles.type_btn_text}>{type?.type}</Text>
                                                </TouchableOpacity>}
                                            </>
                                            :
                                            <TouchableOpacity
                                                onPress={() => SelectedCategory(type?.type)}
                                                style={[styles.type_btn, {
                                                    backgroundColor: type?.type == selected_cat ? '#144272' : '#2C74B3'
                                                }]}
                                            >
                                                <Text style={styles.type_btn_text}>{type?.type}</Text>
                                            </TouchableOpacity>
                                        }
                                    </View>

                                )
                            })
                        }
                    </View>

                </View>
            </View>
        </View>
    )
}

export default SelectType

const styles = StyleSheet.create({
    mainContainer: {
        width: width - 20,
        alignSelf: "center",
        alignItems: "flex-start",
    },
    inner_container: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        marginTop: 10
    },
    home_icon_cont: {
        height: 60,
        width: 60,
        backgroundColor: '#E8C4C4',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    property_types_cont: {
        marginLeft: 10,
        justifyContent: "center",
        alignItems: "flex-start",
    },
    horizontal_list_cont: {
        marginTop: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around"
    },
    type_btn: {
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        height: 30,
        paddingHorizontal: 8,
        borderRadius: 5,
        marginHorizontal: 5,
        zIndex: 10,
    },
    type_btn_text: {
        color: '#fff',
        fontSize: 15,
        alignSelf: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
        color: "black",
    },
})