import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Alert, Text } from 'react-native';

const ProfileScreen = ({ navigation }) => {
  const [countyName, setCountyName] = useState('');
  const [subcounty, setSubcounty] = useState('');
  const [ward, setWard] = useState('');
  const [village, setVillage] = useState('');
  const [altPerson, setAltPerson] = useState('');
  const [altContact, setAltContact] = useState('');

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/profile', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const profileData = await response.json();
        setCountyName(profileData.county_name);
        setSubcounty(profileData.subcounty);
        setWard(profileData.ward);
        setVillage(profileData.village);
        setAltPerson(profileData.alt_person);
        setAltContact(profileData.alt_contact);
      } else {
        throw new Error('Failed to fetch profile data');
      }
    } catch (error) {
      Alert.alert('Profile Error', error.message);
    }
  };

  const updateProfile = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/update-profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          county_name: countyName,
          subcounty: subcounty,
          ward: ward,
          village: village,
          alt_person: altPerson,
          alt_contact: altContact,
        }),
      });

      if (response.ok) {
        Alert.alert('Success', 'Profile updated successfully');
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }
    } catch (error) {
      Alert.alert('Update Profile Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Profile</Text>
      </View>
      <View style={styles.form}>
        <TextInput
          placeholder="County Name"
          value={countyName}
          onChangeText={setCountyName}
          style={styles.input}
        />
        <TextInput
          placeholder="Subcounty"
          value={subcounty}
          onChangeText={setSubcounty}
          style={styles.input}
        />
        <TextInput
          placeholder="Ward"
          value={ward}
          onChangeText={setWard}
          style={styles.input}
        />
        <TextInput
          placeholder="Village"
          value={village}
          onChangeText={setVillage}
          style={styles.input}
        />
        <TextInput
          placeholder="Alternate Person"
          value={altPerson}
          onChangeText={setAltPerson}
          style={styles.input}
        />
        <TextInput
          placeholder="Alternate Contact"
          value={altContact}
          onChangeText={setAltContact}
          style={styles.input}
        />
        <Button title="Update Profile" onPress={updateProfile} />
      </View>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    color: '#000',
    fontWeight: 'bold',
  },
  form: {
    width: 300,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    marginTop: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
};

export default ProfileScreen;
