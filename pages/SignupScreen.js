
import { Alert, Button, KeyboardAvoidingView, Pressable, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { SafeAreaView } from 'react-native-safe-area-context'
import { auth, db} from '../firebase-config';
import { useNavigation } from '@react-navigation/native';
import { doc, setDoc } from 'firebase/firestore';



const SignupScreen = () => {
  
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [name, setName] = useState('');

    const navigation = useNavigation();

    const clearForm=()=>{
        setEmail('');
        setPassword('');
        setPhone('');
        setName('');
    }

    const SignupUser = () => {
        if (email === "" || password === "" || phone === "" || name === "") {
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
        } else {
            try {
                createUserWithEmailAndPassword(auth, email, password)
                    .then((userCredential) => {
                        console.log("user credential", userCredential);
                        const user = userCredential.user;
                        const myUserUid = user.uid;
    
                        // Store user data in Firestore
                        setDoc(doc(db, "users", `${myUserUid}`), {
                            name: name,
                            email: email,
                            phone: phone
                        }).then(() => {
                            // Successfully stored user data, navigate to the next screen or perform any other action
                            console.log("User data stored successfully.");
                            navigation.navigate('Main'); // Replace 'NextScreen' with the name of the screen you want to navigate to.
                            clearForm();
                        }).catch(error => {
                            console.error("Error storing user data:", error);
                            // Handle the error
                        });
                    })
                    .catch(error => {
                        console.error("Error creating user:", error.message);
                        // Handle the error, and you can access the error message with error.message
                    });
            } catch (error) {
                console.error("Error in createUserWithEmailAndPassword:", error.message);
                // Handle any unexpected errors here
            }
        }
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
        Name
    </Text>

    <TextInput
        placeholder='enter your name'
        placeholderTextColor={"black"}
        value={name}
        onChangeText={text => setName(text)}
        style={{
            fontSize: name ? 18 : 18,
            borderBottomColor: "gray",
            borderBottomWidth: 1,
            marginVertical: 10,
            width: 300,
        }}
    />
</View>
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
