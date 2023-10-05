import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity, NativeModules } from 'react-native'
import React from 'react'


const { StatusBarManager: { HEIGHT } } = NativeModules;
const width = Dimensions.get("screen").width
const height = Dimensions.get("screen").height - HEIGHT

const DropDown = ({ data, show, onDismiss, title, onSelect }) => {
    return (
        <>
            {show &&
                <>
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={onDismiss}
                        style={styles.dropdown_back_cont}>
                    </TouchableOpacity>
                    <View style={styles.dropdown_main_cont}>
                        <View style={styles.dropdown_data_cont}>

                            <Text
                                style={{
                                    color: 'rgb(0,88,200)',
                                    textAlign: 'center',
                                    fontSize: 24,
                                    fontWeight: '500',
                                    marginVertical: 10,
                                }}>
                                {title}
                            </Text>

                            {
                                data.map((item, index) => {
                                    return (
                                        <TouchableOpacity
                                            key={String(index)}
                                            style={styles.data_item_cont}
                                            onPress={()=>onSelect(item?.name)}
                                        >
                                            <Text
                                                style={{
                                                    color: 'rgb(0,88,200)',
                                                    textAlign: 'center',
                                                    fontSize: 18,
                                                    fontWeight: '500',
                                                }}>
                                                {item?.name}
                                            </Text>
                                        </TouchableOpacity>
                                    )
                                })
                            }


                        </View>
                        <TouchableOpacity
                        onPress={onDismiss}
                        style={styles.dropdown_cancel_cont}>
                            <Text
                                style={{
                                    color: 'rgb(0,88,200)',
                                    textAlign: 'center',
                                    fontSize: 24,
                                    fontWeight: '500',
                                }}>
                                Cancel
                            </Text>
                        </TouchableOpacity>
                    </View>
                </>}

        </>
    )
}

export default DropDown

const styles = StyleSheet.create({
    dropdown_back_cont: {
        width: width,
        height: height - 50,
        backgroundColor: 'rgba(52,52,52,0.8)',
        position: "absolute",
        zIndex: 150,
        justifyContent: "flex-end",
        alignItems: "center",
    },
    dropdown_main_cont: {
        width: width,
        // height: height / 2.4,
        justifyContent: "flex-end",
        alignItems: "center",
        zIndex: 200,
        position: "absolute",
        bottom: 0,
    },
    dropdown_data_cont: {
        width: width - 20,
        // height: height / 2.7,
        backgroundColor: "rgba(241,241,241,0.8)",
        borderRadius: 20,
        marginBottom: 20,
    },
    dropdown_cancel_cont: {
        width: width - 20,
        height: 60,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        borderRadius: 20,
        marginBottom: 20,
    },
    data_item_cont: {
        width: "100%",
        height: 40,
        borderTopWidth: 1,
        justifyContent:"center",
        alignItems:"center",
        // borderBottomWidth:1,
        borderColor: "rgba(52,52,52,0.8)"
    },
})