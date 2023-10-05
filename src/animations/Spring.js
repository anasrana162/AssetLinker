import React from 'react';
import {
  Animated,
} from 'react-native';
import { useRef } from 'react';
import { useEffect } from 'react';
import 'react-native-gesture-handler';

export default function Spring(props) {
  const logo = useRef(new Animated.ValueXY({ x: 400, y: -400 })).current
  useEffect(() => {
    Animated.spring(
      logo,
      {
        toValue: 0,
        tension: 10,
        friction: 8,
        useNativeDriver: false,
      }
    ).start();
  });

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
