// npm i react-native-image-crop-picker react-native-actions-sheet react-native-actions-sheet; cd ios; pod install; cd ..

import React, { useRef } from "react";
import { Text, TouchableOpacity, View, Image } from "react-native";
import ImageCropPicker from "react-native-image-crop-picker";
import ActionSheet from "react-native-actions-sheet";
import { Image as ImageCompressor } from "react-native-compressor";
import RNFS from "react-native-fs";
const camera = require("../assets/camera.png");

export default CustomImagepicker = ({
  children,
  multiple = false,
  onImageChange = () => { },
  style,
}) => {
  const actionSheetRef = useRef(null);

  const [imageURI, setImageURI] = React.useState("");

  const imageChange = async (method = "gallery") => {
    if (method === "camera") {
      ImageCropPicker.openCamera({
        mediaType: "photo",
        multiple: multiple,
      }).then(async (image) => {
        actionSheetRef.current.hide();
        const result = await ImageCompressor.compress(image.path, {
          maxHeight: 400,
          maxWidth: 400,
          quality: 1,
        });
        console.log("Resut Image: ", result);
        // var imageUrl = ''
        const uri = await RNFS.readFile(result, "base64")
          .then((res) => {
            let obj = {
              apiPath: res,
              appPath: "data:image/png/jpeg/jpg;base64," + res,
            }

            return obj
            // return "data:image/png/jpeg/jpg;base64," + res;
          })
          .catch((err) => {
            console.log("Error IN BASE^$ Convertion", err);
          });
        // onImageChange(result, image.mime);
        // console.log("COnev", uri)
        onImageChange(uri);
      });
    } else {
      ImageCropPicker.openPicker({
        mediaType: "photo",
        multiple: multiple,
      }).then(async (image) => {
        actionSheetRef.current.hide();
        const result = await ImageCompressor.compress(image.path, {
          maxHeight: 400,
          maxWidth: 400,
          quality: 1,
        });
        // console.log("result-----------------------", file);
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
        onImageChange(uri);
      });
    }
  };
  return (
    <TouchableOpacity
      onPress={() => actionSheetRef.current.show()}
      style={style}
      activeOpacity={0.8}
    >
      <ActionSheet
        ref={actionSheetRef}
        containerStyle={{ backgroundColor: "transparent" }}
      >
        <View style={{ padding: 10 }}>
          <View
            style={{
              backgroundColor: "rgba(241,241,241,0.8)",
              borderRadius: 10,
              marginBottom: 10,
            }}
          >
            <View
              style={{
                borderBottomWidth: 1.5,
                borderBottomColor: "#ccc",
                paddingVertical: 10,
              }}
            >
              <Text style={{ color: "grey", textAlign: "center" }}>
                Choose an option to pick an Image
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                // ref.hide()
                imageChange("camera");
              }}
              style={{
                paddingVertical: 12,
                alignItems: "center",
                borderBottomWidth: 1.5,
                borderBottomColor: "#ccc",
              }}
            >
              <Text style={{ color: "rgb(0,88,200)", fontSize: 18 }}>
                Take Photo
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                // ref.hide()
                imageChange("gallery");
              }}
              style={{ paddingVertical: 12, alignItems: "center" }}
            >
              <Text style={{ color: "rgb(0,88,200)", fontSize: 18 }}>
                Choose from Library
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => actionSheetRef.current.hide()}
            style={{
              backgroundColor: "white",
              borderRadius: 10,
              paddingVertical: 12,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "rgb(0,88,200)",
                fontSize: 18,
                fontWeight: "600",
              }}
            >
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      </ActionSheet>
      {children}
    </TouchableOpacity>
  );
};
