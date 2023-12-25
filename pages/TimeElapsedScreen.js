import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Pressable } from 'react-native';
import { AntDesign, Entypo, FontAwesome, MaterialIcons } from '@expo/vector-icons'; // Import FontAwesome from @expo/vector-icons
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const TimeElapsedScreen = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const navigation = useNavigation();
  
  useEffect(() => {
    let interval;

    if (isRunning) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 1000);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  const toggleTimer = () => {
    setIsRunning(prevState => !prevState);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTime(0);
  };

  const formatTime = milliseconds => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
  };

  const Note=()=>{
    navigation.navigate("Notes")
  }
  const Photo=()=>{
    navigation.navigate("Photos")
  }
  const handleGoback = () => {
    navigation.goBack();
  }

  return (
    <SafeAreaView style={{ flex: 1,}}>
      <Pressable onPress={handleGoback} style={{justifyContent:"flex-start"}}>
            <AntDesign name="arrowleft" size={24} color="black" style={{ marginTop: 10, marginLeft: 20}} />
          </Pressable>
{/* 
      <View style={{alignItems:"center",justifyContent:"center",margin:15,marginBottom:20}}>
        <Text style={{fontSize:15}}> 
        Note:  Start the timer and start reading the book, If you want to add any notes click the
         <Text style={{fontWeight:"bold"}}>"Add note"</Text> button and, click the 
         <Text style={{fontWeight:"bold"}}>"Add photo"</Text>  button to click the photo </Text>
      </View> */}

      <View style={{alignItems:"center"}}>
        <View  style={styles.timeContainer}>
      <Text style={{ fontSize: 40 }}>{formatTime(time)}</Text>
      <View style={{ flexDirection: "row", gap: 50, marginTop: 60 }}>
        <TouchableOpacity onPress={toggleTimer}>
        {isRunning ? 
        <View style={{flexDirection:"row"}}>
        <Text style={{fontSize:27,color:"#EC6EAD"}}>Pause</Text> 
        <Ionicons name="pause" size={35} color="#3494E6" />
        </View>
        : 
        <View style={{flexDirection:"row",gap:5}}>
        <Text style={{fontSize:27,color:"#3494E6"}}>Start</Text>
        <MaterialIcons name="play-circle-outline" size={35} color="#EC6EAD" />
        {/* <Entypo name="controller-play" size={35} color="#EC6EAD" /> */}
        </View>
        }
          
        </TouchableOpacity>
        <TouchableOpacity onPress={resetTimer} style={{flexDirection:'row',gap:5}}>
          <Text style={styles.reset}>Reset</Text>
          <Ionicons name="refresh-outline" size={34} color="#EC6EAD" />
        </TouchableOpacity>
      </View>
      </View>

      <View style={{ flexDirection: "row", gap: 40, marginTop: 60 }}>

      <TouchableOpacity style={styles.addnote}  onPress={Note}>
          <Text style={{ fontSize: 23 }}> Add note</Text>
          <FontAwesome5 name="pen" size={19} color="black" />
          </TouchableOpacity>

        
          <TouchableOpacity style={styles.addphoto} onPress={Photo}>
          <Text style={{ fontSize: 23, }}> Add photo</Text>
          <Ionicons name="ios-camera" size={25} color="black" />
          </TouchableOpacity>
      
      </View>

      <View style={styles.end}>
        <Text style={{ fontSize: 20, color: "white" }}>End Session</Text>
      </View>
      </View>
    </SafeAreaView>
  );
};

export default TimeElapsedScreen;

const styles = StyleSheet.create({

  reset: {
    fontSize: 27,
color:"#3494E6"
  },
  timeContainer:{
    borderWidth:0.5,
    alignItems:"center",
    paddingHorizontal:50,
    paddingVertical:20,
    borderColor:"transparent",
    backgroundColor:"lightgrey",
    borderRadius:20
  },
  addnote: {
    flexDirection: "row",
    gap: 5,
    borderWidth: 1,
    paddingHorizontal:15,
    paddingVertical:10,
    borderRadius: 20,
    backgroundColor: "#D7BDE2",
    borderColor: "transparent",
    alignItems: "center"
  },
  addphoto: {
    flexDirection: "row",
    gap: 5,
    borderWidth: 1,
    paddingHorizontal:10,
    paddingVertical:10,
    borderRadius: 20,
    backgroundColor: "#CBC3E3",
    borderColor: "transparent",
    alignItems: "center"
  },
  end: {
    marginTop: 200,
    borderWidth: 1,
    padding: 15,
    borderRadius: 30,
    backgroundColor: "#0047AB",
    borderColor: "transparent"
  }

})
