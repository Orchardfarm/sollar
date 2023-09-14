import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { theme } from '../../src/core/theme';
import Button from '../../src/components/Button';
import * as base from '../../env';
const url = base.BASE_URL;

const CropsScreen = () => {
  const [cropsList, setCropsList] = useState([]);
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [showCropPopup, setShowCropPopup] = useState(false);

  useEffect(() => {
    fetchCropsList();
  }, []);

  const fetchCropsList = async () => {
    try {
      const response = await fetch(url + '/api/crops');
      const data = await response.json();
      setCropsList(data.data);
      console.log(data)
    } catch (error) {
      console.error('Error fetching crops list:', error);
    }
  };

  const handleCropClick = (crop) => {
    setSelectedCrop(crop);
    setShowCropPopup(true);
  };

  const closeCropPopup = () => {
    setShowCropPopup(false);
  };

  const renderCropItem = ({ item }) => (
    <TouchableOpacity style={styles.cropItem} onPress={() => handleCropClick(item)}>
      <Text style={styles.cropType}>{item.attributes.crop_name}</Text>
      <Text style={styles.cropVariety}>{item.attributes.variety}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={cropsList}
        renderItem={renderCropItem}
        keyExtractor={(item) => item.id.toString()}
        style={styles.cropList}
      />

      {selectedCrop && showCropPopup && (
        <Modal visible={true} animationType="slide" transparent={true}>
          <View style={styles.modalContainer}>
            <View style={styles.popupContainer}>
              <Text style={styles.header}>Crop Details</Text>
              <Text style={styles.cropDetailText}>Crop Type: {selectedCrop.attributes.crop_name}</Text>
              <Text style={styles.cropDetailText}>Variety Planted: {selectedCrop.attributes.variety}</Text>
              <Text style={styles.cropDetailText}>Crop Age: {selectedCrop.attributes.crop_age}</Text>
              <Text style={styles.cropDetailText}>Acreage: {selectedCrop.attributes.acreage}</Text>
              <Text style={styles.cropDetailText}>Trees (0-3 years): {selectedCrop.attributes.trees_0_to_3}</Text>
              <Text style={styles.cropDetailText}>Trees (4-7 years): {selectedCrop.attributes.trees_4_to_7}</Text>
              <Text style={styles.cropDetailText}>Trees (7+ years): {selectedCrop.attributes.trees_7_plus}</Text>
              <Text style={styles.cropDetailText}>Grower Name: {selectedCrop.attributes.first_name}</Text>
              <Text style={styles.cropDetailText}>Grower Contact: {selectedCrop.attributes.phone_number}</Text>
              {/* Add more crop details here if needed */}
              <Button mode="contained" onPress={closeCropPopup}>
                <Text>Close</Text>
              </Button>
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
    backgroundColor: '#f2f2f2',
    padding: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: theme.colors.primary,
  },
  cropList: {
    flex: 1,
  },
  cropItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    elevation: 2,
  },
  cropType: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: theme.colors.text,
  },
  cropVariety: {
    fontSize: 14,
    color: theme.colors.secondary,
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
  cropDetailText: {
    fontSize: 16,
    marginBottom: 5,
    color: theme.colors.text,
  },
});

export default CropsScreen;
