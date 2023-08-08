import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db, auth } from '../firebase-config';
import ReadingCard from './ReadingCard';

const ReadingCardList =({ onCardPress })=> {
    const [books, setBooks] = useState([]);
    const [userEmail, setUserEmail] = useState('');

  
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
    
              const bookData = [];
              querySnapshot.forEach((doc) => {
                bookData.push({ id: doc.id, ...doc.data() });
              });
    
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