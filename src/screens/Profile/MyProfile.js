import { StyleSheet, Text, View, NativeModules, Dimensions, TouchableOpacity, Linking } from 'react-native'
import React, { Component } from 'react'

const { StatusBarManager: { HEIGHT } } = NativeModules;
const width = Dimensions.get("screen").width
const height = Dimensions.get("screen").height - HEIGHT

{/* {---------------Redux Imports------------} */ }
import { connect } from 'react-redux';
import * as userActions from "../../redux/actions/user"
import { bindActionCreators } from 'redux';

 class MyProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
          
        };
    }
  render() {
    return (
      <View>
        <Text>MyProfile</Text>
      </View>
    )
  }
}

{/* {---------------redux State ------------} */ }
const mapStateToProps = state => ({
    userData: state.userData
});

{/* {---------------redux Actions ------------} */ }
const ActionCreators = Object.assign(
    {},
    userActions,
);
const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(MyProfile)

const styles = StyleSheet.create({})