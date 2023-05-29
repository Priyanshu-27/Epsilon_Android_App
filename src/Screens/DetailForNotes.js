import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'

import { useNavigation } from '@react-navigation/native'
import { TextInput } from 'react-native-gesture-handler'
import { firebase } from "../config"
import { color } from 'react-native-reanimated'
const DetailForNotes = ({ route }) => {

    const { item } = route.params || {};

    if (!item) {
        // Render a message or redirect to another screen
        return <Text>No notes found</Text>
    }
    // const{item} = route.params
    // const dat = route.param.item.id
    const navigation = useNavigation();

    const [noteText, setNoteText] = useState(route.params.item.note);
    const [noteTitle, setNoteTitle] = useState(route.params.item.title);

    const handleUpdate = () => {
        // console.log(dat);
        if (noteTitle && noteTitle.length > 0) {
            firebase.firestore()
                .collection('notes')
                .doc(route.params.item.id)
                .update({
                    title: noteTitle,
                    note: noteText,

                })

                .then(() => {
                    
                })
                .catch((error) => {
                    alert(error);
                })
        }

        navigation.goBack();

       
    }

    //delete the note

    const handleDelete = () => {
        firebase.firestore()
            .collection('notes')
            .doc(route.params.item.id)
            .delete()
            .then(() => {
               
            })
            .catch((error) => {
                alert(error);
            })

            navigation.navigate('BottomTabNavigationforteacher')
    }

    return (
        <View>
            <TextInput
                placeholder='Title'
                value={noteTitle}
                onChangeText={(text) => setNoteTitle(text)}
                style={styles.inputTitle}
            />
            <TextInput
                placeholder='Note'
                value={noteText}
                onChangeText={(text) => setNoteText(text)}
                style={styles.inputNote}
                multiline={true}
            />
            <View style={styles.buttonView}> 


                <TouchableOpacity
                      style={styles.button1} 
                    onPress={handleUpdate}>
                    <Text style={{textAlign:'center', color:'white',fontWeight:'600' ,letterSpacing:2 }}>Upate</Text>
                </TouchableOpacity>

                <TouchableOpacity
                      style={styles.button} 
                    onPress={handleDelete}>
                    <Text style={{textAlign:'center',color:'white', fontWeight:'600',letterSpacing:2}}>Delete</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}


export default DetailForNotes

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        background: '#c9fsd9'
    },

    inputTitle: {
        fontSize: 10,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
        height: 50,
        width: '97%',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10
    },

    inputNote: {
        fontSize: 18,
        height: 300,
        width: '97%',
        borderColor: 'gray',
        borderWidth: 1 / 2,
        borderRadius: 5,
        padding: 10
    },

    buttonView :{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-evenly',

    },

    button:{
        backgroundColor: '#FF2400',
        padding: 15,
        borderRadius: 10,
        width:100,
        textAlign:'center',
        // marginBottom: 30
        marginTop:30 ,
        elevation:20,
       


    },
    button1:{
        backgroundColor:'#0BDA51',
        padding: 15,
        borderRadius: 10,
        width:100,
        textAlign:'center',
        // marginBottom: 30
        marginTop:30 ,
        elevation:20,
      


    }
})