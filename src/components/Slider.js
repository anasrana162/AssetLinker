import { View, Text, Image, ScrollView, Dimensions, StyleSheet } from 'react-native'
import React, { useState } from 'react'



const images = [

  require('../../assets/property_images/B1.jpg'),
  require('../../assets/property_images/B3.jpg'),
  require('../../assets/property_images/B5.jpg'),

]


const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;


const Slider = (screenName) => {
  const [imgActive, setimgActive] = useState(0);

  onchange = (nativeEvent) => {
    if (nativeEvent) {
      const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);

      if (slide != imgActive) {
        setimgActive(slide)

      }
    }

  }

  return (
    <View style={styles.container}>
      <View style={styles.wraper}>
         <ScrollView
         
          onScroll={({ nativeEvent }) => onchange(nativeEvent)}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          horizontal
          styles={styles.wraper}

        >

          {
            images.map((e, index) =>
              <Image
                key={e}
                resizeMode='cover'
                style={styles.wraper}
                source={e}



              />


            )
          }

        </ScrollView>

      

        <View style={styles.wrapDOt}>
          {
            images.map((e, index) =>
              <Text key={e}
                style={imgActive === index ? styles.dotActive : styles.dot}>
                ●
              </Text>
            )
          }
        </View>

      </View>
    </View>
  )
}

export default Slider


const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  wraper: {
    width: width ,
    height: 280,

  },

  wrapDOt: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: -15,
    alignSelf: 'center',


  },

  dotActive: {
    margin: 3,
    color: '#000',
  },

  dot: {
    margin: 3,
    color: '#fff',
  }


});