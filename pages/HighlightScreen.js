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


import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { db } from '../firebase-config'; // Import your Firebase config

const HighlightScreen = ({ route }) => {
  const { book } = route.params;
  const [bookDetails, setBookDetails] = useState(null);

  useEffect(() => {
    // Fetch book details from Firestore based on the given bookId
    const fetchBookDetails = async () => {
      try {
        const docRef = await db.collection('books').doc(bookId).get();
        if (docRef.exists) {
          setBookDetails(docRef.data());
        }
      } catch (error) {
        console.error('Error fetching book details: ', error);
      }
    };

    fetchBookDetails();
  }, [bookId]);

  if (!bookDetails) {
    return null; // You can render a loading indicator here
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Book Name: {book.Bookname}</Text>
      <Text style={styles.text}>Author: {book.Authorname}</Text>
      <Text style={styles.text}>Pages: {book.Pages}</Text>
      {book.ImageUrl && (
        <Image source={{ uri: book.ImageUrl }} style={styles.image} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  text: {
    fontSize: 20,
    marginBottom: 10,
  },
  image: {
    width: 130,
    height: 170,
    borderRadius: 15,
    marginTop: 10,
  },
});

export default HighlightScreen


