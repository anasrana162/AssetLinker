import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity, NativeModules } from 'react-native'
import React, { useState } from 'react'
import ButtonList from './ButtonList'
import CustomTextInp from './CustomTextInp'
import LocationDropDown from './LocationDropDown'
import AntDesign from 'react-native-vector-icons/AntDesign';
import ConstructionStatus from './ConstructionStatus'
const { StatusBarManager: { HEIGHT } } = NativeModules;
const width = Dimensions.get("screen").width
const height = Dimensions.get("screen").height - HEIGHT

const Options = ({
    Category_Selected,
    selectTypeData,
    onChangeText,
    commercialCategories,
    residentialCategories,
    locationDropdownData,
    onLocationSelect,
    openLocationDropdown,
    location,
    constructionStatus_corner,
    constructionStatus_open,
    PlotYards,
    PlotPhase,
    Area_Unit,
    Rooms,
    furnishes,
    bedrooms,
    bathrooms,
    Location_Bahria,
    Location_DHA_City,
    onSelectValue,
    propertCategorySelected,
}) => {
    const [yardSelected, setYardselected] = useState(false)
    // console.log("selectTypeData", selectTypeData)
    return (
        <>
            <View style={styles.mainContainer}>

                {selectTypeData !== "" &&

                    <ButtonList
                        data={selectTypeData}
                        titleSale={"Sale/Rent *"}
                        onSelectValue={(val) => onSelectValue(val, "sale/rent")}
                    />

                }

                {/* Price */}
                <CustomTextInp
                    keyboardType={"numeric"}
                    titleEN={"Price *"}
                    onChangeText={(txt) => onChangeText(txt, "price")}
                />

                {/* Space Line */}
                <View style={styles.space_line}></View>

                {/* Commercial Category */}
                {Category_Selected == "Commercial" &&
                    < ButtonList
                        data={commercialCategories}
                        titleSale={"Category *"}
                        onSelectValue={(val) => onSelectValue(val, "commercial_prop_cat")}
                    />}

                {/* residential Category */}
                {Category_Selected == "Residential" &&
                    < ButtonList
                        data={residentialCategories}
                        titleSale={"Category *"}
                        onSelectValue={(val) => onSelectValue(val, "residential_prop_cat")}
                    />}

                {/* Rooms */}
                {propertCategorySelected == "Office" &&
                    < ButtonList
                        data={Rooms}
                        titleSale={"Rooms *"}
                        onSelectValue={(val) => onSelectValue(val, "rooms")}
                    />}

                {/* Yards for plots */}
                {Category_Selected == "Plot" &&
                    < ButtonList
                        data={PlotYards}
                        titleSale={"YARD *"}
                        onSelectValue={(val) => {
                            onSelectValue(val, "yards")
                            setYardselected(true)
                        }}
                    />}
                {(Category_Selected == "Plot" && yardSelected == true) &&
                    <CustomTextInp
                        // titleEN={"Address *"}
                        onChangeText={(txt) => onChangeText(txt, "yards")}
                    />}



                {/* Space Line */}
                <View style={styles.space_line}></View>

                {/* Construction Status */}
                <ConstructionStatus
                    constructionStatus_corner={constructionStatus_corner}
                    constructionStatus_open={constructionStatus_open}
                    selected_constructionStatus_corner={(val) => onSelectValue(val, "Status_corner")}
                    selected_constructionStatus_open={(val) => onSelectValue(val, "Status_open")}
                />

                {/* Furnished for plots */}
                {Category_Selected == "Plot" &&
                    < ButtonList
                        data={furnishes}
                        titleSale={"Furnished*"}
                        onSelectValue={(val) => onSelectValue(val, "furnishes")}
                    />}

                {/* Space Line */}
                <View style={styles.space_line}></View>

                {/* bedrooms for plots */}
                {Category_Selected == "Plot" &&
                    < ButtonList
                        data={bedrooms}
                        titleSale={"Bedrooms*"}
                        onSelectValue={(val) => onSelectValue(val, "bedrooms")}
                    />}

                {/* Space Line */}
                {Category_Selected == "Plot" && <View style={styles.space_line}></View>}

                {/* Furnished for plots */}
                {Category_Selected == "Plot" &&
                    < ButtonList
                        data={bathrooms}
                        titleSale={"Bathrooms*"}
                        onSelectValue={(val) => onSelectValue(val, "bathrooms")}
                    />}

                {/* Space Line */}
                {Category_Selected == "Plot" && <View style={styles.space_line}></View>}

                {/* Phase for plots */}
                {Category_Selected == "Plot" &&
                    < ButtonList
                        data={PlotPhase}
                        titleSale={"Phase *"}
                        onSelectValue={(val) => onSelectValue(val, "phase")}
                    />}

                {/* Space Line */}
                <View style={styles.space_line}></View>

                {/* Location DropDown */}
                <LocationDropDown
                    showModal={openLocationDropdown}
                    title={location}
                />

                {/* Space Line */}
                <View style={styles.space_line}></View>

                {/* Address */}
                {Category_Selected !== "Residential" &&
                    <CustomTextInp
                        titleEN={"Address *"}
                        onChangeText={(txt) => onChangeText(txt, "address")}
                    />}

                {/* Space Line */}
                <View style={styles.space_line}></View>

                {/* Area Unit */}
                {propertCategorySelected == "Shop" &&
                    < ButtonList
                        data={Area_Unit}
                        titleSale={"Area Unit *"}
                        onSelectValue={(val) => onSelectValue(val, "area_unit")}
                    />}


                {/* Location_Bahria */}
                {
                    location == "Bahria Town" &&
                    < ButtonList
                        data={Location_Bahria}
                        titleSale={"Bahria Town *"}
                        onSelectValue={(val) => onSelectValue(val, "loc_bahria")}
                    />

                }

                {/* Location_DHA_City */}
                {
                    location == "DHA city" &&
                    < ButtonList
                        data={Location_DHA_City}
                        titleSale={"DHA City *"}
                        onSelectValue={(val) => onSelectValue(val, "loc_dha_city")}
                    />

                }
                {/* Main Features */}
                <CustomTextInp
                    titleEN={"Main Features *"}
                    onChangeText={(txt) => onChangeText(txt, "main_features")}
                />

                <CustomTextInp
                    numberOfLines={12}
                    titleEN={"details *"}
                    multiline={true}
                    onChangeText={(txt) => onChangeText(txt, "details")}
                />

                {/* Space Line */}
                <View style={styles.space_line}></View>


            </View>


        </>
    )
}

export default Options

const styles = StyleSheet.create({
    mainContainer: {
        width: width - 20,
        alignItems: "center",
        alignSelf: 'center',
    },
    space_line: {
        width: width - 20,
        height: 2,
        backgroundColor: "#bbb",
        marginVertical: 10
    },

})