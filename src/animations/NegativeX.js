import React from 'react';
import {
  Animated,
} from 'react-native';
import { useRef } from 'react';
import { useEffect } from 'react';
import 'react-native-gesture-handler'

export default function NegativeX(props) {
  
  const logo = useRef(new Animated.ValueXY({ x: -400, y: 400 })).current
  
  useEffect(() => {
    Animated.timing(
      logo,
      {
        toValue: { x: 5, y: 20 }, speed: 5, duration: 1000, useNativeDriver: true
      }
    ).start();
  })

  return (
    <Animated.View
      style={{
        ...props.style,
        transform: [{ translateX: logo.x }]
      }}
    >
      {props.children}
    </Animated.View>
  );
}