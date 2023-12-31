
import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';



const ReadingCard = ({ book, onPress }) => {

  const navigation = useNavigation();


  return (

    <TouchableOpacity style={styles.container} onPress={onPress}>

      <Image source={{ uri: book.ImageUrl }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{book.Bookname}</Text>
        <Text style={styles.content}>{book.Pages} pages</Text>
        <Text style={styles.content}>{book.Authorname}</Text>
      </View>

    </TouchableOpacity>


  );
};

export default ReadingCard

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: "white",
    padding: 20,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 3,
    margin: 25,

  },
  image: {
    width: 80,
    height: 100,
    borderRadius: 4,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,

  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,

  },
  content: {
    fontSize: 16,
  },
});