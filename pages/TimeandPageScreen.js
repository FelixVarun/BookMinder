<<<<<<< HEAD
import { useNavigation,useRoute} from '@react-navigation/native';
=======
import { useNavigation } from '@react-navigation/native';
>>>>>>> e1005bcffff272dc4dc3708e7c07b5328847cd4e
import React, { useState } from 'react';
import { TextInput } from 'react-native';
import { Pressable } from 'react-native';
import { View, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SwitchSelector from 'react-native-switch-selector';
import { AntDesign } from '@expo/vector-icons';
<<<<<<< HEAD
import { auth, db, storage } from '../firebase-config';
import { collection, addDoc } from 'firebase/firestore';
import { LinearGradient } from 'expo-linear-gradient';


const TimeandPageScreen = () => {
  const navigation = useNavigation();

  const route = useRoute();
  const { bookname, authorname, pages, image } = route.params;

  const [selectedValue, setSelectedValue] = useState('option1');
  const [selectedTime, setSelectedTime] = useState(null); // New state for selected time
  const [selectedPage,setSelectedPage]=useState(null);


  const handleButtonPress = (time) => {
    setSelectedTime(time);
  };

   const buttonColors = (time) => {
    return selectedTime === time ? '#00A36C' : '#7CB9E8';
  };

  const buttonPressed=(page)=>{
    setSelectedPage(page);
  };

  const pbuttonColor=(page)=>{
    return selectedPage === page ? '#00A36C' : "#72A0C1";
  }
  
  const options = [
    { label: 'Time', value: 'option1' },
    { label: 'Pages', value: 'option2' },];
=======

const TimeandPageScreen = () => {
  const navigation = useNavigation();
  const [selectedValue, setSelectedValue] = useState('option1');

  const options = [
    { label: 'Time', value: 'option1' },
    { label: 'Pages', value: 'option2' },

  ];
>>>>>>> e1005bcffff272dc4dc3708e7c07b5328847cd4e

  const handleChange = (value) => {
    setSelectedValue(value);
  };

<<<<<<< HEAD
  const goHome = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        // Convert selectedTime and selectedPage to numbers
      const numericSelectedTime = parseInt(selectedTime);
      const numericSelectedPage = parseInt(selectedPage);

      // Combine details from both screens into a single object
      const combinedDetails = {
        Authorname: authorname,
        Bookname: bookname,
        Pages: pages,
        ImageUrl: image,
        selectedTime: numericSelectedTime,
        selectedPage: numericSelectedPage,
        userId: user.email,
        };
  
        // Create a new Firestore document for the combined details
        const docRef = await addDoc(collection(db, 'books'), combinedDetails);
  
        console.log('Combined book details added to Firestore successfully');
  
        // Navigate to the next screen or perform any other actions
        navigation.navigate("Reminder", { bookDocId: docRef.id });
      }
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };
  
  
=======
>>>>>>> e1005bcffff272dc4dc3708e7c07b5328847cd4e
  const renderOptionContent = () => {
    if (selectedValue === 'option1') {
      return (

<<<<<<< HEAD
        <View>
          <View style={{ alignItems: "center", margin: 20 }}>
            <Text style={{ fontSize: 20, fontWeight: "400",color:"white" }}>please select how much time that you are</Text>
            <Text style={{ fontSize: 20, fontWeight: "400",color:"white" }}> going to read in one day</Text>
          </View>
          <View style={{ flexDirection: "row", marginTop: 30, alignItems: "center" }}>

            <Text onPress={()=> handleButtonPress("10")} style={[styles.min, { backgroundColor: buttonColors("10") }]}>10 min</Text>
            <Text onPress={()=> handleButtonPress("15")} style={[styles.min, { backgroundColor: buttonColors("15") }]}>15 min</Text>
            <Text onPress={()=> handleButtonPress("20")} style={[styles.min, { backgroundColor: buttonColors("20") }]}>20 min</Text>
            <Text onPress={()=> handleButtonPress("25")} style={[styles.min, { backgroundColor: buttonColors("25") }]}>25 min</Text>
            <Text onPress={()=> handleButtonPress("30")} style={[styles.min, { backgroundColor: buttonColors("30") }]}>30 min</Text>

          </View>
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", margin: 50, }}>
            <Text style={{ fontSize: 20, marginRight: 10 }}>Others :</Text>
            <TextInput
              keyboardType="numeric"
              placeholder="40"
              style={styles.inputbox} />
          </View>
=======

        <View style={{ flexDirection: "row", marginTop: 100,}}>
          <Text
            style={{
              textAlign: 'center',
              borderWidth: 1,
              padding: 10,
              fontSize: 18,
              width: 60,
              backgroundColor: "#7CB9E8",
              color: "white",
              borderRadius: 10,
              borderColor: 'transparent',
              margin: 5,
              
            }}>10m</Text>
          <Text
            style={{
              textAlign: 'center',
              borderWidth: 1,
              padding: 10,
              fontSize: 18,
              width: 60,
              backgroundColor: "#7CB9E8",
              color: "white",
              borderRadius: 10,
              borderColor: 'transparent',
              margin: 5
            }}>15m</Text>
          <Text
            style={{
              textAlign: 'center',
              borderWidth: 1,
              padding: 10,
              fontSize: 18,
              width: 60,
              backgroundColor: "#7CB9E8",
              color: "white",
              borderRadius: 10,
              borderColor: 'transparent',
              margin: 5
            }}>20m</Text>
          <Text
            style={{
              textAlign: 'center',
              borderWidth: 1,
              padding: 10,
              fontSize: 18,
              width: 60,
              backgroundColor: "#7CB9E8",
              color: "white",
              borderRadius: 10,
              borderColor: 'transparent',
              margin: 5
            }}>25m</Text>
          <Text
            style={{
              textAlign: 'center',
              borderWidth: 1,
              padding: 10,
              fontSize: 18,
              width: 60,
              backgroundColor: "#7CB9E8",
              color: "white",
              borderRadius: 10,
              borderColor: 'transparent',
              margin: 5
            }}>30m</Text>

>>>>>>> e1005bcffff272dc4dc3708e7c07b5328847cd4e
        </View>
      );
    } else {
      return (
<<<<<<< HEAD
         <View>
          <View style={{ alignItems: "center", margin: 20 }}>
            <Text style={{ fontSize: 20, fontWeight: "400",color:"white" }}>please select how many page that you are</Text>
            <Text style={{ fontSize: 20, fontWeight: "400",color:"white" }}> going to read in one day</Text>
          </View>
          <View style={{ flexDirection: "row", marginTop: 30, alignItems: "center" }}>
            <Text onPress={()=>buttonPressed("1")}style={[styles.page,{backgroundColor : pbuttonColor("1")}]}>1 Pg</Text>
            <Text onPress={()=>buttonPressed("2")}style={[styles.page,{backgroundColor:pbuttonColor("2")}]}>2 Pg</Text>
            <Text onPress={()=>buttonPressed("3")}style={[styles.page,{backgroundColor:pbuttonColor("3")}]}>3 Pg</Text>
            <Text onPress={()=>buttonPressed("4")}style={[styles.page,{backgroundColor:pbuttonColor("4")}]}>4 Pg</Text>
            <Text onPress={()=>buttonPressed("5")}style={[styles.page,{backgroundColor:pbuttonColor("5")}]}>5 Pg</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", margin: 50, }}>
            <Text style={{ fontSize: 20, marginRight: 10 }}>Others :</Text>

            <TextInput
              keyboardType="numeric"
              placeholder="6"
              style={styles.inputbox} />
          </View>
        
          <Pressable
        onPress={goHome}
        style={{ marginLeft: "auto", marginRight: "auto", padding: 15, }}>
        <Text style={styles.done}>Done</Text>
      </Pressable>
=======

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 100
          }}>
          <Text
            style={{
              textAlign: 'center',
              borderWidth: 1,
              padding: 10,
              fontSize: 18,
              width: 60,
              backgroundColor: "#72A0C1",
              color: "white",
              borderRadius: 10,
              borderColor: 'transparent',
              margin: 5
            }}>1 Pg</Text>
          <Text
            style={{
              textAlign: 'center',
              borderWidth: 1,
              padding: 10,
              fontSize: 18,
              width: 60,
              backgroundColor: "#72A0C1",
              color: "white",
              borderRadius: 10,
              borderColor: 'transparent',
              margin: 5
            }}>2 Pg</Text>
          <Text
            style={{
              textAlign: 'center',
              borderWidth: 1,
              padding: 10,
              fontSize: 18,
              width: 60,
              backgroundColor: "#72A0C1",
              color: "white",
              borderRadius: 10,
              borderColor: 'transparent',
              margin: 5
            }}>3 Pg</Text>
          <Text
            style={{
              textAlign: 'center',
              borderWidth: 1,
              padding: 10,
              fontSize: 18,
              width: 60,
              backgroundColor: "#72A0C1",
              color: "white",
              borderRadius: 10,
              borderColor: 'transparent',
              margin: 5
            }}>4 Pg</Text>
          <Text
            style={{
              textAlign: 'center',
              borderWidth: 1,
              padding: 10,
              fontSize: 18,
              width: 60,
              backgroundColor: "#72A0C1",
              color: "white",
              borderRadius: 10,
              borderColor: 'transparent',
              margin: 5
            }}>5 Pg</Text>

>>>>>>> e1005bcffff272dc4dc3708e7c07b5328847cd4e
        </View>
      );
    }
  };
<<<<<<< HEAD

  const handleGoback = () => {
=======
  
  const handleGoback=()=>{
>>>>>>> e1005bcffff272dc4dc3708e7c07b5328847cd4e
    navigation.goBack();
  }

  return (
<<<<<<< HEAD
    <LinearGradient colors={["#654ea3", "#eaafc8"]} style={{ flex: 1 }}>
    <SafeAreaView
      style={{
        
       
      }}>
      <Pressable onPress={handleGoback}>
        <AntDesign name="arrowleft" size={24} color="black" style={{ marginTop: 10, marginLeft: 20 }} />
      </Pressable>

      <View style={{ alignItems: "center", margin: 25 }}>
        <Text style={{ fontSize: 35, fontWeight: "bold", color: "white" }}>TIME & PAGES</Text>
      </View>


=======
    <SafeAreaView
      style={{
        backgroundColor: "#D7DBDD",
        flex: 1
      }}>
         <Pressable onPress={handleGoback}>
            <AntDesign name="arrowleft" size={24} color="black" style={{marginTop:10,marginLeft:20}}/>
            </Pressable>

      <View style={{ alignItems: "center", margin: 25 }}>
        <Text style={{ fontSize: 35, fontWeight: "bold", color: "#00308F" }}>TIME & PAGES</Text>
      </View>

>>>>>>> e1005bcffff272dc4dc3708e7c07b5328847cd4e
      <View style={{ alignItems: "center", marginTop: 30 }} >
        <SwitchSelector
          options={options}
          initial={0}
          onPress={handleChange}
<<<<<<< HEAD
          style={{ width: 250 }}
=======
          style={{ width: 250}}
>>>>>>> e1005bcffff272dc4dc3708e7c07b5328847cd4e
          textColor="#333"
          selectedColor="#fff"
          buttonColor="#007AFF"
          borderColor="#007AFF"
        />
<<<<<<< HEAD

        {renderOptionContent()}

      </View>
    </SafeAreaView>
    </LinearGradient>
  );
};
const styles = StyleSheet.create({
  min: {
    textAlign: 'center',
    borderWidth: 1,
    padding: 10,
    fontSize: 18,
    width: 60,
    backgroundColor: "#7CB9E8",
    color: "white",
    borderRadius: 10,
    borderColor: 'transparent',
    margin: 10,
  },
  page: {
    textAlign: 'center',
    borderWidth: 1,
    padding: 10,
    fontSize: 18,
    width: 50,
    backgroundColor: "#72A0C1",
    color: "white",
    borderRadius: 10,
    borderColor: 'transparent',
    margin: 15,
  },
  done: {
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
  },
  inputbox: {
    backgroundColor: "white",
    width: 80,
    borderRadius: 10,
    padding: 7,
    marginLeft: 10,
    fontSize: 18
  }
})
export default TimeandPageScreen;
=======
        {renderOptionContent()}
      </View>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", margin: 50, }}>
        <Text style={{ fontSize: 20, marginRight: 10 }}>Others</Text>
        <TextInput style={{ backgroundColor: "white", width: 90, borderRadius: 10, padding: 7, marginLeft: 10 }} />

      </View>
      <Pressable
        onPress={() => navigation.navigate("Homez")}
        style={{ marginLeft: "auto", marginRight: "auto", padding: 15, }}>
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
          }}>Done</Text>
      </Pressable>



    </SafeAreaView>
  );
};



export default TimeandPageScreen;

>>>>>>> e1005bcffff272dc4dc3708e7c07b5328847cd4e
