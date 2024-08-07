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

const Post = (props) => {
  // States
  const [sale_Rent, setSale_Rent] = useState("Rent");
  const [rooms, setRooms] = useState("Null");
  const [readyToSubmit, setReadyToSubmit] = useState("Null");
  const [yards, setYards] = useState("");
  const [yards_Unit, setYards_Unit] = useState("");
  const [PlotYards, setPlotYards] = useState([
    { id: 1, name: 'ACRE' },
    { id: 2, name: 'KANAL' },
    { id: 3, name: 'YARDS' },
    { id: 4, name: 'MARLA' },
    { id: 5, name: 'Sq.FEET' },
    { id: 6, name: 'Others' },
  ])
  const [yardsNumber, setYardsNumber] = useState("");
  const [furnished, setFurnished] = useState("Null");
  const [bedrooms1, setBedrooms] = useState("Null");
  const [bathrooms1, setBathrooms] = useState("Null");
  const [phase, setPhase] = useState("");
  const [phase1, setPhase1] = useState("");
  const [loc_bahria, setLoc_bahria] = useState("");
  const [loc_dha, setLoc_dha] = useState("");
  const [area_unit, setArea_Unit] = useState("Null");
  const [category, setCategory] = React.useState("Commercial");
  const [multipleAssetsPost, setMultipleAssetsPost] = useState("");
  const [selectTypeData, setSelectTypeData] = useState(sale_rent);
  const [locationDropDownOpen, setLocationDropDownOpen] = React.useState(false);
  const [location, setLocation] = React.useState({
    location: "Null",
    place: "Null",
    valueToShow: "Null",
  });
  const [locationMain, setLocationMain] = React.useState("");
  const [
    selected_constructionStatus_corner,
    setSelected_constructionStatus_corner,
  ] = useState("Null");
  const [
    selected_constructionStatus_open,
    setSelected_constructionStatus_open,
  ] = useState("Null");
  const [price, setPrice] = useState("");
  const [address, setAddress] = useState("");
  const [main_features, setMain_features] = useState("");
  const [details, setdetails] = useState("");
  const [propertyCategory, setPropertyCategory] = useState("");
  const [propertyCategoryOthers, setPropertyCategoryOthers] = useState("");
  const [images, setImages] = useState("");
  const [imagesPaths, setImagesPaths] = useState("");
  const [videos, setVideos] = useState("");
  const [videoPaths, setVideoPaths] = useState([]);
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

  const remmoveAsset = async (currentProduct, type) => {
    if (type == "image") {

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
      // console.log("After Remove Image", removeTheSelectedAsset);
      setImages(removeTheSelectedAsset);
    } else {
      const cloneMultipleAssetsPaths = [...videoPaths];
      const removeTheSelectedAssetPaths = cloneMultipleAssetsPaths.filter(
        (item) => item !== currentProduct
      );
      setVideoPaths(removeTheSelectedAssetPaths);

      const uri = await RNFS.readFile(currentProduct, "base64")
        .then((res) => {
          return "data:video/mp4" + res;
        })
        .catch((err) => {
          console.log("Error IN BASE^$ Convertion", err);
        });
      const cloneMultipleAssets = [...videos];
      const removeTheSelectedAsset = cloneMultipleAssets.filter(
        (item) => item !== uri
      );
      // console.log("After Remove Video", removeTheSelectedAsset);
      setVideos(removeTheSelectedAsset);
    }
  };

  const updateImageInGallery = async (path, mime, type) => {
    // console.log("Working Image selector")
    let multipleImages = [];
    let multipleImagePaths = [];
    let multipleVideos = [];
    let multipleVideosPaths = [];

    if (type == "video") {
      console.log("Video recieved :", path);
      if (Array.isArray(path)) {
        const arr = path?.map(async (item) => {
          // console.log("Working Image selector1");
          const result = await ImageCompressor.compress(item.path, {
            // maxHeight: 400,
            // maxWidth: 400,
            quality: 0.8,
          });

          const uri = await RNFS.readFile(result, "base64")
            .then((res) => {
              // return "data:image/png/jpeg/jpg;base64," + res;
              let obj = {
                apiPath: res,
                appPath: "data:video/mp4;base64," + res,
              }

              return obj
            })
            .catch((err) => {
              console.log("Error IN BASE^$ Convertion", err);
            });
          // console.log("Selected Images", uri)
          multipleVideos.push(uri.apiPath);
          multipleVideosPaths.push(result);
        });
        await Promise.all(arr);
        const mergeImagesWithExistingGalleryAssets = [
          ...videos,
          ...multipleVideos,
        ];
        const mergeImagesWithExistingGalleryAssetsPaths = [
          ...videoPaths,
          ...multipleVideosPaths,
        ];
        // console.log("mergeImagesWithExistingGalleryAssetsPaths", mergeImagesWithExistingGalleryAssetsPaths)
        setVideoPaths(mergeImagesWithExistingGalleryAssetsPaths);
        // setMultipleAssetsPost(mergeImagesWithExistingGalleryAssets);
        setVideos(mergeImagesWithExistingGalleryAssets);
      } else {
        const getExistingGalleryAssets = [...videos];
        const getExistingGalleryAssetsPaths = [...videoPaths];
        // const imageObject = {
        //     uri: path,
        //     name: `image${Date.now()}.${mime.slice(mime.lastIndexOf('/') + 1)}`,
        //     type: mime,
        //     tempType: type,
        // };
        // const result = await ImageCompressor.compress(path, {
        //   maxHeight: 400,
        //   maxWidth: 400,
        //   quality: 1,
        // });
        console.log("Result", path);
        const uri = await RNFS.readFile(path, "base64")
          .then((res) => {
            // return "data:image/png/jpeg/jpg;base64," + res;
            let obj = {
              apiPath: res,
              appPath: "data:video/mp4;base64," + res,
            }

            return obj
          })
          .catch((err) => {
            console.log("Error IN BASE^$ Convertion", err);
          });
        // getExistingGalleryAssets.push("test");
        getExistingGalleryAssets.push(uri.apiPath);
        console.log("Object Viudeo", getExistingGalleryAssets);
        getExistingGalleryAssetsPaths.push(path);
        setVideoPaths(getExistingGalleryAssetsPaths);
        // setMultipleAssetsPost(getExistingGalleryAssets);
        setVideos(getExistingGalleryAssets);
      }
      return
    }

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
          // console.log("Selected Images", uri)
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

    const dataForApi = checkCategory();

    // console.log("");
    // console.log("");
    // console.log("--------------------ffffff2-------------------------");
    // console.log("");
    // console.log("");
    // console.log(
    //   "dataForApi of Category " + category + " " + "dataForApi",
    //   dataForApi
    // );
    // console.log("");
    // console.log("");
    // console.log("--------------------ffffff-------------------------");
    // console.log("");
    // console.log("");

    if (dataForApi?.check == true) {
      setImmediate(() => {
        // setLoader(false);
        setReadyToSubmit(true)
        setCheck(true);
      });
      console.log("working API");
      console.log("bathrooms Final", dataForApi?.data);
      AssetLinkers.post("/add_property", dataForApi?.data)
        .then((response) => {
          console.log("Post Api response:", response?.data);
          if (response?.data) {
            setImmediate(() => {
              setLoader(false);
              setCheck(true);
            });

            Toast.show({
              type: "success",
              text1: "Post Successfully Created!",
              visibilityTime: 2000,
            });
            props.navigation.navigate("Dash", { refresh: "refresh" });
          }
        })
        .catch((err) => {
          console.log("Post Api Error", err?.response?.data);
          if (err?.response?.data?.msg == "Limit Exceeded for creating post please contact AssetsLinkers") {
            alert("Limit Exceeded for creating post please contact AssetsLinkers")
          }
          Toast.show({
            type: "success",
            text1: "Post Failed please try again!",
            visibilityTime: 2000,
          });
          setImmediate(() => {
            setLoader(false);
            setCheck(true);
          });
        });
    } else {
      alert("Check feilds");
      setImmediate(() => {
        setLoader(false);
        setCheck(true);
      });
    }
  };

  const checkCategory = () => {
    var {
      userData: {
        user: { id },
      },
    } = props;
    var obj = {};
    switch (category) {
      case "Commercial":
        console.log("location Main", videos);
        const check = checkCategoryData();
        obj = {
          user_id: id,
          rent_sale: sale_Rent,
          property_type: category,
          images: images,
          price: price,
          yards: yards == "Others" ? yardsNumber + " " + yards_Unit : yardsNumber + " " + yards.toLowerCase(),
          category: propertyCategory,
          corner: selected_constructionStatus_corner,
          open: selected_constructionStatus_open,
          videos: videos,
          furnished: "Null",
          bedrooms: "Null",
          bathrooms: "Null",
          rooms: rooms,
          phase: "Null",
          Location: locationMain,
          address: address,
          area_unit: area_unit,
          main_features: main_features,
          details: details,
        };
        console.log("check:", check);
        return { check: check, data: obj };

      case "Residential":
        const check1 = checkCategoryData();
        console.log("location Main", bathrooms1);
        obj = {
          user_id: id,
          rent_sale: sale_Rent,
          property_type: category,
          images: images,
          price: price,
          yards: yards == "Others" ? yardsNumber + " " + yards_Unit : yardsNumber + " " + yards.toLowerCase(),
          category: propertyCategory,
          corner: selected_constructionStatus_corner,
          videos: videos,
          open: selected_constructionStatus_open,
          furnished: furnished,
          bedrooms: bedrooms1,
          bathrooms: bathrooms1,
          rooms: rooms,
          phase: "Null",
          Location: locationMain,
          address: address,
          area_unit: area_unit,
          main_features: main_features,
          details: details,
        };
        console.log("check1:", check1);
        return { check: check1, data: obj };

      // case "Plot":
      //   const check2 = checkCategoryData();
      //   obj = {
      //     user_id: id,
      //     rent_sale: sale_Rent,
      //     property_type: category,
      //     images: images,
      //     price: price,
      //     yards: yards == "Others" ? yardsNumber + " " + yards_Unit : yardsNumber + " " + yards.toLowerCase(),
      //     category: "Null",
      //     corner: selected_constructionStatus_corner,
      //     open: selected_constructionStatus_open,
      //     furnished: "Null",
      //     bedrooms: "Null",
      //     bathrooms: "Null",
      //     rooms: rooms,
      //     phase: phase + " " + phase1,
      //     Location: locationMain,
      //     address: address,
      //     area_unit: "Null",
      //     main_features: main_features,
      //     details: details,
      //   };
      //   console.log("check2:", check2);
      //   return { check: check2, data: obj };
    }
  };

  const checkCategoryData = () => {
    var {
      userData: {
        user: { id },
      },
    } = props;
    console.log("Category1", category);
    switch (category) {
      case "Commercial":
        if (id == null || id == "") {
          setImmediate(() => {
            setCheck(false);
            setLoader(false);
          });
          return alert("Network Error: Try to login again!");
        }
        if (sale_Rent == null || sale_Rent == "") {
          setImmediate(() => {
            setCheck(false);
            setLoader(false);
          });
          return alert("Please select either Sale or Rent!");
        }
        if (images?.length > 10) {
          setImmediate(() => {
            setCheck(false);
            setLoader(false);
          });
          return alert("Maximum Images can be only 10");
        }
        if (videos?.length > 2) {
          setImmediate(() => {
            setCheck(false);
            setLoader(false);
          });
          return alert("Maximium videos can only be 2");
        }
        if (category == null || category == "") {
          setImmediate(() => {
            setCheck(false);
            setLoader(false);
          });
          return alert("Please select Type!");
        }
        if (price == null || price == "") {
          setImmediate(() => {
            setCheck(false);
            setLoader(false);
          });
          return alert("Please enter price!");
        }
        if (propertyCategory == null || propertyCategory == "") {
          setImmediate(() => {
            setCheck(false);
            setLoader(false);
          });
          return alert("Please select category!");
        }
        if (yards == null || yards == "") {
          setImmediate(() => {
            setCheck(false);
            setLoader(false);
          });
          return alert("Please select Area Unit!");
        }
        if (yardsNumber == null || yardsNumber == "") {
          setImmediate(() => {
            setCheck(false);
            setLoader(false);
          });
          return alert("Please Enter Area Value!");
        }
        if (yards == "Others" && (yardsNumber == "" || yards_Unit == "")) {
          setImmediate(() => {
            setCheck(false);
            setLoader(false);
          });
          return alert("Please Enter Value of Others!");
        }
        // if (selected_constructionStatus_corner == null || selected_constructionStatus_corner == '') {
        //     setImmediate(() => {
        //         setCheck(false)
        //         setLoader(false)
        //     })
        //     return alert("Please select Construction Status Corner value!")
        // }
        // if (selected_constructionStatus_open == null || selected_constructionStatus_open == '') {
        //     setImmediate(() => {
        //         setCheck(false)
        //         setLoader(false)
        //     })
        //     return alert("Please select Construction Status open value!")
        // }
        if (location == null || location == "" || location == "Location") {
          setImmediate(() => {
            setCheck(false);
            setLoader(false);
          });
          return alert("Please select Location!");
        }
        if (locationMain == null || locationMain == "" || locationMain == "Location") {
          setImmediate(() => {
            setCheck(false);
            setLoader(false);
          });
          return alert("Please select Location!");
        }
        if (address == null || address == "") {
          setImmediate(() => {
            setCheck(false);
            setLoader(false);
          });
          return alert("Please enter Address!");
        }
        // if (main_features == null || main_features == "") {
        //   setImmediate(() => {
        //     setCheck(false);
        //     setLoader(false);
        //   });
        //   return alert("Please add Main features!");
        // }
        if (details == null || details == "") {
          setImmediate(() => {
            setCheck(false);
            setLoader(false);
          });
          return alert("Please eneter Details!");
        }

        return check;

      case "Residential":
        if (id == null || id == "") {
          console.log("id is prob,: ", id);
          setImmediate(() => {
            setCheck(false);
            setLoader(false);
          });
          return alert("Network Error: Try to login again!");
        }
        if (sale_Rent == null || sale_Rent == "") {
          console.log("sale_Rent is prob,: ", sale_Rent);
          setImmediate(() => {
            setCheck(false);
            setLoader(false);
          });
          return alert("Please select either Sale or Rent!");
        }
        // if (images == null || images == [] || images == "") {
        //   setImmediate(() => {
        //     setCheck(false);
        //     setLoader(false);
        //   });
        //   return alert("Please select an image");
        // }
        if (images?.length > 10) {
          setImmediate(() => {
            setCheck(false);
            setLoader(false);
          });
          return alert("Maximum Images can be only 10");
        }
        if (videos?.length > 2) {
          setImmediate(() => {
            setCheck(false);
            setLoader(false);
          });
          return alert("Maximium videos can only be 2");
        }
        if (category == null || category == "") {
          console.log("category is prob,: ", category);
          setImmediate(() => {
            setCheck(false);
            setLoader(false);
          });
          return alert("Please select Type!");
        }
        if (price == null || price == "") {
          console.log("price is prob,: ", price);
          setImmediate(() => {
            setCheck(false);
            setLoader(false);
          });
          return alert("Please enter price!");
        }
        if (propertyCategory == null || propertyCategory == "") {
          console.log("categoryProp is prob,: ", propertyCategory);
          setImmediate(() => {
            setCheck(false);
            setLoader(false);
          });
          return alert("Please select category!");
        }
        if (yards == null || yards == "") {
          setImmediate(() => {
            setCheck(false);
            setLoader(false);
          });
          return alert("Please select Area Unit!");
        }
        if (yardsNumber == null || yardsNumber == "") {
          setImmediate(() => {
            setCheck(false);
            setLoader(false);
          });
          return alert("Please Enter Area Value!");
        }
        if (address == null || address == "") {
          setImmediate(() => {
            setCheck(false);
            setLoader(false);
          });
          return alert("Please enter Address!");
        }

        // if (selected_constructionStatus_corner == null || selected_constructionStatus_corner == '') {
        //     setImmediate(() => {
        //         setCheck(false)
        //         setLoader(false)
        //     })
        //     return alert("Please select Construction Status Corner value!")
        // }
        // if (selected_constructionStatus_open == null || selected_constructionStatus_open == '') {
        //     setImmediate(() => {
        //         setCheck(false)
        //         setLoader(false)
        //     })
        //     return alert("Please select Construction Status open value!")
        // }
        // if (furnished == null || furnished == '') {
        //     setImmediate(() => {
        //         setCheck(false)
        //         setLoader(false)
        //     })
        //     return alert("Please select Furnished!")
        // }
        // if (bedrooms == null || bedrooms == '') {
        //     setImmediate(() => {
        //         setCheck(false)
        //         setLoader(false)
        //     })
        //     return alert("Please select no. of bedrooms!")
        // }
        // if (bathrooms == null || bathrooms == '') {
        //     setImmediate(() => {
        //         setCheck(false)
        //         setLoader(false)
        //     })
        //     return alert("Please select no. of bathrooms!")
        // }
        if (location == null || location == "") {
          setImmediate(() => {
            setCheck(false);
            setLoader(false);
          });
          return alert("Please select Location!");
        }
        if (locationMain == null || locationMain == "" || locationMain == "Location") {
          setImmediate(() => {
            setCheck(false);
            setLoader(false);
          });
          return alert("Please select Location!");
        }
        // if (main_features == null || main_features == "") {
        //   setImmediate(() => {
        //     setCheck(false);
        //     setLoader(false);
        //   });
        //   return alert("Please add Main features!");
        // }
        if (details == null || details == "") {
          setImmediate(() => {
            setCheck(false);
            setLoader(false);
          });
          return alert("Please enter Details!");
        }
        // if (area_unit == null || area_unit == "") {
        //   setImmediate(() => {
        //     setCheck(false);
        //     setLoader(false);
        //   });
        //   return alert("Please select Area Unit!");
        // }

        return check;

      // case "Plot":
      //   if (id == null || id == "") {
      //     setImmediate(() => {
      //       setCheck(false);
      //       setLoader(false);
      //     });
      //     return alert("Network Error: Try to login again!");
      //   }
      //   if (sale_Rent == null || sale_Rent == "") {
      //     setImmediate(() => {
      //       setCheck(false);
      //       setLoader(false);
      //     });
      //     return alert("Please select either Sale or Rent!");
      //   }
      //   // if (images == null || images == [] || images == "") {
      //   //   setImmediate(() => {
      //   //     setCheck(false);
      //   //     setLoader(false);
      //   //   });
      //   //   return alert("Please select an image");
      //   // }
      //   if (category == null || category == "") {
      //     setImmediate(() => {
      //       setCheck(false);
      //       setLoader(false);
      //     });
      //     return alert("Please select Type!");
      //   }
      //   if (price == null || price == "") {
      //     setImmediate(() => {
      //       setCheck(false);
      //       setLoader(false);
      //     });
      //     return alert("Please enter Price!");
      //   }
      //   if (yards == null || yards == "") {
      //     setImmediate(() => {
      //       setCheck(false);
      //       setLoader(false);
      //     });
      //     return alert("Please select Area Unit!");
      //   }
      //   if (yardsNumber == null || yardsNumber == "") {
      //     setImmediate(() => {
      //       setCheck(false);
      //       setLoader(false);
      //     });
      //     return alert("Please Enter Area Value!");
      //   }

      //   // if (selected_constructionStatus_corner == null || selected_constructionStatus_corner == '') {
      //   //     setImmediate(() => {
      //   //         setCheck(false)
      //   //         setLoader(false)
      //   //     })
      //   //     return alert("Please select Construction Status Corner value!")
      //   // }
      //   // if (selected_constructionStatus_open == null || selected_constructionStatus_open == '') {
      //   //     setImmediate(() => {
      //   //         setCheck(false)
      //   //         setLoader(false)
      //   //     })
      //   //     return alert("Please select Construction Status open value!")
      //   // }

      //   if (phase == null || phase == "") {
      //     setImmediate(() => {
      //       setCheck(false);
      //     });
      //     return alert("Please select phase!");
      //   }
      //   if (location == null || location == "") {
      //     setImmediate(() => {
      //       setCheck(false);
      //       setLoader(false);
      //     });
      //     return alert("Please select Location!");
      //   }
      //   if (locationMain == null || locationMain == "" || locationMain == "Location") {
      //     setImmediate(() => {
      //       setCheck(false);
      //       setLoader(false);
      //     });
      //     return alert("Please select Location!");
      //   }
      //   if (address == null || address == "") {
      //     setImmediate(() => {
      //       setCheck(false);
      //       setLoader(false);
      //     });
      //     return alert("Please enter Address!");
      //   }
      //   // if (main_features == null || main_features == "") {
      //   //   setImmediate(() => {
      //   //     setCheck(false);
      //   //     setLoader(false);
      //   //   });
      //   //   return alert("Please add Main features!");
      //   // }
      //   if (details == null || details == "") {
      //     setImmediate(() => {
      //       setCheck(false);
      //       setLoader(false);
      //     });
      //     return alert("Please enter Details!");
      //   }
      //   console.log("Check", check);
      //   return check;
      // if (check == false) {
      //     return false
      // } else {
      //     return true
      // }
    }
  };

  const checkDataForSubmitBtn = () => {
    var {
      userData: {
        user: { id },
      },
    } = props;
    // console.log("Category1", category);
    var check = true
    switch (category) {
      case "Commercial":
        if (id == null || id == "") {
          return check = false
        }
        if (sale_Rent == null || sale_Rent == "") {

          return check = false
        }

        if (category == null || category == "") {
          return check = false
        }
        if (price == null || price == "") {
          return check = false
        }
        if (propertyCategory == null || propertyCategory == "") {
          return check = false
        }
        if (yards == null || yards == "") {
          return check = false
        }
        if (yardsNumber == null || yardsNumber == "") {
          return check = false
        }
        if (yards == "Others" && (yardsNumber == "" || yards_Unit == "")) {
          return check = false
        }

        if (location == null || location == "" || location == "Location") {
          return check = false
        }
        if (locationMain == null || locationMain == "" || locationMain == "Location") {
          return check = false
        }
        if (address == null || address == "") {
          return check = false
        }
        if (details == null || details == "") {
          return check = false
        }
        return check = true;
      // return check = false;

      case "Residential":
        if (id == null || id == "") {
          console.log("Res ID");
          return check = false
        }
        if (sale_Rent == null || sale_Rent == "") {
          console.log("Res sale_rent");
          return check = false
        }

        if (category == null || category == "") {
          console.log("Res category");
          return check = false
        }
        if (price == null || price == "") {
          console.log("Res price");
          return check = false
        }
        if (propertyCategory == null || propertyCategory == "") {
          console.log("Res propertyCate");
          return check = false
        }
        if (yards == null || yards == "") {
          console.log("Res yards");
          return check = false
        }
        if (yardsNumber == null || yardsNumber == "") {
          console.log("Res yardsNum,ber");
          return check = false
        }
        if (address == null || address == "") {
          console.log("Res address");
          return check = false
        }


        if (location == null || location == "") {
          console.log("Res location");
          return check = false
        }
        if (locationMain == null || locationMain == "" || locationMain == "Location") {
          console.log("Res locationMain");
          return check = false
        }

        if (details == null || details == "") {
          console.log("Res details");
          return check = false
        }
        return check = true;

      // case "Plot":
      //   if (id == null || id == "") {
      //     return check = false
      //   }
      //   if (sale_Rent == null || sale_Rent == "") {
      //     return check = false
      //   }

      //   if (category == null || category == "") {
      //     return check = false
      //   }
      //   if (price == null || price == "") {
      //     return check = false
      //   }
      //   if (yards == null || yards == "") {
      //     return check = false
      //   }
      //   if (yardsNumber == null || yardsNumber == "") {
      //     return check = false
      //   }

      //   if (phase == null || phase == "") {
      //     return check = false
      //   }
      //   if (location == null || location == "") {
      //     return check = false
      //   }
      //   if (locationMain == null || locationMain == "" || locationMain == "Location") {
      //     return check = false
      //   }
      //   if (address == null || address == "") {
      //     return check = false
      //   }
      //   if (details == null || details == "") {
      //     return check = false
      //   }
      //   return check = true;

    }
  };
  var stateCheck = checkDataForSubmitBtn()
  // console.log("category Post SCreen", stateCheck)
  return (
    <View style={styles.mainContainer}>
      {/* {console.log(props)} */}
      {/* Header */}
      <Header Title={"POST"} navProps={props.navigation} />

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
            marginLeft: 10,
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
          updateImageInGallery={(path, mime, type) =>
            updateImageInGallery(path, mime, type)
          }
          multipleAssetsPost={imagesPaths}
          multipleVideos={videoPaths}
          remmoveAsset={(val, type) => remmoveAsset(val, type)}
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
          initYards={yards}
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
        />

        {/* Submit Button */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onSubmitPress}
          disabled={!stateCheck}
          style={[styles.submit_btn, {
            backgroundColor: stateCheck == true ? "#2C74B3" : "#000"
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

export default connect(mapStateToProps, mapDispatchToProps)(Post);

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
