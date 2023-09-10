import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import * as base from "./../../env";
import { theme } from "../../src/core/theme";

const url = base.BASE_URL; 

const Home = () => {
  const [totalCrops, setTotalCrops] = useState(0);

  useEffect(() => {
    fetchCrops();
  }, []);

  const fetchCrops = async () => {
    try {
      const response = await fetch(url + "/api/crops");
      const json = await response.json();
      setTotalCrops(json.data.length);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.bcontainer}>
        <Text style={styles.header}>Total Crops</Text>
        <Text style={styles.totalFruits}>: {totalCrops}</Text>
      </TouchableOpacity>
      {/* Add other content related to the dashboard here */}
      <View style={styles.addFruitContainer}>
        {/* Existing code for adding fruits */}
        
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    padding: 20,
  },
  bcontainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  addFruitContainer: {
    // Your styles for the container
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: theme.colors.primary,
  },
  totalFarmers: {
    fontSize: 20,
    fontWeight: "bold",
    color: theme.colors.text,
  },
  totalFruits: {
    fontSize: 20,
    fontWeight: "bold",
    color: theme.colors.text,
  },
});

export default Home;
