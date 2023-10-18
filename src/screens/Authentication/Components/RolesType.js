import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import Ionicons from "react-native-vector-icons/Ionicons"

const RolesType = ({ data, onSelectUserRole,defaultSelected }) => {

    const [checked, setChecked] = React.useState(defaultSelected?.id)


    const selected = (val, key) => {
        switch (key) {
            case 'estate_agent':
                onSelectUserRole(val?.role)
                setChecked(val.id)
                break;
            case "builder":
                onSelectUserRole(val?.role)
                setChecked(val.id)
                break;
            case "buyer_seller":
                onSelectUserRole(val?.role)
                setChecked(val.id)
                break;
        }
    }

    return (
        <View style={styles.mainContainer}>


            {
                data.map((item, index) => {
                    return (
                        <TouchableOpacity
                            onPress={() => selected(item, item?.role)}
                            key={String(item?.id)}
                            style={styles.itemCont}
                        >
                            {checked == item?.id ? <Ionicons size={24} name="radio-button-on" color={"#3081bf"} /> : <Ionicons size={24} name="radio-button-off" color={"#3081bf"} />}
                            <Text style={styles.itemText}>{item?.name}</Text>
                        </TouchableOpacity>
                    )
                })
            }
        </View>
    )
}

export default RolesType

const styles = StyleSheet.create({
    mainContainer: {
        width: "50%",
        // flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
        marginTop: 20
    },
    itemCont: {

        width: "100%",
        height: 25,
        marginBottom: 10,
        // borderWidth: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
    },
    itemText: {
        fontSize: 16,
        fontWeight: "500",
        color: "black",
        marginLeft: 10
    }

})