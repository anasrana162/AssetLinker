import {StyleSheet, Dimensions} from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    width: width,
  },

  loginbutton: {
    borderRadius: 8,
    paddingVertical: 5,
    backgroundColor: '#F7BB00',
    width: width / 4,
    marginTop: 10,
    marginBottom: 10,
  },

  inputFieldsSignIn: {
    marginTop: 10,
    borderColor: '#FFFFFF',
    padding: 10,
    backgroundColor: '#FFFFFF',
    margin: 10,
    width: 250,
    borderRadius: 30,
  },
});
