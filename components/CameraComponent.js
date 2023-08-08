// import React, { useState, useEffect, useRef } from 'react';
// import { View, TouchableOpacity, Image, StyleSheet, Text } from 'react-native';
// import { Camera } from 'expo-camera';
// import * as ImagePicker from 'expo-image-picker';
// import { SafeAreaView } from 'react-native-safe-area-context';


// const CameraComponent = () => {
 
//   const [hasCameraPermission, setHasCameraPermission] = useState(null);
//   const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
//   const [imageUri, setImageUri] = useState(null);
//   const cameraRef = useRef(null);

//   useEffect(() => {
//     const requestCameraPermission = async () => {
//       const { status } = await Camera.requestCameraPermissionsAsync();
//       setHasCameraPermission(status === 'granted');
//     };

//     requestCameraPermission();
//   }, []);
//   if (hasCameraPermission === null) {
//     return <View />;
//   }

//   if (hasCameraPermission === false) {
//     return <Text>No access to camera</Text>;
//   }

//   const handleCameraCapture = async () => {
//     if (cameraRef.current) {
//       const photo = await cameraRef.current.takePictureAsync();
//       setImageUri(photo.uri);
//     }
//   };

//   const handleGallerySelect = async () => {
//     const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
//     if (status === 'granted') {
//       const result = await ImagePicker.launchImageLibraryAsync({
//         mediaTypes: ImagePicker.MediaTypeOptions.Images,
//         allowsEditing: true,
//         quality: 1,
//       });
  
//       if (!result.canceled && result.assets.length > 0) {
//         setImageUri(result.assets[0].uri);
//       }
//     }
//   };
  
  
//   return (
    
//     <SafeAreaView style={styles.container}>
//       <Camera style={styles.camera} type={cameraType} ref={cameraRef} />
//       <View style={styles.rectangleBox}>
//         {imageUri ? (
//           <Image source={{ uri: imageUri }} style={styles.previewImage} />
//         ) : null}
//       </View>
//       <TouchableOpacity style={styles.captureButton} onPress={handleCameraCapture}>
//         <Text style={styles.captureButtonText}>Capture</Text>
//       </TouchableOpacity>
      
//       <TouchableOpacity style={styles.galleryButton} onPress={handleGallerySelect}>
//         <Text style={styles.galleryButtonText}>Select from Gallery</Text>
//       </TouchableOpacity>
//     </SafeAreaView>
   
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   camera: {
//     width: '100%',
//     height: '50%',
//   },
//   rectangleBox: {
//     width: 130,
//     height: 170,
//     borderWidth: 1,
//     borderColor: 'gray',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   previewImage: {
//     width: '100%',
//     height: '100%',
//     resizeMode: 'cover',
//   },
//   captureButton: {
//     backgroundColor: 'blue',
//     borderRadius: 5,
//     padding: 10,
//     margin: 20,
//   },
//   captureButtonText: {
//     color: 'white',
//     fontSize: 16,
//   },
//   galleryButton: {
//     backgroundColor: 'green',
//     borderRadius: 5,
//     padding: 10,
//     margin: 20,
//   },
//   galleryButtonText: {
//     color: 'white',
//     fontSize: 16,
//   },
// });

// export default CameraComponent

import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const Card = ({ title, content, imageSource }) => {
  return (
    <View style={styles.container}>
      <Image source={imageSource} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}hi </Text>
        <Text style={styles.content}>{content}hello</Text>
        <Text>hellooooooo</Text>
        <Text>hellooooooo</Text>
        <Text>hellooooooo</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 3,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 4,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  content: {
    fontSize: 16,
  },
});

export default Card;
