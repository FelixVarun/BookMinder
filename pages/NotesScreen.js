import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, TextInput, ScrollView, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { auth, db } from '../firebase-config';
import { addDoc, collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { useEffect } from 'react';

const NotesScreen = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [notesList, setNotesList] = useState([]);
  const [notes, setNotes] = useState('');
  const [title, setTitle] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [showOptionsIndex, setShowOptionsIndex] = useState(null);

  // const handleSaveNotes = () => {

  //   const newNote = { title, notes };
  //   if (editingIndex !== null) {
  //     const updatedNotesList = [...notesList];
  //     updatedNotesList[editingIndex] = newNote;
  //     setNotesList(updatedNotesList);
  //   } else {
  //     setNotesList([...notesList, newNote]);
  //   }
  //   setTitle('');
  //   setNotes('');
  //   setModalVisible(false);
  //   setEditingIndex(null);
  // };
  const fetchNotesFromFirestore = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const notesRef = collection(db, 'notes');
        const querySnapshot = await getDocs(notesRef);
        const notesData = [];

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (data.userId === user.email) {
            notesData.push({
              id: doc.id,
              title: data.title,
              notes: data.notes,
            });
          }
        });

        setNotesList(notesData);
      }
    } catch (error) {
      console.error('Error fetching notes: ', error);
    }
  };

  useEffect(() => {
    fetchNotesFromFirestore();
  }, []);

  const handleSaveNotes = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        // Combine details from both screens into a single object
        const combinedDetails = {
          title: title,
          notes: notes,
          userId: user.email,
        };
  
        // Create a new Firestore document for the combined details
        const docRef = await addDoc(collection(db, 'notes'), combinedDetails);
  
        console.log('Combined book details added to Firestore successfully');
        setModalVisible(false);
      }
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };
  
  const handleCancelNotes=()=>{
    setModalVisible(false);
  }

  const handleEditNote = (index) => {
    const { title, notes } = notesList[index];
    setTitle(title);
    setNotes(notes);
    setEditingIndex(index);
    setModalVisible(true);
  };

  const handleDeleteNote = (index) => {
    Alert.alert(
      'Delete Note',
      'Are you sure you want to delete this note?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: async () => {
            try {
              const user = auth.currentUser;
              if (user) {
                const noteId = notesList[index].id;
                await deleteDoc(doc(db, 'notes', noteId)); // Use 'doc' instead of 'collection'
                const updatedNotesList = [...notesList];
                updatedNotesList.splice(index, 1);
                setNotesList(updatedNotesList);
              }
            } catch (error) {
              console.error('Error deleting document: ', error);
            }
          },
          style: 'destructive',
        },
      ],
      { cancelable: false }
    );
  };
  
  

  const handleToggleOptions = (index) => {
    if (showOptionsIndex === index) {
      setShowOptionsIndex(null);
    } else {
      setShowOptionsIndex(index);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.notesContainer}>
          {notesList.map((note, index) => (
            <View key={index} style={styles.card}>

              <View style={styles.insidecard}>
              <Text style={styles.cardTitle}>{note.title}</Text>
              {showOptionsIndex === index ? (
                  <View style={styles.optionsContainer}>
                    <TouchableOpacity onPress={() => handleEditNote(index)}>
                      <Text style={styles.editOption}>Edit</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => handleDeleteNote(index)}>
                      <Text style={styles.deleteOption}>Delete</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <TouchableOpacity
                    style={styles.optionsIconContainer}
                    onPress={() => handleToggleOptions(index)}
                  >
                    <SimpleLineIcons name="options-vertical" size={19} color="white" />
                  </TouchableOpacity>
                )}
                     </View>

              
                <View style={{ width: "100%" }}>
                  <Text style={styles.cardNotes}>{note.notes}</Text>
                </View>
                
         
            </View>
          ))}
        </View>
        <Modal visible={isModalVisible} transparent={true} animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TextInput
                placeholder="Enter the title"
                style={styles.input}
                value={title}
                onChangeText={(text) => setTitle(text)}
              />
              <TextInput
                style={styles.input}
                placeholder="Enter notes"
                multiline
                value={notes}
                onChangeText={(text) => setNotes(text)}
              />
              <View style={styles.btnContainer}>
                <TouchableOpacity onPress={handleSaveNotes}>
                  <Text style={styles.saveButton1}>{editingIndex !== null ? 'Update' : 'Save'}</Text>
                </TouchableOpacity >
                <TouchableOpacity onPress={handleCancelNotes}>
                  <Text style={styles.saveButton2}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
      <View style={styles.addButtonContainer}>
        <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>

          <AntDesign

            name="pluscircle"
            size={45}
            color="#FFFFFF"

          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor:"#363841" 
  },
  addButtonContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    padding: 10,
  },
  notesContainer: {

  },
  card: {
    backgroundColor: '#000000',
    borderTopLeftRadius: 30,
    borderBottomRightRadius: 30,
    borderRadius: 5,
    padding: 16,
    marginBottom: 20,
    width: "100%"
  },
  insidecard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
   

  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    marginLeft: 10,
    color: "#E38035"

  },
  cardNotes: {
    fontSize: 16,
    color: "#FFFFFF"
  },
  optionsContainer: {
    marginLeft: 4,
    alignItems: "center",


  },
  optionsIconContainer: {
    padding: 2,
    alignItems: 'flex-end',

  },
  editOption: {
    color: 'blue',

  },
  deleteOption: {
    color: 'red',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    width: '80%',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 20,
    marginBottom: 16,
    fontSize: 18,
  },
  btnContainer: {
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center",
    justifyContent: "space-evenly"
  },
  saveButton1: {
    backgroundColor: '#5D4157',
    color: 'white',
    textAlign: 'center',
    padding: 14,
    borderRadius: 4,
    fontSize: 18,
    width: 100,
    height: 50
  },
  saveButton2: {
    backgroundColor: '#5D4157',
    color: 'white',
    textAlign: 'center',
    padding: 14,
    borderRadius: 4,
    fontSize: 18,
    
    width: 100,
    height: 50
  },
});

export default NotesScreen;
