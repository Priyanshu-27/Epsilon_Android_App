import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from '@react-navigation/native';
import HomeForStudent from "../Screens/HomeForStudent";
import ProfileforStudent from "../Screens/ProfileforStudent";

import HomeForTeacher from "../Screens/HomeForTeacher";
import ConnectToStudents from "../Screens/ConnectToStudents";
import ProfileforTeacher from "../Screens/ProfileforTeacher";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
const Tab = createBottomTabNavigator();

function BottomTabNavigationforteacher() {
    return (
        <Tab.Navigator
        screenOptions={({ route }) => ({
          
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'HomeForTeacher') {
              iconName = 'home'
               
            } else if (route.name === 'ConnectToStudents') {
              iconName = 'person'
            } else if(route.name === 'ProfileforTeacher'){
                iconName = 'chat'
            }

            // You can return any component that you like here!
            return <MaterialIcons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
          headerShown:false ,
          
        })}
      >
            
            <Tab.Screen name="HomeForTeacher" component={HomeForTeacher} options = {{tabBarLabel : "Home"}}  />
            <Tab.Screen name="ConnectToStudents" component={ConnectToStudents} options = {{tabBarLabel : "Chat"}} />
            <Tab.Screen name="ProfileforTeacher" component={ProfileforTeacher} options = {{tabBarLabel : "Profile"}} />
        </Tab.Navigator>
    )


}

export default BottomTabNavigationforteacher ;