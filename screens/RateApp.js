import { View, Text, TouchableOpacity, Linking, StyleSheet } from 'react-native';
import React, { useState } from 'react';

export default function RateApp() {
  const [rating, setRating] = useState(0); 

  const openAppStoreForRating = () => {
    const appStoreUrl = 'https://apps.apple.com/app/your-app-id'; 
    const playStoreUrl = 'https://play.google.com/store/apps/details?id=your.app.package'; 
    Linking.openURL(appStoreUrl);
    Linking.openURL(playStoreUrl);
  };

  const handleStarPress = (selectedRating) => {
    setRating(selectedRating);
    openAppStoreForRating();
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const starStyle = i <= rating ? styles.selectedStar : styles.unselectedStar;
      stars.push(
        <TouchableOpacity key={i} onPress={() => handleStarPress(i)}>
          <Text style={[styles.star, starStyle]}>★</Text>
        </TouchableOpacity>
      );
    }
    return stars;
  };

  return (
    <View style={styles.container}>
       <View style={styles.starContainer}>
        {renderStars()}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  starContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  star: {
    fontSize: 50,
  },
  selectedStar: {
    color: 'gold',
  },
  unselectedStar: {
    color: 'gray',
  },
});
