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