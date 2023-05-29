
import React from 'react'

import { View, Text, Button, StyleSheet, Image, SafeAreaView, ScrollView, BackHandler } from 'react-native'
import { Avatar, Title, Caption, TouchableRipple } from 'react-native-paper'
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import EditProfileScreenForStudent from './EditProfileScreenForStudent'
import { useNavigation } from '@react-navigation/native'

const HelpForTeacher = () => {
   const navigation = useNavigation()
    return (
        <View>

            <View style={{ marginTop: 40 }}>


                <TouchableRipple onPress={() => { navigation.navigate('ContactUsForStudent') }}>
                    <View style={styles.menuItem}>
                        <Ionicons name='people' color='#FF6347' size={25} />
                        <Text style={styles.menuITemText}>Contact Us </Text>
                    </View>
                </TouchableRipple>


                <TouchableRipple onPress={() => {navigation.navigate("Guidelines")}}>
                    <View style={styles.menuItem}>
                        <Ionicons name='information-circle' color='#FF6347' size={25} />
                        <Text style={styles.menuITemText}>App info </Text>
                    </View>
                </TouchableRipple>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({


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

export default HelpForTeacher