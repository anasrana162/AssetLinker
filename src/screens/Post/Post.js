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
import { Divider } from 'react-native-paper';

const { StatusBarManager: { HEIGHT } } = NativeModules;
const width = Dimensions.get("screen").width
const height = Dimensions.get("screen").height - HEIGHT
import SelectDropdown from 'react-native-select-dropdown';
import ActionSheet from 'react-native-actions-sheet';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MultipleimagePicker from '../../components/MultipleimagePicker';
import Toast from 'react-native-toast-message';
import {
    Image as ImageCompressor,
    Video as VideoCompressor,
} from 'react-native-compressor';
import { Colors } from '../../config';
import { plotAdd } from '../../redux1/APIs';
import { useSelector } from 'react-redux';
import Header from './Components/Header';
import SelectType from './Components/SelectType';
import ImageSelector from './Components/ImageSelector';
import Options from './Components/Options';
import DropDown from './Components/DropDown';
import ButtonList from './Components/ButtonList';
// Data Arrays
import {
    Property_Types, sale_rent, PropertyCommercialCategories, listOfArea, ResidentialCategories, Yards,
    Phase, Area_unit, Rooms, Location_Bahria, Location_DHA_City, furnishes, bedrooms, bathrooms, Plots, Plots1
} from './DataArrays';

const Post = () => {



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
    const [selected_constructionStatus_corner, setSelected_constructionStatus_corner] = useState('')
    const [selected_constructionStatus_open, setSelected_constructionStatus_open] = useState('')
    const [price, setPrice] = useState('')
    const [address, setAddress] = useState('')
    const [main_features, setMain_features] = useState('')
    const [details, setdetails] = useState('')
    const [propertyCategory, setPropertyCategory] = useState('')

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
                setSelectTypeData('')
                break;
        }

    }

    const remmoveAsset = currentProduct => {
        const cloneMultipleAssets = [...multipleAssetsPost];
        const removeTheSelectedAsset = cloneMultipleAssets.filter(
            item => item !== currentProduct,
        );
        setMultipleAssetsPost(removeTheSelectedAsset);
    };

    const updateImageInGallery = async (path, mime, type) => {
        console.log("Working Image selector")
        let multipleImages = [];
        if (multipleAssetsPost?.length < 5) {
            if (Array.isArray(path)) {
                const arr = path?.map(async item => {
                    const result = await ImageCompressor.compress(item.path, {
                        maxHeight: 400,
                        maxWidth: 400,
                        quality: 1,
                    });
                    let imageObject = {
                        uri: result,
                        name: `image${Date.now()}${item?.filename}.${item?.mime.slice(
                            item?.mime.lastIndexOf('/') + 1,
                        )}`,
                        type: item?.mime,
                        tempType: 'photo',
                    };
                    multipleImages.push(imageObject);
                });
                await Promise.all(arr);
                const mergeImagesWithExistingGalleryAssets = [
                    ...multipleAssetsPost,
                    ...multipleImages,
                ];
                setMultipleAssetsPost(mergeImagesWithExistingGalleryAssets);
            } else {
                const getExistingGalleryAssets = [...multipleAssetsPost];
                const imageObject = {
                    uri: path,
                    name: `image${Date.now()}.${mime.slice(mime.lastIndexOf('/') + 1)}`,
                    type: mime,
                    tempType: type,
                };
                getExistingGalleryAssets.push(imageObject);
                setMultipleAssetsPost(getExistingGalleryAssets);
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
                setLoc_bahria(val);
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

    // console.log("category Post SCreen", category)
    return (
        <View style={styles.mainContainer}>

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
                    multipleAssetsPost={multipleAssetsPost}
                    remmoveAsset={(val) => remmoveAsset(val)}
                />

                {/* option like sale/rent Price category yards etc */}
                <Options
                    Category_Selected={category}
                    selectTypeData={selectTypeData}
                    commercialCategories={PropertyCommercialCategories}  //data
                    residentialCategories={ResidentialCategories}  //data
                    onSelectValue={(val, key) => valueAssigner(val, key)}
                    propertCategorySelected={propertyCategory}
                    locationDropdownData={listOfArea} //data
                    openLocationDropdown={() => setLocationDropDownOpen(!locationDropDownOpen)}
                    location={location}
                    constructionStatus_corner={Plots1} //data
                    constructionStatus_open={Plots} //data
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
                    // onPress={() => submitProperty()}
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

export default Post

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