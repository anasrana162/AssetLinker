import React from 'react';
import {
  Animated,
} from 'react-native';
import { useRef } from 'react';
import { useEffect } from 'react';
import 'react-native-gesture-handler'

const FadeInView = (props) => {
  const fadeAnim = useRef(new Animated.Value(0.01)).current

  useEffect(() => {
    Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration: 2000, useNativeDriver: true
      }
    ).start();
  }, [fadeAnim])

  return (
    <Animated.View
      style={{
        ...props.style,
        opacity: fadeAnim,
      }}
    >
      {props.children}
    </Animated.View>
  );
}

export default FadeInView;
