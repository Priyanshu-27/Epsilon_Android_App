import { StyleSheet, Text, TouchableOpacity, View, Modal, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {firebase} from '../config'
import { add } from 'react-native-reanimated'


const AddScheduleforTeacher = ({visible , onSave}) => {

    const navigation = useNavigation();
    // const [note, setnote] = useState({title:" " , desc:" "})
    const [title, setTitle] = useState(" ")
    const [note, setNote] = useState(" " )

    const handleModalClose = () => {
        Keyboard.dismiss()
    }

    
  const handleSubmit =  () => {
     firebase.firestore()
     .collection('notes')
     .add({
        title , note ,
     })
     .then(() => {
        setTitle('')
        setNote(' ')
        Keyboard.dismiss();
     })

     .catch((error) => {
        alert(error)
     })
      
        
        navigation.navigate('BottomTabNavigationforteacher')
  }

    

   

   

    return (
        <Modal visible={visible} animationType='fade'>
            <TouchableOpacity onPress={() =>{navigation.navigate('BottomTabNavigationforteacher')}} style={{ marginTop: 20, marginLeft: 20, marginBottom: 20 }}>
                <Ionicons name='arrow-back-outline' size={30} />
            </TouchableOpacity>
            <View style={styles.container}>
                <TextInput
                // value={note.title}
                    onChangeText={(text) => setTitle(text) }
                    
                    placeholder='Title'
                    style={[styles.input, styles.title]} />

                <TextInput
                    onChangeText={(text) => setNote(text)}
                    // value={note.desc}
                    multiline={true}
                    placeholder='Note'
                    style={[styles.input, styles.desc]} />

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' , marginTop:40 , }}>
                    <TouchableOpacity
                        onPress={handleSubmit}
                        style={{
                          backgroundColor:'green',
                          color:"#ffffff",
                          borderRadius:50 ,
                          elevation:20 ,


                        }}>
                        <Ionicons name='checkmark-outline' size={40} color="white" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => { }}
                        style={{
                            backgroundColor:'red',
                            color:"#ffffff",
                          borderRadius:50 ,
                          elevation:20 ,
  
                        }}>
                        <Ionicons name='close-outline' size={40} color="white"  />
                    </TouchableOpacity>
                </View>
            </View>
            <TouchableWithoutFeedback onPress={handleModalClose}>
                <View style={[styles.modalBG, StyleSheet.absoluteFillObject]} />
            </TouchableWithoutFeedback>


        </Modal>
    )
}

export default AddScheduleforTeacher

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingTop: 15
    },
    input: {
        borderBottomWidth: 2,
        borderBottomColor: '#000000',
        fontSize: 20,

    },
    title: {
        height: 40,
        marginBottom: 40,
        fontWeight: 'bold',
    },

    desc: {
        height: 100
    },

    modalBG: {
        flex: 1,
        zIndex: -1,

    }
})