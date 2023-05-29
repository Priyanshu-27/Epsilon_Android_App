import { View, Alert, Text, FlatList, ActivityIndicator, TextInput, SafeAreaView, Touchable, TouchableOpacity, ScrollView } from 'react-native'
import { useState, createRef, Component } from 'react'
import TeacherLogin from '../assets/TeacherLogin.svg'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FacbookIcon from '../assets/FacebookIcon.svg'
import GoogleIcon from '../assets/google.svg'
import Twitter from '../assets/twitter.svg'
import InputField from '../components/InputField'
import serialize from 'json-stringify-safe';
import { useNavigation } from '@react-navigation/native';


const RegistrationForStudent = () => {

  const navigation = useNavigation();

  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [re_Password, setre_Password] = useState("");
  const [isRegistrationSuccess, setisRegistrationSuccess] = useState(false);
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [repasswordError, setrepasswordError] = useState("");
  const [confirmPasswordError, setconfirmPasswordError] = useState("");
  const emailInputRef = createRef();
  const passwordInputRef = createRef();

  const ValidEmail = (email) => {
    const Emailregex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    return Emailregex.test(email)
  }
  const handleSubmitButton = () => {

    setNameError(' ');
    setEmailError(' ');
    setPasswordError(' ');
    setrepasswordError(' ');
    setrepasswordError('');
    setconfirmPasswordError(' ')
   

    const isValidEmail = ValidEmail(userEmail) ;



    if (!userName) {
      setNameError('please fill Name');
      valid = true ;
      setTimeout(() => {
        setNameError(' ');
      }, 4000);
      return;
    }
    if (!userEmail) {
      setEmailError('please fill email');
      
      return;
    }

    if(!isValidEmail){
      setEmailError('invalid Email , write proper email')
    
    }

    if (!userPassword) {
      setPasswordError('please fill password');
    
      return;
    }
    if (!re_Password ) {
      setrepasswordError('please fill Re-password');
      return;
    }if( re_Password !== userPassword){
      setconfirmPasswordError('confirm password is not matching')
      return ;
    }

  
    
      navigation.navigate('Teacherform')
  
    // const stringify = (any: any): string => serialize(any);
    // const parsify = (serializedString: string): any => eval(`(${serializedString})`);

    var dataToSend = {
      "name": userName,
      "email": userEmail,
      "password": userPassword,
      "re_password": re_Password,
    }

   
    fetch('http://10.0.2.2:8000/auth/users/?format=json', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dataToSend),
    }).then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
      })
      .catch((error) => {
        console.log(error);
      })

  }



  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
    <ScrollView>

    
      <View style={{ paddingHorizontal: 25 }}>


        <View style={{ alignItems: 'center', transform: [{ rotateY: '0deg' }], }}>
          <TeacherLogin
            height={250}
            widht={300}
            style={{ marginBottom: 20 }}

          />
        </View>
        <Text style={{
          fontSize: 20,
          fontWeight: '500',
          color: '#333',
          marginBottom: 30,
        }} >
          Registeration for  <Text style={{ color: '#FB607F' }}>Teacher</Text>
        </Text>

        <InputField
          label={'Full Name'}
          icon={<Ionicons
            name='person-outline'
            size={20}
            color="#666"
            style={{ marginRight: 5 }} />}
          value={userName}
          onChangeText={text => setUserName(text)} />

        {nameError != ' ' ? (<Text style={{ color: 'red', textAlign: 'center', fontSize: 15, marginBottom: 8, fontFamily:'Poppins-Medium'}}>
          {nameError}
        </Text>) : null}



        <InputField label={'Email ID'}
          icon={<MaterialIcons
            name='alternate-email'
            size={20} color='#666'
            style={{ marginRight: 5 }}
          />}
          keyboardType="email-address"
          value={userEmail}
          onChangeText={text => setUserEmail(text)}
        />
        {emailError != ' ' ? (<Text style={{ color: 'red', textAlign: 'center', fontSize: 15, marginBottom: 8, fontFamily:'Poppins-Medium'}}>
          {emailError}
        </Text>) : null}



        <InputField label={'Password'}
          icon={<Ionicons name='ios-lock-closed-outline' size={20} color='#666' style={{ marginRight: 5 }} />}
          keyboardType="password"
          inputType="password"
          value={userPassword}
          onChangeText={text => setUserPassword(text)}
        />

        {passwordError != ' ' ? (<Text style={{ color: 'red', textAlign: 'center', fontSize: 15, marginBottom: 8, fontFamily:'Poppins-Medium'}}>
          {passwordError}
        </Text>) : null}



        <InputField label={'Confirm Password'}
          icon={<Ionicons name='ios-lock-closed-outline' size={20} color='#666' style={{ marginRight: 5 }} />}
          keyboardType="password"
          inputType="password"
          value={re_Password}
          onChangeText={text => setre_Password(text)}
        />

        {repasswordError != ' ' ? (<Text style={{ color: 'red', textAlign: 'center', fontSize: 15, marginBottom: 8, fontFamily:'Poppins-Medium'}}>
          {repasswordError}
        </Text>) : null}

        {confirmPasswordError != ' ' ? (<Text style={{ color: 'red', textAlign: 'center', fontSize: 15, marginBottom: 8, fontFamily:'Poppins-Medium'}}>
          {confirmPasswordError}
        </Text>) : null}







        <TouchableOpacity
          onPress={handleSubmitButton}
          style={{
            backgroundColor: '#AD40AF',
            padding: 20,
            borderRadius: 10,
            marginBottom: 30
          }}>
          <Text style={{ textAlign: 'center', fontWeight: '700', fontSize: 16, color: '#fff' }}>Sign up</Text>
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
            onPress={() => { }}
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
          <Text>Already Registered ? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('LoginforStudent')}>
            <Text style={{ color: '#AD40AF', fontWeight: '700' }}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
      </ScrollView>
    </SafeAreaView>
  )


}

export default RegistrationForStudent 