import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Join from '../Screens/Join' 
import LoginforStudent from '../Screens/LoginforStudent';
import LoginforTeacher from '../Screens/LoginforTeacher';
import RegistrationForTeacher from '../Screens/RegistrationForTeacher';
import TestScreen from '../Screens/TestScreen';
import RegistrationForStudent from '../Screens/RegistrationForStudent'
import HomeForStudent from '../Screens/HomeForStudent';
import HomeForTeacher from '../Screens/HomeForTeacher';
import Guidelines from '../Screens/Guidelines';
import UpdateStudentProfile from '../Screens/UpdateStudentProfile';
import ChatScreen from '../Screens/ChatScreen';
import HelpForTeacher from '../Screens/HelpForTeacher';
import GuidelinesforStudent from '../Screens/GuidelinesforStudent';
import GardianRegistration from '../Screens/GardianRegistration';
import ChatScreenforStudents from '../Screens/ChatScreen';
import HelpForStudent from '../Screens/HelpForStudent';
import ContactUSForStudent from '../Screens/ContactUSForStudent';
import ProfileforStudent from '../Screens/ProfileforStudent';
import RequestForConnection from '../Screens/RequestForConnection';
import ConnectToStudents from '../Screens/ConnectToStudents';
import ProfileforTeacher from '../Screens/ProfileforTeacher';
import EditProfileScreenForTeacher from '../Screens/EditProfileScreenForTeacher';
import Form from '../Screens/Form';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BottomTabNavigator from './BottomTabNavigation';
import EditProfileScreenForStudent from '../Screens/EditProfileScreenForStudent';
import BottomTabNavigationforteacher from './BottomTabNavigationforteacher';
import ConnectToTeachers from '../Screens/ConnectToTeachers';
// import InitialScreen from './src/Screens/InitialScreen';
import AddScheduleforTeacher from '../Screens/AddScheduleforTeacher';
import DetailForNotes from '../Screens/DetailForNotes';
const Stack = createNativeStackNavigator();

     
const Navigation = () => {
    return(
        <NavigationContainer>
      <Stack.Navigator
        // initialRouteName='DetailforNotes'
        screenOptions={{ headerShown: false }}>
        {/* <Stack.Screen name="initialScreen" component={InitialScreen} /> */}
        <Stack.Screen name="Join" component={Join} />
        <Stack.Screen name="LoginforStudent" component={LoginforStudent} />
        <Stack.Screen name="LoginforTeacher" component={LoginforTeacher} />
        <Stack.Screen name="RegistrationforTeacher" component={RegistrationForTeacher} />
        <Stack.Screen name="RegistrationforStudent" component={RegistrationForStudent} />
        <Stack.Screen name="ChatScreen" component={ChatScreen} />
        <Stack.Screen name="RequestForConnection" component={RequestForConnection}  options={{headerShown:true}}/>
        <Stack.Screen name="TestScreen" component={TestScreen}  options={{headerShown:true}}/>
        <Stack.Screen name="UpdateStudentProfile" component={UpdateStudentProfile}  options={{headerShown:true}}/>
        <Stack.Screen name="ChatScreenforStudents" component={ChatScreenforStudents} options={{headerShown:true}}/>
        <Stack.Screen name="Guidelines" component={Guidelines} options={{headerShown:true}}/>
        <Stack.Screen name="AddSchedule" component={AddScheduleforTeacher} options={{headerShown:false}}/>
        <Stack.Screen name="GuidelinesforStudent" component={GuidelinesforStudent} options={{headerShown:true}}/>
        <Stack.Screen name="HelpForStudent"
         component={HelpForStudent}
          options={{
            headerShown:true,
          title: 'Help',
          headerStyle: {
            backgroundColor: '#AD40AF',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} />
        <Stack.Screen name="HelpForTeacher"
         component={HelpForTeacher}
          options={{
            headerShown:true,
          title: 'Help',
          headerStyle: {
            backgroundColor: '#AD40AF',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} />
        <Stack.Screen name="ContactUsForStudent" component={ContactUSForStudent} options={{
            headerShown:true,
          title: 'Contact us',
          headerStyle: {
            backgroundColor: '#AD40AF',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} />
        <Stack.Screen name="Profileforstudent" component={ProfileforStudent} options={{headerShown:true}}/>
        <Stack.Screen name="ProfileforTeacher" component={ProfileforTeacher} options={{headerShown:true}}/>
        <Stack.Screen name="HomeforStudentBottom" component={BottomTabNavigator} options={{headerShown:false}} />
        <Stack.Screen name="BottomTabNavigationforteacher" component={BottomTabNavigationforteacher} options={{headerShown:false}} />
        <Stack.Screen name="GardianRegistration" component={GardianRegistration} options={{headerShown:true}} />
        <Stack.Screen name="Teacherform" component={Form} options={{headerShown:true}} />
        <Stack.Screen name="StudentEditProfile" component={EditProfileScreenForStudent} options={{headerShown:true}} />
        <Stack.Screen name="EditProfileScreenForTeacher" component={EditProfileScreenForTeacher} options={{headerShown:true}} />
        <Stack.Screen name="ConnectToStudents" component={ConnectToStudents} options={{headerShown:true}} />
        <Stack.Screen name="ConnectToTeachers" component={ConnectToTeachers} options={{headerShown:true}} />
        <Stack.Screen name="HomeforTeacher" component={HomeForTeacher} />
        <Stack.Screen name="DetailforNotes" component={DetailForNotes}options={{headerShown:true , title:"Edit Note"}} />
      </Stack.Navigator>
    </NavigationContainer>
    )
}


export default Navigation ;