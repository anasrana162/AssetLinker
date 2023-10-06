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
    NativeModules
} from 'react-native';
import React, { createRef, useState, useEffect, } from 'react';


const { StatusBarManager: { HEIGHT } } = NativeModules;
const width = Dimensions.get("screen").width
const height = Dimensions.get("screen").height - HEIGHT
import Toast from 'react-native-toast-message';
import {
    Image as ImageCompressor,
    Video as VideoCompressor,
} from 'react-native-compressor';
import { Colors } from '../../config';
import Header from './Components/Header';
import SelectType from './Components/SelectType';
import ImageSelector from './Components/ImageSelector';
import Options from './Components/Options';
import DropDown from './Components/DropDown';
import ButtonList from './Components/ButtonList';
import RNFS from 'react-native-fs'
import AssetLinkers, * as Api from '../../api/AssetLinkers'
// Data Arrays
import {
    Property_Types, sale_rent, PropertyCommercialCategories, listOfArea, ResidentialCategories, Yards,
    Phase, Area_unit, Rooms, Location_Bahria, Location_DHA_City, furnishes, bedrooms, bathrooms, Plots, Plots1
} from './DataArrays';

{/* {---------------Redux Imports------------} */ }
import { connect } from 'react-redux';
import * as userActions from "../../redux/actions/user"
import { bindActionCreators } from 'redux';

const Post = (props) => {



    // States
    const [sale_Rent, setSale_Rent] = useState("Rent")
    const [rooms, setRooms] = useState("")
    const [yards, setYards] = useState("")
    const [yardsNumber, setYardsNumber] = useState("")
    const [furnished, setFurnished] = useState("")
    const [bedrooms1, setBedrooms] = useState('')
    const [bathrooms1, setBathrooms] = useState('')
    const [phase, setPhase] = useState("")
    const [loc_bahria, setLoc_bahria] = useState("")
    const [loc_dha_city, setLoc_dha_city] = useState("")
    const [area_unit, setArea_Unit] = useState("")
    const [category, setCategory] = React.useState("Commercial")
    const [multipleAssetsPost, setMultipleAssetsPost] = useState('');
    const [selectTypeData, setSelectTypeData] = useState(sale_rent);
    const [locationDropDownOpen, setLocationDropDownOpen] = React.useState(false)
    const [location, setLocation] = React.useState('Location')
    const [locationMain, setLocationMain] = React.useState('')
    const [selected_constructionStatus_corner, setSelected_constructionStatus_corner] = useState('')
    const [selected_constructionStatus_open, setSelected_constructionStatus_open] = useState('')
    const [price, setPrice] = useState('')
    const [address, setAddress] = useState('')
    const [main_features, setMain_features] = useState('')
    const [details, setdetails] = useState('')
    const [propertyCategory, setPropertyCategory] = useState('')
    const [images, setImages] = useState('')
    const [imagesPaths, setImagesPaths] = useState('')
    const [loader, setLoader] = useState('')
    const [check, setCheck] = useState(true)

    // Functions
    const onCategoryChange = (val) => {
        switch (val) {
            case "Commercial":
                setCategory(val);
                setSelectTypeData(sale_rent)
                break;
            case "Residential":
                setCategory(val);
                setSelectTypeData(sale_rent)
                break;
            case "Plot":
                setCategory(val);
                setSelectTypeData(sale_rent)
                break;
        }

    }

    const remmoveAsset = async (currentProduct) => {
        const cloneMultipleAssetsPaths = [...imagesPaths];
        const removeTheSelectedAssetPaths = cloneMultipleAssetsPaths.filter(
            item => item !== currentProduct,
        );
        setImagesPaths(removeTheSelectedAssetPaths);

        const uri = await RNFS.readFile(currentProduct, 'base64').then(res => {
            return "data:image/png/jpeg/jpg;base64," + res

        }).catch(err => {
            console.log("Error IN BASE^$ Convertion", err);
        });
        const cloneMultipleAssets = [...images];
        const removeTheSelectedAsset = cloneMultipleAssets.filter(
            item => item !== uri,
        );
        console.log("After Remove", removeTheSelectedAsset)
        setImages(removeTheSelectedAsset);
    };

    const updateImageInGallery = async (path, mime, type) => {
        console.log("Working Image selector")
        let multipleImages = [];
        let multipleImagePaths = [];
        if (multipleAssetsPost?.length < 5) {
            if (Array.isArray(path)) {
                const arr = path?.map(async item => {
                    console.log("Working Image selector1")
                    const result = await ImageCompressor.compress(item.path, {
                        maxHeight: 400,
                        maxWidth: 400,
                        quality: 1,
                    });
                    // let imageObject = {
                    //     uri: result,
                    //     name: `image${Date.now()}${item?.filename}.${item?.mime.slice(
                    //         item?.mime.lastIndexOf('/') + 1,
                    //     )}`,
                    //     type: item?.mime,
                    //     tempType: 'photo',
                    // };

                    const uri = await RNFS.readFile(result, 'base64').then(res => {
                        return "data:image/png/jpeg/jpg;base64," + res

                    }).catch(err => {
                        console.log("Error IN BASE^$ Convertion", err);
                    });
                    // console.log("Selected Images",uri)
                    multipleImages.push(uri);
                    multipleImagePaths.push(result)
                });
                await Promise.all(arr);
                const mergeImagesWithExistingGalleryAssets = [
                    ...images,
                    ...multipleImages,
                ];
                const mergeImagesWithExistingGalleryAssetsPaths = [
                    ...imagesPaths,
                    ...multipleImagePaths,
                ]
                console.log("mergeImagesWithExistingGalleryAssetsPaths", mergeImagesWithExistingGalleryAssetsPaths)
                setImagesPaths(mergeImagesWithExistingGalleryAssetsPaths)
                // setMultipleAssetsPost(mergeImagesWithExistingGalleryAssets);
                setImages(mergeImagesWithExistingGalleryAssets)
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
                const uri = await RNFS.readFile(result, 'base64').then(res => {
                    return "data:image/png/jpeg/jpg;base64," + res

                }).catch(err => {
                    console.log("Error IN BASE^$ Convertion", err);
                });
                getExistingGalleryAssets.push(uri);
                getExistingGalleryAssetsPaths.push(path)
                setImagesPaths(getExistingGalleryAssetsPaths)
                // setMultipleAssetsPost(getExistingGalleryAssets);
                setImages(getExistingGalleryAssets)
            }
        } else {
            Toast.show({
                text1: 'Images Limit exceed',
                type: 'error',
                visibilityTime: 2000,
            });
        }
    };

    const onChangeText = (val, key) => {
        switch (key) {
            case 'price':
                setPrice(val)
                break;
            case 'address':
                setAddress(val)
                break;
            case 'main_features':
                setMain_features(val)
                break;
            case 'details':
                setdetails(val)
                break;
            case 'yards':
                setYardsNumber(val)
        }
    }

    const valueAssigner = (val, key) => {
        switch (key) {

            case "sale/rent":
                setSale_Rent(val)
                break;

            case 'rooms':
                setRooms(val);
                break;

            case 'yards':
                setYards(val);
                break;

            case 'phase':
                setPhase(val);
                break;

            case 'area_unit':
                setArea_Unit(val);
                break;
            case 'loc_bahria':
                let objj = {
                    "location": location,
                    "place": val
                }
                setLoc_bahria(val);
                // console.log(objj)
                setLocationMain(JSON.stringify(objj))
                break;
            case 'loc_dha_city':
                setLoc_dha_city(val);
                break;

            case "commercial_prop_cat":
                setPropertyCategory(val)
                break;

            case "residential_prop_cat":
                setPropertyCategory(val)
                break;

            case "Status_corner":
                setSelected_constructionStatus_corner(val)
                break;

            case "Status_open":
                setSelected_constructionStatus_open(val)
                break;

            case "furnishes":
                setFurnished(val)
                break;
            case "bedrooms":
                setBedrooms(val)
                break;
            case "bathrooms":
                setBathrooms(val)
                break;
        }
    }

    const onSubmitPress = () => {

        setImmediate(() => {
            setLoader(true)
            setCheck(true)
        })

        const dataForApi = checkCategory()
        console.log("dataForApi of Category " + category + " " + "dataForApi", dataForApi)

        if (dataForApi?.check == true) {

            AssetLinkers.post("/add_property", dataForApi?.data).then((response) => {
                console.log("Post Api response:", response)
            }).catch((err) => {
                console.log("Post Api Error", err?.response)
            })


        }


    }

    const checkCategory = () => {
        var { userData: { user: { id } } } = props
        var obj = {}
        switch (category) {
            case "Commercial":

                const check = checkCategoryData()
                obj = {
                    user_id: id,
                    rent_sale: sale_Rent,
                    property_type: category,
                    images: images,
                    price: price,
                    category: propertyCategory,
                    corner: selected_constructionStatus_corner,
                    open: selected_constructionStatus_open,
                    Location: locationMain,
                    address: address,
                    area_unit: area_unit,
                    main_features: main_features,
                    details: details,
                }
                return { "check": check, "data": obj }

            case "Residential":
                const check1 = checkCategoryData()
                console.log("location Main", locationMain)
                obj = {
                    user_id: id,
                    rent_sale: sale_Rent,
                    property_type: category,
                    // images: images,
                    price: price,
                    category: propertyCategory,
                    corner: selected_constructionStatus_corner,
                    open: selected_constructionStatus_open,
                    Location: locationMain,
                    main_features: main_features,
                    details: details,
                }
                return { "check": check1, "data": obj }

            case "Plot":
                const check2 = checkCategoryData()
                obj = {
                    user_id: id,
                    rent_sale: sale_Rent,
                    property_type: category,
                    // images: images,
                    price: price,
                    yards: yards,
                    corner: selected_constructionStatus_corner,
                    open: selected_constructionStatus_open,
                    furnished: furnished,
                    bedrooms: bedrooms,
                    bathrooms: bathrooms,
                    phase: phase,
                    Location: locationMain,
                    address: address,
                    main_features: main_features,
                    details: details,
                }
                return { "check": check2, "data": obj }
        }

    }

    const checkCategoryData = () => {
        var { userData: { user: { id } } } = props
        switch (category) {
            case "Commercial":
                if (id == null || id == '') {
                    setImmediate(() => {
                        setCheck(false)
                    })
                    return alert("Network Error: Try to login again!")
                }
                if (sale_Rent == null || sale_Rent == "") {
                    setImmediate(() => {
                        setCheck(false)
                    })
                    return alert("Please select either Sale or Rent!")
                }
                if (category == null || category == "") {
                    setImmediate(() => {
                        setCheck(false)
                    })
                    return alert("Please select Type!")
                }
                if (price == null || price == "") {
                    setImmediate(() => {
                        setCheck(false)
                    })
                    return alert("Please enter price!")
                }
                if (propertyCategory == null || propertyCategory == "") {
                    setImmediate(() => {
                        setCheck(false)
                    })
                    return alert("Please select category!")
                }

                if (selected_constructionStatus_corner == null || selected_constructionStatus_corner == '') {
                    setImmediate(() => {
                        setCheck(false)
                    })
                    return alert("Please select Construction Status Corner value!")
                }
                if (selected_constructionStatus_open == null || selected_constructionStatus_open == '') {
                    setImmediate(() => {
                        setCheck(false)
                    })
                    return alert("Please select Construction Status open value!")
                }
                if (location == null || location == '') {
                    setImmediate(() => {
                        setCheck(false)
                    })
                    return alert("Please select Location!")
                }
                if (address == null || address == '') {
                    setImmediate(() => {
                        setCheck(false)
                    })
                    return alert("Please enter Address!")
                }
                if (main_features == null || main_features == '') {
                    setImmediate(() => {
                        setCheck(false)
                    })
                    return alert("Please add Main features!")
                }
                if (details == null || details == '') {
                    setImmediate(() => {
                        setCheck(false)
                    })
                    return alert("Please eneter Details!")
                }

                return check
            case "Residential":
                if (id == null || id == '') {
                    setImmediate(() => {
                        setCheck(false)
                    })
                    return alert("Network Error: Try to login again!")
                }
                if (sale_Rent == null || sale_Rent == "") {
                    setImmediate(() => {
                        setCheck(false)
                    })
                    return alert("Please select either Sale or Rent!")
                }
                if (category == null || category == "") {
                    setImmediate(() => {
                        setCheck(false)
                    })
                    return alert("Please select Type!")
                }
                if (price == null || price == "") {
                    setImmediate(() => {
                        setCheck(false)
                    })
                    return alert("Please enter price!")
                }
                if (propertyCategory == null || propertyCategory == "") {
                    setImmediate(() => {
                        setCheck(false)
                    })
                    return alert("Please select category!")
                }

                if (selected_constructionStatus_corner == null || selected_constructionStatus_corner == '') {
                    setImmediate(() => {
                        setCheck(false)
                    })
                    return alert("Please select Construction Status Corner value!")
                }
                if (selected_constructionStatus_open == null || selected_constructionStatus_open == '') {
                    setImmediate(() => {
                        setCheck(false)
                    })
                    return alert("Please select Construction Status open value!")
                }
                if (location == null || location == '') {
                    setImmediate(() => {
                        setCheck(false)
                    })
                    return alert("Please select Location!")
                }
                if (main_features == null || main_features == '') {
                    setImmediate(() => {
                        setCheck(false)
                    })
                    return alert("Please add Main features!")
                }
                if (details == null || details == '') {
                    setImmediate(() => {
                        setCheck(false)
                    })
                    return alert("Please eneter Details!")
                }

                return check

            case "Plot":
                if (id == null || id == '') {
                    setImmediate(() => {
                        setCheck(false)
                    })
                    return alert("Network Error: Try to login again!")
                }
                if (sale_Rent == null || sale_Rent == "") {
                    setImmediate(() => {
                        setCheck(false)
                    })
                    return alert("Please select either Sale or Rent!")
                }
                if (category == null || category == "") {
                    setImmediate(() => {
                        setCheck(false)
                    })
                    return alert("Please select Type!")
                }
                if (price == null || price == "") {
                    setImmediate(() => {
                        setCheck(false)
                    })
                    return alert("Please enter Price!")
                }
                if (yards == null || yards == "") {
                    setImmediate(() => {
                        setCheck(false)
                    })
                    return alert("Please select Yards!")
                }

                if (selected_constructionStatus_corner == null || selected_constructionStatus_corner == '') {
                    setImmediate(() => {
                        setCheck(false)
                    })
                    return alert("Please select Construction Status Corner value!")
                }
                if (selected_constructionStatus_open == null || selected_constructionStatus_open == '') {
                    setImmediate(() => {
                        setCheck(false)
                    })
                    return alert("Please select Construction Status open value!")
                }
                if (furnished == null || furnished == '') {
                    setImmediate(() => {
                        setCheck(false)
                    })
                    return alert("Please select Furnished!")
                }
                if (bedrooms == null || bedrooms == '') {
                    setImmediate(() => {
                        setCheck(false)
                    })
                    return alert("Please select no. of bedrooms!")
                }
                if (bathrooms == null || bathrooms == '') {
                    setImmediate(() => {
                        setCheck(false)
                    })
                    return alert("Please select no. of bathrooms!")
                }
                if (phase == null || phase == '') {
                    setImmediate(() => {
                        setCheck(false)
                    })
                    return alert("Please select phase!")
                }
                if (location == null || location == '') {
                    setImmediate(() => {
                        setCheck(false)
                    })
                    return alert("Please select Location!")
                }
                if (address == null || address == '') {
                    setImmediate(() => {
                        setCheck(false)
                    })
                    return alert("Please enter Address!")
                }
                if (main_features == null || main_features == '') {
                    setImmediate(() => {
                        setCheck(false)
                    })
                    return alert("Please add Main features!")
                }
                if (details == null || details == '') {
                    setImmediate(() => {
                        setCheck(false)
                    })
                    return alert("Please eneter Details!")
                }

                return check
        }
    }



    // console.log("category Post SCreen", category)
    return (
        <View style={styles.mainContainer}>
            {/* {console.log(props)} */}
            {/* Header */}
            <Header />

            <ScrollView style={{ width: "100%" }}>

                {/* Sale/Rent */}
                <ButtonList
                    data={selectTypeData}
                    titleSale={"Sale/Rent *"}
                    onSelectValue={(val) => valueAssigner(val, "sale/rent")}
                    style={{
                        marginTop: 30,
                    }}
                    styleTitle={{
                        marginLeft: 10
                    }}
                />

                {/* Space Line */}
                <View style={[styles.space_line, { marginBottom: 20 }]}></View>

                {/* Select Type {Property} */}
                <SelectType
                    Property_Types={Property_Types}
                    sale_Rent={sale_Rent}
                    Category_Selected={(val) => onCategoryChange(val)}
                />

                {/* Space Line */}
                <View style={styles.space_line}></View>

                {/* Image Picker */}
                <ImageSelector
                    updateImageInGallery={(path, mime, type) => updateImageInGallery(path, mime, type)}
                    multipleAssetsPost={imagesPaths}
                    remmoveAsset={(val) => remmoveAsset(val)}
                />

                {/* option like sale/rent Price category yards etc */}
                <Options
                    Category_Selected={category}
                    selectTypeData={selectTypeData} // Property Types
                    commercialCategories={PropertyCommercialCategories}  //data  Comercial Categories
                    residentialCategories={ResidentialCategories}  //data  Residential Categories
                    onSelectValue={(val, key) => valueAssigner(val, key)}
                    propertyCategorySelected={propertyCategory} // Commercial/Residential selected Property
                    locationDropdownData={listOfArea} //data
                    openLocationDropdown={() => setLocationDropDownOpen(!locationDropDownOpen)}
                    location={location} // selected location item
                    constructionStatus_corner={Plots1} //data  corner/non-corner 
                    constructionStatus_open={Plots} //data  west/east open
                    PlotYards={Yards} //data 
                    PlotPhase={Phase} //data
                    Area_Unit={Area_unit}  //data
                    Rooms={Rooms} // data
                    furnishes={furnishes} // data
                    bedrooms={bedrooms} // data
                    bathrooms={bathrooms} //data
                    Location_Bahria={Location_Bahria}  //data
                    Location_DHA_City={Location_DHA_City}  //data
                    onChangeText={(val, key) => onChangeText(val, key)}
                />


                {/* Submit Button */}
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => onSubmitPress()}
                    style={styles.submit_btn}>

                    <Text style={{ fontSize: 15, color: '#fff', fontWeight: '500' }}>
                        Submit
                    </Text>

                </TouchableOpacity>
            </ScrollView>

            {/* Dropdown for Location */}
            <DropDown
                data={listOfArea}
                show={locationDropDownOpen}
                onDismiss={() => setLocationDropDownOpen(!locationDropDownOpen)}
                title={"Select Location"}
                onSelect={(val) => {
                    setLocation(val)
                    setLocationDropDownOpen(false)
                }}
            />

        </View>
    )
}

{/* {---------------redux State ------------} */ }
const mapStateToProps = state => ({
    userData: state.userData
});

{/* {---------------redux Actions ------------} */ }
const ActionCreators = Object.assign(
    {},
    userActions,
);
const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Post)

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        width: width,
        height: height,
        justifyContent: "flex-start",
        alignItems: 'center',
        backgroundColor: "white"
    },
    space_line: {
        width: width - 20,
        height: 2,
        backgroundColor: "#bbb",
        marginVertical: 10,
        alignSelf: "center",
    },
    submit_btn: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
        backgroundColor: '#000',
        height: 40,
        width: 320,
        borderRadius: 5,
        alignSelf: "center",
        marginBottom: 50,
    }

})