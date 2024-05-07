import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { theme } from '../src/core/theme';
import { Feather } from '@expo/vector-icons'; // Import Feather icons from Expo

// Import weather icons
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const HomeScreen = ({ navigation }) => {
  // Dummy weather data for Mombasa, Kisumu, and Nairobi
  const weatherData = [
    { city: 'Mombasa', weather: 'Sunny', temperature: '30°C', icon: 'sun' },
    { city: 'Kisumu', weather: 'Cloudy', temperature: '25°C', icon: 'cloud' },
    { city: 'Nairobi', weather: 'Rainy', temperature: '20°C', icon: 'rain' },
    // Add more dummy data for other counties if needed
  ];

  // Function to render weather cards
  const renderWeatherCards = () => {
    return weatherData.map((data, index) => (
      <TouchableOpacity key={index} style={styles.card}>
        <Text style={styles.city}>{data.city}</Text>
        {renderWeatherIcon(data.icon)}
        <Text style={styles.weather}>{data.weather}</Text>
        <Text style={styles.temperature}>{data.temperature}</Text>
      </TouchableOpacity>
    ));
  };

  // Function to render weather icon based on weather condition
  const renderWeatherIcon = (weather) => {
    switch (weather) {
      case 'sun':
        return <FontAwesome5 name="sun" size={24} color="yellow" />;
      case 'cloud':
        return <MaterialCommunityIcons name="cloud" size={24} color="grey" />;
      case 'rain':
        return <Ionicons name="rainy" size={24} color="blue" />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {/* Navigation bar */}
      <View style={styles.navigationBar}>
        {/* Sidebar */}
        <TouchableOpacity onPress={() => navigation.toggleDrawer()} style={styles.sidebar}>
          <Feather name="menu" size={24} color={theme.colors.primary} />
        </TouchableOpacity>
        {/* Logo */}
        <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.logoContainer}>
          <Image source={require('./../assets/logo.png')} style={styles.logo} />
        </TouchableOpacity>
        {/* Logout */}
        <TouchableOpacity onPress={() => navigation.navigate('Logout')} style={styles.logoutButton}>
          <Feather name="log-out" size={24} color={theme.colors.primary} />
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View style={styles.content}>
        {/* Current Weather */}
        <View style={styles.currentWeatherCard}>
          <Text style={styles.currentWeatherText}>
            Weather for {new Date().toDateString()} and {getDayTime()}
          </Text>
        </View>

        {/* Weather Cards */}
        <View style={styles.weatherContainer}>
          {renderWeatherCards()}
        </View>

        {/* Load More Button */}
        <TouchableOpacity style={styles.loadMoreButton}>
          <Text style={styles.loadMoreButtonText}>Load More</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Function to get time of the day
const getDayTime = () => {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return 'morning';
  else if (hour >= 12 && hour < 17) return 'noon';
  else if (hour >= 17 && hour < 20) return 'evening';
  else return 'night';
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  navigationBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sidebar: {
    marginRight: 20,
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center', // Align logo in the center
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  logoutButton: {
    marginLeft: 20, // Add margin for better spacing
  },
  content: {
    flex: 1,
  },
  currentWeatherCard: {
    backgroundColor: theme.colors.surface,
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  currentWeatherText: {
    fontSize: 16,
    color: theme.colors.text,
  },
  weatherContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap', // Allow cards to wrap to the next row
    marginBottom: 20,
  },
  card: {
    backgroundColor: theme.colors.surface,
    padding: 15,
    borderRadius: 10,
    width: '30%', // 3 cards per row
    marginBottom: 10,
    alignItems: 'center',
  },
  city: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  temperature: {
    fontSize: 14,
    color: theme.colors.secondary,
  },
  loadMoreButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
  },
  loadMoreButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default HomeScreen;
