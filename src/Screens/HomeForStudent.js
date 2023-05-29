import { View, Text,TextInput,Button, StyleSheet, Image, Keyboard , FlatList, ScrollView, BackHandler, TouchableOpacity, Pressable } from 'react-native'
import React from 'react'
import { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import SearchBar from '../components/Searchbar'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { get_S_ID ,Store_Accept_id} from '../services/Asyncstorage'
import axios from 'axios'
import { useIsFocused } from '@react-navigation/native'
import { removeToken } from '../services/Asyncstorage'
// import { useWindowDimensions } from 'react-native';
// import { createDrawerNavigator } from '@react-navigation/drawer';



const HomeForStudent = () => {
  const [data, setData] = useState([]);
  const [photoUrl, setPhotoUrl] = useState('');
  const [Search, setSearch] = useState('');
  const [results, setResults] = useState([]);
  const [S_id, setS_id] = useState(null);
  const isFocused = useIsFocused();
  const [clicked, setClicked] = useState(data.map(() => false));

  const [requests, setRequests] = useState([]);
  async function fetchData() {
    const S_id = await get_S_ID('S_id');
    setS_id(S_id);
    console.log(S_id)
  }
  useEffect(() => {
    isFocused && fetchData(S_id)
  },[isFocused]);


  const changeTextInRequest = (index,T_id) => {
   
    if (!clicked[index]) {
     
      const newRequests = [...requests];
     
      newRequests[index] = 'Request sent';
      setRequests(newRequests);
     
      const newClicked = [...clicked];
     
      newClicked[index] = true;
      setClicked(newClicked);
    }
    var dataToSend = {
      "S_id":JSON.parse(S_id),
      "T_id":T_id
    }
   
    fetch('http://10.0.2.2:8000/Student/Request', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dataToSend),
    }).then((response) => response.json())
      .then((responseJson) => {
       console.log(responseJson)
      })
      .catch((error) => {
        console.log(error);
      })
  };
  
  // useEffect(() => {
    const fetchResults = async () => {
      const result = await axios.get(`http://10.0.2.2:8000/search/?search=${Search}`);
      setData(result.data);
      setPhotoUrl(result.data.Photo);
      setClicked(result.data.map(() => false));
      setRequests(result.data.map(() => 'Connect'));

      // setResults(response.data);
    };
    // fetchResults();
  // }, []);

  useEffect(() => { 
     fetchResults();
  }, []);

  // const Drawer = createDrawerNavigator();

  // function MyDrawer() {
  //   const dimensions = useWindowDimensions();
  
  //   const isLargeScreen = dimensions.width >= 768;
  
  //   return (
  //     <Drawer.Navigator
  //       defaultStatus="open"
  //       screenOptions={{
  //         drawerType: isLargeScreen ? 'permanent' : 'back',
  //         drawerStyle: isLargeScreen ? null : { width: '100%' },
  //         overlayColor: 'transparent',
  //       }}
  //     >
  //       {/* Screens */}
  //     </Drawer.Navigator>
  //   );
  // }


  // const HomeImg = '../src/assets/homeforstudentImg.jpg'
  return (
    <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#FFFFFF' }}>


      <View style={{ flex: 1, alignItems: 'center', marginTop: 40 }}>
        <Text style={styles.studentHomeHead}>Hey Student , </Text>
        <Text style={styles.studentHomeHead2}>Which tutor do you want to select ?</Text>
       {/* <Pressable onPress={MyDrawer}>
        <Text>open price filter</Text>
       </Pressable> */}

        {/* <SearchBar /> */}
        <View style={styles.containerForSearch}>
            <View style={styles.searchBar__unclicked}>
                <MaterialIcons
                    name='search'
                    size={20} color='#666'
                    style={{ marginRight: 5  , }}
                    onPress={() => {
                      Keyboard.dismiss()
                      fetchResults();

                    } }
                />
                <TextInput
                    style={styles.inputForSearch}
                    placeholder="Search"
                    value={Search}
                    onChangeText={text => {
                        setSearch(text);
                        setResults([]);
                    }}
                />
                {/* <View style={{alignItems:'center'}}>
                <Button
                    style={{backgroundColor:'#' , marginRight:0 , borderRadius:50}}
                    title="S"
                   
                />
                </View> */}
                
            </View>
            {results.map((result) => (
                <Text key={result.id}>{result.title}</Text>
            ))}
        </View>
    



        {/* <SearchBar /> */}


        <View style={{
          border: 2, marginTop: 35, padding: 80,
          margin: 20,
          //  flex:1 ,
          flexDirection: 'row',
          alignItems: 'stretch',
          backgroundColor: '#ccffcc',
          justifyContent: 'space-around',

          width: 350,
          height: 200,

          borderColor: "pink",
          borderRadius: 50,
        }}>

          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
            <Image source={require('../assets/homepageimg.png')} style={{ height: 150, width: 100, }} />

            <Text style={{ fontSize: 25, color: 'black', marginRight: 50, width: 200, height: 150, marginLeft: 30, marginTop: 20, fontFamily: 'Poppins-Medium' }}>Connect with your favourite Teachers . </Text>

          </View>




        </View>

        <Text style={{ marginRight: 120, color: 'green', fontFamily: 'Poppins-Medium', fontWeight: '400' }}>Recommended Teachers    </Text>


        {/* FlatList */}
        <ScrollView>


          <View style={styles.container}>

            {data.map((item, index) => (
              <View key={item.T_id} style={styles.item}>
                <Text style={styles.title}>{item.Name}</Text>
                <Text style={styles.expertin}>{item.Expert_IN}</Text>
                <Text style={styles.description}>{item.Review}</Text>
                <Text style={styles.description}>${item.Payment}</Text>
                <Image source={{ uri: `${item.Photo}` }} style={styles.img} />
                <TouchableOpacity
                  style={{
                    padding: 10,
                    backgroundColor: '#0096FF',
                    borderRadius: 10,
                    width: 100,
                    alignItems: 'center',
                    marginTop: 30,
                  }}
                  onPress={() => changeTextInRequest(index,item.T_id)}
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
  },


  // searchbarStyling

  containerForSearch: {
    margin: 15,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    width: "90%",

},
searchBar__unclicked: {
    padding: 10,
    flexDirection: "row",
    width: "95%",
    backgroundColor: "#d9dbda",
    borderRadius: 15,
    alignItems: "center",
},
searchBar__clicked: {
    padding: 10,
    flexDirection: "row",
    width: "80%",
    backgroundColor: "#d9dbda",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "space-evenly",
},
inputForSearch: {
    fontSize: 20,
    marginLeft: 10,
    width: "90%",
   
},


});


export default HomeForStudent