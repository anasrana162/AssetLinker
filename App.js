import React, { Component, useEffect, useState } from "react";
import {
  StyleSheet,
  LogBox,
  View,
  NativeModules,
  Platform,
  Dimensions,
  PermissionsAndroid,
  StatusBar,
  Animated,
  Modal,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import { Provider } from "react-redux";
import Navigation from "./src/navigation/Navigation";
import Toast from "react-native-toast-message";
import { check, PERMISSIONS } from "react-native-permissions";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ProgressBar } from "react-native-paper";

{/* {---------------Code Push----------------} */ }
import codePush from 'react-native-code-push';

// App center IOS Push Command
// appcenter codepush release-react -a assetslinkers94-gmail.com/AssetsLinkers_IOS -d Staging

const {
  StatusBarManager: { HEIGHT },
  StatusBarManager,
} = NativeModules;
const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height - HEIGHT;

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {

      network: true,
      syncMessage: 'Loading',
      progress: null,
      updateProcess: true,
      downloaded: 0,
      progressListner: new Animated.Value(0),
      downloading: true,
      update: false,
    };
  }

  componentDidMount = () => {
    this.requestPermissions()
    this.syncImmediate()
  }

  requestPermissions = async () => {
    if (Platform.OS == "ios") {
      // props.navigation.navigate("Plan Map Screen", { flag: 2 })
    } else {
      check(PERMISSIONS.ANDROID.READ_MEDIA_IMAGES).then((result) => {
        if (result === "granted") {
          console.log("Permission for Gallery Granted");
        } else {
          console.log("Checking Permissions");
          PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
            {
              title: "Camera",
              message: "Asset Linker wants to access your " + "Media Gallery.",

              buttonNegative: "Cancel",
              buttonPositive: "OK",
            }
          );
        }
      });
      check(PERMISSIONS.ANDROID.CAMERA).then((result) => {
        if (result === "granted") {
          console.log("Permission for Camera Granted");
        } else {
          console.log("Checking Permissions");
          PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA, {
            title: "Camera",
            message: "Asset Linker wants to access your " + "Camera.",

            buttonNegative: "Cancel",
            buttonPositive: "OK",
          });
        }
      });
    }
  };


  syncImmediate() {
    this.setState({ updateProcess: true });
    codePush.sync(
      {
        installMode: codePush.InstallMode.IMMEDIATE,
        updateDialog: {
          appendReleaseDescription: false,
          // optionalIgnoreButtonLabel: 'Close',
          optionalInstallButtonLabel: 'Install',
          optionalUpdateMessage: 'New update available. Install update',
          title: 'Update Required',
        },
      },
      this.codePushStatusDidChange.bind(this),
      this.codePushDownloadDidProgress.bind(this),
    );
  }

  codePushDownloadDidProgress(progress) {
    const downloaded = Math.round(
      (progress?.receivedBytes / progress?.totalBytes) * 100,
    );
    console.log('downloaded', downloaded);
    this.setState({ progress, downloading: true, downloaded: downloaded });
  }

  codePushStatusDidChange(syncStatus) {
    switch (syncStatus) {
      case codePush.SyncStatus.CHECKING_FOR_UPDATE:
        console.log('==================CHECKING_FOR_UPDATE==================');
        console.log(codePush.SyncStatus.CHECKING_FOR_UPDATE);
        console.log('====================================');

        setTimeout(() => {
          this.setState({ syncMessage: 'Checking For Update' });
        }, 100);
        break;

      case codePush.SyncStatus.DOWNLOADING_PACKAGE:
        // alert("Please wait few minutes while the update is installed")

        setTimeout(() => {
          this.setState({
            update: true,
            syncMessage: 'Downloading updates',
            downloading: true,
          });
        }, 100);
        break;

      case codePush.SyncStatus.AWAITING_USER_ACTION:
        setTimeout(() => {
          this.setState({
            syncMessage: 'Waiting for user action to accept',
            downloading: false,
          });
        }, 100);
        break;

      case codePush.SyncStatus.INSTALLING_UPDATE:
        console.log('================INSTALLING_UPDATE====================');
        console.log(codePush.SyncStatus.INSTALLING_UPDATE);
        console.log('====================================');
        setTimeout(() => {
          this.setState({
            syncMessage: 'Kindly wait, update is being install',
            downloading: true,
          });
        }, 100);
        break;

      case codePush.SyncStatus.UP_TO_DATE:
        console.log('=================UP_TO_DATE===================');
        console.log(codePush.SyncStatus.UP_TO_DATE);
        console.log('====================================');
        setTimeout(() => {
          this.setState({
            syncMessage: 'Your app is upto-date',
            updateProcess: false,
            downloading: false,
          });
        }, 100);
        break;

      case codePush.SyncStatus.UPDATE_IGNORED:
        setTimeout(() => {
          this.setState({ syncMessage: 'User ignored the update' }, () => {
            BackHandler.exitApp();
          });
        }, 100);
        break;

      case codePush.SyncStatus.UPDATE_INSTALLED:
        console.log('==================UPDATE_INSTALLED==================');
        console.log(codePush.SyncStatus.UPDATE_INSTALLED);
        console.log('====================================');
        setTimeout(() => {
          this.setState(
            {
              update: false,
              syncMessage: 'Your application is updated now',
              updateProcess: false,
            },
            () => {
              codePush.restartApp();
            },
          );
        }, 100);
        break;

      case codePush.SyncStatus.UNKNOWN_ERROR:
        console.log(codePush.SyncStatus.UNKNOWN_ERROR)
        // setTimeout(() => {
        //   this.setState({ syncMessage: "There is an unknown error" });
        // }, 100);
        break;
    }
  }

  render() {
    LogBox.ignoreAllLogs();
    return (
      <>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <View style={{ flex: 1, backgroundColor: "#001645" }}>
            <View style={{ marginTop: StatusBarManager?.HEIGHT, flex: 1 }}>
              {Platform.OS == "ios" && (
                <StatusBar
                  barStyle={"light-content"}
                  //backgroundColor={"#f5f5f5"}
                  translucent
                />
              )}
              {Platform.OS == "android" && (
                <StatusBar
                  barStyle={"light-content"}
                  //   backgroundColor={"#020621"}
                  translucent
                />
              )}

              <Navigation />
              {/* <Loader /> */}
                   {/* Code Push Update Modal */}

          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.update} //this.state.update
          >
            <View
              style={styles.modalOuterCont}>
              <View
                style={styles.modalInnerCont}>
                {/* <Image
                  source={require('./assets/aljabirlogo.png')}
                  style={styles.imageModal}
                /> */}
                <Text
                  style={styles.titleModalEN}>
                  App is updating, please wait.
                </Text>

                <Text
                  style={styles.downloaded}>
                  {this.state.downloaded}%
                </Text>
                <ProgressBar
                  progress={0.01 * this.state.downloaded}
                  color="#61CE70"
                  style={styles.progressBar}
                />
              </View>
            </View>
          </Modal>
              <Toast />
            </View>
          </View>
        </GestureHandlerRootView>
      </>
    );
  };
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    height: height,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor:"red"
  },
  image: {
    width: 330,
    height: 150,
    // marginTop: 60,
    marginBottom: 60,
    marginLeft: 20
  },
  modalOuterCont: {
    width: width,
    height: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(52,52,52,0.3)',
  },
  modalInnerCont: {
    width: width,
    height: 270,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  titleModalEN: {
    // fontFamily: 'Careem-Bold',
    fontWeight: "500",
    fontSize: 20,
    color: 'black',
    alignSelf: 'center',
    marginBottom: 10,
  },
  titleModalAR: {
    // fontFamily: 'Careem-Bold',
    fontSize: 14,
    color: 'black',
    alignSelf: 'center',
    marginBottom: 20,
  },
  downloaded: {
    // fontFamily: 'Careem-Bold',
    fontSize: 18,
    color: 'white',
    alignSelf: 'center',
    marginVertical: 10,
    position: 'absolute',
    bottom: 29,
    left: 35,
    zIndex: 50,
  },
  progressBar: {
    height: 30,
    width: '90%',
    alignSelf: 'center',
    borderRadius: 10,
    backgroundColor: '#EBECED',
  },
  imageModal: {
    width: 120,
    height: 90,
    alignSelf: 'center',
    marginTop: 0,
    marginBottom: 10,
  },
});
