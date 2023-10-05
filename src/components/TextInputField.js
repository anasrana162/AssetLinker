import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";

class TextInputField extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>TextInputField</Text>
            </View>
        );
    }
}
export default TextInputField;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});