import {
    View,
    Text,
    Dimensions,
    TextInput,
    TouchableOpacity,
    Image,
    Modal,
    ScrollView,
    Alert,
    StyleSheet,
    NativeModules,
    ActivityIndicator,
} from "react-native";
import React, { createRef, useState, useEffect } from "react";

const {
    StatusBarManager: { HEIGHT },
} = NativeModules;
const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height - HEIGHT;
import Toast from "react-native-toast-message";
import {
    Image as ImageCompressor,
    Video as VideoCompressor,
} from "react-native-compressor";
import { Colors } from "../../config";
import Header from "./Components/Header";
import SelectType from "./Components/SelectType";
import ImageSelector from "./Components/ImageSelector";
import Options from "./Components/Options";
import DropDown from "./Components/DropDown";
import ButtonList from "./Components/ButtonList";
import RNFS from "react-native-fs";
import AssetLinkers, * as Api from "../../api/AssetLinkers";
// Data Arrays
import {
    Property_Types,
    sale_rent,
    PropertyCommercialCategories,
    listOfArea,
    ResidentialCategories,
    Yards,
    Phase,
    Area_unit,
    Area_unit1,
    Rooms,
    Location_Bahria,
    Location_DHA_City,
    furnishes,
    bedrooms,
    bathrooms,
    Plots,
    Plots1,
    Phase1,
    PropertyCommercialCategories1,
} from "./DataArrays";

{
    /* {---------------Redux Imports------------} */
}
import { connect } from "react-redux";
import * as userActions from "../../redux/actions/user";
import { bindActionCreators } from "redux";

const PostUpdate = (props) => {

    var { data } = props.route.params

    // States
    const [sale_Rent, setSale_Rent] = useState(data?.rent_sale);
    const [rooms, setRooms] = useState("Null");
    const [yards, setYards] = useState((data?.yards.split(" "))[1]);
    const [yards_Unit, setYards_Unit] = useState("");
    const [PlotYards, setPlotYards] = useState([
        { id: 1, name: 'ACRE' },
        { id: 2, name: 'KANAL' },
        { id: 3, name: 'YARDS' },
        { id: 4, name: 'MARLA' },
        { id: 5, name: 'Sq.FEET' },
        { id: 6, name: 'Others' },
    ])
    const [yardsNumber, setYardsNumber] = useState((data?.yards.split(" "))[0]);
    const [furnished, setFurnished] = useState(data?.furnished);
    const [bedrooms1, setBedrooms] = useState(data?.bedrooms);
    const [bathrooms1, setBathrooms] = useState(data?.bathrooms);
    const [phase, setPhase] = useState("");
    const [phase1, setPhase1] = useState("");
    const [loc_bahria, setLoc_bahria] = useState("");
    const [loc_dha, setLoc_dha] = useState("");
    const [area_unit, setArea_Unit] = useState("Null");
    const [category, setCategory] = React.useState(data?.property_type);
    const [multipleAssetsPost, setMultipleAssetsPost] = useState("");
    const [selectTypeData, setSelectTypeData] = useState(sale_rent);
    const [locationDropDownOpen, setLocationDropDownOpen] = React.useState(false);
    const [location, setLocation] = React.useState({
        location: "Null",
        place: "Null",
        valueToShow: "Null",
    });
    const [locationMain, setLocationMain] = React.useState(data?.Location);
    const [
        selected_constructionStatus_corner,
        setSelected_constructionStatus_corner,
    ] = useState(data?.corner);
    const [
        selected_constructionStatus_open,
        setSelected_constructionStatus_open,
    ] = useState(data?.open);
    const [price, setPrice] = useState(data?.price);
    const [address, setAddress] = useState(data?.address);
    const [main_features, setMain_features] = useState("");
    const [details, setdetails] = useState(data?.details);
    const [propertyCategory, setPropertyCategory] = useState(data?.category);
    const [propertyCategoryOthers, setPropertyCategoryOthers] = useState("");
    const [images, setImages] = useState(data?.post_images);
    const [imagesPaths, setImagesPaths] = useState(data?.post_images);
    const [loader, setLoader] = useState(false);
    const [check, setCheck] = useState(true);
    const [dropdownDataChange, setDropdownDataChange] = useState(false);
    const [dropdownSV, setDropdownSV] = useState("");

    // Functions
    const onCategoryChange = (val) => {
        setCategory(val);
        setPropertyCategory("");
        // setSelectTypeData(sale_rent);
        // setPrice("");
        // setYards("");
        // setSelected_constructionStatus_corner("");
        // setSelected_constructionStatus_open("");
        // setFurnished("");
        // setBathrooms("");
        // setBedrooms("");
        // setArea_Unit("");
        // setAddress("");
        // setLocationMain("");
        // setLocation("Location");
        // setLoc_bahria("");
        // setLoc_dha("");
        // setdetails("");
        // setPropertyCategory("");
        // setLoader(false);
        // setCheck(true);
        // setYardsNumber("");
        // setFurnished("");
        // setRooms("Null");
        // setPlotYards([
        //   { id: 1, name: 'ACRE' },
        //   { id: 2, name: 'KANAL' },
        //   { id: 3, name: 'YARDS' },
        //   { id: 4, name: 'MARLA' },
        //   { id: 5, name: 'Sq.FEET' },
        //   { id: 6, name: 'Others' },
        // ])
        // switch (val) {
        //     case "Commercial":
        //         setCategory(val);
        //         setSelectTypeData(sale_rent)

        //         break;
        //     case "Residential":
        //         setCategory(val);
        //         setSelectTypeData(sale_rent)
        //         break;
        //     case "Plot":
        //         setCategory(val);
        //         setSelectTypeData(sale_rent)
        //         break;
        // }
    };

    const remmoveAsset = async (currentProduct) => {
        const cloneMultipleAssetsPaths = [...imagesPaths];
        const removeTheSelectedAssetPaths = cloneMultipleAssetsPaths.filter(
            (item) => item !== currentProduct
        );
        setImagesPaths(removeTheSelectedAssetPaths);

        const uri = await RNFS.readFile(currentProduct, "base64")
            .then((res) => {
                return "data:image/png/jpeg/jpg;base64," + res;
            })
            .catch((err) => {
                console.log("Error IN BASE^$ Convertion", err);
            });
        const cloneMultipleAssets = [...images];
        const removeTheSelectedAsset = cloneMultipleAssets.filter(
            (item) => item !== uri
        );
        console.log("After Remove", removeTheSelectedAsset);
        setImages(removeTheSelectedAsset);
    };

    const updateImageInGallery = async (path, mime, type) => {
        // console.log("Working Image selector")
        let multipleImages = [];
        let multipleImagePaths = [];
        if (multipleAssetsPost?.length < 5) {
            if (Array.isArray(path)) {
                const arr = path?.map(async (item) => {
                    console.log("Working Image selector1");
                    const result = await ImageCompressor.compress(item.path, {
                        // maxHeight: 400,
                        // maxWidth: 400,
                        quality: 0.8,
                    });
                    // let imageObject = {
                    //     uri: result,
                    //     name: `image${Date.now()}${item?.filename}.${item?.mime.slice(
                    //         item?.mime.lastIndexOf('/') + 1,
                    //     )}`,
                    //     type: item?.mime,
                    //     tempType: 'photo',
                    // };

                    const uri = await RNFS.readFile(result, "base64")
                        .then((res) => {
                            // return "data:image/png/jpeg/jpg;base64," + res;
                            let obj = {
                                apiPath: res,
                                appPath: "data:image/png/jpeg/jpg;base64," + res,
                            }

                            return obj
                        })
                        .catch((err) => {
                            console.log("Error IN BASE^$ Convertion", err);
                        });
                    // console.log("Selected Images",uri)
                    multipleImages.push(uri.apiPath);
                    multipleImagePaths.push(result);
                });
                await Promise.all(arr);
                const mergeImagesWithExistingGalleryAssets = [
                    ...images,
                    ...multipleImages,
                ];
                const mergeImagesWithExistingGalleryAssetsPaths = [
                    ...imagesPaths,
                    ...multipleImagePaths,
                ];
                // console.log("mergeImagesWithExistingGalleryAssetsPaths", mergeImagesWithExistingGalleryAssetsPaths)
                setImagesPaths(mergeImagesWithExistingGalleryAssetsPaths);
                // setMultipleAssetsPost(mergeImagesWithExistingGalleryAssets);
                setImages(mergeImagesWithExistingGalleryAssets);
            } else {
                const getExistingGalleryAssets = [...multipleAssetsPost];
                const getExistingGalleryAssetsPaths = [...imagesPaths];
                // const imageObject = {
                //     uri: path,
                //     name: `image${Date.now()}.${mime.slice(mime.lastIndexOf('/') + 1)}`,
                //     type: mime,
                //     tempType: type,
                // };
                const result = await ImageCompressor.compress(path, {
                    maxHeight: 400,
                    maxWidth: 400,
                    quality: 1,
                });
                const uri = await RNFS.readFile(result, "base64")
                    .then((res) => {
                        // return "data:image/png/jpeg/jpg;base64," + res;
                        let obj = {
                            apiPath: res,
                            appPath: "data:image/png/jpeg/jpg;base64," + res,
                        }

                        return obj
                    })
                    .catch((err) => {
                        console.log("Error IN BASE^$ Convertion", err);
                    });
                getExistingGalleryAssets.push(uri.apiPath);
                getExistingGalleryAssetsPaths.push(path);
                setImagesPaths(getExistingGalleryAssetsPaths);
                // setMultipleAssetsPost(getExistingGalleryAssets);
                setImages(getExistingGalleryAssets);
            }
        } else {
            Toast.show({
                text1: "Images Limit exceed",
                type: "error",
                visibilityTime: 2000,
            });
        }
    };

    const onChangeText = (val, key) => {
        switch (key) {
            case "price":
                setPrice(val);
                break;
            case "address":
                setAddress(val);
                break;
            case "main_features":
                setMain_features(val);
                break;
            case "details":
                setdetails(val);
                break;
            case "yards":
                setYardsNumber(val);
                break;
            case "num_unit_yards":
                setYards_Unit(val);
                break;
            case "commercial_prop_cat":
                setPropertyCategory(val);
                break;

            case "residential_prop_cat":
                setPropertyCategory(val);
                break;

            case "phase":
                setPhase(val);
                break;
            case "phase1":
                setPhase1(val);
                break;
        }
    };

    const valueAssigner = (val, key) => {
        switch (key) {
            case "sale/rent":
                setSale_Rent(val);
                setPropertyCategory("");
                break;

            case "rooms":
                setRooms(val);
                break;

            case "yards":
                setYards(val);
                break;

            case "phase":
                setPhase(val);
                break;

            case "area_unit":
                console.log("ARea unit:", val);
                setArea_Unit(val);
                break;

            case "location":
                let obj = {
                    location: val,
                    place: "Null",
                    valueToShow: val,
                };
                setLocation(obj);
                console.log("location recieved", val);
                setLocationMain(JSON.stringify(obj));
                break;
            case "loc_bahria":
                let objj = {
                    location: location?.location,
                    place: val,
                    valueToShow: location?.location + ", " + val,
                };
                setLoc_bahria(val);
                setLocation(objj);
                console.log("loc_bahria: ", objj);
                setLocationMain(JSON.stringify(objj));
                break;
            case "loc_dha":
                let objjj = {
                    location: location?.location,
                    place: val,
                    valueToShow: location?.location + ", " + val,
                };
                setLoc_dha(val);
                setLocation(objjj);
                console.log("loc_dha: ", objjj);
                setLocationMain(JSON.stringify(objjj));

                break;

            case "commercial_prop_cat":
                if (val == "Others") {
                    setPropertyCategoryOthers(val)
                    setPropertyCategory('')
                } else {
                    setPropertyCategory(val);
                    setPropertyCategoryOthers(val)
                }
                switch (val) {
                    case 'Building':

                        setPlotYards([
                            { id: 1, name: 'Sq.FEET' },
                            { id: 2, name: 'YARDS' },
                        ])
                        break;

                    case 'Shop':
                        setPlotYards([
                            { id: 1, name: 'Sq.FEET' },
                            { id: 2, name: 'YARDS' },
                        ])
                        break;

                    case 'Office':
                        setPlotYards([
                            { id: 1, name: 'Sq.FEET' },
                            { id: 2, name: 'YARDS' },
                        ])
                        break;

                    case 'Basement':
                        setPlotYards([
                            { id: 1, name: 'Sq.FEET' },
                            { id: 2, name: 'YARDS' },
                        ])
                        break;
                    case 'Mezzanine':
                        setPlotYards([
                            { id: 1, name: 'Sq.FEET' },
                            { id: 2, name: 'YARDS' },
                        ])
                        break;
                    case 'WareHouse':
                        setPlotYards([
                            { id: 1, name: 'ACRE' },
                            { id: 2, name: 'KANAL' },
                            { id: 3, name: 'YARDS' },
                            { id: 4, name: 'MARLA' },
                            { id: 5, name: 'Sq.FEET' },
                            { id: 6, name: 'Others' },
                        ])
                        break;
                    case 'Ground':
                        setPlotYards([
                            { id: 1, name: 'ACRE' },
                            { id: 2, name: 'KANAL' },
                            { id: 3, name: 'YARDS' },
                            { id: 4, name: 'MARLA' },
                            { id: 5, name: 'Sq.FEET' },
                            { id: 6, name: 'Others' },
                        ])
                        break;
                    case 'Pent House':
                        setPlotYards([
                            { id: 1, name: 'Sq.FEET' },
                            { id: 2, name: 'YARDS' },
                        ])
                        break;
                    case 'Others':
                        setPlotYards([
                            { id: 1, name: 'ACRE' },
                            { id: 2, name: 'KANAL' },
                            { id: 3, name: 'YARDS' },
                            { id: 4, name: 'MARLA' },
                            { id: 5, name: 'Sq.FEET' },
                            { id: 6, name: 'Others' },
                        ])
                        break;
                }
                break;

            case "residential_prop_cat":
                if (val == "Others") {
                    setPropertyCategoryOthers(val)
                    setPropertyCategory('')
                } else {
                    setPropertyCategory(val);
                    setPropertyCategoryOthers(val)
                }
                switch (val) {
                    case 'Bangalow':
                        setPlotYards([
                            { id: 1, name: 'Sq.FEET' },
                            { id: 2, name: 'YARDS' },
                        ])
                        break;

                    case 'Farm House':
                        setPlotYards([
                            { id: 1, name: 'Sq.FEET' },
                            { id: 2, name: 'YARDS' },
                        ])
                        break;

                    case 'Town House':
                        setPlotYards([
                            { id: 1, name: 'Sq.FEET' },
                            { id: 2, name: 'YARDS' },
                        ])
                        break;

                    case 'Apartment':
                        setPlotYards([
                            { id: 1, name: 'Sq.FEET' },
                            { id: 2, name: 'YARDS' },
                        ])
                        break;

                    case 'Pent House':
                        setPlotYards([
                            { id: 1, name: 'Sq.FEET' },
                            { id: 2, name: 'YARDS' },
                        ])
                        break;
                    case 'Others':
                        setPlotYards([
                            { id: 1, name: 'ACRE' },
                            { id: 2, name: 'KANAL' },
                            { id: 3, name: 'YARDS' },
                            { id: 4, name: 'MARLA' },
                            { id: 5, name: 'Sq.FEET' },
                            { id: 6, name: 'Others' },
                        ])
                        break;
                }
                break;

            case "Status_corner":
                setSelected_constructionStatus_corner(val);
                break;

            case "Status_open":
                setSelected_constructionStatus_open(val);
                break;

            case "furnishes":
                setFurnished(val);
                break;
            case "bedrooms":
                setBedrooms(val);
                break;
            case "bathrooms":
                console.log("Bathroorms VAL:  ", val);
                setBathrooms(val);
                break;
        }
    };

    const onSubmitPress = () => {
        setImmediate(() => {
            setLoader(true);
            setCheck(true);
        });


    };


    console.log("Post Update Screen", props.route.params.data)
    return (
        <View style={styles.mainContainer}>
            {/* {console.log(props)} */}
            {/* Header */}
            <Header Title={"Update Post"} navProps={props.navigation} />

            <ScrollView style={{ width: "100%" }}>
                {/* Sale/Rent */}
                <ButtonList
                    data={selectTypeData}
                    valueSelected={sale_Rent}
                    titleSale={"Sale/Rent *"}
                    onSelectValue={(val) => valueAssigner(val, "sale/rent")}
                    style={{
                        marginTop: 30,
                    }}
                    styleTitle={{
                        marginLeft: 10,
                    }}
                />

                {/* Space Line */}
                <View style={[styles.space_line, { marginBottom: 20 }]}></View>

                {/* Select Type {Property} */}
                <SelectType
                    Property_Types={Property_Types}
                    valueSelected={category}
                    sale_Rent={sale_Rent}
                    Category_Selected={(val) => onCategoryChange(val)}
                />

                {/* Space Line */}
                <View style={styles.space_line}></View>

                {/* Image Picker */}
                <ImageSelector
                    updateImageInGallery={(path, mime, type) =>
                        updateImageInGallery(path, mime, type)
                    }
                    multipleAssetsPost={imagesPaths}
                    remmoveAsset={(val) => remmoveAsset(val)}
                />

                {/* option like sale/rent Price category yards etc */}
                <Options
                    Category_Selected={category}
                    selectTypeData={selectTypeData} // Property Types
                    commercialCategories={sale_Rent == "Rent" ? PropertyCommercialCategories1 : PropertyCommercialCategories} //data  Comercial Categories
                    residentialCategories={ResidentialCategories} //data  Residential Categories
                    onSelectValue={(val, key) => valueAssigner(val, key)}
                    propertyCategorySelected={propertyCategoryOthers} // old value :propertyCategory  // Commercial/Residential selected Property
                    locationDropdownData={listOfArea} //data
                    openLocationDropdown={() =>
                        setLocationDropDownOpen(!locationDropDownOpen)
                    }
                    location={location} // selected location item
                    constructionStatus_corner={Plots1} //data  corner/non-corner
                    constructionStatus_open={Plots} //data  west/east open
                    PlotYards={PlotYards} //data
                    selectedAreaUnit={yards}
                    PlotPhase={Phase1} // old data Phase //data
                    Area_Unit={propertyCategory == "Apartment" ? Area_unit1 : Area_unit} //data
                    Rooms={Rooms} // data
                    furnishes={furnishes} // data
                    bedrooms={bedrooms} // data
                    bathrooms={bathrooms} //data
                    Location_Bahria={Location_Bahria} //data
                    Location_DHA_City={Location_DHA_City} //data
                    onChangeText={(val, key) => onChangeText(val, key)}
                    initPrice={price}
                    initPropertyCategory={propertyCategory}
                    initYards={yards}
                    initYardsNumber={yardsNumber}
                    initCorner={selected_constructionStatus_corner}
                    initOpen={selected_constructionStatus_open}
                    initLocation={JSON.parse(locationMain) == undefined ? "" : JSON.parse(locationMain)}
                    initAddress={address}
                    initDetails={details}
                    initFurnished={furnished}
                    initBathrooms={bathrooms1}
                    initBedrooms={bedrooms1}
                />

                {/* Submit Button */}
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={onSubmitPress}
                    // disabled={!stateCheck}
                    style={[styles.submit_btn, {
                        backgroundColor: "#2C74B3"
                    }]}
                >
                    {loader == true ? (
                        <ActivityIndicator size={"small"} color={"white"} />
                    ) : (
                        <Text style={{ fontSize: 15, color: "#fff", fontWeight: "500" }}>
                            Submit
                        </Text>
                    )}
                </TouchableOpacity>
            </ScrollView>

            {/* Dropdown for Location */}
            <DropDown
                data={
                    dropdownDataChange == false
                        ? listOfArea
                        : dropdownSV == "DHA"
                            ? Location_DHA_City
                            : Location_Bahria
                }
                show={locationDropDownOpen}
                onDismiss={() => {
                    setLocationDropDownOpen(!locationDropDownOpen)
                    // setLocation({
                    //   location: "Null",
                    //   place: "Null",
                    //   valueToShow: "Null",
                    // })
                    setDropdownDataChange(false);
                }}
                title={"Select Location"}
                onSelect={(val) => {
                    // setLocation(val)
                    if (dropdownDataChange == false) {
                        console.log("location Value Slected:", val);
                        setDropdownSV(val);
                        if (val == "Bahria Town" || val == "DHA") {
                            setDropdownDataChange(true);
                        }
                        valueAssigner(val, "location");
                        if (val == "Clifton" || val == "MDA") {
                            setLocationDropDownOpen(false);
                        }
                    }
                    if (dropdownSV == "Bahria Town") {
                        valueAssigner(val, "loc_bahria");
                        setDropdownDataChange(false);
                        setDropdownSV("");
                        setLocationDropDownOpen(false);
                    }
                    if (dropdownSV == "DHA") {
                        valueAssigner(val, "loc_dha");
                        setDropdownDataChange(false);
                        setDropdownSV("");
                        setLocationDropDownOpen(false);
                    }
                }}
            />
        </View>
    );
};

{
    /* {---------------redux State ------------} */
}
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

export default connect(mapStateToProps, mapDispatchToProps)(PostUpdate);

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        width: width,
        height: height,
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "white",
    },
    space_line: {
        width: width - 20,
        height: 2,
        backgroundColor: "#bbb",
        marginVertical: 10,
        alignSelf: "center",
    },
    submit_btn: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 30,
        backgroundColor: "#000",
        height: 40,
        width: 320,
        borderRadius: 5,
        alignSelf: "center",
        marginBottom: 50,
    },
});
