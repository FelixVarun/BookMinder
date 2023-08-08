import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { auth } from '../firebase-config';
import { signOut } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

const SettingScreen = () => {
  const user = auth.currentUser;
  const navigation = useNavigation();
  const signOutUser = () => {
    signOut(auth).then(() => {
      navigation.replace("Signin");
    }).catch(err => {
      console.log(err);
    })
  }
  return (
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
  )
}

export default SettingScreen
