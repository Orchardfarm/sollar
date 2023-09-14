import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Linking,
  TouchableOpacity,
  Image,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { theme } from '../../src/core/theme';
import Button from '../../src/components/Button';
import * as base from '../../env';

const url = base.BASE_URL;

const FarmerLocationScreen = () => {
  const [farmers, setFarmers] = useState([]);
  const [selectedFarmer, setSelectedFarmer] = useState(null);
  const [showFarmerPopup, setShowFarmerPopup] = useState(false);

  useEffect(() => {
    fetchFarmers();
  }, []);

  const fetchFarmers = async () => {
    try {
      const response = await fetch(url + '/api/v1/profiles');
      const json = await response.json();
      const farmers = json.data.filter((user) => user.role === 'farmer');
      setFarmers(farmers);
    } catch (error) {
      console.error('Error fetching farmers:', error);
    }
  };

  const handleMarkerPress = (farmer) => {
    setSelectedFarmer(farmer);
    setShowFarmerPopup(true);
  };

  const closeFarmerPopup = () => {
    setShowFarmerPopup(false);
  };

  return (
    <View style={styles.container}>
      <MapView style={styles.map}>
        {farmers.map((farmer) => {
          const location = farmer.location.split(',');
          const latitude = parseFloat(location[0]);
          const longitude = parseFloat(location[1]);

          if (!isNaN(latitude) && !isNaN(longitude)) {
            return (
              <Marker
                key={farmer.id}
                coordinate={{ latitude, longitude }}
                onPress={() => handleMarkerPress(farmer)}
              />
            );
          } else {
            console.warn(
              `Invalid coordinates for farmer ID ${farmer.id}: ${location}`
            );
            return null; // Skip rendering this marker
          }
        })}
      </MapView>

      {selectedFarmer && showFarmerPopup && (
        <Modal
          visible={showFarmerPopup}
          animationType="slide"
          transparent={true}
        >
          <View style={styles.modalContainer}>
            <View style={styles.popupContainer}>
              <Text style={styles.header}>Farmer Details</Text>
              {selectedFarmer && (
                <>
                  <Image
                    source={{ uri: selectedFarmer.avatar_url }}
                    style={styles.customerAvatar}
                  />
                  <Text style={styles.customerDetailText}>
                    Name: {`${selectedFarmer.first_name} ${selectedFarmer.last_name}`}
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      const phoneNumber = selectedFarmer.phone_number;
                      if (phoneNumber) {
                        Linking.openURL(`tel:${phoneNumber}`);
                      }
                    }}
                  >
                    <Text style={styles.header}>Contact Details</Text>
                    <Text style={styles.customerDetailText}>
                      Phone Number: {selectedFarmer.phone_number}
                    </Text>
                  </TouchableOpacity>
                  <Text style={styles.customerDetailText}>
                    Email: {selectedFarmer.email}
                  </Text>
                  {/* Add more details here as needed */}
                  <Button mode="contained" onPress={closeFarmerPopup}>
                    <Text>Close</Text>
                  </Button>
                </>
              )}
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: theme.colors.primary,
  },
  map: {
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  popupContainer: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  customerAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 5,
  },
  customerDetailText: {
    fontSize: 16,
    marginBottom: 5,
    color: theme.colors.text,
  },
});

export default FarmerLocationScreen;
