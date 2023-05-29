import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import FingerprintScanner from 'react-native-fingerprint-scanner';
import firebase from 'firebase/app';
import 'firebase/auth';

const AttendanceScreen = ({ teacher }) => {



  const [attending, setAttending] = useState(false);

  const handleAttendanceTaking = () => {
    // Get the current date and time
    const currentDate = new Date();
    const startTime = currentDate.getTime();

    // Send a request to the Django API endpoint to take attendance
    fetch('https://your-django-api-endpoint-url.com/take-attendance', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        teacher: teacher,
        startTime: startTime
      })
    })
    .then(response => response.json())
    .then(data => {
      // Provide feedback to the student on the attendance status
      if (data.success) {
        alert('Attendance taken successfully!');
        setAttending(true);
      } else {
        alert('Error taking attendance. Please try again.');
      }
    })
    .catch(error => {
      console.log(error);
      alert('Error taking attendance. Please try again.');
    })
    .finally(() => {
      // Get the current date and time again
      const currentDate = new Date();
      const endTime = currentDate.getTime();

      // Send a request to update the attendance with the end time
      fetch('https://your-django-api-endpoint-url.com/update-attendance', {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          teacher: teacher,
          startTime: startTime,
          endTime: endTime
        })
      })
      .then(response => response.json())
      .then(data => {
        // Provide feedback to the student on the attendance status
        if (data.success) {
          alert('Attendance updated successfully!');
        } else {
          alert('Error updating attendance. Please try again.');
        }
      })
      .catch(error => {
        console.log(error);
        alert('Error updating attendance. Please try again.');
      })
    });
  }

  const handleFingerprintAuthentication = async () => {
    try {
      // Use the react-native-fingerprint-scanner library to authenticate the user's fingerprint
      const result = await FingerprintScanner.authenticate({ description: 'Scan your fingerprint to take attendance.' });

      // Authenticate the user using Firebase Authentication
      const userCredential = await firebase.auth().signInAnonymously();
      const uid = userCredential.user.uid;

      // Send the UID and attendance data to the Django server
      fetch('https://your-django-api-endpoint-url.com/take-attendance-with-uid', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          teacher: teacher,
          uid: uid,
          startTime: Date.now()
        })
      })
      .then(response => response.json())
      .then(data => {
        // Provide feedback to the student on the attendance status
        if (data.success) {
          alert('Attendance taken successfully!');
          setAttending(true);
        } else {
          alert('Error taking attendance. Please try again.');
        }
      })
      .catch(error => {
        console.log(error);
        alert('Error taking attendance. Please try again.');
    })
    .finally(() => {
      // Get the current date and time again
      const currentDate = new Date();
      const endTime = currentDate.getTime();

      // Send a request to update the attendance with the end time
      fetch('https://your-django-api-endpoint-url.com/update-attendance', {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          teacher: teacher,
          startTime: startTime,
          endTime: endTime
        })
      })
      .then(response => response.json())
      .then(data => {
        // Provide feedback to the student on the attendance status
        if (data.success) {
          alert('Attendance updated successfully!');
        } else {
          alert('Error updating attendance. Please try again.');
        }
      })
      .catch(error => {
        console.log(error);
        alert('Error updating attendance. Please try again.');
      })
     } );
    
  
  


  
    }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Attendance Screen</Text>
      <TextInput style={styles.input} placeholder="Enter your name" />
      <TouchableOpacity
        style={styles.button}
        onPress={handleFingerprintAuthentication}
        disabled={attending}>
        <Text style={styles.buttonText}>
          {attending ? 'Attending' : 'Take Attendance'}
        </Text>
      </TouchableOpacity>
    </View>
    
    
  );


}

  
  
    
export default AttendanceScreen;
