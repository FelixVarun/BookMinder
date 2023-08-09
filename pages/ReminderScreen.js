import { Button, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { auth, db, storage } from '../firebase-config';
import { collection, addDoc, updateDoc, arrayUnion,serverTimestamp } from 'firebase/firestore';
import { useNavigation, useRoute } from '@react-navigation/native';


const ReminderScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { bookDocId, bookname, authorname, pages, image } = route.params;

  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedDate, setSelectedDate] = useState(null); // New state for selected date
  const [selectedDays, setSelectedDays] = useState([]); // New state for selected days
  const [buttonColorm, setbuttonColorm] = useState("#7CB9E8")
  const [buttonColort, setbuttonColort] = useState("#7CB9E8")
  const [buttonColorw, setbuttonColorw] = useState("#7CB9E8")
  const [buttonColorth, setbuttonColorth] = useState("#7CB9E8")
  const [buttonColorf, setbuttonColorf] = useState("#7CB9E8")
  const [buttonColorsa, setbuttonColorsa] = useState("#7CB9E8")
  const [buttonColorsu, setbuttonColorsu] = useState("#7CB9E8")

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleTimeConfirm = (time) => {
    setSelectedTime(time.toLocaleTimeString());
    hideTimePicker();
  };

  const handlebuttonpressm = () => {
    setbuttonColorm(buttonColorm === "#7CB9E8" ? '#00A36C' : "#7CB9E8")
  };
  const handlebuttonpresst = () => {
    setbuttonColort(buttonColort === "#7CB9E8" ? '#00A36C' : "#7CB9E8")
  };
  const handlebuttonpressw = () => {
    setbuttonColorw(buttonColorw === "#7CB9E8" ? '#00A36C' : "#7CB9E8")
  };
  const handlebuttonpressth = () => {
    setbuttonColorth(buttonColorth === "#7CB9E8" ? '#00A36C' : "#7CB9E8")
  };
  const handlebuttonpressf = () => {
    setbuttonColorf(buttonColorf === "#7CB9E8" ? '#00A36C' : "#7CB9E8")
  };
  const handlebuttonpresssa = () => {
    setbuttonColorsa(buttonColorsa === "#7CB9E8" ? '#00A36C' : "#7CB9E8")
  };
  const handlebuttonpresssu = () => {
    setbuttonColorsu(buttonColorsu === "#7CB9E8" ? '#00A36C' : "#7CB9E8")
  };
  const handleDayToggle = (day) => {
    setSelectedDays((prevDays) =>
      prevDays.includes(day)
        ? prevDays.filter((d) => d !== day)
        : [...prevDays, day]
    );
  };

  const handleGoback=()=>{
    navigation.goBack();
  }
  const handleSaveReminder = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        // Create a reference to the 'reminders' collection
        const remindersCollectionRef = collection(db, 'reminders');
  
        // Create a new reminder document in the 'reminders' collection
        const reminderDocRef = await addDoc(remindersCollectionRef, {
          userId: user.uid,
          bookDocId: bookDocId,
          days: selectedDays,
          time: selectedTime,
          createdAt: serverTimestamp(),
        });
  
        console.log('Reminder details added to Firestore successfully');
        navigation.navigate("Timeandpage");
      }
    } catch (error) {
      console.error('Error saving reminder:', error);
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: "#D7DBDD", flex: 1 }}>
      
 <Pressable onPress={handleGoback}>
            <AntDesign name="arrowleft" size={24} color="black" style={{marginTop:10,marginLeft:20}}/>
            </Pressable>
      <View style={{ alignItems: "center", marginTop: 40, }}>
        <Text style={{ fontSize: 35, fontWeight: "bold", color: "#00308F" }}>DAILY REMINDER</Text>
      </View>

      <View style={{ alignItems: "center", margin: 30 }}>
        <Text style={{ fontSize: 20, fontWeight: "300" }}>
          Set the daily reminder to make
        </Text>
        <Text style={{ fontSize: 20, fontWeight: "300" }}>
          sure you read every day
        </Text>
      </View>
      <View style={{ alignItems: "center", marginBottom: 30 }}>
        <Text style={{ fontSize: 20, fontWeight: "500" }}>Select the day</Text>
      </View>

      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>

        <Text onPress={handlebuttonpressm} style={[styles.button1, { backgroundColor: buttonColorm }]}>Mon</Text>
        <Text onPress={handlebuttonpresst} style={[styles.button1, { backgroundColor: buttonColort }]}>Tue</Text>
        <Text onPress={handlebuttonpressw} style={[styles.button1, { backgroundColor: buttonColorw }]}>Wed</Text>
        <Text onPress={handlebuttonpressth} style={[styles.button1, { backgroundColor: buttonColorth }]}>Thu</Text>

      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 20,
          marginBottom: 30
        }} >

        <Text
          onPress={handlebuttonpressf}
          style={[{
            textAlign: 'center',
            borderWidth: 1,
            padding: 10,
            fontSize: 20,
            width: 70,   
            color: "white",
            borderRadius: 10,
            marginLeft: 50,
            borderColor: "transparent"},
            {backgroundColor: buttonColorf}]}>Fri</Text>
        <Text
          onPress={handlebuttonpresssa}
          style={[{
            textAlign: 'center',
            borderWidth: 1,
            padding: 10,
            fontSize: 20,
            width: 70,
            backgroundColor: "#7CB9E8",
            color: "white",
            borderRadius: 10,
            borderColor: "transparent",
            borderColor: "transparent"},
            {backgroundColor: buttonColorsa}]}>Sat</Text>
       
        <Text
          onPress={handlebuttonpresssu}
          style={[{
            textAlign: 'center',
            borderWidth: 1,
            padding: 10,
            fontSize: 20,
            width: 70,
            backgroundColor: "#7CB9E8",
            color: "white",
            borderRadius: 10,
            marginRight: 50,
            borderColor: "transparent"},
            {backgroundColor: buttonColorsu}]}>Sun</Text>


      </View>
      <View style={{ alignItems: "center", marginBottom: 20 }}>
        <Text style={{ fontSize: 20, fontWeight: "500" }}>Set the timing</Text>
      </View>


      {/* code for clock */}

      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <TouchableOpacity style={{ padding: 10, borderWidth: 2, borderRadius: 10, backgroundColor: "#72A0C1", borderColor: "transparent" }} onPress={showTimePicker} >
          <Text style={{ fontSize: 20, color: "white" }}>
            Select Time
          </Text>
        </TouchableOpacity>

        <TextInput
          style={{ fontSize: 18, marginTop: 20, padding: 10 }}
          placeholder="Selected Time"
          value={selectedTime}
          editable={false}
        />

        <DateTimePickerModal
          isVisible={isTimePickerVisible}
          mode="time"
          onConfirm={handleTimeConfirm}
          onCancel={hideTimePicker}
        />
      </View>


      <Pressable
        onPress={handleSaveReminder}
        style={{ marginLeft: "auto", marginRight: "auto", padding: 15, marginTop: 50 }}>
        <Text
          style={{
            fontSize: 20,
            backgroundColor: "#00308F",
            color: "white",
            borderWidth: 2,
            padding: 15,
            borderRadius: 30,
            borderColor: "transparent",
            width: 120,
            textAlign: "center",
            justifyContent: "center"
          }}>Next</Text>
      </Pressable>
  
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  button1: {
    textAlign: 'center',
    borderWidth: 1,
    padding: 10,
    fontSize: 20,
    width: 70,
    color: "white",
    borderRadius: 10,
    marginLeft: 10,
    marginRight: 10,
    borderColor: "transparent"
  }
})

export default ReminderScreen


