import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Platform, TouchableOpacity } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Device from 'expo-device';
import * as Location from 'expo-location';
import Background from '../src/components/Background'
import Button from '../src/components/Button'

const Locations = ({ navigation }) => {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    // useEffect(() => {
    //     const checkLocation = async () => {
    //         try {
    //             console.log('Requesting location permissions...');
    //             if (Platform.OS === 'android' && !Device.isDevice) {
    //                 setErrorMsg(
    //                     'Oops, this will not work on Snack in an Android Emulator. Try it on your device!'
    //                 );
    //                 return;
    //             }
    //             let { status } = await Location.requestForegroundPermissionsAsync();
    //             if (status !== 'granted') {
    //                 setErrorMsg('Permission to access location was denied');
    //                 return;
    //             }

    //             let location = await Location.getCurrentPositionAsync({});
    //             setLocation(location);
    //             let address = await Location.reverseGeocodeAsync(location.coords)
    //             var place = address[0].name + ", " + address[0].district
    //             var locs = location.coords.latitude + "" + location.coords.longitude
    //             console.log(location)

    //             //alert(locs)
    //             AsyncStorage.setItem("address", place)
    //             AsyncStorage.setItem("location", locs)
    //             console.log('Location obtained:', location);
    //         } catch (e) {
    //             //alert(e)
    //         }
    //     }
    // }, []);
    const checkLocation = async () => {
        try {
          if (Platform.OS === 'android' && !Device.isDevice) {
            setErrorMsg(
              'Oops, this will not work on Snack in an Android emulator. Try it on your device!'
            );
            return;
          }
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
          }
    
          let location = await Location.getCurrentPositionAsync({});
          setLocation(location);
          let address = await Location.reverseGeocodeAsync(location.coords)
          var place = address[0].name + ", " + address[0].district
          var locs = location.coords.latitude + "" + location.coords.longitude
          //alert(locs)
          AsyncStorage.setItem("address", place)
          AsyncStorage.setItem("location", locs)
    
        } catch (e) {
          //alert(e)
        }
      }


    let text = 'Waiting..';
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = JSON.stringify(location);
    }

    const go = () => {
        checkLocation();

    }
    const gotoLogin = async () => {
        navigation.navigate('Login', { location: location });
    }

    const gotoUserType = async () => {
        try {

            if (location == null) {

                alert("Please turn on location");
            } else {

                navigation.navigate('UserType', { location: location });
            }
        } catch (e) {
            alert(e)
        }

    }

    return (
        <Background>

            <TouchableOpacity onPress={checkLocation} style={styles.circle}>

                <Image style={{
                    alignContent: "center",
                    justifyContent: "center",
                    width: "80%",
                    height: "90%",
                    resizeMode: 'contain'

                }}
                    source={require("../assets/location.png")} />
            </TouchableOpacity>
            <Text style={styles.heading}>Turn on Location</Text>
            <Text style={styles.text}>Tap the location icon to enable location.</Text>


            <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />


            <Button
                mode="contained"
                onPress={gotoLogin}
            >
                Login
            </Button>
            <Button
                mode="outlined"
                onPress={gotoUserType}
            >
                Sign Up
            </Button>
        </Background>

    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    image: {
        marginTop: 50,
        width: "50%",
        resizeMode: 'contain'

    },
    heading: {
        marginTop: 40,
        fontSize: 20,
        width: "60%",
        fontWeight: "bold",
        justifyContent: "center",
        alignContent: "center",
        textAlign: "center",


    },
    text: {
        marginTop: 20,
        fontSize: 16,
        width: "60%",
        textAlign: "center",
        justifyContent: "center",
        alignContent: "center"

    },
    circle: {
        backgroundColor: "#dedede",
        height: 250,
        width: 250,
        borderRadius: 125,
        alignContent: "center",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 40
    },
    bottom: {

        justifyContent: 'center',
        width: "100%",
        alignSelf: 'flex-end',
        flexDirection: 'row',
        alignContent: 'flex-end'
    },
    signupBtn: {
        width: "40%",
        borderRadius: 20,
        height: 60,
        alignItems: "center",
        justifyContent: "center",
        borderColor: "#528508",
        borderWidth: 2
    },

    signinBtn: {
        width: "40%",
        borderRadius: 20,
        height: 60,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#104D73",
    },
    spacingView: {
        width: '10%'
    },
    signupText: {
        color: "#324d78",
        fontSize: 16,
        letterSpacing: 5,
        fontWeight: 'bold'
    },

    signinText: {
        color: "#fff",
        fontSize: 16,
        letterSpacing: 5,
        fontWeight: 'bold'
    }
})

export default Locations