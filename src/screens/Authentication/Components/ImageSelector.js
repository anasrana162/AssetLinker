import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Colors, size, WP } from "../../../config";
import CustomImagePicker from "../../../components/CustomImagePicker";

const ImageSelector = ({ imagePath, style }) => {
  const [path, setPath] = React.useState("");
  return (
    <View style={[styles.mainContainer, style]}>
      <CustomImagePicker
        style={styles.imagePicker_cont}
        // onImageChange={(path, mime) => {
        //   this.setState({ image: path, mime: mime });
        // }}
        onImageChange={(path) => {
            // console.log("path clg", path);
          setPath(path?.appPath);
          imagePath(path?.apiPath);
          // this.setState({ image: path });
        }}
      >
        <FontAwesome name="camera" size={20} color={Colors.primary} />
      </CustomImagePicker>
      <View style={styles.imageCont}>
        {/* {console.log("Image Path: ",path )} */}
        <Image
          source={
            path == ""
              ? require("../../../../assets/placeholderPost.jpeg")
              : { uri: path }
          }
          style={styles.imageStyle}
          resizeMode="cover"
        />
      </View>
    </View>
  );
};

export default ImageSelector;

const styles = StyleSheet.create({
  mainContainer: {
    width: "30%",
    // height: 140,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    alignSelf: "center",
    // backgroundColor: "red"
  },
  imageCont: {
    width: 120,
    height: 120,
    borderWidth: 2,
    borderColor: "#020621",
    borderRadius: 60,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 50,
  },
  imagePicker_cont: {
    backgroundColor: "#ffffff",
    opacity: 1,
    // padding: 6,
    borderRadius: 100,
    width: 35,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "grey",
    position: "absolute",
    bottom: 0,
    right: 0,
    zIndex: 200,
  },
  imageStyle: {
    width: "100%",
    height: "100%",
    borderRadius: 60,
  },
});
