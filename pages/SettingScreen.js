<<<<<<< HEAD
import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { auth, db } from '../firebase-config';
import { signOut } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect } from 'react';
import { useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { FontAwesome5, Ionicons, MaterialIcons, Octicons } from '@expo/vector-icons';
=======
import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { auth } from '../firebase-config';
import { signOut } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
>>>>>>> e1005bcffff272dc4dc3708e7c07b5328847cd4e

const SettingScreen = () => {
  const user = auth.currentUser;
  const navigation = useNavigation();
<<<<<<< HEAD

=======
>>>>>>> e1005bcffff272dc4dc3708e7c07b5328847cd4e
  const signOutUser = () => {
    signOut(auth).then(() => {
      navigation.replace("Signin");
    }).catch(err => {
      console.log(err);
    })
  }
  return (
<<<<<<< HEAD
    <LinearGradient colors={["#ad5389", "#3c1053"]} style={{ flex: 1 }}>
      <SafeAreaView>
<View style={{margin:5  }}>
        <View style={{ margin: 7, padding: 10 }}>
          <Text style={{ fontSize: 23, fontWeight: "bold" }}>Settings</Text>
        </View>
        <View>

          <View style={{ backgroundColor: "white", borderRadius: 10 }}>

            <TouchableOpacity style={styles.container}>
              <View style={{ flexDirection: "row", alignItems: "center", }}>
                <Ionicons name="notifications-outline" size={30} color="black" />
                <Text style={{ fontSize: 22 }}> Notifications</Text>
              </View>
              <MaterialIcons name="keyboard-arrow-right" size={30} color="black" />
            </TouchableOpacity >

            <TouchableOpacity style={styles.container}>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                <Ionicons name="moon-outline" size={26} color="black" />
                <Text style={{ fontSize: 22 }}>App Themes</Text>
              </View>
              <MaterialIcons name="keyboard-arrow-right" size={30} color="black" />
            </TouchableOpacity>

          </View>


          <View>
            <Text style={{ fontSize: 20, color: "white", padding: 10 }}>Favorites</Text>
          </View>

          <View style={{ backgroundColor: "white", borderRadius: 10, }}>
            <TouchableOpacity style={styles.container}>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                <Ionicons name="star-outline" size={26} color="black" />
                <Text style={{ fontSize: 22 }}>Rate us</Text>
              </View>
              <MaterialIcons name="keyboard-arrow-right" size={30} color="black" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.container}>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
                <Ionicons name="paper-plane-outline" size={26} color="black" />
                <Text style={{ fontSize: 22 }}>Feedback</Text>
              </View>
              <MaterialIcons name="keyboard-arrow-right" size={30} color="black" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.container}>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
                <Ionicons name="trash-outline" size={26} color="black" />
                <Text style={{ fontSize: 22 }}>Erase all Data</Text>
              </View>
              <MaterialIcons name="keyboard-arrow-right" size={30} color="black" />
            </TouchableOpacity>


            <TouchableOpacity style={styles.container}>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
                <Ionicons name="alert-circle-outline" size={28} color="black" />
                <Text style={{ fontSize: 22 }}>Privacy policy</Text>
              </View>
              <MaterialIcons name="keyboard-arrow-right" size={30} color="black" />
            </TouchableOpacity>


            <TouchableOpacity style={styles.container}>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
                <Ionicons name="ios-shield-checkmark-outline" size={26} color="black" />
                <Text style={{ fontSize: 22 }}>Terms and Condition</Text>
              </View>
              <MaterialIcons name="keyboard-arrow-right" size={30} color="black" />
            </TouchableOpacity>




          </View>

          <View>
            <Text style={{ fontSize: 20, color: "white", padding: 10 }}>Genral</Text>
          </View>

          <View style={{ backgroundColor: "white", borderRadius: 10, }}>
            <TouchableOpacity onPress={signOutUser} style={styles.container}>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
                <Octicons name="sign-out" size={26} color="black" />
                <Text style={{ fontSize: 22, color: "red" }}>Sign Out</Text>
              </View>
              <MaterialIcons name="keyboard-arrow-right" size={30} color="black" />
            </TouchableOpacity>
          </View>

        </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
=======
    <SafeAreaView
      style={{
        backgroundColor: "#DBF3FA",
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
      }}>
      <View>
        <Pressable style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 20 }}>welcome {user.email}</Text>
        </Pressable>

        <Pressable onPress={signOutUser}>
          <Text
            style={{
              fontSize: 20,
              textAlign: "center",
              color: "white",
              borderWidth: 1,
              padding: 15,
              margin: 40,
              backgroundColor: "#1d5a80",
              borderColor:"transparent",
              borderRadius:15
            }}>Sign Out</Text>
        </Pressable>
      </View>
    </SafeAreaView>
>>>>>>> e1005bcffff272dc4dc3708e7c07b5328847cd4e
  )
}

export default SettingScreen
<<<<<<< HEAD

const styles = StyleSheet.create({

  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 13,
    borderBottomWidth: 0.3
  }



})
=======
>>>>>>> e1005bcffff272dc4dc3708e7c07b5328847cd4e
