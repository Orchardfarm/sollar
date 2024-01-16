import React, { useState } from "react";
import { View, Text, Linking, StyleSheet } from "react-native";
import Background from "../src/components/Background";
import TextInput from "../src/components/TextInput";
import Header from "../src/components/Header";
import Button from "../src/components/Button";
import Paragraph from "../src/components/Paragraph";
import Logo from "../src/components/Logo";
import { theme } from "../src/core/theme";

const Contact = () => {
  const phone = "+254788987654";
  const email = "info@smartfruitfarmer.com";
  const [about, setAbout] = useState(
    "At The Orchard, we connect you to the heart of agriculture. Our mission is simple: to empower consumers and businesses with real-time, up-to-date information on what farmers are offering in the market. We believe in transparency, efficiency, and sustainability in the agricultural supply chain. With The Orchard, you can make informed decisions, support local farmers, and contribute to a greener future. Join us on this journey of growth, taste the freshness, and nurture a sustainable world. Welcome to The Orchard."
  );

  const handlePhonePress = () => {
    Linking.openURL(`tel:${phone}`);
  };

  const handleEmailPress = () => {
    Linking.openURL(`mailto:${email}`);
  };

  return (
    <View style={styles.container}>
      <Logo />
      <Text
        style={{
          textAlign: "center",
          color: theme.colors.text,
          fontWeight: "800",
          marginBottom : 5
        }}
      >
        CONTACT US{" "}
      </Text>
      <Paragraph>
        <Text
          style={{
            color: theme.colors.primary,
            fontWeight: "900",
          }}
          onPress={handlePhonePress}
        >
     {phone}
        </Text>
        </Paragraph>
        <Paragraph>
        <Text
          style={{
            color: theme.colors.primary,
            fontWeight: "900",
          }}
          onPress={handleEmailPress}
        >
          {email}
        </Text>
        </Paragraph>
     

      <Text
        style={{
          textAlign: "center",
          color: theme.colors.text,
          fontWeight: "800",
          marginBottom : 5
        }}
      >
        ABOUT US{" "}
      </Text>
      <Paragraph>
        <Text
          style={{
            color: theme.colors.primary,
            fontWeight: "800",
          }}
        >
          {about}
        </Text>
      </Paragraph>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF", // Set your desired background color here
    padding: 20,
    borderRadius: 10,
    margin: 10,
    elevation: 5,
  },
});

export default Contact;
