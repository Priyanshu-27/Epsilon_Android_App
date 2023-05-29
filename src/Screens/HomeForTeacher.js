import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, TextInput, Dimensions, FlatList, StatusBar, Pressable, } from 'react-native';
// import { Store_T_ID } from '../services/Asyncstorage'; 
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { ScrollView } from 'react-native-gesture-handler';
import { get_Teacher_Name } from '../services/Asyncstorage';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
// import AddScheduleforTeacher from './AddScheduleforTeacher';
import {firebase} from '../config.js'

const colors = {
  themeColor: "#4263ec",
  white: "#fff",
  background: "#f4f6fc",
  greyish: "#a4a4a4",
  tint: "#2b49c3"
}




const HomeForTeacher = () => {
  const Navigation = useNavigation();
  const [teacherName, setTeacherName] = useState()
  const [notes, setNotes] = useState([]);
  const [Greet, setGreet] = useState("")
 
  const Height = Dimensions.get('window').height


  //It is for showing Greet
  const findGreet = () => {

    const hrs = new Date().getHours();
    if (hrs == 0 || hrs < 12) return setGreet("Morning");
    if (hrs == 1 || hrs < 17) return setGreet("Afternoon");
    setGreet('Evening')
  }


  //It is for showing Name of current user
  async function fetchData() {
    const TeacherName = await get_Teacher_Name('Teacher_Name');
    setTeacherName(TeacherName);
    console.log(notes)
  }

  useEffect(() => {
    console.log(teacherName);
    fetchData(teacherName)
    
    findGreet();
  }, []);




//fetch the data from firestre
useEffect(() => {
  firebase.firestore()
  .collection('notes')
  .onSnapshot((querySnapshot) => {
    const newNotes = [] ;
    querySnapshot.forEach((doc) => {
      const {note , title} = doc.data();
      newNotes.push({note , title , id: doc.id});
    });
    setNotes(newNotes);
  })
}, []);









  return (
    <View style={{ flex: 1, backgroundColor: colors.themeColor }}>
      <StatusBar barStyle="light-content" backgroundColor={colors.themeColor} />
      <View style={{ backgroundColor: colors.themeColor }}>
        <View>
          {/* <FontAwesome5 name={'hand-wave'} size={30} style={{ color: colors.white, padding: 16 }} /> */}
        </View>

        <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ color: colors.white, fontSize: 30, padding: 16 }}>Good {Greet} ,{"\n"}{teacherName}</Text>
          <Ionicons name='people-circle-outline' size={30} style={{ color: colors.white, padding: 16 }} />

        </View>

        <View style={{ padding: 16 }}>

        </View>

        <View
          style={{
            padding: 20,
            flexDirection: 'row',
            backgroundColor: colors.background,
            alignItems: 'center',
            flexDirection: 'row', justifyContent: 'space-between'
          }}>
          <Text style={{ fontSize: 24, fontWeight: '600' }}>Today's Schedule</Text>
          <TouchableOpacity onPress={() => {Navigation.navigate('AddSchedule')}}>
          <Ionicons
            name='add-outline'
            size={40}
            style={{
              color: colors.themeColor,

              backgroundColor: colors.white,
              borderRadius: 50
            }} />
          </TouchableOpacity>
         
        </View>

        {/* <ScrollView style={{ backgroundColor: colors.background, height: Height }}>
        <AddScheduleforTeacher onSave={(data) => setNotes([...notes ,{id:Date.now() , note:data} ])}/>
        </ScrollView> */}
        {/* <FlashList
          data={notes}
          numColumns={1}
          estimatedItemSize={100}
          renderItem={({item}) => (
            <View style={Styles.taskData}>
               <Text>
                {item.title}
               </Text>
               <Text>
                {item.note}
               </Text>
            </View> 
          )}
        /> */}
     
        <FlatList
        style={{ backgroundColor: colors.background, height: Height  }}
  data={notes}
  keyExtractor={(item) => item.id}
  renderItem={({item}) => (
    <View style={Styles.taskData} >
    <Pressable onPress={() => Navigation.navigate('DetailforNotes' , {item} )}>

    
      <Text style={{fontSize:20 , fontWeight:"600", marginLeft:30 , color:"#000000", marginBottom:8 }}>{item.title}</Text>
      <Text style={{fontSize:10 , fontWeight:'600',marginLeft:30}}>{item.note}</Text>

      </Pressable>
    </View>
  )}
  numColumns={1}
  getItemLayout={(data, index) => ({length: 100, offset: 100 * index, index})}
/>
    
   
      

      </View>
    </View>
  )
}

const Styles = StyleSheet.create({
  taskData: {
    
    backgroundColor: colors.white,
    flexDirection: "column",
    marginHorizontal: 16,
    marginVertical: 4,
    borderRadius: 20,
    paddingVertical: 24,
    elevation:10 

  },
})
export default HomeForTeacher;