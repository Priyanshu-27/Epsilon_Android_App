import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native';


const TestScreen = ({navigation:{goback}}) => {
    const navigation = useNavigation()
    const [modalVisible, setModalVisible] = useState(false);
  
    const toggleModal = () => {
      setModalVisible(!modalVisible);
    };
  
    return (
      <View>
        <TouchableOpacity onPress={toggleModal}>
          <Ionicons name="ios-add-circle-outline" size={32} color="blue" />
        </TouchableOpacity>
        <Modal visible={modalVisible} animationType="slide">
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
              <Ionicons name="ios-camera" size={24} color="black" />
              <Text style={{ marginLeft: 10 }}>Take a photo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}
             onPress={navigation.goBack()}>
              <Ionicons name="ios-image" size={24} color="black" />
              <Text style={{ marginLeft: 10 }}>Choose from library</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' } }>
          
              <Ionicons name="ios-close" size={24} color="black" />
              <Text style={{ marginLeft: 10 }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    );
  
}

export default TestScreen





