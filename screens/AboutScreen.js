import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Animated, ImageBackground } from 'react-native';
import { theme } from './../src/core/theme';
import Background from '../src/components/Background';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons from Expo for icons
import { MaterialIcons } from '@expo/vector-icons'; // Import MaterialIcons from Expo for icons

const AboutScreen = ({ navigation }) => {

  const [scaleValue] = useState(new Animated.Value(1));

  // Get the current time
  const currentTime = new Date().getHours();
  let greeting;

  // Set the greeting based on the current time
  if (currentTime < 12) {
    greeting = 'Good Morning';
  } else if (currentTime < 18) {
    greeting = 'Good Afternoon';
  } else {
    greeting = 'Good Evening';
  }

  return (
    <View style={styles.background}>
      

            
      <View style={styles.header}>
        <TouchableOpacity onPress={() => {/* Handle notification icon press */}}>
          <Ionicons name="notifications-outline" size={35} color="#0a6622" />
        </TouchableOpacity>
        <Image source={require('./../assets/logo.png')} style={styles.logo} />
        <TouchableOpacity onPress={() => {/* Handle settings icon press */}}>
          <MaterialIcons name="settings" size={35} color="#0a6622" />
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <Text style={styles.greeting}>{greeting}</Text>
        <View style={styles.logoContainer}>
          <Text style={styles.appName}>The Ultimate Weather Predictor</Text>
        </View>
        <View style={styles.cardContainer}>
          {/* Render five cards */}
          
          <TouchableOpacity style={styles.card}>
            <Ionicons name="sunny" size={24} color="#fd6a02" />
            <Text style={styles.cardText}>Solar Forecasting</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.card}>
            <Ionicons name="flash" size={24} color="#fd6a02" />
            <Text style={styles.cardText}>Wind Forecasting</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.card} onPress={() => {
            navigation.navigate('Weather');
          }}>
            <MaterialIcons name="warning" size={24} color="#fd6a02" />
            <Text style={styles.cardText} >Hazard Watch</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.card}>
            <MaterialIcons name="help" size={24} color="#fd6a02" />
            <Text style={styles.cardText}>Help</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.card}>
            <MaterialIcons name="notifications" size={24} color="#fd6a02" />
            <Text style={styles.cardText}>Alerts</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate('Location');
          }}
        >
          
          <Text style={styles.buttonText}>Get instant Alerts</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#FFFFFF', // Set background color here
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20,
    alignItems: 'center',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
},
  logo: {
    width: 120,
    height: 24,
    marginLeft: 60,
    marginRight: 60,
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 0,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: -50,
    marginBottom: 30,
  },
  appName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 50,
    marginBottom: 20,
    color: theme.colors.primary,
  },
  greeting: {
    fontSize: 28,
    marginBottom: 10,
    color: theme.colors.text,
    fontFamily: 'Roboto', // Add font family
    textAlign: 'center',
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
    paddingLeft: 20,
    paddingRight: 20,
    paddingHorizontal: 0,
    marginBottom: 20,
  },
  card: {
    backgroundColor: 'white',
    width: '48%', 
    height: 100, 
    padding: 20,
    borderRadius: 10,
    elevation: 10,
    marginBottom: 20,
    flexDirection: 'column', // Align icon and text horizontally
    alignItems: 'center', // Align icon and text vertically
  },
  cardText: {
    fontSize: 15,
    marginLeft: 0, 
    alignItems: 'center',
    fontFamily: 'Roboto', // Add spacing between icon and text
  },
  button: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default AboutScreen;
