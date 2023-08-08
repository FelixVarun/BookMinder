import { Button, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { auth, db, storage } from '../firebase-config';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';

const ReminderScreen = () => {
  const navigation = useNavigation();
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [selectedTime, setSelectedTime] = useState('');
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

  const handleGoback=()=>{
    navigation.goBack();
  }
  const handleSaveReminder = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const selectedDays = [];
       
        if (buttonColorm === '#00A36C') selectedDays.push('Monday');
        if (buttonColort === '#00A36C') selectedDays.push('Tuesday');
        if (buttonColorw === '#00A36C') selectedDays.push('Wednesday');
        if (buttonColorth === '#00A36C') selectedDays.push('Thursday');
        if (buttonColorf === '#00A36C') selectedDays.push('Friday');
        if (buttonColorsa === '#00A36C') selectedDays.push('Saturday');
        if (buttonColorsu === '#00A36C') selectedDays.push('Sunday');
        // ... (similarly for other days)
  
        const reminderData = {
          days: selectedDays,
          time: selectedTime,
        };
  
        // Get the reference to the user's document
        const userDocRef = doc(db, 'users', user.uid); // Ensure 'user.uid' is the correct user ID
  
        // Update the document with the reminder data
        await updateDoc(userDocRef, {
          reminders: arrayUnion(reminderData),
        });
  
        console.log('Reminder details added to Firestore successfully');
        // Navigate to the next screen after successfully saving the reminder
        navigation.navigate("Timeandpage");
      }
    } catch (error) {
      console.error('Error saving reminder:', error);
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: "#D7DBDD", flex: 1 }}>
      <ScrollView>
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

        <Text onPress={handlebuttonpressm} style={[styles.button1, { backgroundColor: buttonColorm }]}>M</Text>
        <Text onPress={handlebuttonpresst} style={[styles.button1, { backgroundColor: buttonColort }]}>T</Text>
        <Text onPress={handlebuttonpressw} style={[styles.button1, { backgroundColor: buttonColorw }]}>W</Text>
        <Text onPress={handlebuttonpressth} style={[styles.button1, { backgroundColor: buttonColorth }]}>TH</Text>

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
            width: 50,   
            color: "white",
            borderRadius: 10,
            marginLeft: 70,
            borderColor: "transparent"},
            {backgroundColor: buttonColorf}]}>F</Text>
        <Text
          onPress={handlebuttonpresssa}
          style={[{
            textAlign: 'center',
            borderWidth: 1,
            padding: 10,
            fontSize: 20,
            width: 50,
            backgroundColor: "#7CB9E8",
            color: "white",
            borderRadius: 10,
            borderColor: "transparent",
            borderColor: "transparent"},
            {backgroundColor: buttonColorsa}]}>SA</Text>
       
        <Text
          onPress={handlebuttonpresssu}
          style={[{
            textAlign: 'center',
            borderWidth: 1,
            padding: 10,
            fontSize: 20,
            width: 50,
            backgroundColor: "#7CB9E8",
            color: "white",
            borderRadius: 10,
            marginRight: 70,
            borderColor: "transparent"},
            {backgroundColor: buttonColorsu}]}>S</Text>


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
        onPress={() => navigation.navigate("Timeandpage")}
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
      <Pressable
      onPress={handleSaveReminder}
      style={{
        marginLeft: 'auto',
        marginRight: 'auto',
        padding: 15,
        marginTop: 50,
      }}>
      <Text
        style={{
          fontSize: 20,
          backgroundColor: '#00308F',
          color: 'white',
          borderWidth: 2,
          padding: 15,
          borderRadius: 30,
          borderColor: 'transparent',
          width: 120,
          textAlign: 'center',
          justifyContent: 'center',
        }}>
        Save Reminder
      </Text>
    </Pressable>
    </ScrollView>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  button1: {
    textAlign: 'center',
    borderWidth: 1,
    padding: 10,
    fontSize: 20,
    width: 50,
    // backgroundColor: "#7CB9E8",
    color: "white",
    borderRadius: 10,
    marginLeft: 20,
    marginRight: 20,
    borderColor: "transparent"
  }
})

export default ReminderScreen


