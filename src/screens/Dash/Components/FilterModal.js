import { StyleSheet, Text, View, Dimensions, NativeModules, TouchableOpacity, Modal, ScrollView } from 'react-native'
const {
    StatusBarManager: { HEIGHT },
} = NativeModules;
const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;
import React, { useState } from 'react'
import ButtonList from '../../Post/Components/ButtonList';
import CustomTextInp from '../../Post/Components/CustomTextInp';
import { listOfArea, Property_Types1, sale_rent, Location_Bahria, Location_DHA_City } from '../../Post/DataArrays';

const FilterModal = ({ visible, onFilterPress, onSearch }) => {
    const [openLocation, setOpenLocation] = useState("")
    const [locationData, setLocationData] = useState([])
    return (
        <Modal
            visible={visible}
            animationType='slide'
            transparent={true}

        >
            <TouchableOpacity
                onPress={onFilterPress}
                style={styles.backgroundCont}>

                <Text>FilterModal</Text>
            </TouchableOpacity>
            <View style={styles.mainContainer}>
                <ScrollView>
                    < ButtonList
                        data={listOfArea}
                        titleSale={"Search By Area"}
                        onSelectValue={(val) => {
                            if (val == "DHA") {
                                setOpenLocation("dha")
                                setLocationData(Location_DHA_City)
                            } else if (val == "Bahria Town") {
                                setOpenLocation("bahria")
                                setLocationData(Location_Bahria)
                            } else {

                                onSearch(val)
                                onFilterPress()
                            }
                        }}
                        style={{ marginTop: 20 }}
                        styleTitle={{ marginLeft: 20 }}
                    />
                    {openLocation !== "" && < ButtonList
                        data={locationData}
                        titleSale={""}
                        onSelectValue={(val) => {
                            // console.log("value",val)
                                onSearch(val)
                                onFilterPress()
                            
                        }}
                        // style={{ marginTop: 20 }}
                        styleTitle={{ marginLeft: 20 }}
                    />}

                    < ButtonList
                        data={Property_Types1}
                        titleSale={"Search By Category"}
                        onSelectValue={(val) => {
                            onSearch(val)
                            onFilterPress()
                        }}
                        style={{ marginTop: 20 }}
                        styleTitle={{ marginLeft: 20 }}
                    />
                    < ButtonList
                        data={sale_rent}
                        titleSale={"Search By Sale/Rent"}
                        onSelectValue={(val) => {
                            onSearch(val)
                            onFilterPress()
                        }}
                        style={{ marginTop: 20 }}
                        styleTitle={{ marginLeft: 20 }}
                    />

                    {/* <CustomTextInp
                        titleEN={"Search By Plot Type"}
                        placeholder={"Plot Type"}
                        onChangeText={(val) => {
                            onSearch(val)
                            // onFilterPress()
                        }
                        }
                        onEndEditing={onFilterPress}
                        style={{ marginLeft: 10, }}
                    /> */}
                    <CustomTextInp
                        titleEN={"Search By Price"}
                        placeholder={"Maximum Price"}
                        onChangeText={(val) => {
                            onSearch(val)
                            // onFilterPress()
                        }
                        }
                        onEndEditing={onFilterPress}
                        style={{ marginLeft: 10, }}
                    />
                </ScrollView>
            </View>
        </Modal>
    )
}

export default FilterModal

const styles = StyleSheet.create({
    backgroundCont: {
        width: width,
        height: height - 170,
        // alignSelf:"flex-end",
        backgroundColor: "rgba(52,52,52,0.4)",
        position: "absolute",
        bottom: 0,
        zIndex: 300,

    },
    mainContainer: {
        width: width,
        height: height - 260,
        backgroundColor: "white",
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        position: "absolute",
        bottom: 0,
        zIndex: 300,
    }
})