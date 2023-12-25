import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
<<<<<<< HEAD
import { collection, query, where, getDocs,onSnapshot  } from 'firebase/firestore';
import { db, auth } from '../firebase-config';
import ReadingCard from './ReadingCard';
import { useNavigation } from '@react-navigation/native';
=======
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db, auth } from '../firebase-config';
import ReadingCard from './ReadingCard';
>>>>>>> e1005bcffff272dc4dc3708e7c07b5328847cd4e

const ReadingCardList =({ onCardPress })=> {
    const [books, setBooks] = useState([]);
    const [userEmail, setUserEmail] = useState('');
<<<<<<< HEAD
    const navigation = useNavigation();

  
    useEffect(() => {
      const fetchBooks = async () => {
        try {
          const user = auth.currentUser;
          if (user) {
            // Get the logged-in user's email
            setUserEmail(user.email);
  
            // Query to fetch data for the logged-in user only
            const q = query(collection(db, 'books'), where('userId', '==', user.email));
            
            // Set up a real-time snapshot listener
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
=======

  
    useEffect(() => {
        const fetchBooks = async () => {
          try {
            const user = auth.currentUser;
            if (user) {
              // Get the logged-in user's email
              setUserEmail(user.email);
    
              // Query to fetch data for the logged-in user only
              const q = query(collection(db, 'books'), where('userId', '==', user.email));
              const querySnapshot = await getDocs(q);
    
>>>>>>> e1005bcffff272dc4dc3708e7c07b5328847cd4e
              const bookData = [];
              querySnapshot.forEach((doc) => {
                bookData.push({ id: doc.id, ...doc.data() });
              });
<<<<<<< HEAD
              setBooks(bookData);
            });
  
            // Clean up the listener when the component unmounts
            return () => unsubscribe();
          }
        } catch (error) {
          console.error('Error fetching books: ', error);
        }
      };
  
      fetchBooks();
    }, []);
    return (
      <View>
        <FlatList
        
          data={books}
          renderItem={({ item }) => <ReadingCard book={item}/>}
=======
    
              setBooks(bookData);
            }
          } catch (error) {
            console.error('Error fetching books: ', error);
          }
        };
    
        fetchBooks();
      }, []);
    return (
      <View>
        <FlatList
          data={books}
          renderItem={({ item }) => <ReadingCard book={item}onPress={() => onCardPress(item)} />}
>>>>>>> e1005bcffff272dc4dc3708e7c07b5328847cd4e
          keyExtractor={(item) => item.id}
        />
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#f0f0f0',
    },
  });
  
  export default ReadingCardList;