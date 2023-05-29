import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image, Dimensions,
  SafeAreaView,
  ScrollView,
  Button,
  TouchableOpacity
} from 'react-native'
import React from 'react'
import { useState } from 'react';



const images = [

  require('../assets/firstImgSlider.jpg'),
  require('../assets/imageslider1.jpg'),
  require('../assets/thirdImg.jpg'),
  require('../assets/sliderimg4.png'),
]

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;


const Join = ({ navigation }) => {
  const [imgActive, setimgActive] = useState(0);

  onchange = (nativeEvent) => {
    if (nativeEvent) {
      const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width)
      if (slide != imgActive) {
        setimgActive(slide);
      }
    }
  }

  return (

    <View style={styles.container}>
      <ImageBackground source={require('../assets/join.png')} resizeMode="cover" style={styles.image}>
        <Text style={{
          color: '#EC5800',
          fontSize: 32,
          lineHeight: 74,
          fontWeight: 'bold',
          textAlign: 'center',
          fontFamily: 'Poppins-Black',
          padding: 10,
          margin: 20,
          borderWidth: 3,
          borderColor: "pink",
          borderRadius: 50,
        }}> wellcome to Epsilon !!</Text>
        <SafeAreaView style={styles.slider} >
          <View style={styles.wrap}>
            <ScrollView
              onScroll={({ nativeEvent }) => onchange(nativeEvent)}
              showsHorizontalScrollIndicator={false}
              pagingEnabled
              horizontal
              style={styles.wrap}
            >
              {
                images.map((e, index) =>
                  <Image
                    key={e}
                    resizeMode='stretch'
                    style={styles.wrap}
                    source={e}

                  />)
              }

            </ScrollView>
            <View style={styles.wrapDot}>
              {
                images.map((e, index) =>
                  <Text
                    key={e}
                    style={imgActive == index ? styles.dotActive : styles.dot}
                  >
                    ⚪
                  </Text>
                )
              }
            </View>
          </View>

          <View style={styles.joinAsContainer}>
            <Text style={styles.joinAsHead}>Join as</Text>
            <View style={styles.TeacherAndStudenttext}>

              <TouchableOpacity
                onPress={() => navigation.navigate('LoginforTeacher')}
                style={{
                  backgroundColor: '#AD40AF',
                  padding: 10,
                  borderRadius: 10,
                  width: 150,

                  margin: 10,
                }}>
                <Text style={{ textAlign: 'center', fontWeight: '700', fontSize: 18, color: '#fff' }}>Teacher</Text>
              </TouchableOpacity>
              <Text style={{ fontSize: 40, color: 'pink' }}>|| </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('LoginforStudent')}
                style={{
                  backgroundColor: '#AD40AF',
                  padding: 10,
                  borderRadius: 10,
                  width: 150,

                  margin: 10,
                }}>
                <Text style={{ textAlign: 'center', fontWeight: '700', fontSize: 18, color: '#fff' }}>Student</Text>
              </TouchableOpacity>
            </View>

          </View>

        </SafeAreaView>

      </ImageBackground>




    </View>




  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,

    // justifyContent: 'center',
  },
  text: {
    color: '#EC5800',
    fontSize: 32,
    lineHeight: 74,
    fontWeight: 'bold',
    textAlign: 'center',
    // backgroundColor: '#FDB9C8',
    fontFamily: 'DancingScript-Regular',
    padding: 10,
    margin: 20,
    borderWidth: 3,
    borderColor: "pink",

    // opacity:0.5,
    borderRadius: 50,

  },

  EpsilonHead: {
    // color: '',
    fontWeight: 'bold',

  },

  slider: {
    flex: 1,
    marginTop: 40,



  },

  wrap: {
    width: WIDTH,
    height: HEIGHT * 0.25,
  },

  wrapDot: {
    position: "absolute",
    bottom: 0,
    flexDirection: 'row',
    alignSelf: 'center'
  },

  dotActive: {
    margin: 3,
    Color: 'white',

  },
  dot: {
    margin: 3,
    color: "black"
  },

  joinAsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

  },

  joinAsHead: {
    fontSize: 50,
    marginTop: 150,
    fontFamily: 'Poppins-ExtraBold'

  },



  TeacherAndStudenttext: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 100,


  },



  or: {
    fontSize: 15,
  }
})

export default Join