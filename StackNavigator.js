

import SignupScreen from "./pages/SignupScreen";
import SigninScreen from "./pages/SigninScreen";
import HighlightScreen from "./pages/HighlightScreen";
import SettingScreen from "./pages/SettingScreen";
import HomeScreen from "./pages/HomeScreen";
import ActivityScreen from "./pages/ActivityScreen";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons, Entypo, Foundation } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import AddNewForm from "./components/AddNewForm";
// import { DetailsProvider } from "./components/DetailsContext";
import ReadingCard from "./components/ReadingCard";
import ReminderScreen from "./pages/ReminderScreen";
import TimeandPageScreen from "./pages/TimeandPageScreen";
import TimeElapsedScreen from "./pages/TimeElapsedScreen";
import DetailsUpdatingScreen from "./pages/DetailsUpdatingScreen";
import { useAuthState, onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "./firebase-config";
import NotesScreen from "./pages/NotesScreen";
import PhotosScreen from "./pages/PhotosScreen";

const Navigation = () => {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();
  const HomeStack = createNativeStackNavigator();
  const AuthStack = createNativeStackNavigator();

  const [user, setUser] = useState(null); // State to store the user

  useEffect(() => {
    const checkUser = async () => {
      const storedUid = await AsyncStorage.getItem('userUid');
      console.log("storedUid..............",storedUid)
      setUser(storedUid);
    };

    checkUser();
  }, []);


  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (user) => {
  //     setUser(user);
  //   });

  //   // Cleanup subscription when component unmounts
  //   return () => unsubscribe();
  // }, []);

  function BottomTabs() {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name="Homez"
          component={HomeScreen}
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

        <Tab.Screen
          name="Activityz"
          component={ActivityScreen}
          options={{
            tabBarLabel: "Activity",
            tabBarLabelStyle: { color: "black" },
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Ionicons name="analytics-sharp" size={24} color="#7D3C98" />
              ) : (
                <Ionicons name="analytics-outline" size={24} color="black" />
              ),
          }}
        />

        <Tab.Screen
          name="Highlights"
          component={HighlightScreen}
          options={{
            tabBarLabel: "Highlight",
            tabBarLabelStyle: { color: "black" },
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Foundation name="quote" size={24} color="#7D3C98" />
              ) : (
                <Foundation name="quote" size={24} color="black" />
              ),
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingScreen}
          options={{
            tabBarLabel: "Settings",
            tabBarLabelStyle: { color: "black" },
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Ionicons name="settings" size={24} color="#7D3C98" />
              ) : (
                <Feather name="settings" size={24} color="black" />
              ),
          }}
        />
      </Tab.Navigator>
    );
  }

  function HomeStackNavigation() {
    return (
    <HomeStack.Navigator
      initialRouteName="BottomTabs"
      screenOptions={{ orientation: "portrait" }}
    >
      <HomeStack.Screen
        name="BottomTabs"
        component={BottomTabs}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="AddNew"
        component={AddNewForm}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="Timeandpage"
        component={TimeandPageScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="Reminder"
        component={ReminderScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="Reading"
        component={ReadingCard}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="Details"
        component={DetailsUpdatingScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="TimeElapsed"
        component={TimeElapsedScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="Notes"
        component={NotesScreen}
        options={{
          headerStyle: { backgroundColor: "#000000" },
          headerTintColor: "#fff",
        }}
      />
      <HomeStack.Screen name="Photos" component={PhotosScreen} />
    </HomeStack.Navigator>
    )
  }

  const AuthStackNavigation = () => {
    return (
      <AuthStack.Navigator
        initialRouteName={user ? "BottomTabs" : "Signin"}
        screenOptions={{ orientation: "portrait" }}
      >
        <AuthStack.Screen
          name="Signin"
          component={SigninScreen}
          options={{ headerShown: false }}
        />
        <AuthStack.Screen
          name="Signup"
          component={SignupScreen}
          options={{ headerShown: false }}
        />
      </AuthStack.Navigator>
    );
  };

  return (
    <NavigationContainer>
        {user ? (
          <HomeStackNavigation/>
        ) : (
          <AuthStackNavigation/>
        )}
    </NavigationContainer>
  );
};

export default Navigation;
