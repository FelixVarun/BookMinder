import { Button, Pressable, ScrollView, StyleSheet, Text, TextInput, View ,Alert,TouchableOpacity} from 'react-native'
import React, { useEffect, useState,useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AntDesign } from '@expo/vector-icons';
import { auth, db, storage,messaging } from '../firebase-config';
import { collection, addDoc, updateDoc, arrayUnion, serverTimestamp,getDocs,where, query  } from 'firebase/firestore';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Notifications from 'expo-notifications';
import { useNavigation, useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

const ReminderScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { bookDocId, bookname, authorname, pages, image } = route.params;

const [selectedDate, setSelectedDate] = useState(new Date());
const [showPicker, setShowPicker] = useState(false);
const [selectedDays, setSelectedDays] = useState({
  monday: false,
  tuesday: false,
  wednesday: false,
  thursday: false,
  friday: false,
  saturday: false,
  sunday: false,
});
const [selectedTime, setSelectedTime] = useState(''); // Store selected time

  const weekdays = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
  ];
const weekdaysRow1 = ['mon', 'tues', 'wed', 'thurs'];
const weekdaysRow2 = ['fri', 'sat', 'sun'];

const handleGoback = () => {
  navigation.goBack();
}

const showTimePicker = () => {
  setShowPicker(true);
};

const toggleDaySelection = (day) => {
  setSelectedDays((prevSelectedDays) => ({
    ...prevSelectedDays,
    [day]: !prevSelectedDays[day],
  }));
};

const handlePickerChange = (event, date) => {
  setShowPicker(false);

  if (date) {
    setSelectedDate(date);
  }
};



const saveReminder = async () => {
  const selectedDayArray = Object.keys(selectedDays).filter((day) => selectedDays[day]);

  if (selectedDayArray.length === 0 || !selectedDate) {
    Alert.alert('Please select at least one day and a time for the reminder.');
  } else {
    try {
      const user = auth.currentUser;
      if (user) {
        const selectedTime = selectedDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        // Associate the reminder with the book using the same bookDocId
        const bookDocId = route.params.bookDocId;

        // Create a new document in the "reminders" collection with the same bookDocId
        const docRef = await addDoc(collection(db, 'reminders'), {
          bookDocId: bookDocId, // Use the same bookDocId
          selectedDays: selectedDayArray,
          selectedTime: selectedTime,
          userId: user.uid,
          createdAt: serverTimestamp(),
        });

        console.log('Reminder details added to Firestore successfully');

     
          // Set up notification here (you can customize this part)
          const notificationTitle = 'Book Reminder';
          const notificationBody = `Don't forget to read "${route.params.bookname}" by ${route.params.authorname}!`;

          // Schedule a local notification (you may need to configure this based on your needs)
          Notifications.scheduleNotificationAsync({
            content: {
              title: notificationTitle,
              body: notificationBody,
            },
            trigger: {
              hour: selectedDate.getHours(),
              minute: selectedDate.getMinutes(),
              repeats: true, // This will make the notification repeat daily
            },
          });

          navigation.navigate('Homez');
        }
      } catch (error) {
        console.error('Error adding reminder document: ', error);
      }
    }
  };


  return (
    <LinearGradient colors={["#654ea3", "#eaafc8"]} style={{ flex: 1 }}>

    <SafeAreaView style={{}}>

      <Pressable onPress={handleGoback}>
        <AntDesign name="arrowleft" size={24} color="black"
         style={{ marginTop: 10, marginLeft: 20 }} />
      </Pressable>

      <View style={{ alignItems: "center", marginTop: 40, }}>
        <Text style={{ fontSize: 35, fontWeight: "bold", color: "white" }}>DAILY REMINDER</Text>
      </View>

      <View style={{ alignItems: "center", margin: 30 }}>
        <Text style={{ fontSize: 18, fontWeight: "500",color:"white" }}>
          Set the daily reminder to make
        </Text>
        <Text style={{ fontSize: 18, fontWeight: "500",color:"white" }}>
          sure you read every day
        </Text>
      </View>

      <View style={{ alignItems: "center", marginBottom: 10 }}>
        {/* <Text style={{ fontSize: 20, fontWeight: "500" }}>Select the day</Text> */}
      </View>

    
      
       <View style={{  justifyContent: 'center', alignItems: 'center' }}>
       <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 ,alignItems:"center",justifyContent:"center"}}>
        {weekdaysRow1.map((day) => (
          <TouchableOpacity
            key={day}
            onPress={() => toggleDaySelection(day)}
            style={{
              padding: 10,
              width: 90,
              justifyContent:"space-evenly",
              marginRight: 7,
              borderRadius: 20,
              backgroundColor: selectedDays[day] ? '#00A36C' : '#B2BEB5',
              alignItems: "center"
            }}
          >
            <Text style={{fontSize:17 }}>{day}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
        {weekdaysRow2.map((day) => (
          <TouchableOpacity
            key={day}
            onPress={() => toggleDaySelection(day)}
            style={{
              padding: 10,
              width: 90,
              marginRight: 10,
              borderRadius: 20,
              backgroundColor: selectedDays[day] ? '#00A36C' : '#B2BEB5',
              alignItems: "center"
            }}
          >
            <Text style={{ fontSize:17 }}>{day}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={{ alignItems: "center", marginBottom: 10,marginTop:30 }}>
        {/* <Text style={{ fontSize: 20, fontWeight: "500" }}>Select the time</Text> */}
      </View>
      
      <TouchableOpacity onPress={showTimePicker} style={{marginTop:20,borderWidth:1,borderRadius:17,backgroundColor:"#708090",padding:7,borderColor:"transparent"}} >
        <Text  style={{ fontSize:20,color:"white" }}>Set time</Text>
      </TouchableOpacity>
      <Text style={{borderWidth:1,padding:7,backgroundColor:'#FCF5E5',marginTop:30,borderColor:"transparent",borderRadius:10}}>Selected Time: {selectedDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
      {showPicker && (
        <DateTimePicker
          value={selectedDate}
          mode="time"
          display="spinner"
          onChange={handlePickerChange}
        />
      )}
      </View>
     

      <Pressable
        onPress={saveReminder}
        style={{ marginLeft: "auto", marginRight: "auto", padding: 15, marginTop: 80 }}>
        <Text style={styles.next}>Next</Text>
      </Pressable>

    </SafeAreaView>
    </LinearGradient>
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
  },
  button2: {
    borderWidth: 1,
    padding: 10,
    fontSize: 20,
    width: 70,
    color: "white",
    borderRadius: 10,
    marginLeft: 60,
    borderColor: "transparent"
  },
  button3: {
    borderWidth: 1,
    padding: 10,
    fontSize: 20,
    width: 70,
    backgroundColor: "#7CB9E8",
    color: "white",
    borderRadius: 10,
    marginRight: 60,
    borderColor: "transparent"
  },
  next: {
    fontSize: 20,
    backgroundColor: "#7D3C98",
    color: "white",
    borderWidth: 2,
    padding: 15,
    borderRadius: 30,
    borderColor: "transparent",
    width: 120,
    textAlign: "center",
    justifyContent: "center"
  }
})

export default ReminderScreen
