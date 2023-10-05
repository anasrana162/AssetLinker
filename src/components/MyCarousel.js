import { StyleSheet, Platform, Image, TouchableOpacity, SafeAreaView, FlatList,Dimensions } from 'react-native';
import React from 'react';
const { width, height } = Dimensions.get("window")


const data = [
  {
    image: "https://5.imimg.com/data5/SL/YG/OW/ANDROID-46491969/1559566679634-jpg-1000x1000.jpg",
  },
  {
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  },

  {
    image: "https://images.unsplash.com/photo-1591924450983-b8f7587ea332?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  },
];





const MyCarousel = () => {
  return (
    <FlatList
      horizontal
      pagingEnabled={true}
      showsHorizontalScrollIndicator={false}
      data={data}
      renderItem={({ item }) => (

        <TouchableOpacity activeOpacity={0.8} style={styles.container}>
          <SafeAreaView style={styles.item}>

            <Image
              source={{ uri: item.image }}
              containerStyle={styles.imageContainer}
              style={styles.image}
            />
          </SafeAreaView>
        </TouchableOpacity>

      )}
    />

  );
}





const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    // backgroundColor:'red',
    marginTop: 5
  


  },

  item: {
    width: width,
    height: 110,
    backgroundColor: '#000'//height will be 20 units less than screen width.
  },
  imageContainer: {
    flex: 1,
    borderRadius: 5,
    backgroundColor: 'lightblue',
    // marginBottom: Platform.select({ ios: 0, android: 1 }), //handle rendering bug.
  },
  image: {
    width: '100%',
    height: "100%",
    resizeMode: 'cover',
  },


});

export default MyCarousel;