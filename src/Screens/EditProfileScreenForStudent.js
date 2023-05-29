import { View, Text, Platform, StyleSheet, TextInput, TouchableOpacity, ImageBackground } from 'react-native'
import React from 'react'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { useState } from 'react'
import { useEffect } from 'react'
import DocumentPicker from 'react-native-document-picker';
import { Dropdown } from 'react-native-element-dropdown'
import { Store_S_ID, get_S_ID } from '../services/Asyncstorage'
import { useNavigation } from '@react-navigation/native'
const EditProfileScreenForStudent = ({navigation:{goback}}) => {
  const navigation = useNavigation();
  const [imageUri, setImageUri] = useState(null);
  const [userName, setuserName] = useState("");
  const [userGender, setuserGender] = useState("");
  const [userDate_of_Birth, setuserDate_of_Birth] = useState("");
  const [userDesability, setuserDesability] = useState("");
  const [userEducation_level, setuserEducation_level] = useState("");
  const [responseJson2, setresponseJson] = useState("");
  const [fileUri, setFileUri] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [otherText, setOtherText] = useState('');

  const renderLabel = () => {
    if (value || isFocus) {
     
    }
    return null;
  };

  const handleOtherOptionSelect = () => {
    setValue('other');
    setIsFocus(false);
    setOtherText('');
  }

  const handleOtherTextChange = (text) => {
    setOtherText(text);
    setuserDesability(text) 
  }
  const formData = new FormData();
  formData.append('ProfilePic', {uri: fileUri,type: 'image/jpeg',name: fileName});
  formData.append("Name", userName);
  formData.append("Gender", userGender);
  formData.append("Date_of_Birth", userDate_of_Birth);
  formData.append("Desability", userDesability);
  formData.append("Education_level", userEducation_level);
  const pickFile = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      setFileUri(result[0].uri);
      setFileName(result[0].name);
      
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled file picker');
      } else {
        console.log('DocumentPicker Error: ', err);
      }
    }
   
  };
 
  const handleSubmitButton = () => {
     fetch('http://10.0.2.2:8000/Student/Registration', {
    method: 'POST',
    headers: { 'Content-Type': 'multipart/form-data' },
    body: formData
  })
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson)
      Store_S_ID(responseJson.S_id)
      console.log(responseJson.S_id)
    })
    .catch((error) => {
      console.log(error);
    });
    // navigation.goBack()
   
  }



  return (
    <View style={styles.container}>
   
      <View style={{ margin: 20 }}>
        <View style={{ alignItems: 'center' }}>
        <TouchableOpacity onPress={pickFile}>
      <ImageBackground source={fileUri ? { uri: fileUri } : { uri: 'https://www.pngitem.com/pimgs/m/150-1503945_transparent-user-png-default-user-image-png-png.png' }} style={{ height: 100, width: 100 }} imageStyle={{ borderRadius: 15 }}>
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
            value={userName}
            onChangeText={text => setuserName(text)}   
          />
        </View>

        <View style={[styles.action, { borderBottomWidth: 1, borderBottomColor: 'black' }]}>
          <Ionicons name='people-circle-outline' size={20} />
          <TextInput
            placeholder='Gender'
            placeholderTextColor="#666666"
            style={styles.textInput}
            value={userGender}
            onChangeText={text => setuserGender(text)}
          />
        </View>


        <View style={[styles.action, { borderBottomWidth: 1, borderBottomColor: 'black' }]}>
          <Ionicons name='calendar-outline' size={20} />
          <TextInput
            placeholder='Date of Birth'
            placeholderTextColor="#666666"
            style={styles.textInput}
            value={userDate_of_Birth}
            onChangeText={text => setuserDate_of_Birth(text)}

          />
        </View>

        <View style={[styles.action, { borderBottomWidth: 1, borderBottomColor: 'black' }]}>
        <View style={styles.container}>
      {renderLabel()}
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Select item' : '...'}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setValue(item.value);
          setIsFocus(false);

         
          
          if (item.value === 'other') {
            setuserDesability(otherText)
            setOtherText('');
          }
          else{
             setuserDesability(item.value)
          }
        }}
        renderLeftIcon={() => (
          <FontAwesome name='blind' size={20}
            style={styles.icon}
            
             
          />
        )}
      />
      {value === 'other' && (
        <TextInput
          style={styles.otherInput}
          placeholder="Please specify"
          value={otherText}
          onChangeText={handleOtherTextChange}
          onBlur={() => {
            if (!otherText) {
              setValue(null);
            }
          }}
        />
      )}
    </View>
        </View>

        <View style={[styles.action, { borderBottomWidth: 1, borderBottomColor: 'black' }]}>
          <Ionicons name='school-outline' size={20} />
          <TextInput
            placeholder='Education Qualification'
            placeholderTextColor="#666666"
            style={styles.textInput}
            value={userEducation_level}
            onChangeText={text => setuserEducation_level(text)}

          />
        </View>

    
        <TouchableOpacity
          onPress={(handleSubmitButton)}
          style={{
            backgroundColor: '#AD40AF',
            padding: 20,
            borderRadius: 10,
            marginBottom: 30
          }}>
          <Text style={{ textAlign: 'center', fontWeight: '700', fontSize: 16, color: '#fff' }}>Submit</Text>
        </TouchableOpacity>

      </View>
    </View>
  )
}

const data = [
  { label: 'Blindness', value: 'Blindness' },
  { label: 'Deaf-partial or total inability to hear', value: 'Deaf ' },
  { label: 'Mental Behaviour', value: 'Mental' },
  { label: 'Acid Attack Victims', value: 'Acid_Attack_Victims' },
  { label: 'Handicap', value: 'Handicap' },
  { label: 'Rehabilitation', value: 'Rehabilitation' },
  { label: 'other', value: 'other' },
];

 


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
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderRadius:10, 
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },

})

export default EditProfileScreenForStudent