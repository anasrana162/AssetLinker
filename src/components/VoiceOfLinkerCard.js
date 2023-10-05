import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Colors, size } from '../config'

const VoiceOfLinkerCard = () => {
  const [play, SetPlay] = useState()
  return (
    <View style={{ backgroundColor: Colors.primary, borderRadius: 12, marginHorizontal: 20, marginVertical: 10 }}>
      <View style={{ padding: 8, flexDirection: 'row', alignItems: 'center' }}>

        <Image source={require('../../assets/background.jpg')} style={{ width: 80, height: 100, borderRadius: 12 }} />
        <View style={{ flexDirection: 'column', marginHorizontal: 10 }}>

          <Text style={{ color: Colors.white, fontSize: size.xxlarge, fontWeight: '700' }}>Beach City by Icon</Text>

          <View style={{ flexDirection: 'row', alignContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => SetPlay(!play)
            }>

              <Image source={play ? require('../../assets/pause.png') : require('../../assets/play.png')} style={{ width: 40, height: 40, borderRadius: 12, tintColor: 'white' }} />
            </TouchableOpacity>

            <Image source={require('../../assets/sound.png')} style={{ width: '70%', height: 60, tintColor: 'white' }} />
          </View>

          <View style={{ flexDirection: 'row' }}>

            <Text style={{ color: Colors.white, fontSize: size.small }}>Date :</Text>
            <Text style={{ color: Colors.white, fontSize: size.small }}> 6-Sep-2022</Text>
          </View>


        </View>

      </View>

    </View>
  )
}

export default VoiceOfLinkerCard

const styles = StyleSheet.create({})