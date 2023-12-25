import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import NoteCard from './NoteCard'
import { useState } from 'react'
import { useEffect } from 'react'
import { collection, query, where, getDocs,onSnapshot  } from 'firebase/firestore';
import { db, auth } from '../firebase-config';
import { FlatList } from 'react-native'

const NoteCardList = () => {
    const [notes,setNotes]=useState([]);
    const [userEmail, setUserEmail] = useState('');


    useEffect(() => {
        const fetchBooks = async () => {
          try {
            const user = auth.currentUser;
            if (user) {
              // Get the logged-in user's email
              setUserEmail(user.email);
    
              // Query to fetch data for the logged-in user only
              const q = query(collection(db, 'notes'), where('userId', '==', user.email));
              
              // Set up a real-time snapshot listener
              const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const bookData = [];
                querySnapshot.forEach((doc) => {
                  bookData.push({ id: doc.id, ...doc.data() });
                });
                setNotes(bookData);
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
      data={notes}
      renderItem={({ item }) => <NoteCard note={item}/>}
      keyExtractor={(item) => item.id}
    />
  </View>
  )
}

export default NoteCardList

const styles = StyleSheet.create({})