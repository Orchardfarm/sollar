import React, { useContext, useState, useEffect } from "react";
import "react-native-gesture-handler";
import { View, Text, Image, Linking, TouchableOpacity } from "react-native";
import {
  SimpleLineIcons,
  MaterialIcons,
  MaterialCommunityIcons,
  FontAwesome
} from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { DrawerItemList, createDrawerNavigator } from "@react-navigation/drawer";
import User from "./../assets/person.png";
import Contact from "./Contact";
import Home from "./Home";
import RateApp from "./RateApp";
import FarmersScreen from './admin/FarmerScreen'
import CustomersScreen from './admin/CustomerScreen'
import CropsScreen from './admin/CropsScreen'
import * as base from '../env'
import ShareAppScreen from "./ShareAppScreen"
import Button from "../src/components/Button";
var url = base.BASE_URL
// import * as base from '../env'


const Drawer = createDrawerNavigator();

export default function AdminDashboardScreen({ navigation }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const authToken = await AsyncStorage.getItem('authToken');
        if (authToken) {
          const response = await fetch(url + '/current_user', {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          });

          if (response.ok) {
            const userData = await response.json();
            setUser(userData);
            console.log('User:', user);

          } else {
            // Handle fetch user data error
          }
        }
      } catch (error) {
        // Handle any errors that occur during AsyncStorage or fetch operations
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);


  // if (!localStorage.getItem("authToken")) {
  //   return (
  //     <div>
  //       <LoginScreen />
  //       <RegistrationScreen />
  //     </div>
  //   );
  // }
  const removeData = async () => {
    try {
      await AsyncStorage.removeItem("authToken"); // Replace 'myKey' with the key you want to remove.
    } catch (error) {
      console.error("Error removing data: ", error);
    }
  };
  const onLogout = async () => {
    try {
      const authToken = await AsyncStorage.getItem("authToken");
      const response = await fetch(
        "https://farm-b-y78k.onrender.com/users/sign_out",
        {
          method: "DELETE",
          headers: {
            Authorization: `${authToken}`, // Assuming authToken is a bearer token
            "Content-Type": "application/json", // Set the content type if needed
          },
        }
      );

      if (response.ok) {
        removeData();
        navigation.navigate("Location");
      } else {
        alert("Error signing out.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  const shareApp = async () => {
    try {
      const options = {
        title: 'Share App',
        message: 'Check out this awesome app!',
        url: 'https://your-app-download-link.com',
      };
      await Share.open(options);
    } catch (error) {
      console.error('Error sharing app:', error);
    }
  };
  const handleSearch = (event) => {
  };
  


  return (

    <NavigationContainer independent={true}>
      <Drawer.Navigator
        drawerContent={(props) => (
          <SafeAreaView>
            <View
              style={{
                height: 200,
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                borderBottomColor: '#f4f4f4',
                borderBottomWidth: 1,
              }}
            >{user && user.data ? (
              <Image
                source={User}
                style={{
                  height: 130,
                  width: 130,
                  borderRadius: 65,
                }}
              />
            ) : (
              <Image
                source={User} // You can provide a default image source if the user doesn't have an avatar
                style={{
                  height: 130,
                  width: 130,
                  borderRadius: 65,
                }}
              />
            )}
              <Text
                style={{
                  fontSize: 22,
                  marginVertical: 6,
                  fontWeight: 'bold',
                  color: '#111',
                }}
              >
                {user && user.data ? user.data.first_name : 'User Email'}
              </Text>

              <Text
                style={{
                  fontSize: 16,
                  color: '#111',
                }}
              >
                {user && user.data ? user.data.role : 'User Email'}
              </Text>
            </View>

            <DrawerItemList {...props} />
            <Drawer.Screen
              name="Logout"
              options={{
                drawerLabel: "Logout",
                title: "Logout",
                drawerIcon: () => (
                  <MaterialCommunityIcons name="logout" size={20} color="#528508" />
                ),
              }}
              component={() => {
                onLogout();
                return null;
              }}
            />

          </SafeAreaView>
        )}

        screenOptions={{
          drawerStyle: {
            backgroundColor: "#fff",
            width: 250
          },
          headerStyle: {
            backgroundColor: "#528508",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold"
          },
          drawerLabelStyle: {
            color: "#111"
          }
        }}
      >
        <Drawer.Screen
          name="Home"
          options={{
            drawerLabel: "Home",
            title: "Home",
            drawerIcon: () => (
              <SimpleLineIcons name="home" size={20} color="#528508" />
            ),
            headerRight: () => (
              <TouchableOpacity
                style={{
                  marginRight: 16,
                }}
                onPress={onLogout}
              >
                <FontAwesome name="arrow-right" size={24} color="#fff" />
              </TouchableOpacity>
            ),
          }}
          component={Home}
        />
        <Drawer.Screen
          name="Crops"
          options={{
            drawerLabel: "Crops",
            title: "Crops",
            drawerIcon: () => (
              <MaterialIcons name="local-florist" size={20} color="#528508" />
            ),
            headerRight: () => (
              <TouchableOpacity
                style={{
                  marginRight: 16,
                }}
                onPress={handleSearch}
              >
                <FontAwesome name="search" size={24} color="#fff" />
              </TouchableOpacity>
            ),
          }}
          component={CropsScreen}
        />
        <Drawer.Screen
          name="Grower"
          options={{
            drawerLabel: "Growers",
            title: "Growers",
            drawerIcon: () => (
              <MaterialIcons name="check-circle" size={20} color="#528508" />
            ),
            headerRight: () => (
              <TouchableOpacity
                style={{
                  marginRight: 16,
                }}
                onPress={handleSearch}
              >
                <FontAwesome name="search" size={24} color="#fff" />
              </TouchableOpacity>
            ),
          }}
          component={FarmersScreen}
        />
        <Drawer.Screen
          name="Buyers"
          options={{
            drawerLabel: "Buyers",
            title: "Buyers",
            drawerIcon: () => (
              <SimpleLineIcons name="user" size={20} color="#528508" />
            ),
            headerRight: () => (
              <TouchableOpacity
                style={{
                  marginRight: 16,
                }}
                onPress={handleSearch}
              >
                <FontAwesome name="search" size={24} color="#fff" />
              </TouchableOpacity>
            ),
          }}
          component={CustomersScreen}
        />



        <Drawer.Screen
          name="Rate this App"
          options={{
            drawerLabel: "Rate this App",
            title: "Rate this App",
            drawerIcon: () => (
              <FontAwesome name="star" size={20} color="#528508" />
            )
          }}
          component={RateApp}
        />

        <Drawer.Screen
          name="Contact"
          options={{
            drawerLabel: "Contact",
            title: "Contact",
            drawerIcon: () => (
              <MaterialCommunityIcons name="message-alert-outline" size={20} color="#528508" />
            )
          }}
          component={Contact}
        />
        <Drawer.Screen
          name="Share App"
          options={{
            drawerLabel: "Share App",
            title: "Share App",
            drawerIcon: () => (
              <MaterialCommunityIcons name="share" size={20} color="#528508" />
            ),
          }}
          component={ShareAppScreen}
        />

      </Drawer.Navigator>

    </NavigationContainer>

  );
}
