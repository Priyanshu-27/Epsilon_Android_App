import React, { useState , useRef, useEffect,TextEncoder} from 'react';
import { View, Text, TextInput, TouchableOpacity,Audio,FlatList,Switch,StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import DocumentPicker from 'react-native-document-picker';
import { get_T_ID,get_S_ID,get_Room_Name, remove_Room_Name } from '../services/Asyncstorage';
import { useNavigation } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';
// import Sound from 'react-native-sound';
// import base64 from 'base64-js'
// import {encode,decode} from 'base-64'
// import {Buffer} from 'buffer'
import Geolocation from '@react-native-community/geolocation';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ChatScreen = ({navigation}) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const isFocused = useIsFocused()

  const [isMenuOpen, setIsMenuOpen] = useState(false); // state to track if menu is open
  const [room_name, setroom] = useState(null);
  const socketRef = useRef(null);
  const [ttsEnabled, setTtsEnabled] = useState(false);
  const [fileUri, setFileUri] = useState(null);
  const [fileName, setFileName] = useState(null);
  const flatListRef = useRef();
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  async function fetchData() {
    const room = await get_Room_Name('room_name');
    setroom(room);
  }
  const handleDocumentPress = async () => {
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


const handleCameraPress = () => {
  // ImagePicker.showImagePicker({
  //   mediaType: 'mixed', // Allow images and videos
  //   quality: 1,
  //   allowsEditing: false,
  //   storageOptions: {
  //     skipBackup: true,
  //     path: 'images',
  //   },
  // }, (response) => {
  //   if (response.didCancel) {
  //     console.log('User cancelled image picker');
  //   } else if (response.error) {
  //     console.log('ImagePicker Error: ', response.error);
  //   } else {
  //     // You can upload the selected file to your server or do something else with it
  //     console.log(response.uri, response.type, response.fileName, response.fileSize);
  //     setMessages((prevMessages) => [
  //       ...prevMessages,
  //       { id: Math.random().toString(), content: response.uri, isMe: true },
  //     ]);
  //   }
  // });
};
const toggleTts = () => {
  setTtsEnabled(previousState => !previousState);
};

const handleLocationPress = () => {
  // Geolocation.getCurrentPosition(
  //   (position) => {
  //     const location = `https://www.google.com/maps/search/?api=1&query=${position.coords.latitude},${position.coords.longitude}`;
  //     setMessages((prevMessages) => [
  //       ...prevMessages,
  //       { id: Math.random().toString(), content: location, isMe: true },
  //     ]);
  //   },
  //   (error) => {
  //     console.log(error.message);
  //   },
  //   { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 } // setMessages((prevMessages) => [...prevMessages, newMessage]);
  // );
};
  useEffect(() => {
    isFocused && fetchData()
  }, [isFocused]);

  // const sound = new Sound('', '', (error) => {
  //   if (error) {
  //     console.log('Failed to load sound', error);
  //     return;
  //   }
  // });

 
  
  // ...
  
  const handleNewMessage = (event) => {
    const data = JSON.parse(event.data);
    const newMessage = { id: Math.random().toString(), content: data.message, isMe: false, timestamp: new Date().toLocaleString() };
    if (data.isMe !== false) {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    }
    if (data.speech) {  
    }
  };
  
  
  
  
  // useEffect(() => {
  //   return () => {
  //     sound.release();
  //   };
  // }, []);
  useEffect(() => {
    // Connect to the WebSocket server
    socketRef.current = new WebSocket(`ws://10.0.2.2:8000/ws/chat/${JSON.parse(room_name)}/`);
    socketRef.current.onopen = () => {
      // console.log('Connected to the WebSocket server');
    };
    socketRef.current.onmessage = handleNewMessage;
  }, [room_name]);

  const sendMessage = () => {
    if (message.trim() !== '') {
      setMessage('');
      // Send message over WebSocket connection
      var datatosend = {
        "message":message,
        "tts":ttsEnabled,
        "isMe": true // Set isMe to true when sending a message
      }
      console.log(datatosend)
      if (socketRef.current.readyState === WebSocket.OPEN) {
        socketRef.current.send(JSON.stringify(datatosend));
        // const newMessage = { id: Math.random().toString(), content: message, isMe: true };
        // if (!messages.some(msg => msg.content === message && msg.isMe)) {
        //   setMessages((prevMessages) => [...prevMessages, newMessage]);
        // }
      } else {
        console.log('WebSocket connection not open.');
      }
    }
  };
 

 
  

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      {/* Header */}
      <View style={{ height: 60, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#ccc', paddingHorizontal: 10, flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity>
          
        </TouchableOpacity>
        <Text style={{ marginLeft: 10, fontSize: 18 }}>{room_name}</Text>
      </View>
  
      {/* Chat Messages */}
      <FlatList
    data={messages}
    keyExtractor={(item) => item.id}
    renderItem={({ item }) => {
      if (item.isMe) {
        return (
          <View style={{  paddingHorizontal: 10, paddingVertical: 5 }}>
            <View style={{ backgroundColor: '#DCF8C5', padding: 10, borderRadius: 10 }}>
              <Text style={{ color: '#000', fontSize: 16 }}>{item.content}</Text>
              <Text style={{ color: '#999', fontSize: 12 }}>{item.timestamp}</Text>
            </View>    
          </View>
        );
      } else {
        return (
          <View style={{  paddingHorizontal: 10, paddingVertical: 5 }}>
            <View style={{ backgroundColor: '#DCF8C5', padding: 10, borderRadius: 10 }}>
              <Text style={{ color: '#111', fontSize: 16 }}>{item.content}</Text>
              <Text style={{ color: '#999', fontSize: 12 }}>{item.timestamp}</Text>
            </View>
          </View>
        );
      }
    }}
     
  />

      {/* Chat Input */}
      <View style={{ height: 60, backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#ccc', paddingHorizontal: 10, flexDirection: 'row', alignItems: 'center' }}>
         
        <View style={styles.container}> 
        <View style={styles.menuIcon}>
  <TouchableOpacity onPress={toggleMenu} style={{marginBottom:3.5,marginRight:30}}>
    <MaterialCommunityIcons name="dots-vertical" size={30} color="#000"  />
  </TouchableOpacity>
</View>
<View style={[styles.menuContainer, {display: isMenuOpen ? 'flex' : 'none'}]}>
  <TouchableOpacity style={styles.menuItem} onPress={handleDocumentPress}>
    <MaterialIcon name="attach-file" size={24} color="#000" />
    <Text style={styles.menuItemText}>Document</Text>
  </TouchableOpacity>
  {/* <TouchableOpacity style={styles.menuItem} onPress={handleCameraPress}>
    <MaterialIcon name="camera-alt" size={24} color="#000" />
    <Text style={styles.menuItemText}>Camera</Text>
  </TouchableOpacity> */}
  <TouchableOpacity style={styles.menuItem} onPress={handleLocationPress}>
    <MaterialCommunityIcons name="map-marker-outline" size={24} color="#000" />
    <Text style={styles.menuItemText}>Location</Text>
  </TouchableOpacity>
</View>
<Switch
    trackColor={{ false: "#767577", true: "#81b0ff" }}
    thumbColor={ttsEnabled ? "#f5dd4b" : "#f4f3f4"}
    ios_backgroundColor="#3e3e3e"
    onValueChange={toggleTts}
    value={ttsEnabled}
    
  />
</View>
        
        <TextInput
          style={{
            flex: 1, marginRight: 10, height: 40, borderWidth: 1, borderRadius: 20, paddingHorizontal: 10
          }}
          placeholder="Type your message"
          value={message}
          onChangeText={(text) => setMessage(text)}
        />
        <TouchableOpacity onPress={sendMessage}>
          <Icon name="send" size={24} color="#AD40AF" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  IconStyle: {
    marginRight: 5
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
   
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuIcon: {
    position: 'absolute',
    bottom: 0,
    right: 10,
    paddingBottom: 10,
  },
  menuContainer: {
    position: 'absolute',
    bottom: 50,
    left:30,  
    width: '300%',
    backgroundColor: '#8ed1fc',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    elevation: 3,
    zIndex: 1,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
  },
  menuItemText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#111',
  },
})
export default ChatScreen;
