import React from 'react';
import { ScrollView } from 'react-native';
import { View, Text, StyleSheet } from 'react-native';

const NoteCard = ({ note}) => {

  return (

    <ScrollView style={styles.card}>
      <Text style={styles.title}>{note.title}</Text>
      <Text style={styles.notes}>{note.notes}</Text>
    </ScrollView>
    
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor:"#000000",
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "transparent",
    
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 5,
    color:"#E38035"
  },
  notes: {
    fontSize: 16,
    color:"#FFFFFF"
  },
});

export default NoteCard;