import React, { Component, useEffect, useState } from 'react';
import { StyleSheet, LogBox, View, NativeModules, Dimensions, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import Navigation from './src/navigation/Navigation';
import Toast from 'react-native-toast-message';
import { store } from './src/redux1';
import Loader from './src/config/Helpers/Loader';
import { loaderStop } from './src/redux1/actions';

const { StatusBarManager: { HEIGHT }, StatusBarManager } = NativeModules;
const width = Dimensions.get("screen").width
const height = Dimensions.get("screen").height - HEIGHT

const App = (props) => {

  useEffect(() => {
    loaderStop()
  }, [])


  LogBox.ignoreAllLogs()
  return (
    <>
      <Provider store={store}>
        <View style={{ flex: 1, backgroundColor: "#3081bf", }}>

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



         <Navigation  />
            <Loader />
            <Toast />

          </View>
        </View>
      </Provider>


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