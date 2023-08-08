import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


const TimeElapsedScreen = () => {
  
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    let interval = null;

    if (isRunning) {
      interval = setInterval(() => {
        setElapsedTime((prevElapsedTime) => prevElapsedTime + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isRunning]);

  const startStopwatch = () => {
    setIsRunning(true);
  };

  const stopStopwatch = () => {
    setIsRunning(false);
  };

  const resetStopwatch = () => {
    setElapsedTime(0);
    setIsRunning(false);
  };

  const formatTime = (milliseconds) => {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    const centiseconds = Math.floor((milliseconds % 1000) / 10);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${centiseconds.toString().padStart(2, '0')}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={{ fontWeight: 500, fontSize: 20, marginTop: 30, }}>TIME ELAPSED</Text>
      <Text style={styles.timeText}>{formatTime(elapsedTime)}</Text>

      <Image source={{ uri: details.image }} style={{ width: 190, height: 250,borderRadius:15 }} />
      <Text style={{ marginTop: 20, fontSize: 19, fontWeight: "bold" }}>{details.bookname}</Text>
      <Text style={{ fontWeight: 400 }}>{details.authorname}</Text>
      <View style={styles.buttonsContainer}>
        {!isRunning ? (
          <TouchableOpacity style={styles.button} onPress={startStopwatch}>
            <Text style={styles.buttonText}>Start</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.button} onPress={stopStopwatch}>
            <Text style={styles.buttonText}>Stop</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.button} onPress={resetStopwatch}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
      </View>
      <Text style={{
        paddingHorizontal: 40,
        paddingVertical: 10,
        marginHorizontal: 5,
        marginTop:40,
        fontSize: 20,
        backgroundColor: "#00308F",
        color: "white",
        borderWidth: 2,
        padding: 15,
        borderRadius: 30,
        borderColor: "transparent",
        textAlign: "center",
        justifyContent: "center"
      }}>Done</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {

    alignItems: 'center',
    justifyContent: 'center',
  },
  timeText: {
    marginTop: 30,
    fontSize: 24,
    marginBottom: 30,
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  button: {
    paddingHorizontal: 40,
    paddingVertical: 10,
    marginHorizontal: 5,
    backgroundColor: 'lightblue',
    marginTop: 100,
    borderRadius: 20
  },
  buttonText: {
    fontSize: 20,
  },
});

export default TimeElapsedScreen

