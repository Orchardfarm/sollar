import React, { useState, useEffect } from "react";
import { View, Text, FlatList } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as base from '../../env';

const url = base.BASE_URL;

export default function UserCrops() {
  const [userCrops, setUserCrops] = useState([]);
  
  useEffect(() => {
    // Fetch crops associated with the authenticated user
    const fetchUserCrops = async () => {
      try {
        const authToken = await AsyncStorage.getItem('authToken');
        const authenticatedUserId = await AsyncStorage.getItem('userId'); // Get the authenticated user's ID

        const response = await fetch(`${url}/api/crops?userId=${authenticatedUserId}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        if (response.ok) {
          const cropsData = await response.json();
          setUserCrops(cropsData.data);
        } else {
          // Handle fetch crops error
        }
      } catch (error) {
        // Handle any errors that occur during AsyncStorage or fetch operations
        console.error('Error fetching user crops:', error);
      }
    };

    fetchUserCrops();
  }, []);

  return (
    <View>
      <Text>User Crops Screen</Text>
      <FlatList
        data={userCrops}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            {/* Render each crop item here */}
            <Text>Crop Name: {item.attributes.crop_name}</Text>
            <Text>Crop Age: {item.attributes.crop_age}</Text>
            <Text>Acreage: {item.attributes.acreage}</Text>
            {/* Add more crop details as needed */}
          </View>
        )}
      />
    </View>
  );
}
