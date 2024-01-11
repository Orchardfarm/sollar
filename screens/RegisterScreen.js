import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, Alert, Text } from 'react-native';
import * as base from "../env";
import Background from '../src/components/Background'
import Header from '../src/components/Header'
import Button from '../src/components/Button'
import TextInput from '../src/components/TextInput'
import { theme } from '../src/core/theme'
import BackButton from "../src/components/BackButton";
import Logo from '../src/components/Logo'
import AsyncStorage from '@react-native-async-storage/async-storage';

var url = base.BASE_URL

const RegistrationScreen = ({ navigation, route }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [first_name, setFName] = useState('');
  const [last_name, setLname] = useState('');
  const [national_id, setID] = useState('');
  const [phone_number, setPhone] = useState('');

  const handleRegistration = async () => {
    try {
      const requestData = {
        user: {
          email,
          password,
          first_name,
          last_name,
          national_id,
          phone_number,
          role: route.params.role,
          location: route.params.location,
        }
      };

      const response = await fetch(url+'/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        // Registration successful, show an alert and navigate
        Alert.alert('Success', 'Registered Successfully!!', [
          { text: 'OK', onPress: () => handleNavigation() }
        ]);
      } else {
        // Registration failed, show an error alert
        Alert.alert('Error', 'The email or the national id or the phone number already exists');
      }
    } catch (error) {
      console.error('Registration error:', error);
      Alert.alert('Error', 'An error occurred during registration.');
    }
  };

  const handleNavigation = () => {
    // Navigate based on the role parameter
    if (route.params.role === 1) {
      navigation.navigate('FarmerDashboard');
    } else if (route.params.role === 0) {
      navigation.navigate('CustomerDashboard');
    } else {
      navigation.navigate('Location');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Background>
        <BackButton goBack={navigation.goBack} />
        <Logo />
        <Header>Create Account</Header>

        <TextInput
          placeholder="Email"
          onChangeText={(text) => setEmail(text)}
          value={email}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
          value={password}
          style={styles.input}
        />
        <TextInput
          placeholder="First name"
          onChangeText={(text) => setFName(text)}
          value={first_name}
          style={styles.input}
        />
        <TextInput
          placeholder="Last name"
          onChangeText={(text) => setLname(text)}
          value={last_name}
          style={styles.input}
        />
        <TextInput
          placeholder="National ID"
          onChangeText={(text) => setID(text)}
          value={national_id}
          style={styles.input}
        />
        <TextInput
          keyboardType="numeric"
          placeholder="Phone number"
          onChangeText={(text) => setPhone(text)}
          value={phone_number}
          style={styles.input}
        />
        <TouchableOpacity
          style={styles.button}
          mode="contained"
          title="Farmer" onPress={handleRegistration}
        // onPress={handleLogin}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
        {/* <Button
          mode="contained"
          onPress={handleRegistration}
style={{ marginTop: 24 }}
        >
          Sign Up
        </Button> */}
        <View style={styles.row}>
          <Text>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.replace('Login')}>
            <Text style={styles.link}>Login</Text>
          </TouchableOpacity>
        </View>

      </Background>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center", // Vertically center the content
  },
  button: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 12,
    borderRadius: 50,
    marginTop: 10,
    marginBottom: 20,
    width: 300,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
});

export default RegistrationScreen;