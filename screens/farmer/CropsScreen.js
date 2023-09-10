import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { theme } from '../../src/core/theme';
import Button from '../../src/components/Button';
import TextInput from '../../src/components/TextInput';
import * as base from '../../env';
import Icon from 'react-native-vector-icons/FontAwesome';

const url = base.BASE_URL;

const CropsScreen = () => {
  const [cropList, setCropList] = useState([]);
  const [showAddPopup, setShowAddPopup] = useState(false);

  // Add crop form state
  const [selectedCrop, setSelectedCrop] = useState('');
  const [selectedVariety, setSelectedVariety] = useState('');
  const [cropAge, setCropAge] = useState('');
  const [acreage, setAcreage] = useState('');
  const [trees0To3, setTrees0To3] = useState('');
  const [trees4To7, setTrees4To7] = useState('');
  const [trees7Plus, setTrees7Plus] = useState('');
  const [farmPlotNo, setFarmPlotNo] = useState('');

  const cropsData = [
    {
      crop_name: 'Avocado',
      varieties: ['Golden Hass', 'Original Hass', 'Giant Hass', 'Fuerte', 'Pinkerton', 'Jumbo'],
    },
    {
      crop_name: 'Beans',
      varieties: ['Amini', 'Rosecoco', 'Onyoro', 'Yellow', 'Others'],
    },
    {
      crop_name: 'Passion fruits',
      varieties: [],
    },
    {
      crop_name: 'Banana',
      varieties: [],
    },
    {
      crop_name: 'Maize',
      varieties: [],
    },
    {
      crop_name: 'Tea',
      varieties: [],
    },
    {
      crop_name: 'Sugarcane',
      varieties: [],
    },
  ];

  const fetchCropList = async () => {
    try {
      
      const response = await fetch(url + '/api/crops');
      console.log('Response status:', response.status); // Log the status code
      const data = await response.json();
      console.log('API Data:', data); // Log the entire API response
      setCropList(data.data); // Assuming the crops are in the 'data' property
    } catch (error) {
      console.error('Error fetching crops list:', error);
    }
  };
  
  useEffect(() => {
    fetchCropList();
  }, []);
  const addCrop = async () => {
    try {
      const response = await fetch(url + '/api/crops', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          crop_name: selectedCrop,
          variety: selectedVariety,
          crop_age: cropAge,
          acreage: acreage,
          trees_0_to_3: trees0To3,
          trees_4_to_7: trees4To7,
          trees_7_plus: trees7Plus,
          farm_plot_no: farmPlotNo,
        }),
      });
      const data = await response.json();
      console.log('data ' + JSON.stringify(data));

      // Check if the response indicates a successful save
      if (response.ok) {
        // Update the crop list by fetching it again
        alert('Save successful');
        fetchCropList();

        // Reset the form fields
        setSelectedCrop('');
        setSelectedVariety('');
        setCropAge('');
        setAcreage('');
        setTrees0To3('');
        setTrees4To7('');
        setTrees7Plus('');
        setFarmPlotNo('');

        setShowAddPopup(false);
        
      } else {
        console.error('Failed to save crop:', data.message);
      }
    } catch (error) {
      console.error('Error adding crop:', error);
    }
  };
  const handleCropClick = (crop) => {
    setSelectedCrop(crop);
  };

  const handleDeleteCrop = async (cropId) => {
    try {
      const response = await fetch(`${url}/api/crops/${cropId}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      console.log(cropId);
      console.log(data);

      // Update the crop list by fetching it again
      fetchCropList(userId);
    } catch (error) {
      console.error('Error deleting crop:', error);
    }
  };

  const toggleAddPopup = () => {
    setShowAddPopup(!showAddPopup);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.cropItem} onPress={() => handleCropClick(item)}>
    <Text style={styles.cropType}>{item.attributes.crop_name}</Text>
    <Text style={styles.cropVariety}>{item.attributes.variety}</Text>
  </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={cropList}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.cropList}
      />

      <Button mode="contained" onPress={toggleAddPopup}>
        <Text>Add Crop</Text>
      </Button>

      {showAddPopup && (
        <Modal visible={showAddPopup} animationType="slide" transparent={true}>
          <View style={styles.modalContainer}>
            <View style={styles.popupContainer}>
              <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={styles.header}>Add Crop</Text>
                <View style={styles.inputContainer}>
                  <Picker
                    selectedValue={selectedCrop}
                    onValueChange={(itemValue) => setSelectedCrop(itemValue)}
                    style={styles.picker}
                  >
                    <Picker.Item label="Select Crop" value="" />
                    {cropsData.map((item) => (
                      <Picker.Item
                        key={item.crop_name}
                        label={item.crop_name}
                        value={item.crop_name}
                      />
                    ))}
                  </Picker>

                  {selectedCrop && (
                    <Picker
                      selectedValue={selectedVariety}
                      onValueChange={(itemValue) => setSelectedVariety(itemValue)}
                      style={styles.picker}
                    >
                      <Picker.Item label="Select Variety" value="" />
                      {cropsData
                        .find((item) => item.crop_name === selectedCrop)
                        ?.varieties.map((variety) => (
                          <Picker.Item key={variety} label={variety} value={variety} />
                        ))}
                    </Picker>
                  )}
                  <TextInput
                    style={styles.smallInput}
                    placeholder="Enter crop age"
                    value={cropAge}
                    onChangeText={(text) => setCropAge(text)}
                  />
                  <TextInput
                    style={styles.smallInput}
                    placeholder="Enter acreage"
                    value={acreage}
                    onChangeText={(text) => setAcreage(text)}
                  />
                  <TextInput
                    style={styles.smallInput}
                    placeholder="Enter trees 0 to 3"
                    value={trees0To3}
                    onChangeText={(text) => setTrees0To3(text)}
                  />
                  <TextInput
                    style={styles.smallInput}
                    placeholder="Enter trees 4 to 7"
                    value={trees4To7}
                    onChangeText={(text) => setTrees4To7(text)}
                  />
                  <TextInput
                    style={styles.smallInput}
                    placeholder="Enter trees 7 plus"
                    value={trees7Plus}
                    onChangeText={(text) => setTrees7Plus(text)}
                  />
                  <TextInput
                    style={styles.smallInput}
                    placeholder="Enter farm plot no"
                    value={farmPlotNo}
                    onChangeText={(text) => setFarmPlotNo(text)}
                  />

                  <Button mode="contained" onPress={addCrop}>
                    <Text>Add</Text>
                  </Button>
                  <Button mode="contained" onPress={toggleAddPopup}>
                    <Text>Cancel</Text>
                  </Button>
                </View>
              </ScrollView>
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
    padding: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: theme.colors.primary,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  popupContainer: {
    width: '90%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    maxHeight: '70%',
    // Set a maximum height to prevent overlapping
  },
  inputContainer: {
    width: '100%',
  },
  smallInput: {
    width:'100%',
    flex: 1,
    marginBottom: 10,
    backgroundColor: '#F2F2F2',
    borderRadius: 5,
    paddingHorizontal: 12,
  },
  picker: {
    width: 300, // Set the width to a percentage or specific value
    marginBottom: 10,
    backgroundColor: '#F2F2F2',
    borderRadius: 5,
  },
  cropItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    elevation: 2,
  },
  cropText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: theme.colors.text,
  },
  cropList: {
    flex: 1,
  },
});

export default CropsScreen;
