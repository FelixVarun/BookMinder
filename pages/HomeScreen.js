<<<<<<< HEAD
import { StyleSheet, Text, View, Pressable, TouchableOpacity, ScrollView, FlatList } from 'react-native'
import React, { useLayoutEffect, useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import ReadingCardList from '../components/ReadingCardlist';
import { auth, db } from '../firebase-config';
import { doc, getDoc } from 'firebase/firestore';
=======
import { StyleSheet, Text, View, Pressable,TouchableOpacity,ScrollView,FlatList} from 'react-native'
import React, { useLayoutEffect,useState,useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';    
import ReadingCard from '../components/ReadingCard';
import {db,auth} from '../firebase-config'; // Check the import statement here
import { collection, getDocs, query, where } from 'firebase/firestore';
import ReadingCardList from '../components/ReadingCardlist';
>>>>>>> e1005bcffff272dc4dc3708e7c07b5328847cd4e


const HomeScreen = () => {
  const navigation = useNavigation();
<<<<<<< HEAD
  const [greet, setGreet] = useState('');
  const user = auth.currentUser;
  const [userName, setUserName] = useState('');


  useEffect(() => {
    const fetchDataAndGreetings = async () => {
        try {
            // Fetch the user's name
            const user = auth.currentUser;
            if (user) {
                const userId = user.uid;
                const userDocRef = doc(db, 'users', userId);
                const userDocSnapshot = await getDoc(userDocRef);

                if (userDocSnapshot.exists()) {
                    const userData = userDocSnapshot.data();
                    if (userData && userData.name) {
                        setUserName(userData.name);
                    }
                }
            }

            // Call the findGreetings function
            findGreetings();
        } catch (error) {
            console.error('Error fetching user name:', error);
        }
    };

    fetchDataAndGreetings();
}, []);


const findGreetings = () => {
  const hrs = new Date().getHours();
  if (hrs >= 0 && hrs < 12) {
      setGreet('Morning');
  } else if (hrs >= 12 && hrs < 17) {
      setGreet('Afternoon');
  } else {
      setGreet('Evening');
  }
};



=======
 
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
  
>>>>>>> e1005bcffff272dc4dc3708e7c07b5328847cd4e
  const handleAddNewClick = () => {
    navigation.navigate('AddNew');
  };
  const handleCardPress = (book) => {
    navigation.navigate('Details', { book });
  };

  return (
    <SafeAreaView style={{ backgroundColor: '#DBF3FA', flex: 1 }}>
<<<<<<< HEAD
      <View style={{ flexDirection: "row", justifyContent: "space-between", marginVertical: 20,marginHorizontal:20}}>
        <View style={{ flexDirection: "row"}}>
              <Text style={{ fontSize: 17, fontWeight: "bold",color:"#3494E6" }}>{`Good ${greet}`}</Text>
              <Text style={{ fontSize: 17, fontWeight: "bold",color:"#EC6EAD" }}> {userName || 'User'}</Text>
              </View>
               <Ionicons name="notifications-sharp" size={24} color="black" style={{ marginLeft: 10 }} />

        {/* <Ionicons name="search-sharp" size={24} color="black" style={{ marginRight: 15 }} /> */}
      </View>

      <ReadingCardList onCardPress={handleCardPress} />
=======
      <ReadingCardList onCardPress={handleCardPress}/>
>>>>>>> e1005bcffff272dc4dc3708e7c07b5328847cd4e
      <TouchableOpacity
        onPress={handleAddNewClick}
        style={styles.addButton}
      >
        <Text style={styles.addButtonLabel}>Add New Book</Text>
      </TouchableOpacity>
<<<<<<< HEAD

=======
    
>>>>>>> e1005bcffff272dc4dc3708e7c07b5328847cd4e
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
<<<<<<< HEAD

=======
  
>>>>>>> e1005bcffff272dc4dc3708e7c07b5328847cd4e
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