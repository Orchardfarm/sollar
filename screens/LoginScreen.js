import React, { useState } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  ScrollView,
  Text,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Background from "../src/components/Background";
import Header from "../src/components/Header";
import Button from "../src/components/Button";
import BackButton from "../src/components/BackButton";
import { theme } from "../src/core/theme";
import TextInput from "../src/components/TextInput";
import Logo from '../src/components/Logo'
import * as base from "../env";
var url = base.BASE_URL;

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    // Send a POST request to the server for user authentication
    const response = await fetch(url + "/users/sign_in", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: { email, password } }),
    });

    if (response.ok) {
      const authToken = response.headers.get("Authorization");

      if (authToken) {
        const user = await response.json();

        // Store the authentication token in local storage (AsyncStorage)

        // await AsyncStorage.setItem("authToken", authToken);
        const saveData = async () => {
          try {
            await AsyncStorage.setItem("authToken", authToken);
          } catch (error) {
            console.error("Error saving data: ", error);
          }
        };
        saveData();
        let roleMessage = "";
        console.log(user ,'useer  . .. ');

        if (user.status.data.role === "farmer") {
          navigation.navigate("FarmerDashboard");
          roleMessage = "Farmer";
        } else if (user.status.data.role === "customer") {
          navigation.navigate("CustomerDashboard");
          roleMessage = "Customer";
        } else if (user.status.data.role === "admin") {
          navigation.navigate("AdminDashboard");
          roleMessage = "Admin";
        }
        else if (user.status.data.role === "farm_specialist") {
          navigation.navigate("Special");
          roleMessage = "farm specialist";
        }

        // Alert the name of the logged-in user
        const userName = `${user.status.data.first_name} ${user.status.data.last_name}`;
        alert(`Welcome, ${userName}`);
      } else {
        alert("Authentication token missing in response headers.");
      }
    } else {
      alert("Wrong username or password");
    }
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Background>
        <BackButton goBack={navigation.goBack} />
        <Logo />
        <Header>Welcome back.</Header>

        <TextInput
          label="Email"
          returnKeyType="next"
          value={email}
          onChangeText={(text) => setEmail(text)}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <TextInput
          label="Password"
          returnKeyType="done"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />

        <View style={styles.forgotPassword}>
          <TouchableOpacity onPress={() => navigation.replace("ResetPassword")}>
            <Text style={styles.forgot}>Forgot your password?</Text>
          </TouchableOpacity>
        </View>
        {/* <Button mode="contained" onPress={handleLogin}> */}
        {/* Login */}
        {/* </Button> */}
        <TouchableOpacity
          style={styles.button}
          onPress={handleLogin}
        >
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>
        <View style={styles.row}>
          <Text>Don’t have an account? </Text>
          <TouchableOpacity onPress={() => navigation.replace("Location")}>
            <Text style={styles.link}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </Background>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  forgotPassword: {
    width: "100%",
    alignItems: "flex-end",
    marginBottom: 24,
  },
  row: {
    flexDirection: "row",
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
    fontWeight : '700'
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.primary,
  },
  container: {
    flexGrow: 1,
    justifyContent: "center", // Vertically center the content
  },
  button: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 120,
    borderRadius: 50,
    marginTop: 10,
    marginBottom : 15
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default LoginScreen;
