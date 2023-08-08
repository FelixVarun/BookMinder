
import { Alert, Button, KeyboardAvoidingView, Pressable, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { SafeAreaView } from 'react-native-safe-area-context'
import { auth ,db,doc, setDoc} from '../firebase-config';
import { useNavigation } from '@react-navigation/native';



const SignupScreen = () => {
  
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const navigation = useNavigation();

    const SignupUser = () => {
        if(email === "" || password === "" || phone === ""){
          Alert.alert(
            "Invalid Details",
            "Please fill all the details",
            [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "OK", onPress: () => console.log("OK Pressed") }
            ],
            { cancelable: false }
          );
        }
        createUserWithEmailAndPassword(auth,email,password).then((userCredential) => {
          console.log("user credential",userCredential);
          const user = userCredential._tokenResponse.email;
          const myUserUid = auth.currentUser.uid;
  
          setDoc(doc(db,"users",`${myUserUid}`),{
            email:user,
            phone:phone
          })
        })
      }
    
    return (
        <SafeAreaView

            style={{
                flex: 1,
                backgroundColor: "#e6dada",
                padding: 10,
                alignItems: "center",
            }}
        >
            <KeyboardAvoidingView>
                <View
                    style={{
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: 100,
                    }}
                >
                    <Text style={{  color: "#5D4157", fontSize: 17, fontWeight: "700" }}>
                        Sign up
                    </Text>

                    <Text style={{ marginTop: 15, fontSize: 18, fontWeight: "500" }}>
                        Sign In to Your Account
                    </Text>
                </View>

                <View style={{ marginTop: 50 }}>
                    <View>
                        <Text style={{ fontSize: 18, fontWeight: "600", color: "gray" }}>
                            Email
                        </Text>

                        <TextInput
                            placeholder='enter your email '
                            placeholderTextColor={"black"}
                            value={email} onChangeText={text => setEmail(text)}
                            style={{
                                fontSize: email ? 18 : 18,
                                borderBottomColor: "gray",
                                borderBottomWidth: 1,
                                marginVertical: 10,
                                width: 300,
                            }} />
                    </View>
                    <View style={{ marginTop: 15 }}>
                        <Text style={{ fontSize: 18, fontWeight: "600", color: "gray" }}>
                            Password
                        </Text>

                        <TextInput
                            placeholder='enter the password'
                            value={password}
                            secureTextEntry={true}
                            placeholderTextColor={"black"}
                            onChangeText={text => setPassword(text)}
                            style={{
                                fontSize: password ? 18 : 18,
                                borderBottomColor: "gray",
                                borderBottomWidth: 1,
                                marginVertical: 10,
                                width: 300,
                            }}
                        />
                        <Text style={{ fontSize: 18, fontWeight: "600", color: "gray" }}>
                            Phone
                        </Text>
                        <TextInput
                            placeholder='enter the phoneNo'
                            value={phone}
                           
                            placeholderTextColor={"black"}
                            onChangeText={text => setPhone(text)}
                            style={{
                                fontSize: password ? 18 : 18,
                                borderBottomColor: "gray",
                                borderBottomWidth: 1,
                                marginVertical: 10,
                                width: 300,
                            }}
                        />
                    </View>
                    <Pressable
          onPress={SignupUser}
            style={{
              width: 200,
              backgroundColor: "#5D4157",
              padding: 15,
              borderRadius: 25,
              marginTop: 50,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <Text style={{ fontSize: 18, textAlign: "center", color: "white" }}>
              Signup
            </Text>
          </Pressable>
                   
                    <Pressable onPress={() => navigation.goBack()}>
                        <Text style={{
                            textAlign: "center",
                            marginTop: 20,
                            color: "gray",
                            fontSize: 17
                        }}>Already have an account signIn</Text>
                    </Pressable>
                </View>
            </KeyboardAvoidingView>

        </SafeAreaView >
    )
}

export default SignupScreen

