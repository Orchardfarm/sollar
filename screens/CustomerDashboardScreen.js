import "react-native-gesture-handler";
import React, { useContext,  useState, useEffect   } from "react";
import { View, Text, Image } from "react-native";
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
import User from "./../assets/user.jpg";
import Contact from "./Contact";
import FarmerLocationScreen from "./customer/FarmerLocationScreen";
import CropsScreen from "./customer/CropsScreen";
import Home from "./customer/Home";
import RateApp from "./RateApp";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Button from "../src/components/Button";
import ShareAppScreen from "./ShareAppScreen";
var url = base.BASE_URL
import * as base from '../env'

const Drawer = createDrawerNavigator();

export default function CustomersDashboardScreen({ navigation }) {const [user, setUser] = useState(null);

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
        "https://farmb.onrender.com/users/sign_out",
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
  
  
  
  
  

  return (
    <NavigationContainer independent={true}>
      <Drawer.Navigator
        drawerContent={(props) => {
          return (
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
                source={{ uri: user.data.avatar_url }}
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
                 {user && user.data ? user.data.phone_number : 'User Email'}
              </Text>
            </View>

            <DrawerItemList {...props} />
            <Button name="logout" size={20} color="#2E8B57" onPress={onLogout}>
            
             <Text>Logout</Text> 
            </Button>

          </SafeAreaView>
          );
        }}
        screenOptions={{
          drawerStyle: {
            backgroundColor: "#fff",
            width: 250,
          },
          headerStyle: {
            backgroundColor: "#2E8B57",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          drawerLabelStyle: {
            color: "#111",
          },
        }}
      >
        <Drawer.Screen
          name="Home"
          options={{
            drawerLabel: "Home",
            title: "Home",
            drawerIcon: () => (
              <SimpleLineIcons name="home" size={20} color="#2E8B57" />
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
              <MaterialIcons name="local-florist" size={20} color="#2E8B57" />
            ),
          }}
          component={CropsScreen}
        />
        <Drawer.Screen
          name="Farmer Location"
          options={{
            drawerLabel: "Farmer Location",
            title: "Farmer Location",
            drawerIcon: () => (
              <MaterialIcons name="timer" size={20} color="#2E8B57" />
            ),
          }}
          component={FarmerLocationScreen}
        />

        <Drawer.Screen
          name="Rate this App"
          options={{
            drawerLabel: "Rate this App",
            title: "Rate this App",
            drawerIcon: () => (
              <FontAwesome name="star" size={20} color="#2E8B57" />
            ),
          }}
          component={RateApp}
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
                color="#2E8B57"
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
              <MaterialCommunityIcons name="share" size={20} color="#2E8B57" />
            ),
          }}
          component={ShareAppScreen}
        />

      </Drawer.Navigator>
    </NavigationContainer>
  );
}