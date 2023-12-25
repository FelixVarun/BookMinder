// import React, { useState, useEffect,useRef } from 'react';
// import { View, Text, TextInput, Button, TouchableOpacity,StyleSheet,ScrollView } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';


// const ActivityScreen = () => {
// //   return (
// //     <View style={styles.container}>
// //      <Text>Activity Screen</Text>
// //     </View>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //   },
// // });
// const [inputValue, setInputValue] = useState('');
// const [boxes, setBoxes] = useState([]);

// const handleInputChange = (text) => {
//   setInputValue(text);
// };

// const handleGenerateBoxes = () => {
//   const num = parseInt(inputValue, 10);
//   if (!isNaN(num)) {
//     const newBoxes = Array.from({ length: num }, (_, index) => ({
//       id: index + 1,
//       isActive: false,
//     }));
//     setBoxes(newBoxes);
//   }
// };

// const handleBoxPress = (boxId) => {
//   const updatedBoxes = boxes.map((box) => {
//     if (box.id <= boxId) {
//       return { ...box, isActive: true };
//     }
//     return { ...box, isActive: false };
//   });
//   setBoxes(updatedBoxes);
// };

// return (
//   <SafeAreaView>
//     <ScrollView>
//     <TextInput
//       value={inputValue}
//       onChangeText={handleInputChange}
//       keyboardType="numeric"
//       placeholder="Enter the no.of pages"
//       style={{ borderWidth: 1, padding: 10,borderColor:"transparent"}}
//     />
//     <Button
//       title="Generate Pages"
//       onPress={handleGenerateBoxes}
//       disabled={inputValue === ''}
//     />
//     <View style={{ flexDirection: 'row', flexWrap: 'wrap',justifyContent:"space-evenly" }}>
//       {boxes.map((box) => (
//         <TouchableOpacity
//           key={box.id}
//           onPress={() => handleBoxPress(box.id)}
//           style={{
//             width: 50,
//             height: 50,
//             backgroundColor: box.isActive ? "#00A36C":"#8ca6db"  ,
//             margin: 5,
//             justifyContent: 'center',
//             alignItems: 'center',
//           }}
//         >
//           <Text style={{ color: 'white' }}>{box.id}</Text>
//         </TouchableOpacity>
//       ))}
//     </View>
//     </ScrollView>
//   </SafeAreaView>
// );
// };

// export default ActivityScreen;
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { BarChart } from 'react-native-chart-kit';
import { SafeAreaView } from 'react-native-safe-area-context';

const ActivityScreen = () => {


  return (
    <SafeAreaView style={styles.container}>
      <View style={{alignItems: "center" }}>     
        <Text>Bar Chart</Text>
        </View>
        <View style={{margin:10}}>
        <BarChart
          data={{
            labels: ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"],
            datasets: [
              {
                data: [4, 3, 5, 7, 6, 5, 4],
              },
            ],
          }}
          width={Dimensions.get('window').width -20}
          height={240}

          chartConfig={{
            backgroundColor: '#1cc910',
            backgroundGradientFrom: '#eff3ff',
            backgroundGradientTo: '#efefef',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
              
            },
          }}
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
        </View>

      
    </SafeAreaView>
  );
};
export default ActivityScreen
const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#DBF3FA',
  },
});

