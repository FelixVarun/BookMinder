import { Platform, Pressable, StyleSheet, Image, Text, TextInput, TouchableOpacity, View, PermissionsAndroid, ScrollView } from 'react-native'
import React, { useState, useRef, useEffect, useContext } from 'react'
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from "expo-linear-gradient";
import { Modal } from 'react-native';
import { Camera } from 'expo-camera';
import { AntDesign } from '@expo/vector-icons';
import { auth, db, storage } from '../firebase-config';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";



const AddNewForm = ({ navigation }) => {
  const [bookname, setBookname] = useState("");
  const [authorname, setAuthorname] = useState("");
  const [pages, setPages] = useState("");
  //for modal
  const [modalVisible, setModalVisible] = useState(false);
  // for camera
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [capturedImage, setCapturedImage] = useState(null);
  //for storing image
 
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);


  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(status === 'granted');
    })();
  }, []);


  // const handleCameraSelect = async () => {
  //   setModalVisible(false);
  //   const { status } = await Camera.requestCameraPermissionsAsync();
  //   if (status === 'granted') {
  //     const { assets } = await ImagePicker.launchCameraAsync({
  //       mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //       allowsEditing: true,
  //     });
      // if (assets.length > 0) {
      //   try {
      //     const { localUri: uri } = assets[0];
      //     const response = await RNFetchBlob.fetch('PUT', uri, {
      //       'Content-Type': 'application/octet-stream',
      //     });
      //     if (response.info().status === 200) {
      //       const blob = response.blob();
      //       const imageName = uri.substring(uri.lastIndexOf('/') + 1);
      //       const storageRef = ref(storage, `images/${imageName}`);
      //       await put(storageRef, blob);
      //       const downloadURL = await getDownloadURL(storageRef);
      //       setImageUri(downloadURL);
      //     } else {
      //       console.error('Failed to upload image:', response.text());
      //     }
      //   } catch (error) {
      //     console.error('Error uploading image:', error);
      //   }
      // }
  //   }
  // };
  
  // const handleGallerySelect = async () => {
  //   setModalVisible(false);
  //   const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  //   if (status === 'granted') {
  //     const { assets } = await ImagePicker.launchImageLibraryAsync({
  //       mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //       allowsEditing: true,
  //       quality: 1,
  //     });
  
  //     if (assets.length > 0) {
  //       try {
  //         const { localUri: uri } = assets[0];
  //         const response = await RNFetchBlob.fetch('PUT', uri, {
  //           'Content-Type': 'application/octet-stream',
  //         });
  //         if (response.info().status === 200) {
  //           const blob = response.blob();
  //           const imageName = uri.substring(uri.lastIndexOf('/') + 1);
  //           const storageRef = ref(storage, `images/${imageName}`);
  //           await put(storageRef, blob);
  //           const downloadURL = await getDownloadURL(storageRef);
  //           setImageUri(downloadURL);
  //         } else {
  //           console.error('Failed to upload image:', response.text());
  //         }
  //       } catch (error) {
  //         console.error('Error uploading image:', error);
  //       }
  //     }
  //   }
  // };
  async function pickImage() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1,
    });
   
    if (!result.canceled) {
        const uploadURL = await uploadImage(result.assets[0].uri);
        setImage(uploadURL)
      setInterval(()=>{
        setUploading(false);
      },2000);
      } else {
        setImage(null);
        setInterval(()=>{
          setUploading(false);
        },2000)
    }
  }
  
    const uploadImage = async (uri) => {
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          resolve(xhr.response);
        };
        xhr.onerror = function (e) {
          console.log(e);
          reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", uri, true);
        xhr.send(null);
      });
  
      try {
        const storageRef = ref(storage, `Images/image-${Date.now()}`);
        const result = await uploadBytes(storageRef, blob);
        blob.close();
        return await getDownloadURL(storageRef);
      } catch (error) {
        alert(`Error: ${error}`);
      }
    };

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };


  const clearForm = () => {
    setBookname("");
    setAuthorname("");
    setPages("");
    setImage(""); // Clear the image URL when clearing the form
  };
  

  const StartReading = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const docRef = await addDoc(collection(db, 'books'), {
          Authorname: authorname,
          Bookname: bookname,
          Pages: pages,
          ImageUrl: image, // Include the image URL in the Firestore document
          userId: user.email,
        });
        console.log('Book details added to Firestore successfully');
        navigation.navigate("Reminder");
        clearForm(); // Clear the input fields after successful addition
      }
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };


  const handleGoback = () => {
    navigation.goBack();
  }


  return (
    <LinearGradient colors={["#bdc3c7", "#2c3e50"]} style={{ flex: 1 }}>

      <SafeAreaView>
        <ScrollView>
          <Pressable onPress={handleGoback}>
            <AntDesign name="arrowleft" size={24} color="black" style={{ marginTop: 10, marginLeft: 20 }} />
          </Pressable>
          <View style={{ alignItems: "center", marginTop: 20 }}>
            <TouchableOpacity onPress={toggleModal}

              style={{
                alignItems: "center",
                marginTop: 90,
                borderWidth: 2,
                justifyContent: "center",
                width: 130,
                height: 170,
                position: "absolute",
                borderStyle: "dashed",
                padding: 20,
                borderColor: "black",
                borderRadius: 20,
                marginBottom: 20
              }}>
              {image ? (<Image source={{ uri: image }} style={{ width: 130, height: 170, borderRadius: 15 }} />
              
              ) : (
                <Text
                  style={{
                    textAlign: "justify",
                    fontWeight: "300",
                    fontSize: 20
                  }}>
                  Select Book Cover
                  <Ionicons
                    style={{}}
                    name="ios-add-circle-outline"
                    size={24}
                    color="black" />

                </Text>
                )}

            </TouchableOpacity>
            <Modal
              visible={modalVisible}
              transparent
              animationType="fade"
              onRequestClose={toggleModal}
            >
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>

                  <TouchableOpacity>
                    <Text
                      style={{
                        fontSize: 20,
                        marginTop: 10,
                        marginBottom: 20,
                        fontWeight: 500,
                        color: "#5AA3C8"
                      }}>Camera</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={pickImage}>
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: 500,
                        marginBottom: 10,
                        color: "#11991B"
                      }}>Select from Gallery</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={toggleModal} style={styles.closeButton}>
                    <Text style={styles.closeButtonText}>Close</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>


            <TextInput
              onChangeText={setBookname}
              value={bookname}
              placeholder='Enter the book name'
              placeholderTextColor={"grey"}
              style={{
                borderWidth: 2,
                margin: 60,
                borderRadius: 30,
                padding: 10,
                fontSize: 17,
                top: 250,
                width: 300,
                backgroundColor: "white",
                borderColor: "transparent"
              }} />

            <TextInput
              onChangeText={setAuthorname}
              value={authorname}
              placeholder='Enter the author name'
              placeholderTextColor={"grey"}
              style={{
                borderWidth: 2,
                margin: 60,
                borderRadius: 30,
                padding: 10,
                fontSize: 17,
                top: 150,
                width: 300,
                backgroundColor: "white",
                borderColor: "transparent"
              }} />


            <TextInput
              onChangeText={setPages}
              value={pages}
              placeholder='Enter the no.of.pages'
              placeholderTextColor={"grey"}
              keyboardType="numeric"
              style={{
                borderWidth: 2,
                margin: 60,
                borderRadius: 30,
                padding: 10,
                fontSize: 17,
                top: 50,
                width: 300,
                backgroundColor: "white",
                borderColor: "transparent"
              }} />

            <Pressable onPress={StartReading}>
              <Text
                style={{
                  borderWidth: 1,
                  margin: 120,
                  borderRadius: 30,
                  padding: 15,
                  fontSize: 17,
                  top: 30,
                  width: 150,
                  textAlign: "center",
                  backgroundColor: "#8ca6db",
                  color: "white",
                  borderColor: "transparent"
                }}
              >Next</Text>

            </Pressable>
          </View>
        </ScrollView>
      </SafeAreaView>

    </LinearGradient>
  )
}

export default AddNewForm
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    fontSize: 20,
    alignItems: "center"
  },
  closeButton: {
    marginTop: 10,
    alignSelf: 'flex-end',

  },
  closeButtonText: {
    color: '#007AFF',
    fontSize: 16,
    color: "#EF391D"
  },
})