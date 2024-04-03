import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
const width = Dimensions.get("screen").width
const height = Dimensions.get("screen").height
import AntDesign from 'react-native-vector-icons/AntDesign';
import MultipleimagePicker from '../../../components/MultipleimagePicker'

const ImageURL = "https://devstaging.a2zcreatorz.com/assetLinker_laravel/storage/app/public/images/property/"


const ImageSelector = ({
    setMultipleAssetsPost,
    multipleAssetsPost,
    updateImageInGallery,
    remmoveAsset,
}) => {

    // console.log(multipleAssetsPost);

    return (
        <>
            <View style={styles.mainContainer}>
                <View style={styles.upload_5_image}>
                    <Text style={{ color: 'black', fontSize: 15 }}>UPLOAD UP TO 5 PHOTOS</Text>
                    <AntDesign name="right" size={15} color="#000" />
                </View>

                <MultipleimagePicker
                    style={styles.multi_image_picker}
                    onImageChange={(path, mime, type) => { updateImageInGallery(path, mime, type) }}
                    uploadVideo={false}
                    isMultiple={true}>
                    <AntDesign name="pluscircleo" size={20} color="#fff" />
                    <Text style={styles.add_image_text}>
                        Add Images
                    </Text>
                </MultipleimagePicker>
            </View>
            <View style={{ flexDirection: 'row', marginHorizontal: 10, marginTop: 10 }}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={true}>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginVertical: 10,
                        }}>
                        {multipleAssetsPost &&
                            multipleAssetsPost?.map((item, index) => (
                                <View
                                    style={{ position: 'relative', marginHorizontal: 5 }}
                                    key={index + 1}>
                                    {/* {       console.log("Item in com",item)} */}
                                    {
                                        item !== "" ?
                                            <>
                                                {
                                                    item.includes(".png", 0) == true ?
                                                        <Image
                                                            style={{
                                                                height: Dimensions.get('window').height * 0.11,
                                                                width: Dimensions.get('window').height * 0.11,
                                                                borderRadius: 10,
                                                                resizeMode: 'cover',
                                                            }}

                                                            source={{ uri: ImageURL + item }}
                                                        /> :
                                                        <Image
                                                            style={{
                                                                height: Dimensions.get('window').height * 0.11,
                                                                width: Dimensions.get('window').height * 0.11,
                                                                borderRadius: 10,
                                                                resizeMode: 'cover',
                                                            }}

                                                            source={{ uri: item }}
                                                        />
                                                }
                                            </>
                                            :
                                            <>
                                            </>
                                    }

                                    <TouchableOpacity
                                        onPress={() => {
                                            remmoveAsset(item);
                                        }}
                                        style={{
                                            position: 'absolute',
                                            top: 8,
                                            right: 5,
                                        }}>
                                        <Text
                                            style={{
                                                fontSize: 30,
                                                fontWeight: 'bold',
                                                color: 'white',
                                            }}>
                                            x
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            ))}
                        <View></View>
                    </View>
                </ScrollView>
            </View>
        </>
    )
}

export default ImageSelector

const styles = StyleSheet.create({
    mainContainer: {
        height: 130,
        width: "95%",
        backgroundColor: '#EEEEEE',
        alignSelf: "center",
        marginTop: 20,
        elevation: 2,
        marginBottom: 20,
    },
    upload_5_image: {
        width: "100%",
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
    },
    multi_image_picker: {
        width: '100%',
        height: 120,
        backgroundColor: '#2C74B3',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    add_image_text: {
        marginHorizontal: 5,
        color: '#fff',
        fontSize: 19,
        fontWeight: '600'
    }
})