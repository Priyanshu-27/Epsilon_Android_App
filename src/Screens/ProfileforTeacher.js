import React from 'react'
import { View, Text, Button, StyleSheet, Image, SafeAreaView, ScrollView,BackHandler } from 'react-native'
import { Avatar, Title, Caption, TouchableRipple } from 'react-native-paper'
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import EditProfileScreenForStudent from './EditProfileScreenForStudent'
import { useNavigation } from '@react-navigation/native'
import { getToken, removeToken, StoreToken, get_T_ID,Store_T_ID ,remove_T_id , Store_Teacher_Name } from '../services/Asyncstorage'
import { useEffect, useState } from 'react'
import { useIsFocused } from '@react-navigation/native'
import axios from 'axios'
import { FlatList } from 'react-native-gesture-handler'
const ProfileforStudent = () => {
  const navigation = useNavigation();
  const [T_id, setT_id] = useState(null);
  const [data, setData] = useState([]);
  // const [isdata, setisData] = useState(false);
  const isFocused = useIsFocused();
 
  async function fetchData() {
    const T_id = await get_T_ID('T_id');
    setT_id(T_id);
  }

  const handleLogoutforTeacher = () => {
    removeToken()
    navigation.navigate('Join')
    BackHandler.exitApp()

  }

  const NotificationFunc = () => {

    navigation.navigate("RequestForConnection")

    
  }
  useEffect(() => {

    isFocused && fetchData(T_id)
  }, [isFocused]);

  useEffect(() => {
    const getProfile = async () => {
      const result = await axios.get(`http://10.0.2.2:8000/${JSON.parse(T_id)}/TeacherProfile`);
      setData(result.data);
      // setisData(true);
      Store_Teacher_Name(result.data.Name)
      
      
    };
    isFocused && getProfile(T_id)
  }, [isFocused]);



  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <View style={{ marginTop: 20, elevation: 6, height: 50, marginBottom: 30, alignItems: 'center', justifyContent: 'center' }} >
          <TouchableRipple onPress={() => navigation.navigate('EditProfileScreenForTeacher')}>
            <View style={{ flexDirection: 'row' }}>
              <Ionicons name="create-outline" color='#FF6347' size={25} />
              <Text style={styles.menuITemText}>Edit profile </Text>
            </View>
          </TouchableRipple>
        </View>
        <View style={styles.userInfoSection}>
          <View style={{ flexDirection: 'row', marginTop: 15 }}>
            <Avatar.Image source={{ uri: `http://10.0.2.2:8000${data.Photo}` }} size={80} />
            <View style={{ marginLeft: 20, }}>
              <Title style={[styles.tittle, {
                marginTop: 15,

                marginBottom: 5
              }]}>{data.Name}</Title>
           
            </View>
          </View>
        </View>

        <View style={styles.userInfoSection}>






          <View>
            <Text style={{ fontWeight: '600', color: 'black', marginBottom: 20, marginTop: 15 }}>My information</Text>
            <View>



              <View style={styles.row}>
                <MaterialIcon name='email' size={20} />
                <Text style={{ color: '#777777', marginLeft: 20 }}>{data.Email}</Text>
              </View>

              <View style={styles.row}>
                <MaterialIcon name='map-marker-radius' size={20} />
                <Text style={{ color: '#777777', marginLeft: 20 }}>{data.Address}</Text>
              </View>

              <View style={styles.row}>
                <MaterialIcon name='phone' size={20} />
                <Text style={{ color: '#777777', marginLeft: 20,  }}>{data.Expert_IN}</Text>
              </View>



            </View>
          </View>


        </View>

        <View style={styles.infoBoxWrapper}>
          <View style={[styles.infoBox, {
            borderRightColor: '#dddddd',
            borderRightWidth: 1
          }]} >
            <Title>5</Title>
            <Caption>Subjects</Caption>
          </View>

          <View style={styles.infoBox}>
            <Title>3</Title>
            <Caption>Students</Caption>
          </View>
        </View>




        <View style={{ marginTop: 40 }}>

          {/* <TouchableRipple onPress={() => { navigation.navigate('Guidelines') }}>
            <View style={styles.menuItem}>
              <Ionicons name="create-outline" color='#FF6347' size={25} />
              <Text style={styles.menuITemText}> Guid  </Text>
            </View>
          </TouchableRipple> */}

          <TouchableRipple onPress={() => { navigation.navigate("HelpForTeacher")}}>
            <View style={styles.menuItem}>
              <Ionicons name="help-circle-outline" color='#FF6347' size={25} />
              <Text style={styles.menuITemText}>Help </Text>
            </View>
          </TouchableRipple>
          <TouchableRipple onPress={NotificationFunc}>
            <View style={styles.menuItem}>
              <Ionicons name="notifications-outline" color='#FF6347' size={25} />
              <Text style={styles.menuITemText}>Notification </Text>
            </View>
          </TouchableRipple>

          <TouchableRipple onPress={handleLogoutforTeacher}>
            <View style={styles.menuItem}>
              <MaterialIcon name='logout' color='#FF6347' size={25} />
              <Text style={styles.menuITemText}>Logout </Text>
            </View>
          </TouchableRipple>
        </View>


      </SafeAreaView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  },

  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  tittle: {
    fontSize: 24,
    fontWeight: 'bold',

  },

  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
  },

  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },

  infoBoxWrapper: {
    borderBottomColor: '#dddddd',
    borderTopColor: '#dddddd',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 100,
  },

  infoBox: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  menuWrapper: {
    marginTop: 10,
  },

  menuItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,



  },

  menuITemText: {
    color: '#777777',
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 26,
  },
})

export default ProfileforStudent