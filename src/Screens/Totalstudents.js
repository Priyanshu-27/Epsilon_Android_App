import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity,ImageBackground,ScrollView } from 'react-native';
 
import BottomNavigation from '../components/BottomNavigation';

const days = ['Mon', 'Tue', 'Wed', 'Thur', 'Fri'];

const Totalstudents = () => {
  const [students, setStudents] = useState([
    { name: 'Mohit', attendance: [] },
    { name: 'Arpit', attendance: [] },
    { name: 'Kartik', attendance: [] },
    { name: 'Sanjay', attendance: [] },
  ]);

  const [currentDay, setCurrentDay] = useState(0);

  const toggleAttendance = (studentIndex, attendanceType) => {
    const newStudents = [...students];
    newStudents[studentIndex].attendance[currentDay] = attendanceType;
    setStudents(newStudents);
  };

  const sendAttendance = () => {
    console.log('Attendance sent:', students);
  };

  

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../assets/join.png')} resizeMode="cover" style={styles.image}> 
      <View style={styles.header}>
        <Text style={styles.headerText}>Attendance Ragistered Students</Text>
         
      </View>
      <View style={styles.content}>
        <View style={styles.dayPicker}>
          {days.map((day, index) => (
            <TouchableOpacity
              key={day}
              style={[
                styles.dayButton,
                index === currentDay && styles.currentDayButton,
              ]}
              onPress={() => setCurrentDay(index)}
            >
              <Text style={styles.dayButtonText}>{day}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.attendanceList}>
          {students.map((student, index) => (
            <View key={student.name} style={styles.attendanceListItem}>
              <Text style={styles.studentName}>{student.name}</Text>
              <View styles={styles.spacecontainer}>
                <Text> - </Text>
              </View>
              <View style={{alignSelf:'center',marginLeft:10}}> 
              <View style={styles.attendanceButtons}>
                <TouchableOpacity
                  style={[
                    styles.attendanceButton,
                    student.attendance[currentDay] === 'present' &&
                      styles.presentButton,
                  ]}
                  onPress={() => toggleAttendance(index, 'present')}
                >
                  <Text style={styles.attendanceButtonText}>Present</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.attendanceButton,
                    student.attendance[currentDay] === 'absent' &&
                      styles.absentButton,
                  ]}
                  onPress={() => toggleAttendance(index, 'absent')}
                >
                  <Text style={styles.attendanceButtonText}>Absent</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.attendanceButton,
                    student.attendance[currentDay] === 'empty' &&
                      styles.emptyButton,
                  ]}
                  onPress={() => toggleAttendance(index, 'empty')}
                >
                  <Text style={styles.attendanceButtonText}>Empty</Text>
                </TouchableOpacity>
              </View>
              </View>
            </View>
          ))}
          <TouchableOpacity style={styles.sendButton} onPress={sendAttendance}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
        </View>
         
      </View >
      <View style={{backgroundColor:'white'}}>
          <BottomNavigation />
         </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginVertical:30,
  

},
headerText: {
fontSize: 25,
fontWeight: 'bold',
alignSelf:'center',
justifyContent: 'center',
marginLeft:30,
},
sendButton: {
backgroundColor: '#f78da7',
paddingHorizontal: 16,
paddingVertical: 8,
borderRadius: 4,
},
sendButtonText: {
color: '#fff',
fontWeight: 'bold',
alignSelf: 'center',
justifyContent: 'center'
},
content: {
flex: 1,
paddingHorizontal: 16,
paddingTop: 16,
},
dayPicker: {
flexDirection: 'row',
justifyContent: 'space-between',
marginBottom: 16,
},
dayButton: {
backgroundColor: '#eee',
padding: 8,
borderRadius: 4,
width: 64,
alignItems: 'center',
},
currentDayButton: {
backgroundColor: '#00A7FF',
},
dayButtonText: {
fontWeight: 'bold',
},
attendanceList: {
flex: 1,
},
attendanceListItem: {
flexDirection: 'row',
alignItems: 'center',
marginBottom: 16,
},
studentName: {
fontWeight: 'bold',
marginRight: 16,
},
attendanceButtons: {
flexDirection: 'row',
alignContent: 'center'
},
attendanceButton: {
backgroundColor: '#eee',
padding: 8,
borderRadius: 4,
marginHorizontal: 8,
alignItems: 'center',
width: 80,
alignSelf:'auto',
},
presentButton: {
backgroundColor: '#4CAF50',
},
absentButton: {
backgroundColor: '#F44336',
},
emptyButton: {
backgroundColor: '#9E9E9E',
},
attendanceButtonText: {
fontWeight: 'bold',
},
image: {
  flex: 1,
  justifyContent: 'center',
},
spacecontainer:{
  flexDirection: 'column',
  height:100,
  width:50
}
 
 
});

export default Totalstudents;