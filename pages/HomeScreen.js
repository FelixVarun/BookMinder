import { StyleSheet, Text, View, Pressable,TouchableOpacity,ScrollView,FlatList} from 'react-native'
import React, { useLayoutEffect,useState,useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';    
import ReadingCard from '../components/ReadingCard';
import {db,auth} from '../firebase-config'; // Check the import statement here
import { collection, getDocs, query, where } from 'firebase/firestore';
import ReadingCardList from '../components/ReadingCardlist';


const HomeScreen = () => {
  const navigation = useNavigation();
 
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "Home",
      headerTitleStyle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "black",
      },

      headerStyle: {
        backgroundColor: "#DBF3FA",
        height: 110,
        borderBottomColor: "transparent",
        shadowColor: "transparent",

      },
      headerLeft: () => (
        <Ionicons
          name="notifications-sharp"
          size={24}
          color="black"
          style={{ marginLeft: 15 }}
        />
      ),
      headerRight: () => (
        <Ionicons
          name="search-sharp"
          size={24}
          color="black"
          style={{ marginRight: 15 }}
        />
      ),

    })

  }, [])
  
  const handleAddNewClick = () => {
    navigation.navigate('AddNew');
  };
  const handleCardPress = (book) => {
    navigation.navigate('Details', { book });
  };

  return (
    <SafeAreaView style={{ backgroundColor: '#DBF3FA', flex: 1 }}>
      <ReadingCardList onCardPress={handleCardPress}/>
      <TouchableOpacity
        onPress={handleAddNewClick}
        style={styles.addButton}
      >
        <Text style={styles.addButtonLabel}>Add New Book</Text>
      </TouchableOpacity>
    
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 140,
    height: 60,
    borderRadius: 20,
    justifyContent: 'center',
    backgroundColor: '#7D3C98',
    alignItems: 'center',
  },
  addButtonLabel: {
    color: '#DBF3FA',
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 18,
    marginTop: 20,
  },
});

export default HomeScreen;