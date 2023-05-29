import React from 'react';
import { StyleSheet, View, Text,ScrollView } from 'react-native';

const Guidelines = () => {
  return (
    <ScrollView > 
    <View style={styles.container}>
      <Text style={styles.header}>Guidelines for Teachers</Text>
      <View style={styles.guideline}>
        <Text style={styles.title}>Communicate with the student and their parents/guardians:</Text>
        <Text style={styles.description}>Before starting tutoring sessions with a disabled or special individual student, it's important to communicate with the student and their parents/guardians. This will help you understand the student's needs, strengths, weaknesses, and preferences. It will also help you establish a positive relationship with the student and their parents/guardians.</Text>
      </View>
      <View style={styles.guideline}>
        <Text style={styles.title}>Make adjustments to the learning environment:</Text>
        <Text style={styles.description}>Ensure that the learning environment is accessible and accommodating for the disabled or special individual student. This could include providing assistive technology, adjusting the seating arrangement, providing additional lighting, or any other modifications that may be required.</Text>
      </View>
      <View style={styles.guideline}>
        <Text style={styles.title}>Use inclusive language:</Text>
        <Text style={styles.description}>Use language that is inclusive and respectful of the student's disability or special needs. Avoid making assumptions about what the student can or cannot do and use language that does not stigmatize or label the student.</Text>
      </View>
      <View style={styles.guideline}>
        <Text style={styles.title}>Adapt your teaching style:</Text>
        <Text style={styles.description}>Adapt your teaching style to suit the student's learning needs. This could include using visual aids, breaking down complex concepts into smaller parts, or using different teaching methods that suit the student's learning style.</Text>
      </View>
      <View style={styles.guideline}>
        <Text style={styles.title}>Be patient and flexible:</Text>
        <Text style={styles.description}>Be patient and flexible with the disabled or special individual student. Allow for breaks, rest periods, or any other accommodations that the student may require. It's important to remember that each student is unique and may require different levels of support.</Text>
      </View>
      <View style={styles.guideline}>
        <Text style={styles.title}>Focus on strengths:</Text>
        <Text style={styles.description}>Focus on the student's strengths and build on them. Encourage the student to use their strengths to overcome any challenges they may face. Celebrate their achievements, no matter how small they may be.</Text>
      </View>
      <View style={styles.guideline}>
        <Text style={styles.title}>Seek support:</Text>
        <Text style={styles.description}>Seek support from other teachers, school administrators, or outside resources if needed. Don't be afraid to ask for help if you feel overwhelmed or unsure about how to support the student.</Text>
      </View>
      <View style={styles.guideline}>
        <Text style={styles.title}>permission from guardians/student:</Text>
        <Text style={styles.description}>It is not permissible for anyone other than the student/guardians to accompany the teacher..</Text>
      </View>
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

export default Guidelines;