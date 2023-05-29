import { View, Text , TextInput , Button, Alert } from 'react-native'
import React from 'react'
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native'
import { useEffect } from 'react';
import { get_S_ID } from '../services/Asyncstorage';

const ContactUSForStudent = ({navigation:{goback}}) => {
    const [text, setText] = useState('');
    const [S_id, setS_id] = useState(null);
    const isFocused = useIsFocused();
    const navigation = useNavigation();
    async function fetchData() {
      const S_id = await get_S_ID('S_id');
      setS_id(S_id);
    }  
    
    useEffect(() => {
      isFocused && fetchData(S_id)
    }, [isFocused]);
    
 

  function handleTextChange(newText) {
    setText(newText);
  }

  function handleSubmit() {
    var dataToSend = {
      "ids":JSON.parse(S_id),
      "Messsage":text
    }      
    fetch('http://10.0.2.2:8000/admin/help/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dataToSend),
    }).then((response) => response.json())
      .then((responseJson) => {
        Alert.alert('Response',JSON.stringify(responseJson.send),
        [{text:'OK',onPress:()=>navigation.goBack()}]
        );
      })
      .catch((error) => {
        console.log(error);
      })
   
  }

  return (
    <View style={{ padding: 10 }}>
      <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 5 }}>Tell us how we can help</Text>
      <TextInput
        style={{ height: 100, borderColor: 'gray', borderWidth: 1, marginBottom: 10, padding: 10 }}
        onChangeText={handleTextChange}
        value={text}
        multiline={true}
      />
      <Button style={{backgroundColor:'#AD40AF'}} title="Submit" onPress={handleSubmit} />
    </View>
  );

  
}

export default ContactUSForStudent