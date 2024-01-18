import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Background from '../src/components/Background'
import Logo from '../src/components/Logo'
import Header from '../src/components/Header'
import Button from '../src/components/Button'
import Paragraph from '../src/components/Paragraph'
import BackButton from '../src/components/BackButton'
import { theme } from '../src/core/theme'
import { emailValidator } from '../src/helpers/emailValidator'
import { passwordValidator } from '../src/helpers/passwordValidator'
import TextInput from '../src/components/TextInput'

const UserTypeSelectionScreen = ({ navigation,route }) => {
  var loc = route.params.location.coords.latitude+","+route.params.location.coords.longitude
  const handleFarmerRegistration = async () => {

    
    navigation.navigate('Register', { role: 1,location:loc });
  };

  const handleCustomerRegistration = () => {
    navigation.navigate('Register', { role: 0,location:loc });
  };
  const handlefarmSpecialistRegistration = () => {
    navigation.navigate('Register', { role: 2,location:loc });
  };

  return (
   
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
    <Header>The Orchard</Header>
    <Paragraph >
      Why are you here?.
    </Paragraph>
    <TouchableOpacity
        style={styles.button}
        mode="outlined"
      title="Farmer" onPress={handleFarmerRegistration}
        // onPress={handleLogin}
      >
        <Text style={styles.buttonText}>Farmer</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        mode="outlined"
      title="Customer" onPress={handleCustomerRegistration}
        // onPress={handleLogin}
      >
        <Text style={styles.buttonText}>Customer</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        mode="outlined"
      title="Farmer" onPress={handlefarmSpecialistRegistration}
        // onPress={handleLogin}
      >
        <Text style={styles.buttonText}>Farm Support</Text>
      </TouchableOpacity>
    {/* <Button
      mode="outlined"
      title="Farmer" onPress={handleFarmerRegistration}
    >
      Grower
    </Button>
    <Button
      mode="outlined"
      title="Customer" onPress={handleCustomerRegistration} 
    >
      Buyer
    </Button> */}
  </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonContainer: {
    width: '80%',
    marginBottom: 20,
    borderColor: 'black',
  },
  button: {
    backgroundColor: '#cecece',
    borderColor: '#000',
    paddingVertical: 12,
    borderRadius: 50,
    marginTop: 10,
    marginBottom: 20,
    width : 200
  },
  buttonText: {
    borderColor: '#528508',
    fontSize: 16,
    color: 'green',
    fontWeight: 'bold',
    textAlign :'center',
    fontWeight: '800',
  },
});

export default UserTypeSelectionScreen;
