import { View, Text, Platform, StyleSheet, TextInput, TouchableOpacity, ImageBackground, ScrollView } from 'react-native'
import React from 'react'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { useState,useEffect } from 'react'
import DocumentPicker from 'react-native-document-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Store_T_ID ,get_T_ID} from '../services/Asyncstorage'
import { useIsFocused } from '@react-navigation/native' 
import { useNavigation } from '@react-navigation/native'
const Form = ({navigation:{goback}}) => {
  const navigation = useNavigation();
  const [Name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [Gender, setGender] = useState('');
  const [Experience, setExperience] = useState('');
  const [Date_of_Birth, setDate_of_Birth] = useState('');
  const [Address, setAddress] = useState('');
  const [Expert_IN, setExpert_IN] = useState('');
  const [Payment, setPayment] = useState('');
  const [certificate, setCertificate] = useState(null);
  const [Goverment_id, setGoverment_id] = useState(null);
  const [Signature, setSignature] = useState(null);
  const [Photo, setPhoto] = useState(null);
  const [certificatename, setCertificatename] = useState(null);
  const [Goverment_idname, setGoverment_idname] = useState(null);
  const [Signaturename, setSignaturename] = useState(null);
  const [Photoname, setPhotoname] = useState(null);
  const [certificatetype, setCertificatetype] = useState(null);
  const [Goverment_idtype, setGoverment_idtype] = useState(null);
  const [Signaturetype, setSignaturetype] = useState(null);
  const [Phototype, setPhototype] = useState(null);
  const [T_id, setT_id] = useState(null);
  const isFocused = useIsFocused();

  useEffect(() => {

    isFocused && fetchData(T_id)
  }, [isFocused]);
  async function fetchData() {
    const T_id = await get_T_ID('T_id');
    setT_id(T_id);
  }

  const formData = new FormData();
  formData.append('Photo', {uri: Photo,type: Phototype,name: Photoname});
  formData.append('Signature', {uri: Signature,type: Signaturetype,name: Signaturename});
  formData.append('Goverment_id', {uri: Goverment_id,type: Goverment_idtype,name: Goverment_idname});
  formData.append('certificate', {uri: certificate,type: certificatetype,name: certificatename});
  formData.append("Name", Name);
  formData.append("Email",email);
  formData.append("Date_of_Birth", Date_of_Birth);
  formData.append("Addrese", Address);
  formData.append("Expert_IN",Expert_IN);
  formData.append("Payment",Payment);
  formData.append("Gender",Gender);
  formData.append("Experience",Experience);
  const pickPhoto = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      setPhoto(result[0].uri);
      setPhotoname(result[0].name);
      setPhototype(result[0].type)
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled file picker');
      } else {
        console.log('DocumentPicker Error: ', err);
      }
    }
   
  };
  const pickSignature = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      setSignature(result[0].uri);
      setSignaturename(result[0].name);
      setSignaturetype(result[0].type)
      
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled file picker');
      } else {
        console.log('DocumentPicker Error: ', err);
      }
    }
   
  };
  const pickGoverment_Id = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      setGoverment_id(result[0].uri);
      setGoverment_idname(result[0].name);
      setGoverment_idtype(result[0].type)
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled file picker');
      } else {
        console.log('DocumentPicker Error: ', err);
      }
    }
   
  };
  const pickcertificate = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      setCertificate(result[0].uri);
      setCertificatename(result[0].name);
      setCertificatetype(result[0].type)
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled file picker');
      } else {
        console.log('DocumentPicker Error: ', err);
      }
    }
   
  };
 
  const handleSubmitButton = () => {
   
     fetch('http://10.0.2.2:8000/Teachers/Registration', {
    method: 'POST',
    headers: { 'Content-Type': 'multipart/form-data' },
    body: formData
  })
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson)
      Store_T_ID(responseJson.T_id)
    })
    .catch((error) => {
      console.log(error);
    });
    if(T_id){
    navigation.navigate('LoginforTeacher')}
  }



  return (
    <ScrollView>
    <View style={styles.container}>
   
      <View style={{ margin: 20 }}>
        <View style={{ alignItems: 'center' }}>
        <TouchableOpacity onPress={pickPhoto}>
      <ImageBackground source={Photo ? { uri: Photo } : { uri: 'https://www.pngitem.com/pimgs/m/150-1503945_transparent-user-png-default-user-image-png-png.png' }} style={{ height: 100, width: 100 }} imageStyle={{ borderRadius: 15 }}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Ionicons name="camera" size={35} color="#000000" style={{ opacity: 0.7, alignItems: 'center', borderWidth: 1, borderColor: '#fff', borderRadius: 10 }} />
        </View>
      </ImageBackground>
    </TouchableOpacity>
        </View>
        <View style={[styles.action, { borderBottomWidth: 1, borderBottomColor: 'black' }]}>
          <FontAwesome name='user-o' size={20} />
          <TextInput
            placeholder='Full Name'
            placeholderTextColor="#666666"
            style={styles.textInput}
            value={Name}
            onChangeText={text => setName(text)}   
          />
        </View>

        <View style={[styles.action, { borderBottomWidth: 1, borderBottomColor: 'black' }]}>
          <MaterialIcon name='email' size={20} />
          <TextInput
            placeholder='Email'
            placeholderTextColor="#666666"
            style={styles.textInput}
            value={email}
            onChangeText={text => setEmail(text)}
          />
        </View>


        <View style={[styles.action, { borderBottomWidth: 1, borderBottomColor: 'black' }]}>
          <MaterialCommunityIcons name='human' size={20} />
          <TextInput
            placeholder='Gender'
            placeholderTextColor="#666666"
            style={styles.textInput}
            value={Gender}
            onChangeText={text => setGender(text)}

          />
        </View>

        <View style={[styles.action, { borderBottomWidth: 1, borderBottomColor: 'black' }]}>
          <MaterialIcon name='work' size={20} />
          <TextInput
            placeholder='Experience'
            placeholderTextColor="#666666"
            style={styles.textInput}
            value={Experience}
            onChangeText={text => setExperience(text)}

          />
        </View>

        <View style={[styles.action, { borderBottomWidth: 1, borderBottomColor: 'black' }]}>
          <MaterialIcon name='date-range' size={20} />
          <TextInput
            placeholder='Date Of Birth'
            placeholderTextColor="#666666"
            style={styles.textInput}
            value={Date_of_Birth}
            onChangeText={text => setDate_of_Birth(text)}

          />
        </View>
        <View style={[styles.action, { borderBottomWidth: 1, borderBottomColor: 'black' }]}>
          <FontAwesome name='address-book-o' size={20} />
          <TextInput
            placeholder='Address'
            placeholderTextColor="#666666"
            style={styles.textInput}
            value={Address}
            onChangeText={text => setAddress(text)}

          />
        </View>
        <View style={[styles.action, { borderBottomWidth: 1, borderBottomColor: 'black' }]}>
          <Ionicons name='school-outline' size={20} />
          <TextInput
            placeholder='Expert IN'
            placeholderTextColor="#666666"
            style={styles.textInput}
            value={Expert_IN}
            onChangeText={text => setExpert_IN(text)}

          />
        </View>
        <View style={[styles.action, { borderBottomWidth: 1, borderBottomColor: 'black' }]}>
          <FontAwesome name='credit-card' size={20} />
          <TextInput
            placeholder='Expected Payment'
            placeholderTextColor="#666666"
            style={styles.textInput}
            value={Payment}
            onChangeText={text => setPayment(text)}

          />
        </View>
        <View style={styles.shiftDocument}> 
        <View style={{
          flexDirection: 'row',
          alignItems: 'flex-end',
        }}>
          <View style={{ flex: 1, marginRight: 80 }}>
            <Text style={{ paddingTop: 50 }} > Certificate</Text>
          </View>
          <View style={{ flex: 1, }}>
            <TouchableOpacity style={{
              width: '70%',
              paddingVertical: 0,
              backgroundColor: '#7986cb',
              borderRadius: 5,
              alignItems: 'center',
            }} onPress={pickcertificate}>
              <Text style={{ textAlign: 'center', fontWeight: '600', fontSize: 12, color: '#fff', padding:5 }}>  {certificate ? certificate.name : 'Choose File'}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{
          flexDirection: 'row',
          alignItems: 'flex-end',
        }}>
          <View style={{ flex: 1, marginRight: 80 }}>
            <Text style={{ paddingTop: 30 }}>Government ID</Text>
          </View>
          <View style={{ flex: 1, }}>
            <TouchableOpacity style={{
              width: '70%',
              paddingVertical: 0,
              backgroundColor: '#7986cb',
              borderRadius: 5,
              alignItems: 'center',
              fontSize:10
            }} onPress={pickGoverment_Id}>
              <Text style={{ textAlign: 'center', fontWeight: '600', fontSize: 12, color: '#fff', padding:5 }}> {Goverment_id ? Goverment_id.name : 'Choose File'}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{
          flexDirection: 'row',
          alignItems: 'flex-end',
        }}>
          <View style={{ flex: 1, marginRight: 80 }}>
            <Text style={{ paddingTop: 30 }}>Signature</Text>
          </View>
          <View style={{ flex: 1, }}>
            <TouchableOpacity style={{
              width: '70%',
              paddingVertical: 0,
              backgroundColor: '#7986cb',
              borderRadius: 5,
              alignItems: 'center',
            }} onPress={pickSignature}>
              <Text style={{ textAlign: 'center', fontWeight: '600', fontSize: 12, color: '#fff', padding:5 }}>  {Signature ? Signature.name : 'Choose File'}</Text>
            </TouchableOpacity>
          </View>
        </View>

     
        <TouchableOpacity
          onPress={(handleSubmitButton)}
          style={{
            backgroundColor: '#AD40AF',
            padding: 20,
            borderRadius: 10,
            marginBottom: 30
            ,marginVertical:40,
            marginRight:40
          }}>
          <Text style={{ textAlign: 'center', fontWeight: '700', fontSize: 16, color: '#fff',  }}>Submit</Text>
        </TouchableOpacity>

      </View>
      </View>
    </View>
    </ScrollView>
  )
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginTop: 10,


  },

  panel: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    padding: 20,

  },

  header: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    ShadowOffset: { width: -1, height: -3 },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  panelHeader: {
    alignItems: 'center'
  },

  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,

  },

  panelTitle: {
    fontSize: 27,
    height: 35,

  },

  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,


  },

  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginVertical: 7,

  },

  panelButtonTitle: {
    fontsize: 17,
    fontWeight: 'bold',
    color: 'white',

  },

  action: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,

  },

  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,

  },

  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',

  },
  shiftDocument:{
    marginLeft:30
  }

})

export default Form