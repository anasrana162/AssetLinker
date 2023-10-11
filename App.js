import React, { Component, useEffect, useState } from 'react';
import { StyleSheet, LogBox, View, NativeModules, Platform, Dimensions, PermissionsAndroid, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import Navigation from './src/navigation/Navigation';
import Toast from 'react-native-toast-message';
import {
  check,
  PERMISSIONS
} from 'react-native-permissions';
// import { store } from './src/redux1';
// import Loader from './src/config/Helpers/Loader';
// import { loaderStop } from './src/redux1/actions';

const { StatusBarManager: { HEIGHT }, StatusBarManager } = NativeModules;
const width = Dimensions.get("screen").width
const height = Dimensions.get("screen").height - HEIGHT

const App = (props) => {

  useEffect(() => {
    requestPermissions()
  }, [])

  const requestPermissions = async () => {
    
    if (Platform.OS == "ios") {

      // props.navigation.navigate("Plan Map Screen", { flag: 2 })
    } else {
      check(PERMISSIONS.ANDROID.READ_MEDIA_IMAGES)
        .then((result) => {
          if (result === "granted") {
            console.log("Permission for Gallery Granted")
          }
          else {
            console.log("Checking Permissions")
             PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
              {
                title: "Camera",
                message:
                  "Asset Linker wants to access your " +
                  "Media Gallery.",

                buttonNegative: "Cancel",
                buttonPositive: "OK"
              }
            );
          }
        })
      check(PERMISSIONS.ANDROID.CAMERA)
        .then((result) => {
          if (result === "granted") {
            console.log("Permission for Camera Granted")
          }
          else {
            console.log("Checking Permissions")
             PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.CAMERA,
              {
                title: "Camera",
                message:
                  "Asset Linker wants to access your " +
                  "Camera.",

                buttonNegative: "Cancel",
                buttonPositive: "OK"
              }
            );
          }
        })
    }
  }

  LogBox.ignoreAllLogs()
  return (
    <>
      {/* <Provider store={store}> */}
      <View style={{ flex: 1, backgroundColor: "#001645", }}>

        <View style={{ marginTop: StatusBarManager?.HEIGHT, flex: 1 }} >
          {Platform.OS == "ios" && <StatusBar
            barStyle={'light-content'}
            //backgroundColor={"#f5f5f5"}
            translucent
          />}
          {Platform.OS == "android" && <StatusBar
            barStyle={'light-content'}
            //   backgroundColor={"#020621"}
            translucent
          />}



          <Navigation />
          {/* <Loader /> */}
          <Toast />

        </View>
      </View>
      {/* </Provider> */}


    </>
  );

}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    height: height,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor:"red"
  },
});