import React, {useEffect} from 'react';
import {Text, View, StyleSheet, BackHandler, Alert} from 'react-native';

const Back_handler = ({
  navProps,
  params,
  message,
  GoBackToViewProgram,
  goBackFunc,
  isGoBack,
  param,
  isPayScreen,
  showAlert,
}) => {
  useEffect(() => {
    const backAction = () => {
      if (isGoBack == true) {
        console.log('Cant Go back!');
        return true;
      }

      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [navProps]);

  return <View></View>;
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   text: {
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
// });

export default Back_handler;
