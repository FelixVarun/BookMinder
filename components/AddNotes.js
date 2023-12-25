import { StyleSheet, Text, View, Modal, TextInput, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Keyboard } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { auth, db } from '../firebase-config';
import { addDoc, collection } from 'firebase/firestore';


const AddNotes = ({ visible, onClose, onSubmit }) => {

  const close = () => {
    Keyboard.dismiss()
  }

  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState('');

  const handleOnChangeText = (text, valueFor) => {
    if (valueFor === 'title') {
      setTitle(text)
    }
    if (valueFor === 'notes') {
      setNotes(text)
    }

  }

  const closeModal = () => {
    setTitle('')
    setNotes('')
    onClose();

  }

  const handleSubmit = async () => {
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

closeModal();

      } 
    }catch (error) {
      console.error('Error adding document: ', error);
    }
    
  }


  return (
    <SafeAreaView>
      <Modal visible={visible} animationType='fade'>
        <View style={styles.container}>
          <TextInput
            value={title}
            onChangeText={(text) => handleOnChangeText(text, 'title')}
            placeholder='Notes title'
            style={[styles.title, styles.input]} />

          <TextInput
            value={notes}
            onChangeText={(text) => handleOnChangeText(text, 'notes')}
            multiline
            placeholder='Notes'
            style={[styles.input, styles.notes]} />

          <View style={{ flexDirection: "row", justifyContent: "space-evenly", marginTop: 60, }}>
            <TouchableOpacity style={styles.btn1} onPress={handleSubmit}>
              <Text style={{ fontSize: 23, color: "white", fontWeight: "500", paddingHorizontal: 17, paddingVertical: 7 }}>Save</Text>
              <AntDesign name="check" size={26} color="white" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.btn2} onPress={closeModal}>
              <Text style={{ fontSize: 23, color: "white", fontWeight: "500", paddingHorizontal: 15 }}>Cancel</Text>
              <AntDesign name="close" size={26} color="white" />
            </TouchableOpacity>

          </View>

        </View>
        <TouchableWithoutFeedback onPress={close}>
          <View style={[styles.bg, StyleSheet.absoluteFillObject]} />
        </TouchableWithoutFeedback>
      </Modal>

    </SafeAreaView>
  )
}

export default AddNotes


const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    marginTop: 10
  },
  input: {
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#7D3C98"

  },
  title: {
    height: 60,
    marginBottom: 15,
    fontWeight: "bold"
  },
  notes: {
    height: 120,
    marginBottom: 10

  },
  bg: {
    flex: 1,
    zIndex: -1
  },
  btn1: {
    flexDirection: "row",
    backgroundColor: "#335c67",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 25
  },
  btn2: {
    flexDirection: "row",
    backgroundColor: "#ff4d6d",
    alignItems: "center",
    justifyContent: "center",
    padding: 7,
    borderRadius: 25
  }
})