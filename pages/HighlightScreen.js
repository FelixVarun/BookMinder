<<<<<<< HEAD
import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AntDesign } from '@expo/vector-icons';
import AddNotes from '../components/AddNotes';
import { db } from '../firebase-config';
import NoteCard from '../components/NoteCard';
import NoteCardList from '../components/NoteCardList';

const HighlightScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  
  const handleOnSubmit=(title,notes)=>{
console.log(title,notes)
  }
 

  return (
    <SafeAreaView style={{ paddingHorizontal: 20, flex: 1, backgroundColor:"#363841" }}>
      <Text style={styles.search} >My Notes...</Text>

      <View style={[StyleSheet.absoluteFillObject, styles.midcontainer]}>
       
        <AntDesign
          onPress={() => setModalVisible(true)}
          name="pluscircle"
          size={45}
          color="#FFFFFF"
          style={styles.btn}
        />
      </View>
      <NoteCardList/>
      <AddNotes
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleOnSubmit}
      />
      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  search: {
  
    color:"#FFFFFF",
    fontSize: 25,
    padding: 5,
    fontWeight:"500",
    marginVertical: 7,
    marginBottom:20
  },
  midcontainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: -1,
  },
  mid: {
    fontSize: 30,
    fontWeight: 'bold',
    opacity: 0.5,
  },
  btn: {
    position: 'absolute',
    right: 30,
    bottom: 30,
  },
});
export default HighlightScreen
=======
// import React, { useState } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';
// import {storage} from '../firebase-config'; 
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

// const HighlightScreen = () => {
//   const [image, setImage] = useState(null);
//   const [uploading, setUploading] = useState(false);

// async function pickImage() {
//   let result = await ImagePicker.launchImageLibraryAsync({
//     mediaTypes: ImagePicker.MediaTypeOptions.Images,
//     allowsEditing: true,
//     aspect: [3, 4],
//     quality: 1,
//   });
 
//   if (!result.canceled) {
//       const uploadURL = await uploadImage(result.assets[0].uri);
//       setImage(uploadURL)
//     setInterval(()=>{
//       setUploading(false);
//     },2000);
//     } else {
//       setImage(null);
//       setInterval(()=>{
//         setUploading(false);
//       },2000)
//   }
// }

//   const uploadImage = async (uri) => {
//     const blob = await new Promise((resolve, reject) => {
//       const xhr = new XMLHttpRequest();
//       xhr.onload = function () {
//         resolve(xhr.response);
//       };
//       xhr.onerror = function (e) {
//         console.log(e);
//         reject(new TypeError("Network request failed"));
//       };
//       xhr.responseType = "blob";
//       xhr.open("GET", uri, true);
//       xhr.send(null);
//     });

//     try {
//       const storageRef = ref(storage, `Images/image-${Date.now()}`);
//       const result = await uploadBytes(storageRef, blob);
//       blob.close();
//       return await getDownloadURL(storageRef);
//     } catch (error) {
//       alert(`Error: ${error}`);
//     }
//   };

//   return ( 
//     <SafeAreaView style={styles.container}>
//       <TouchableOpacity style={styles.selectButton} onPress={pickImage}>
//         <Text style={styles.buttonText}>Pick an image</Text>
//       </TouchableOpacity>
//       <View style={styles.imageContainer}>
//         {image && <Image source={{ uri: image }} style={{ width: 300, height: 300 }} />}
//       </View>
//     </SafeAreaView>
//   );
// };



// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     backgroundColor: '#000',
//     justifyContent: 'center'
//   },
//   selectButton: {
//     borderRadius: 5,
//     width: 150,
//     height: 50,
//     backgroundColor: 'blue',
//     alignItems: 'center',
//     justifyContent: 'center'
//   },
//   uploadButton: {
//     borderRadius: 5,
//     width: 150,
//     height: 50,
//     backgroundColor: 'red',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginTop: 20
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 18,
//     fontWeight: 'bold'
//   },
//   imageContainer: {
//     marginTop: 30,
//     marginBottom: 50,
//     alignItems: 'center'
//   },
// });

// export default HighlightScreen;
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase-config'; // Assuming you have the Firestore config imported

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];


const HighlightScreen = () => {
  const [selectedDays, setSelectedDays] = useState([]);
  const [selectedTime, setSelectedTime] = useState('');
  const [scheduleSaved, setScheduleSaved] = useState(false);

  const toggleDay = (day) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter(d => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  const handleSaveSchedule = async () => {
    if (selectedDays.length === 0 || !selectedTime) {
      // Handle error, show a message or alert
      return;
    }

    try {
      await addDoc(collection(db, 'schedules'), {
        days: selectedDays,
        time: selectedTime,
      });
      setScheduleSaved(true);
    } catch (error) {
      console.error('Error adding schedule: ', error);
    }
  };

  return (
    <View>
      <Text>Select Days:</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        {daysOfWeek.map(day => (
          <TouchableOpacity
            key={day}
            onPress={() => toggleDay(day)}
            style={{
              backgroundColor: selectedDays.includes(day) ? 'green' : 'lightgray',
              padding: 10,
              borderRadius: 5,
            }}
          >
            <Text>{day}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text>Select Time:</Text>
      <TextInput
        value={selectedTime}
        onChangeText={text => setSelectedTime(text)}
        placeholder="Select time"
      />

      <TouchableOpacity onPress={handleSaveSchedule}>
        <Text>Save Schedule</Text>
      </TouchableOpacity>

      {scheduleSaved && (
        <View>
          <Text>Schedule Saved!</Text>
          <Text>Selected Days: {selectedDays.join(', ')}</Text>
          <Text>Selected Time: {selectedTime}</Text>
        </View>
      )}
    </View>
  );
};
export default HighlightScreen


>>>>>>> e1005bcffff272dc4dc3708e7c07b5328847cd4e
