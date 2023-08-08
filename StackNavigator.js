import SignupScreen from "./pages/SignupScreen";
import SigninScreen from "./pages/SigninScreen";
import HighlightScreen from "./pages/HighlightScreen";
import SettingScreen from "./pages/SettingScreen";
import HomeScreen from "./pages/HomeScreen";
import ActivityScreen from "./pages/ActivityScreen";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons, Entypo, Foundation } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import AddNewForm from "./components/AddNewForm";
// import { DetailsProvider } from "./components/DetailsContext";
import ReadingCard from "./components/ReadingCard";
import ReminderScreen from "./pages/ReminderScreen";
import TimeandPageScreen from "./pages/TimeandPageScreen";
import TimeElapsedScreen from "./pages/TimeElapsedScreen";
import DetailsUpdatingScreen from "./pages/DetailsUpdatingScreen";
import { useAuthState,onAuthStateChanged } from 'firebase/auth'
import React, { useEffect, useState } from 'react';
import { auth } from "./firebase-config";

const Navigation = () => {
    const Stack = createNativeStackNavigator();
    const Tab = createBottomTabNavigator();
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (authUser) => {
            setUser(authUser);
            if (initializing) {
                setInitializing(false);
            }
        });

        return unsubscribe;
    }, []);

    if (initializing) {
        // You can render a loading screen here if needed
        return null;
    }
    function BottomTabs() {
return(

                <Tab.Navigator>
                    <Tab.Screen name="Homez" component={HomeScreen}
                        options={{
                            tabBarLabel: "Home",
                            tabBarLabelStyle: { color: "black" },
                            headerShown: false,
                            tabBarIcon: ({ focused }) =>
                                focused ? (
                                    <Ionicons name="ios-home" size={24} color="#7D3C98" />
                                ) : (
                                    <Ionicons name="home-outline" size={24} color="black" />
                                ),

                        }}
                    />

                    <Tab.Screen name="Activityz" component={ActivityScreen}
                        options={{
                            tabBarLabel: "Activity",
                            tabBarLabelStyle: { color: "black" },
                            headerShown: false,
                            tabBarIcon: ({ focused }) =>
                                focused ? (
                                    <Ionicons name="analytics-sharp" size={24} color="#7D3C98" />
                                ) : (
                                    <Ionicons name="analytics-outline" size={24} color="black" />
                                )

                        }}
                    />

                    <Tab.Screen name="Highlights" component={HighlightScreen}
                        options={{
                            tabBarLabel: "Highlight",
                            tabBarLabelStyle: { color: "black" },
                            headerShown: false,
                            tabBarIcon: ({ focused }) =>
                                focused ? (
                                    <Foundation name="quote" size={24} color="#7D3C98" />
                                ) : (
                                    <Foundation name="quote" size={24} color="black" />
                                )

                        }}
                    />
                    <Tab.Screen name="Settings" component={SettingScreen}
                        options={{
                            tabBarLabel: "Settings",
                            tabBarLabelStyle: { color: "black" },
                            headerShown: false,
                            tabBarIcon: ({ focused }) =>
                                focused ? (
                                    <Ionicons name="settings" size={24} color="#7D3C98" />
                                ) : (
                                    <Feather name="settings" size={24} color="black" />
                                )

                        }}
                    />
                </Tab.Navigator>
)

                    }
    


    return (

        <NavigationContainer>
            {/* <DetailsProvider> */}
                <Stack.Navigator>

                {user ? (
          <Stack.Screen name="Main" component={BottomTabs} options={{ headerShown: false }} />
        ) : (
          <>
            <Stack.Screen name="Signin" component={SigninScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }} />
          </>
        )}        
                    <Stack.Screen name="AddNew" component={AddNewForm} options={{ headerShown: false }} />
                    <Stack.Screen name="Reminder" component={ReminderScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="Timeandpage" component={TimeandPageScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="Reading" component={ReadingCard} options={{ headerShown: false }} />
                    <Stack.Screen name="Details" component={DetailsUpdatingScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="TimeElapsed" component={TimeElapsedScreen} options={{ headerShown: false }} />

                </Stack.Navigator>
            {/* </DetailsProvider> */}
        </NavigationContainer>
    )
}
export default Navigation;