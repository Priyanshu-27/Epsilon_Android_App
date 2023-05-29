import { View, Text, ActivityIndicator, TextInput, SafeAreaView, Touchable, TouchableOpacity } from 'react-native'
import React, { useState , useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import LoginStudentImg from '../assets/LoginforStudentImg.svg'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FacbookIcon from '../assets/FacebookIcon.svg'
import GoogleIcon from '../assets/google.svg'
import Twitter from '../assets/twitter.svg'
import InputField from '../components/InputField'
import HomeForStudent from '../Screens/HomeForStudent' ;
import BottomTabNavigator from '../Navigations/BottomTabNavigation'
import axios from 'axios'
import { style } from 'deprecated-react-native-prop-types/DeprecatedViewPropTypes'
import { getToken, removeToken, StoreToken } from '../services/Asyncstorage'

const LoginforStudent = ({ navigation }) => {



  const [userEmail, setuserEmail] = useState('');
  const [userPassword, setuserPassword] = useState('');
  const [token, setToken] = useState('');
  const [error, setError] = useState('');

  const ValidEmail = (email) => {
    const Emailregex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    return Emailregex.test(email)
  }

  const isValidEmail = ValidEmail(userEmail) ;

 useEffect(() => {
  (async () => {
    const token = await getToken()
    if(token){
      const {access , refresh} = JSON.parse(token)
      setToken({
        "access":access ,
        "refresh":refresh
      })
    }
  })();
 } , [])

 
  

  const handleLogin = async () => {
    console.log(token);
    var dataToSend = {

      "email": userEmail,
      "password": userPassword,

    }


    fetch('http://10.0.2.2:8000/auth/jwt/create/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dataToSend),
    }).then((response) => response.json())
      .then((responseJson) => {
        setToken(responseJson.access)
        StoreToken(responseJson.access)
       
        
      })
      .catch((error) => {
        console.log(error);
      })


     

if (token) {
 

  
  // navigation.navigate('HomeforStudent')
}if (!token) {
  setError("your are not registered user")
}if (userEmail===" " & userEmail===null) {
  setError("Email field is empty")

}if(userPassword===" "){
  setError("Password is empty")
}
    

    

  };

 

    

if (token) {
  return <BottomTabNavigator/> 
 
 

}

else {



  return (
    
    <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
      <View style={{ paddingHorizontal: 25 }}>


        <View style={{ alignItems: 'center', transform: [{ rotateY: '0deg' }], }}>
          <LoginStudentImg
            height={300}
            widht={300}
            style={{ marginBottom: 40, marginRight: 100 }}

          />
        </View>
        <Text style={{
          fontSize: 20,
          fontWeight: '500',
          color: '#333',
          marginBottom: 30,
        }} >
          Login for  <Text style={{ color: '#6082B6' }}>Student</Text>
        </Text>
        {/* <View style={{
          flexDirection: 'row',

          borderBottomColor: '#ccc',
          borderBottomWidth: 1,
          paddingBottom: 8,
          marginBottom: 25,
          alignItems: 'center',
        }}>
          <MaterialIcons name='alternate-email' size={20} color='#666' style={{ marginRight: 5 }} />
          <TextInput
            placeholder='Email ID'
            style={{ flex: 1, paddingVertical: 0 }}
            keyboardType="email-address"
            value={userEmail }
            onChangeText={(email) =>{setuserEmail(email)}}
             />




        </View> */}

        <InputField label={'Email ID'}
          icon={<MaterialIcons
            name='alternate-email'
            size={20} color='#666'
            style={{ marginRight: 5 }}
          />}
          keyboardType="email-address"
          value={userEmail}
          onChangeText={text => setuserEmail(text)}
        />



        <View style={{
          flexDirection: 'row',

          borderBottomColor: '#ccc',
          borderBottomWidth: 1,
          paddingBottom: 8,
          marginBottom: 25,
          alignItems: 'center',
        }}>



          <Ionicons name='ios-lock-closed-outline' size={20} color='#666' style={{ marginRight: 5 }} />
          <TextInput
            placeholder='Password'
            style={{ flex: 1, paddingVertical: 0 }}
            secureTextEntry={true}
            value={userPassword}
            onChangeText={(password) => { setuserPassword(password) }} />
          <TouchableOpacity onPress={() => { }}>
            <Text style={{ color: '#AD40AF', fontWeight: '700' }}>Forget ?</Text>
          </TouchableOpacity>

        </View>

       <Text style={{fontSize:15 , color:'red' , alignItems:'center' , marginBottom:12 , textAlign:'center'}}> {error}</Text>

        <TouchableOpacity
          onPress={handleLogin}
          style={{
            backgroundColor: '#AD40AF',
            padding: 20,
            borderRadius: 10,
            marginBottom: 30
          }}>
          <Text style={{ textAlign: 'center', fontWeight: '700', fontSize: 16, color: '#fff' }}>Login</Text>
        </TouchableOpacity>

        <Text style={{ textAlign: 'center', color: '#666', marginBottom: 30 }}>or , Login with...</Text>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30, }}>
          <TouchableOpacity
            onPress={() => { }}
            style={{
              boderColor: '#ddd',
              borderWidth: 2,
              borderRadius: 10,
              paddingHorizontal: 30,
              paddingVertical: 10,
            }}>
            <GoogleIcon height={24} width={24} />

          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => { }}
            style={{
              boderColor: '#ddd',
              borderWidth: 2,
              borderRadius: 10,
              paddingHorizontal: 30,
              paddingVertical: 10,
            }}>
            <FacbookIcon height={24} width={24} />

          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {}}
            style={{
              boderColor: '#ddd',
              borderWidth: 2,
              borderRadius: 10,
              paddingHorizontal: 30,
              paddingVertical: 10,
            }}>
            <Twitter height={24} width={24} />

          </TouchableOpacity>
     
       
        </View>
        
 
    
        <View
          style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 30, }}>
          <Text>Don't have account ? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('RegistrationforStudent')}>
            <Text style={{ color: '#AD40AF', fontWeight: '700' }}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
    
}
}

 export default LoginforStudent 