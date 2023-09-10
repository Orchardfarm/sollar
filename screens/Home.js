import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as base from '../env';
import { theme } from '../src/core/theme'

const url = base.BASE_URL; // Make sure to import BASE_URL from your 'env' file

const Home = () => {
  const [totalFarmers, setTotalFarmers] = useState(0);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [totalCrops, setTotalCrops] = useState(0);

  useEffect(() => {
    fetchFarmers();
    fetchCustomers();
    fetchCrops();
  }, []);

  const fetchFarmers = async () => {
    try {
      const response = await fetch(url + '/api/v1/profiles');
      const json = await response.json();
      console.log(json);
      const farmers = json.data.filter((user) => user.role === 'farmer');
      setTotalFarmers(farmers.length);
    } catch (error) {
      alert('Error fetching farmer:', error);
    }
  };

  const fetchCustomers = async () => {
    try {
      const response = await fetch(url + '/api/v1/profiles');
      const json = await response.json();
      console.log(json);
      const customers = json.data.filter((user) => user.role === 'customer');
      setTotalCustomers(customers.length);
    } catch (error) {
      alert('Error fetching customers:', error);
    }
  };

  const fetchCrops = async () => {
    try {
      const response = await fetch(url + '/api/crops');
      const json = await response.json();
      setTotalCrops(json.data.length);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.bcontainer}>
        <Text style={styles.header}>Total Farmers</Text>
        <Text style={styles.totalFruits}>: {totalFarmers}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.bcontainer}>
        <Text style={styles.header}>Total Customers</Text>
        <Text style={styles.totalFruits}>: {totalCustomers}</Text>
      </TouchableOpacity>
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
    backgroundColor: '#f2f2f2',
    padding: 20,
  },
  bcontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  addFruitContainer: {
    // Your styles for the container
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: theme.colors.primary,
  },
  totalFarmers: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  totalFruits: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
});

export default Home;

