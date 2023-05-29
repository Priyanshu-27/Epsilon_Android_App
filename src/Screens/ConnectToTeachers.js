import { View, Text, StyleSheet, Image, FlatList, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import axios from 'axios'
import { get_S_ID, Store_Room_Name } from '../services/Asyncstorage'
import { removeToken } from '../services/Asyncstorage'
import { useNavigation } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native'

const ConnectToTeachers = () => {
  const [data, setData] = useState([]);
  const [photoUrl, setPhotoUrl] = useState('');
  const [S_id, setS_id] = useState(null);
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  // const [requests, setRequests] = useState(data.map(() => 'Connect'));
  // Define a state variable to keep track of which buttons have been clicked
  const [clicked, setClicked] = useState(data.map(() => false));

  const [requests, setRequests] = useState([]);
  async function fetchData() {
    const S_id = await get_S_ID('S_id');
    setS_id(S_id);
  }

  useEffect(() => {
    isFocused && fetchData(S_id)
  }, [isFocused]);

  const ChatBox = (index, T_id) => {

    fetch(`http://10.0.2.2:8000/chat/${T_id}/${JSON.parse(S_id)}/getroom`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }

    }).then((response) => response.json())
      .then((responseJson) => {
        Store_Room_Name(responseJson.room_name);
        if (responseJson.room_name) {
          navigation.navigate('ChatScreen')
        }
      })
      .catch((error) => {
        console.log(error);
      })

  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(`http://10.0.2.2:8000/${JSON.parse(S_id)}/ConnectedTeacher`);
      setData(result.data);
      setPhotoUrl(result.data.Photo);
      setClicked(result.data.map(() => false));
      setRequests(result.data.map(() => 'Message'));
    };

    isFocused && fetchData();
  }, [isFocused]);





  const handleLogout = () => {
    removeToken()
  }


  // const HomeImg = '../src/assets/homeforstudentImg.jpg'
  return (
    <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#FFFFFF' }}>


      <View style={{ flex: 1, alignItems: 'center', marginTop: 40 }}>


        <Text style={{ marginTop: 0, color: 'green', fontFamily: 'Poppins-Medium', fontWeight: '800' }}>     Connected Teacher   </Text>


        {/* FlatList */}
        <ScrollView>


          <View style={styles.container}>

            {data.map((item, index) => (
              <View key={item.T_id} style={styles.item}>
                <Text style={styles.title}>{item.Name}</Text>
                <Text style={styles.expertin}>{item.Expert_IN}</Text>
                <Text style={styles.description}>{item.Review}</Text>
                <Text style={styles.description}>${item.Payment}</Text>
                <Image source={{ uri: `http://10.0.2.2:8000${item.Photo}` }} style={styles.img} />
                <TouchableOpacity
                  style={{
                    padding: 10,
                    backgroundColor: '#0096FF',
                    borderRadius: 10,
                    width: 100,
                    alignItems: 'center',
                    marginTop: 30,
                  }}
                  onPress={() => ChatBox(index, item.T_id)}
                >
                  <Text style={{ color: '#ffffff', fontSize: 15, fontWeight: '600' }}>
                    {requests[index]}
                  </Text>
                </TouchableOpacity>
              </View>

            ))}
          </View>



        </ScrollView>













      </View>





    </View>


  )
}

const styles = StyleSheet.create({
  studentHomeHead: {
    fontSize: 30,
    fontWeight: '400',
    marginBottom: 10,
    color: '#404040',
    fontFamily: 'Poppins-Black'



  },

  studentHomeHead2: {
    fontSize: 18,
    color: '#888888',
    fontWeight: '600',
    fontFamily: 'Poppins-Light',
    marginBottom: 10,




  },


  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    padding: 20,
  },
  card: {
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 2,
    backgroundColor: '#FFF',
    marginBottom: 20,
    borderRadius: 10,

    overflow: 'hidden',
    flexDirection: 'row',
  },
  cardImage: {
    width: 100,
    height: 100,
  },
  cardTextContainer: {
    padding: 20,
    flex: 1,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  cardDescription: {
    fontSize: 16,
    color: '#333',
    marginTop: 10,
  },




  container: {
    flex: 1,
    width: 350,
    borderRadius: 20,
    backgroundColor: '#fff',
    padding: 16,
  },
  item: {
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    flexDirection: 'column',

    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
    marginVertical: 8,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: 'black',
    marginLeft: 180,
  },
  description: {
    fontSize: 16,
    marginLeft: 180,
  },

  expertin: {
    marginLeft: 180
  },

  img: {

    borderWidth: 3,
    color: 'black',
    borderColor: 'black',
    borderRadius: 20,
    height: 100,
    width: 100,
    marginTop: -100,
    marginRight: 200,
  }
});


export default ConnectToTeachers