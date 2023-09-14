import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { theme } from './../src/core/theme';
import AppLogo from './../assets/icon.png';
import Background from '../src/components/Background';

const AboutScreen = ({ navigation }) => {
  return (
    <Background>
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={AppLogo} style={styles.logo} />
        <Text style={styles.appName}>The Orchard</Text>
      </View>
      <Text style={styles.description}>
        At The Orchard, we connect you to the heart of agriculture. Our mission is simple: to empower consumers and businesses with real-time, up-to-date information on what farmers are offering in the market. We believe in transparency, efficiency, and sustainability in the agricultural supply chain. With The Orchard, you can make informed decisions, support local farmers, and contribute to a greener future. Join us on this journey of growth, taste the freshness, and nurture a sustainable world. Welcome to The Orchard.
      </Text>
      <Text style={styles.version}>Version 1.0.0</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate('Location');
        }}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center', // Center vertically
    alignItems: 'center',     // Center horizontally
    padding: 20,
    marginTop: 100,
    marginBottom: 100,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    color: theme.colors.primary,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    color: theme.colors.text,
  },
  version: {
    fontSize: 14,
    color: theme.colors.text,
  },
  button: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default AboutScreen;
