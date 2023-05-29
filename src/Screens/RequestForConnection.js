import { View, Text, StyleSheet, Image, FlatList, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import SearchBar from '../components/Searchbar'
import axios from 'axios'
import { removeToken, Store_T_ID ,Store_Room_Name} from '../services/Asyncstorage'
import { useNavigation } from '@react-navigation/native';
import { get_T_ID } from '../services/Asyncstorage'
import { useIsFocused } from '@react-navigation/native'

const RequestForConnection = () => {
  const [data, setStudents] = useState([]);
  const [photoUrl, setPhotoUrl] = useState('');
  const [S_id2, setStudentid] = useState('');
  const navigation = useNavigation();
  const [T_id, setT_id] = useState(null);
  const isFocused = useIsFocused();
  const [requests, setRequests] = useState([]);
  const [clicked, setClicked] = useState(data.map(() => false));



  
  
  async function fetchData() {
    const T_id = await get_T_ID('T_id');
    setT_id(T_id);
    console.log(T_id)
  }
 
  useEffect(() => {
    isFocused && fetchData(T_id)
  }, [isFocused]);

  useEffect(() => {
      const getRequst2 = async () => {  fetch(`http://10.0.2.2:8000/Teacher/${JSON.parse(T_id)}/Requests`)
      .then(response => response.json())
      .then(data => {
        const studentsData = data.map(item => item);
        setStudents(studentsData);
        setClicked(studentsData.map(() => false));
        setRequests(studentsData.map(() => 'Accept'));
      })
      .catch(error => console.log(error));}
      isFocused && getRequst2()
  }, [isFocused]);




  const handleAccept = (index,Accept_id,room_name) => {
   const data = new FormData()
   data.append("is_accepted",1)
    console.log(Accept_id)
    fetch(`http://10.0.2.2:8000/chat/${Accept_id}/`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'multipart/form-data'
  },
  body: data
}).then((response) => response.json())
  .then((responseJson) => {
    console.log(responseJson)
  })
  .catch((error) => {
    console.log(error);
  });

        
  }


  // const HomeImg = '../src/assets/homeforstudentImg.jpg'
  return (
    <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#FFFFFF' }}>


      <View style={{ flex: 1, alignItems: 'center', marginTop: 40 }}>


        <Text style={{ marginTop: 0, color: 'green', fontFamily: 'Poppins-Medium', fontWeight: '800' }}>     Request From Students    </Text>


        {/* FlatList */}
        <ScrollView>
          <View style={styles.container}>

            {data.map((student2, index) => (
              
              <View key={index} style={styles.item}>
                <Text style={styles.title}>{student2.Student.Name}</Text>
                <Text style={styles.expertin}>{student2.Student.Desability}</Text>
                <Text style={styles.expertin}>{student2.Student.Message}</Text>
                <Image source={{ uri: `http://10.0.2.2:8000${student2.Student.ProfilePic}` }} style={styles.img} />
                <TouchableOpacity
                  style={{
                    padding: 10,
                    backgroundColor: '#0096FF',
                    borderRadius: 10,
                    width: 100,
                    alignItems: 'center',
                    marginTop: 30,
                  }}
                  onPress={()=>handleAccept(index,student2.Accept_id,student2.room_name)}
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
    height: 80,
    width: 80,
    marginTop: -50,
    marginRight: 200,
  }
});


export default RequestForConnection