import { StyleSheet, Text, View, TouchableOpacity, Modal, TextInput,Image, Pressable,FlatList} from 'react-native'
import React, { useState,useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons';

import SwitchSelector from 'react-native-switch-selector';
import { SimpleLineIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Camera } from 'expo-camera';

const DetailsUpdatingScreen = ({ route }) => {
  
  const [selectedValue, setSelectedValue] = useState('option1');
  const [isModalVisible, setModalVisible] = useState(false);
  const [notesList, setNotesList] = useState([]);
  const [notes, setNotes] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [showOptionsIndex, setShowOptionsIndex] = useState(null);

  const [hasPermission, setHasPermission] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const [cameraRef, setCameraRef] = useState(null);
  const [capturedPhotos, setCapturedPhotos] = useState([]);

  const options = [
    { label: 'Notes', value: 'option1' },
    { label: 'Photos', value: 'option2' },

  ];

  const handleChange = (value) => {
    setSelectedValue(value);
  };
  const { book } = route.params;
  const handleSaveNotes = () => {
    if (editingIndex !== null) {
      const updatedNotesList = [...notesList];
      updatedNotesList[editingIndex] = notes;
      setNotesList(updatedNotesList);
    } else {
      setNotesList([...notesList, notes]);
    }
    setNotes('');
    setModalVisible(false);
    setEditingIndex(null);
  };

  const handleCancelModal = () => {
    setModalVisible(false);
    setEditingIndex(null);
  };

  const handleEditNote = index => {
    const noteToEdit = notesList[index];
    setNotes(noteToEdit);
    setEditingIndex(index);
    setModalVisible(true);
  };

  const handleDeleteNote = index => {
    const updatedNotesList = [...notesList];
    updatedNotesList.splice(index, 1);
    setNotesList(updatedNotesList);
  };

  const handleToggleOptions = index => {
    if (showOptionsIndex === index) {
      setShowOptionsIndex(null);
    } else {
      setShowOptionsIndex(index);
    }
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef) {
      const photo = await cameraRef.takePictureAsync();
      setCapturedPhotos([...capturedPhotos, photo]);
      setShowCamera(false);
    }
  };

  const handleCameraIconPress = async () => {
    if (hasPermission) {
      setShowCamera(true);
    } else {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
      setShowCamera(status === 'granted');
    }
  };

  const renderImageItem = ({ item }) => (
    <TouchableOpacity style={{ marginRight: 10 }}>
      <Image source={{ uri: item.uri }} style={{ width: 180, height: 160 }} />
    </TouchableOpacity>
  );

  const renderOptionContent = () => {
    if (selectedValue === 'option1') {
      return (

        <View style={styles.container}>

          <Pressable
            style={{
              right: 5,
              bottom: 10,
              alignItems: "flex-end"
            }}>
            <Ionicons onPress={() => setModalVisible(true)} name="ios-add-circle-sharp" size={50} color="black" />
          </Pressable>

          <View style={styles.notesContainer}>
            {notesList.map((note, index) => (
              <View key={index} style={styles.card}>
                <Text style={styles.cardText}>{note}</Text>
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
                    <SimpleLineIcons name="options-vertical" size={19} color="black" />
                  </TouchableOpacity>
                )}
              </View>
            ))}
          </View>
          <Modal visible={isModalVisible} onRequestClose={handleCancelModal} transparent={true}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter notes"
                  value={notes}
                  onChangeText={text => setNotes(text)}
                />
                <TouchableOpacity onPress={handleSaveNotes}>
                  <Text style={styles.saveButton}>{editingIndex !== null ? 'Update' : 'Save'}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

        </View>
      );
    } else {
      return (
        // <View style={styles.container}>
        //   <Pressable
        //   onPress={handleCameraSelect}
        //     style={{
        //       marginRight: 5,
        //       bottom: 10,
        //       alignItems: "flex-end"
        //     }}> 
        //     <Entypo name="camera" size={45} color="black" />
        //   </Pressable>
          
        // </View>
        <View style={{ flex: 1 }}>
        {!showCamera ? (
          <View style={{ flex: 1, padding:16}}>
            {!hasPermission && (
              <Text>No camera permission. Please allow camera access.</Text>
            )}
            <TouchableOpacity onPress={handleCameraIconPress}
            style={{ right: 5,bottom: 10,alignItems: "flex-end"}}>
            
                <Entypo name="camera" size={45} color="black" style/>
            </TouchableOpacity>
  
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', padding: 10 }}>
              <FlatList
                data={capturedPhotos}
                renderItem={renderImageItem}
                keyExtractor={(_, index) => index.toString()}
                numColumns={2}
              />
            </View>
          </View>
        ) : (
          <Camera
            style={{ flex: 1 }}
            type={Camera.Constants.Type.back}
            ref={ref => setCameraRef(ref)}
            onCameraReady={() => setHasPermission(true)}
          >
            <TouchableOpacity
              style={{
                position: 'absolute',
                bottom: 20,
                alignSelf: 'center',
                padding: 10,
                backgroundColor: 'white',
                borderRadius: 50,
              }}
              onPress={takePicture}
            >
            
               <Entypo name="camera" size={45} color="black" 
                style={{ width: 50, height: 50 }}
              />
            </TouchableOpacity>
          </Camera>
        )}
      </View>
      );
    }
  }
  return (
    <SafeAreaView style={{ backgroundColor: "#D7DBDD", flex: 1 }}>

      <View style={{
        alignItems: "center",
        marginTop: 20,
      }}>
        {/* <Image source={{ image }} style={{ width: 130, height: 170, borderRadius: 10 }} /> */}
        <Image source={{ uri: book.ImageUrl }} style={{ width: 130, height: 170, borderRadius: 10 }} />
      </View>
      <View style={{ margin: 20, alignItems: "center" }}>
        <Text style={{ fontSize: 19, marginBottom: 10, fontWeight: "bold" }}>{book.Bookname}</Text>
        <Text style={{ fontSize: 15 }}>{book.Authorname}</Text>
      </View>

      <View style={{ alignItems: "center", }}>
        <View
          style={{
            width: 370,
            backgroundColor: "white",
            padding: 30,
            borderRadius: 20,

          }} >
          <View
            style={{
              marginBottom: 10,
              flexDirection: "row",
              justifyContent: "space-between",
              borderWidth: 1,
              borderColor: "transparent",
              borderBottomColor: "black",
              paddingBottom: 15,
            }} >
            <Text><Ionicons name="star-outline" size={24} color="black" /></Text>
            <Text><Ionicons name="star-outline" size={24} color="black" /></Text>
            <Text><Ionicons name="star-outline" size={24} color="black" /></Text>
            <Text><Ionicons name="star-outline" size={24} color="black" /></Text>
            <Text><Ionicons name="star-outline" size={24} color="black" /></Text>

          </View>

          <View style={{ flexDirection: "row", marginBottom: 10, justifyContent: "space-between" }}>
            <Text >Time Elapsed</Text>
            <Text>Current Page</Text>
          </View>

          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>~
            <Text style={{ marginLeft: 30 }}>0:0</Text>
            <Text style={{ marginRight: 20 }}>0/150</Text>
          </View>

        </View>
      </View>
      <View style={{ alignItems: "center", marginTop: 30 }} >
        <SwitchSelector
          options={options}
          initial={0}
          onPress={handleChange}
          style={{ width: 250 }}
          textColor="#333"
          selectedColor="#fff"
          buttonColor="#007AFF"
          borderColor="#007AFF"
        />

      </View>
      {renderOptionContent()}
    </SafeAreaView>
  )
}

export default DetailsUpdatingScreen

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  notesContainer: {
    marginTop: 16,
  },
  card: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardText: {
    fontSize: 16,
  },
  optionsContainer: {

    alignItems: "flex-end"
  },
  optionsIconContainer: {
    padding: 4,

    alignItems: "flex-end"

  },
  editOption: {
    color: 'blue',
    marginRight: 8,

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
    fontSize:18
  },
  saveButton: {
    backgroundColor: "#5D4157",
    color: 'white',
    textAlign: 'center',
    padding: 14,
    borderRadius: 4,
    fontSize:18
  },
});
