import { View, Text, Dimensions } from 'react-native'
import React from 'react'
const { width, height } = Dimensions.get("window")


const About = () => {
    return (
        <View style={{ flex: 1 }}>
            <View style={{ width: width, height: 60, backgroundColor: '#D3D3D3', flexDirection: 'row', padding: 15, alignItems: 'center' }}>
                <Text style={{ fontSize: 19, fontWeight: '600', color: '#000', marginLeft: 10 }}>About</Text>
            </View>

           
                <View style={{ width: width, padding: 10 }}>
                    <Text style={{ textAlign: 'justify' }}>
                        There are many variations of passages of Lorem Ipsum
                        available, but the majority have suffered alteration
                        in some form, by injected humour, or randomised words
                        which don't look even slightly believable. If you are
                        going to use a passage of Lorem Ipsum, you need to be
                        sure there isn't anything embarrassing hidden in the
                        middle of text. All the Lorem Ipsum generators on the
                        Internet tend to repeat predefined chunks as necessary,
                        making this the first true generator on the Internet.
                        It uses a dictionary of over 200 Latin words, combined
                        with a handful of model sentence structures, to generate
                        Lorem Ipsum which looks reasonable. The generated Lorem
                        psum is therefore always free from repetition, injected
                        or non-characteristic words etc.
                        There are many variations of passages of Lorem Ipsum
                        available, but the majority have suffered alteration
                        in some form, by injected humour, or randomised words
                        which don't look even slightly believable. If you are
                        going to use a passage of Lorem Ipsum, you need to be
                        sure there isn't anything embarrassing hidden in the
                        middle of text. All the Lorem Ipsum generators on the
                        Internet tend to repeat predefined chunks as necessary,
                        making this the first true generator on the Internet.
                        It uses a dictionary of over 200 Latin words, combined
                        with a handful of model sentence structures, to generate
                        Lorem Ipsum which looks reasonable. The generated Lorem
                        psum is therefore always free from repetition, injected
                        or non-characteristic words etc.
                        

                    </Text>
                </View>
    

        </View>
    )
}

export default About