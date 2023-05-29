import { View, Text, Platform, StyleSheet, TextInput, TouchableOpacity, ImageBackground } from 'react-native'
import React from 'react'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { useState, useEffect } from 'react'
import { get_S_ID } from '../services/Asyncstorage'
import { useIsFocused } from '@react-navigation/native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
/*import { Store_S_ID, get_S_ID } from '../services/Asyncstorage'*/
import { useNavigation } from '@react-navigation/native'
const GardianRegistration = ({navigation:{goback}}) => {
    const navigation = useNavigation();
    const [imageUri, setImageUri] = useState(null);
    const [userName, setuserName] = useState("");
    const [usercontact_number, setusercontact_number] = useState("");
    const [userRelationship, setuserRelationship] = useState("");
    const [userGender, setuserGender] = useState("");
    const [useraddress, setuseraddress] = useState("");
    const [usergmail, setusergmail] = useState("");
    const [S_id, setS_id] = useState(null);
    const isFocused = useIsFocused();
    async function fetchData() {
        const S_id = await get_S_ID('S_id');
        setS_id(S_id);
      }
      useEffect(() => {
        isFocused && fetchData(S_id)
      },[isFocused]);
    const handleSubmitButton = () => {
        var formdata = {
            "S_id": JSON.parse(S_id),
            "G_Name": userName,
            "contact_number": usercontact_number,
            "Relationship": userRelationship,
            "Gender": userGender,
            "Addresse": useraddress,
            "gmail": usergmail
        }
        console.log(formdata)
        fetch('http://10.0.2.2:8000/Gardian/Registration', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formdata)
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson)})
            .catch((error) => {
                console.log(error);
            });
            navigation.goBack()
           
    }



    return (
        <View style={styles.container}>

            <View style={{ margin: 20 }}>
                <View style={{ alignItems: 'center' }}>

                </View>
                <View style={[styles.action, { borderBottomWidth: 1, borderBottomColor: 'black' }]}>
                    <FontAwesome name='user-o' size={20} />
                    <TextInput
                        placeholder='Gardian Name'
                        placeholderTextColor="#666666"
                        style={styles.textInput}
                        value={userName}
                        onChangeText={text => setuserName(text)}
                    />
                </View>

                <View style={[styles.action, { borderBottomWidth: 1, borderBottomColor: 'black' }]}>
                    <Ionicons name='call' size={20} />
                    <TextInput
                        placeholder='Contact Number'
                        placeholderTextColor="#666666"
                        style={styles.textInput}
                        value={usercontact_number}
                        onChangeText={text => setusercontact_number(text)}
                    />
                </View>
                <View style={[styles.action, { borderBottomWidth: 1, borderBottomColor: 'black' }]}>
                    <MaterialIcon name='alternate-email' size={20} />
                    <TextInput
                        placeholder='Gmail'
                        placeholderTextColor="#666666"
                        style={styles.textInput}
                        value={usergmail}
                        onChangeText={text => setusergmail(text)}

                    />
                </View>


                <View style={[styles.action, { borderBottomWidth: 1, borderBottomColor: 'black' }]}>
                    <MaterialCommunityIcons name='human-male-female-child' size={20} />
                    <TextInput
                        placeholder='Gender'
                        placeholderTextColor="#666666"
                        style={styles.textInput}
                        value={userGender}
                        onChangeText={text => setuserGender(text)}

                    />
                </View>
                <View style={[styles.action, { borderBottomWidth: 1, borderBottomColor: 'black' }]}>
                    <MaterialCommunityIcons name='family-tree'size={20} />
                    <TextInput
                        placeholder='Relstionship'
                        placeholderTextColor="#666666"
                        style={styles.textInput}
                        value={userRelationship}
                        onChangeText={text => setuserRelationship(text)}

                    />
                </View>

                <View style={[styles.action, { borderBottomWidth: 1, borderBottomColor: 'black' }]}>
                    <FontAwesome name='address-card' size={20} />
                    <TextInput
                        placeholder='Address'
                        placeholderTextColor="#666666"
                        style={styles.textInput}
                        value={useraddress}
                        onChangeText={text => setuseraddress(text)}

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

})

export default GardianRegistration