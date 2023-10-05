import React from 'react';
import {
    Animated,
} from 'react-native';
import { useRef } from 'react';
import { useEffect } from 'react';
import 'react-native-gesture-handler';

export default function Rotate(props) {

    const logo = useRef(new Animated.ValueXY({ x: -400, y: 400 })).current

    useEffect(() => {
        Animated.timing(
            logo,
            {
                toValue: { x: 5, y: 20 }, speed: 5, duration: 1000, useNativeDriver: true
            }
        ).start();
    });

    const rotate = logo.y.interpolate({
        inputRange: [0, 20],
        outputRange: ['180deg', '0deg']
    });

    return (

        <Animated.View
            style={{
                ...props.style,
                transform: [{ rotate: rotate }]
            }}
        >
            {props.children}
        </Animated.View>
    );
}



