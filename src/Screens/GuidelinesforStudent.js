import React from 'react';
import { StyleSheet, View, Text,ScrollView } from 'react-native';

const GuidelinesforStudent = () => {
  return (
    <ScrollView > 
    <View style={styles.container}>
      <Text style={styles.header}>Guidelines for students</Text>
      <View style={styles.guideline}>
        <Text style={styles.title}>About monthly tests</Text>
        <Text style={styles.description}>Monthly tests and model examinations are part of curriculum and student should besincere in taking these tests. They should not indulge in any kind of malpractice duringexaminations or tests.</Text>
      </View>
      <View style={styles.guideline}>
        <Text style={styles.title}>permission from teacher:</Text>
        <Text style={styles.description}>If student wants to end the class midway for urgent reasons. It shall be done only with the explicit permission teacher.</Text>
      </View>
      <View style={styles.guideline}>
        <Text style={styles.title}>About accompanning student :</Text>
        <Text style={styles.description}>Guardians are allowed to sit in on the class so that the student feels safe, but they should not interfere with the class.</Text>
      </View>
      <View style={styles.guideline}>
        <Text style={styles.title}>revisions:</Text>
        <Text style={styles.description}>Ensure implementing curricular adaptations prescribed by this teacher to the students .</Text>
      </View>
      <View style={styles.guideline}>
        <Text style={styles.title}> general instructions:</Text>
        <Text style={styles.description}>Students are required to keep safe custody of their valuables. They should maintain decency and decorum during.All expressions or activities which are immoral, antisocial, communal are strictly prohibited</Text>
      </View>
      <View style={styles.guideline}>
        <Text style={styles.title}> learning environment:</Text>
        <Text style={styles.description}>Ensure that the learning environment is accessible and accommodating for the teacger.</Text>
      </View>
      <View style={styles.guideline}>
        <Text style={styles.title}>About absence:</Text>
        <Text style={styles.description}>In the event that a student or guardian needs to absent themselves from class, they should inform the teacher beforehand..</Text>
      </View>
      <Text style={styles.title}>Specifying disability:</Text>
        <Text style={styles.description}>The search outcome is improved if the student or guardian specifies the disability in the profile.</Text>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F6F6F6',
},
header: {
fontSize: 24,
fontWeight: 'bold',
marginBottom: 20,
},
guideline: {
marginBottom: 20,
},
title: {
fontSize: 18,
fontWeight: 'bold',
marginBottom: 10,
},
description: {
fontSize: 16,
},
});

export default GuidelinesforStudent;