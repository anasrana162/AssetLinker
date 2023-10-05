import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity } from 'react-native'
import React from 'react'

const ButtonList = ({ data, titleSale,onSelectValue }) => {

    const [selected, setSelected] = React.useState('')

    return (
        <View style={styles.button_list_cont}>
            <Text style={styles.title}>{titleSale}</Text>

            {/* Type list */}
            <View style={styles.horizontal_list_cont}>
                {
                    data.map((data, index) => {
                        console.log("Name", data?.name)
                        return (

                            <TouchableOpacity
                                onPress={() => {
                                    setSelected(data?.name)
                                    onSelectValue(data?.name)
                                }}
                                style={[styles.list_btn, {
                                    backgroundColor: data?.name == selected ? '#144272' : '#2C74B3'
                                }]}
                            >
                                <Text style={styles.list_btn_text}>{data?.name}</Text>
                            </TouchableOpacity>

                        )
                    })
                }
            </View>

        </View>
    )
}

export default ButtonList

const styles = StyleSheet.create({
    button_list_cont: {
        width: "100%",
        justifyContent: "center",
        alignItems: "flex-start",
    },
    horizontal_list_cont: {
        marginTop: 10,
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        alignSelf: "center",
        justifyContent: "space-around"
    },
    list_btn: {
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        height: 35,
        paddingHorizontal: 10,
        borderRadius: 5,
        marginHorizontal: 5,
        zIndex: 10,
        marginBottom: 15,
    },
    list_btn_text: {
        color: '#fff',
        fontSize: 16,
        fontWeight: "600",
        alignSelf: 'center',
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        color: "black",
    },
})