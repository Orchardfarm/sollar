import "react-native-gesture-handler";
import React, { useContext, useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import {
  SimpleLineIcons,
  MaterialIcons,
  MaterialCommunityIcons,
  FontAwesome,
} from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import {
  DrawerItemList,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import User from "./../assets/person.png";
import Contact from "./Contact";
import FarmerLocationScreen from "./customer/FarmerLocationScreen";
import CropsScreen from "./customer/CropsScreen";
import Home from "./customer/Home";
import RateApp from "./RateApp";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Button from "../src/components/Button";
import ShareAppScreen from "./ShareAppScreen";
var url = base.BASE_URL;
import * as base from "../env";
import cartScreen from "./customer/cartScreen";
import ProductScreen from "./customer/ProductScreen";

const Drawer = createDrawerNavigator();

export default function CustomersDashboardScreen({ navigation }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const authToken = await AsyncStorage.getItem("authToken");
        if (authToken) {
          const response = await fetch(url + "/current_user", {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          });

          if (response.ok) {
            const userData = await response.json();
            setUser(userData);
            console.log("User:", user);
          } else {
            // Handle fetch user data error
          }
        }
      } catch (error) {
        // Handle any errors that occur during AsyncStorage or fetch operations
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

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

  const handleSearch = (event) => {};

  console.log("User:", user?.data?.role);
  console.log("User:", user?.data?.role);

  return (
    <NavigationContainer independent={true}>
      <Drawer.Navigator
        drawerContent={(props) => {
          return (
            <SafeAreaView>
              <View
                style={{
                  height: 200,
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {user && user.data ? (
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
                    source={User} 
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
                    fontWeight: "bold",
                    color: "white",
                  }}
                >
                  {user && user.data ? user.data.first_name : "User Email"}
                </Text>

                <Text
                  style={{
                    fontSize: 16,
                    color: "white",
                  }}
                >
                  {user && user.data ? user.data.phone_number : "User Email"}
                </Text>
              </View>

              <DrawerItemList {...props} />
            </SafeAreaView>
          );
        }}
        screenOptions={{
          drawerStyle: {
            backgroundColor: "#528508",
            width: 250,
            borderWidth : 1,
            borderBottomColor : 'black'
          },
          headerStyle: {
            backgroundColor: "#528508",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          drawerLabelStyle: {
            color: "white",
          },
        }}
      >
        <Drawer.Screen
        
          name="Home"
          options={{
            drawerLabel: "Home",
            
            title: "Home",
            drawerIcon: () => (
              <SimpleLineIcons name="home" size={20} color="#fff" />
            ),
            headerRight: () => (
              <TouchableOpacity
                style={{
                  marginRight: 16,
                }}
                onPress={onLogout}
              >
                <FontAwesome name="arrow-right" size={24} color="#111111" />
              </TouchableOpacity>
            ),
          }}
          component={Home}
        />
        <Drawer.Screen
          name="Products"
          options={{
            drawerLabel: "Products",
            color: "#ffffff",
            title: "Products",
            drawerIcon: () => (
              <MaterialIcons name="shopping-basket" size={20} color="#fff" />
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
          component={ProductScreen}
        />
        {/* <Drawer.Screen
          name="Farmer Location"
          options={{
            drawerLabel: "Farmer Location",
            title: "Farmer Location",
            drawerIcon: () => (
              <MaterialIcons name="timer" size={20} color="#528508" />
            ),
          }}
          component={FarmerLocationScreen}
        /> */}

        <Drawer.Screen
          name="Rate this App"
          options={{
            drawerLabel: "Rate this App",
            title: "Rate this App",
            drawerIcon: () => (
              <FontAwesome name="star" size={20} color="#fff" />
            ),
          }}
          component={RateApp}
        />
        <Drawer.Screen
          name="cart"
          options={{
            drawerLabel: "cart",
            title: "cart",
            drawerIcon: () => (
              <FontAwesome name="shopping-cart" size={20} color="#fff" />
            ),
          }}
          component={cartScreen}
        />

        <Drawer.Screen
          name="Contact"
          options={{
            drawerLabel: "Contact",
            title: "Contact",
            drawerIcon: () => (
              <MaterialCommunityIcons
                name="message-alert-outline"
                size={20}
                color="#fff"
              />
            ),
          }}
          component={Contact}
        />
        <Drawer.Screen
          name="Share App"
          options={{
            drawerLabel: "Share App",
            title: "Share App",
            drawerIcon: () => (
              <MaterialCommunityIcons name="share" size={20} color="#fff" />
            ),
          }}
          component={ShareAppScreen}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
