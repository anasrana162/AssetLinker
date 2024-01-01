import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity, NativeModules } from 'react-native'
import React, { useEffect, useState } from 'react'
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
    selectedAreaUnit,
    PlotPhase,
    Area_Unit,
    Rooms,
    furnishes,
    bedrooms,
    bathrooms,
    Location_Bahria,
    Location_DHA_City,
    onSelectValue,
    typedPrice,
    typedMain_Features,
    typedDetails,
    propertyCategorySelected,
    typedYards,
}) => {
    // const [PlotYards, setPlotYards] = useState([
    //     { id: 1, name: 'ACRE' },
    //     { id: 2, name: 'KANAL' },
    //     { id: 3, name: 'YARDS' },
    //     { id: 4, name: 'MARLA' },
    //     { id: 5, name: 'Sq.FEET' },
    //     { id: 6, name: 'Others' },
    // ])
    // console.log("selectTypeData", selectTypeData)



    return (
        <>
            <View style={styles.mainContainer}>

                {/* {selectTypeData !== "" &&

                    <ButtonList
                        data={selectTypeData}
                        titleSale={"Sale/Rent *"}
                        onSelectValue={(val) => onSelectValue(val, "sale/rent")}
                    />

                } */}

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
                {propertyCategorySelected == "Others" && Category_Selected == "Commercial" &&
                    <CustomTextInp
                        titleEN={"Others *"}
                        onChangeText={(txt) => onChangeText(txt, "commercial_prop_cat")}
                    />
                }

                {/* residential Category */}
                {Category_Selected == "Residential" &&
                    < ButtonList
                        data={residentialCategories}
                        titleSale={"Category *"}
                        onSelectValue={(val) => onSelectValue(val, "residential_prop_cat")}
                    />}

                {propertyCategorySelected == "Others" && Category_Selected == "Residential" &&
                    <CustomTextInp

                        titleEN={"Others *"}
                        onChangeText={(txt) => onChangeText(txt, "residential_prop_cat")}
                    />
                }

                {/* Rooms */}
                {/* {propertyCategorySelected == "Office" &&
                    < ButtonList
                        data={Rooms}
                        titleSale={"Rooms *"}
                        onSelectValue={(val) => onSelectValue(val, "rooms")}
                    />} */}

                {/* Yards for plots */}
                {/* {Category_Selected == "Plot" && */}

                < ButtonList
                    data={PlotYards}
                    titleSale={"Area Unit *"}
                    onSelectValue={(val) => {
                        onSelectValue(val, "yards")
                        // setYardselected(true)
                    }}
                />
                {/* } */}
                {/* {(Category_Selected == "Plot" && yardSelected == true) && */}
                <CustomTextInp
                    titleEN={ "Enter Number *"}
                    keyboardType={"numeric"}
                    onChangeText={(txt) => onChangeText(txt, "yards")}
                    placeholder={selectedAreaUnit == "Others" ? "ex. 100" : ""}
                />
                {selectedAreaUnit == "Others" && <CustomTextInp
                    titleEN={selectedAreaUnit == "Others" ? "Enter Unit *" : "Others"}
                    onChangeText={(txt) => onChangeText(txt, "num_unit_yards")}
                    placeholder={selectedAreaUnit == "Others" ? "ex. yards" : ""}
                />}
                {/* } */}



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
                {Category_Selected == "Residential" &&
                    < ButtonList
                        data={furnishes}
                        titleSale={"Furnished/Unfurnished"}
                        onSelectValue={(val) => onSelectValue(val, "furnishes")}
                    />}

                {/* Space Line */}
                {Category_Selected == "Residential" && <View style={styles.space_line}></View>}

                {/* bedrooms for plots */}
                {Category_Selected == "Residential" &&
                    < ButtonList
                        data={bedrooms}
                        titleSale={"Bedrooms"}
                        onSelectValue={(val) => onSelectValue(val, "bedrooms")}
                    />}

                {/* Space Line */}
                {Category_Selected == "Residential" && <View style={styles.space_line}></View>}

                {/* Furnished for plots */}
                {Category_Selected == "Residential" &&
                    < ButtonList
                        data={bathrooms}
                        titleSale={"Bathrooms"}
                        onSelectValue={(val) => onSelectValue(val, "bathrooms")}
                    />}

                {/* Space Line */}
                {Category_Selected == "Plot" && <View style={styles.space_line}></View>}

                {/* Phase for plots */}
                {Category_Selected == "Plot" &&
                    < ButtonList
                        data={PlotPhase}
                        titleSale={"Area Type *"}
                        onSelectValue={(val) => onSelectValue(val, "phase")}
                    />
                }
                {Category_Selected == "Plot" &&
                    <CustomTextInp
                        titleEN={"Plot Status *"}
                        onChangeText={(txt) => onChangeText(txt, "phase1")}
                    />}

                {/* Space Line */}
                <View style={styles.space_line}></View>

                {/* Location DropDown */}
                {/* {console.log("locationC:", location)} */}
                <LocationDropDown
                    titleMain={"Location *"}
                    showModal={openLocationDropdown}
                    title={location?.location == "Null" ? "Location" : location?.valueToShow}
                />

                {/* Space Line */}
                {<View style={styles.space_line}></View>}

                {/* Address */}
                {/* {Category_Selected !== "Residential" && */}
                    <CustomTextInp
                        titleEN={"Address *"}
                        onChangeText={(txt) => onChangeText(txt, "address")}
                    />
                    {/* } */}

                {/* Space Line */}
                {/* <View style={styles.space_line}></View> */}

                {/* Area Unit */}
                {/* {propertyCategorySelected == "Shop" || propertyCategorySelected == "Apartment" && */}

                {/* < ButtonList
                        data={Area_Unit}
                        titleSale={"Area Unit *"}
                        onSelectValue={(val) => onSelectValue(val, "area_unit")}
                    /> */}


                {/* Location_Bahria */}
                {/* {
                    location?.location == "Bahria Town" &&
                    < ButtonList
                        data={Location_Bahria}
                        titleSale={"Bahria Town *"}
                        onSelectValue={(val) => onSelectValue(val, "loc_bahria")}
                    />

                } */}

                {/* Location_DHA */}
                {/* {
                    location?.location == "DHA" &&
                    < ButtonList
                        data={Location_DHA_City}
                        titleSale={"DHA *"}
                        onSelectValue={(val) => onSelectValue(val, "loc_dha")}
                    />

                } */}

                {/* Main Features */}
                {/* <CustomTextInp
                    titleEN={"Main Features *"}
                    onChangeText={(txt) => onChangeText(txt, "main_features")}
                /> */}

                {/* Deatails */}
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
        width: width - 40,
        alignItems: "center",
        alignSelf: 'center',
    },
    space_line: {
        width: width - 40,
        height: 2,
        backgroundColor: "#bbb",
        marginVertical: 10
    },

})