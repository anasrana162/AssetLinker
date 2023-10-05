import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Text, View} from 'react-native';
import {StyleSheet, Dimensions} from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default function LoginButton(props) {
  const {onPress, title} = props;

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.loginbutton}>
        <Text style={styles.loginButtonText}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  loginbutton: {
    borderRadius: 8,
    paddingVertical: 5,
    backgroundColor: '#96d2f2',
    width: width / 4,
    marginTop: 10,
    marginBottom: 10,
    borderColor: '#023661',
    borderWidth: 2


  },
  loginButtonText: {
    color: '#000000',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontSize: 16,
    textAlign: 'center',
  },
});
