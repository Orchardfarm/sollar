import React, { useContext,  useState, useEffect   } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import {
  SimpleLineIcons,
  MaterialIcons,
  MaterialCommunityIcons,
  FontAwesome,
} from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { DrawerItemList, createDrawerNavigator } from "@react-navigation/drawer";
import User from "./../assets/person.png";
import UserCrops from "./farmer/UserCrops";
import Contact from "./Contact";

import RateApp from "./RateApp";
import CropsScreen from "./farmer/CropsScreen";
import Button from "../src/components/Button";
import AsyncStorage from '@react-native-async-storage/async-storage';
import ShareAppScreen from "./ShareAppScreen";
import * as base from '../env'
import IssuesScreen from "./farmer/IssuesScreen";
import Home from "./farmSpe/Home";
var url = base.BASE_URL


const Drawer = createDrawerNavigator();

export default function SupportDashboardScreen({ navigation }) {
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

  const handleSearch = () => {
    
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
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
                <View style={{ alignSelf: "center" }}>
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
                source={User} // You can provide a default image source if the user doesn't have an avatar
                style={{
                  height: 130,
                  width: 130,
                  borderRadius: 65,
                }}
              />
            )}
</View>

            <Text
              style={{
                fontSize: 22,
                marginVertical: 6,
                fontWeight: "bold",
                color: "#fff",
              }}
            >
              {user && user.data ? user.data.first_name : "User Name"}
            </Text>
            
              <Text
                style={{
                  fontSize: 16,
                  marginVertical: 6,
                    color: "#fff",
                    marginHorizontal: 20,
                    marginBottom: 10,
                }}
              >
                 {user && user.data ? user.data.phone_number : "Phone"}
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
            borderRadius: 15,
            
          },
          headerStyle: {
            backgroundColor: "#528508",
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
drawerActiveTintColor: "white",
            drawerInactiveTintColor: "black",
            drawerContentContainerStyle: {
              borderWidth: 1,
              borderColor: "red",
              backgroundColor: "red",
            },
            drawerLabelStyle: {       color: "#fff",
            fontWeight: "bold",
            borderBottomColor: '#fff',
            borderBottomWidth : 1,
            paddingVertical:  5,
            fontSize : 15,
            width: '70%', },
            title: "Home",
            drawerIcon: () => (
              
              <SimpleLineIcons name="home" size={18} color="#fff"  style = {{
                color : "#fff" , marginRight : -8
              }}/>
            ), 
            headerRight: () => (
              <TouchableOpacity
                style={{
                  marginRight: 16,
                }}
                onPress={onLogout}
              >
                <FontAwesome name="arrow-right" size={24} color="#fff"  />
              </TouchableOpacity>
            ),
          }}
          component={Home}
        />
      
<Drawer.Screen
          name="Issues"
          options={{
            drawerLabel: "Issues",
            drawerLabelStyle: {
              color: "#fff",
              fontWeight: "bold",
              borderBottomColor: "#fff",
              borderBottomWidth: 1,
              paddingVertical:  5,
              width: "70%",    fontSize : 18
            },
            color: "#fff",
            title: "Issues",
            drawerIcon: () => (
              <MaterialIcons name="bug-report" size={18} color="#fff"  style = {{
                color : "#fff" , marginRight : -8
              }} />
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
          component={IssuesScreen}
        />

        <Drawer.Screen
          name="Rate this App"
          options={{
            drawerLabel: "Rate this App",
drawerLabelStyle: {
              color: "#fff",
              fontWeight: "bold",
              borderBottomColor: "#fff",
              borderBottomWidth: 1,
              paddingVertical:  5,
              width: "70%",
              fontSize : 15
            },
            title: "Rate this App",
            drawerIcon: () => (
              <FontAwesome name="star" size={18} color="#fff"   style = {{
                color : "#fff" , marginRight : -8
              }}/>
            ),
          }}
          component={RateApp}
        />

        <Drawer.Screen
          name="Contact"
          options={{
            drawerLabel: "Contact",
drawerLabelStyle: {
              color: "#fff",
              fontWeight: "bold",
              borderBottomColor: "#fff",
              borderBottomWidth: 1,
              paddingVertical:  5,
              width: "70%",
              fontSize : 15
            },
            title: "Contact",
            drawerIcon: () => (
              <MaterialCommunityIcons
                name="message-alert-outline"
                size={18}
                color="#fff"
                style = {{
                  color : "#fff" , marginRight : -8
                }}
              />
            ),
          }}
          component={Contact}
        />

        <Drawer.Screen
          name="Share App"
          options={{
            drawerLabel: "Share App",
drawerLabelStyle: {
              color: "#fff",
              fontWeight: "bold",
              borderBottomColor: "#fff",
              borderBottomWidth: 1,
              paddingVertical:  5,
              width: "70%",
              fontSize : 15
            },
            title: "Share App",
            drawerIcon: () => (
              <MaterialCommunityIcons name="share" size={18} color="#fff"  style = {{
                color : "#fff" , marginRight : -8
              }} />
            ),
          }}
          component={ShareAppScreen}
        />

        {/* <Drawer.Screen
          name="Logout"
          options={{
            drawerLabel: "Logout",
            title: "Logout",
            drawerIcon: () => (
              <MaterialCommunityIcons name="logout" size={18} color="#528508" />
            ),
          }}
          component={() => {
            onLogout();
            return null;
          }}
        /> */}
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
