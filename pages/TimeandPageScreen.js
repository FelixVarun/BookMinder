import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { TextInput } from 'react-native';
import { Pressable } from 'react-native';
import { View, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SwitchSelector from 'react-native-switch-selector';
import { AntDesign } from '@expo/vector-icons';

const TimeandPageScreen = () => {
  const navigation = useNavigation();
  const [selectedValue, setSelectedValue] = useState('option1');

  const options = [
    { label: 'Time', value: 'option1' },
    { label: 'Pages', value: 'option2' },

  ];

  const handleChange = (value) => {
    setSelectedValue(value);
  };

  const renderOptionContent = () => {
    if (selectedValue === 'option1') {
      return (


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

        </View>
      );
    } else {
      return (

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

        </View>
      );
    }
  };
  
  const handleGoback=()=>{
    navigation.goBack();
  }

  return (
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

      <View style={{ alignItems: "center", marginTop: 30 }} >
        <SwitchSelector
          options={options}
          initial={0}
          onPress={handleChange}
          style={{ width: 250}}
          textColor="#333"
          selectedColor="#fff"
          buttonColor="#007AFF"
          borderColor="#007AFF"
        />
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

