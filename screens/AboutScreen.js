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
      <View style={styles.descriptionContainer}>
        <Text style={styles.description}>
          Welcome to The Orchard, where we connect you to the heart of agriculture. Our mission is to empower consumers and businesses with real-time, up-to-date information on what farmers are offering in the market. We believe in transparency, efficiency, and sustainability in the agricultural supply chain.
        </Text>
        <Text style={styles.description}>
          With The Orchard, you can make informed decisions, support local farmers, and contribute to a greener future. Join us on this journey of growth, taste the freshness, and nurture a sustainable world.
        </Text>
      </View>
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
    backgroundColor: theme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },
  appName: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 10,
    color: theme.colors.primary,
  },
  descriptionContainer: {
    marginTop: 10,
    marginBottom: 20,
  },
  description: {
    textAlign: 'center',
    fontSize: 16,
    color: theme.colors.text,
    marginBottom: 10,
    lineHeight: 22,
  },
  version: {
    fontSize: 14,
    color: theme.colors.secondary,
    marginBottom: 10,
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
