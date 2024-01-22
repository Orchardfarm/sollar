import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView, Alert,
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
  const [showDetailsPopup, setShowDetailsPopup] = useState(false); // New state variable
  const [selectedCrop, setSelectedCrop] = useState('');
  const [selectedVariety, setSelectedVariety] = useState('');
  const [cropAge, setCropAge] = useState('');
  const [acreage, setAcreage] = useState('');
  const [trees0To3, setTrees0To3] = useState('');
  const [trees4To7, setTrees4To7] = useState('');
  const [trees7Plus, setTrees7Plus] = useState('');
  const [farmPlotNo, setFarmPlotNo] = useState('');
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [selectedCropId, setSelectedCropId] = useState(null);
  const [selectedVarietyEdit, setSelectedVarietyEdit] = useState('');
  const [cropAgeEdit, setCropAgeEdit] = useState('');
  const [acreageEdit, setAcreageEdit] = useState('');
  const [trees0To3Edit, setTrees0To3Edit] = useState('');
  const [trees4To7Edit, setTrees4To7Edit] = useState('');
  const [trees7PlusEdit, setTrees7PlusEdit] = useState('');
  const [farmPlotNoEdit, setFarmPlotNoEdit] = useState('');



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
      if (!cropsData.find((item) => item.crop_name === selectedCrop)) {
        alert("The crop name does not exist.");
        return;
      }
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

      if (response.ok) {
        alert('Save successful');
        fetchCropList();

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
    openDetailsPopup();
    // setShowEditPopup(true);
    setSelectedCropId(crop.id);
    // setShowEditPopup(true);
    setSelectedCropId(crop.id);
    setSelectedVarietyEdit(crop.attributes.variety);
    setCropAgeEdit(crop.attributes.crop_age);
    setAcreageEdit(crop.attributes.acreage);
    setTrees0To3Edit(crop.attributes.trees_0_to_3);
    setTrees4To7Edit(crop.attributes.trees_4_to_7);
    setTrees7PlusEdit(crop.attributes.trees_7_plus);
    setFarmPlotNoEdit(crop.attributes.farm_plot_no);
    // setShowEditPopup(true);
  };



  const openDetailsPopup = () => {
    setShowDetailsPopup(true);
  };

  // Function to close the details popup
  const closeDetailsPopup = () => {
    setShowDetailsPopup(false);
  };
  const openEditPopup = () => {
    setShowEditPopup(true);
  };

  const renderDetailsPopup = () => {
    if (!showDetailsPopup) {
      return null;
    }

    return (
      <Modal visible={showDetailsPopup} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.popupContainer}>
            {/* Close Icon */}
            <TouchableOpacity onPress={closeDetailsPopup} style={styles.closeIcon}>
              <Icon name="close" size={24} color={theme.colors.primary} />
            </TouchableOpacity>

            <ScrollView contentContainerStyle={styles.scrollContainer}>
              <Text style={styles.header}>Crop Details</Text>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Crop Name:</Text>
                <Text style={styles.detailValue}>{selectedCrop.attributes.crop_name}</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Variety:</Text>
                <Text style={styles.detailValue}>{selectedCrop.attributes.variety}</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Crop Age:</Text>
                <Text style={styles.detailValue}>{selectedCrop.attributes.crop_age}</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Acreage:</Text>
                <Text style={styles.detailValue}>{selectedCrop.attributes.acreage}</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Trees 0-3:</Text>
                <Text style={styles.detailValue}>{selectedCrop.attributes.trees_0_to_3}</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Trees 4-7:</Text>
                <Text style={styles.detailValue}>{selectedCrop.attributes.trees_4_to_7}</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Trees 7+:</Text>
                <Text style={styles.detailValue}>{selectedCrop.attributes.trees_7_plus}</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Farm Plot No:</Text>
                <Text style={styles.detailValue}>{selectedCrop.attributes.farm_plot_no}</Text>
              </View>
              <View style={styles.buttonContainer}>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity onPress={() => openEditPopup()}>
                    <Icon name="edit" size={20} color="#528508" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => deleteCrop(selectedCrop.id)}>
                    <Icon name="trash" size={20} color="#528508" />
                  </TouchableOpacity>
                </View>

              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    );
  };

  const updateCrop = async () => {
    try {
      if (!selectedCropId) {
        console.error('No selected crop to update');
        return;
      }
      const response = await fetch(`${url}/api/crops/${selectedCropId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          variety: selectedVarietyEdit,
          crop_age: cropAgeEdit,
          acreage: acreageEdit,
          trees_0_to_3: trees0To3Edit,
          trees_4_to_7: trees4To7Edit,
          trees_7_plus: trees7PlusEdit,
          farm_plot_no: farmPlotNoEdit,
        }),
      });
      const data = await response.json();

      if (response.ok) {
        // Display the confirmation alert here
        Alert.alert('Update Successful', 'Are you sure you want to update this crop?', [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Confirm',
            onPress: () => {
              // Perform the update
              alert('Update confirmed');
              fetchCropList();
            },
          },
        ]);
      } else {
        console.error('Failed to update crop:', data.message);
      }
    } catch (error) {
      console.error('Error updating crop:', error);
    }
  };

  const confirmUpdateCrop = () => {
    Alert.alert(
      'Confirm Update',
      'Are you sure you want to update this crop?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Update',
          onPress: () => {
            // Call the updateCrop function here to perform the update
            updateCrop(selectedCrop.id);
          },
        },
      ],
      { cancelable: false }
    );
  };


  const deleteCrop = async (cropId) => {
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete this crop?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Deletion canceled'),
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: async () => {
            try {
              const response = await fetch(`${url}/api/crops/${cropId}`, {
                method: 'DELETE',
              });

              if (response.status === 204) {
                alert('Delete successful');
                fetchCropList();
              } else {
                const data = await response.json();
                console.error('Failed to delete crop:', data.message);
              }
            } catch (error) {
              console.error('Error deleting crop:', error);
            }
          },
          style: 'destructive',
        },
      ],
      { cancelable: false }
    );
  };


  const toggleAddPopup = () => {
    setShowAddPopup(!showAddPopup);
  };

  const toggleDetailsPopup = () => {
    setShowDetailsPopup(!showDetailsPopup);
  };
  const closeEditPopup = () => {
    setShowEditPopup(false);
  };
  const handleCrop1Click = (crop) => {
    setSelectedCropId(crop.id); // Set the selected crop ID
    setSelectedVarietyEdit(crop.attributes.variety);
    setCropAgeEdit(crop.attributes.crop_age);
    setAcreageEdit(crop.attributes.acreage);
    setTrees0To3Edit(crop.attributes.trees_0_to_3);
    setTrees4To7Edit(crop.attributes.trees_4_to_7);
    setTrees7PlusEdit(crop.attributes.trees_7_plus);
    setFarmPlotNoEdit(crop.attributes.farm_plot_no);
    setShowEditPopup(true); // Open the edit popup
  };



  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.cropItem} onPress={() => handleCropClick(item)}>
      <Text style={styles.cropType}>{item.attributes.crop_name}</Text>
      <Text style={styles.cropVariety}>{item.attributes.variety}</Text>
      <View style={styles.buttonContainer}>

      </View>
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

      <TouchableOpacity
        style={styles.addButton}
        onPress={toggleAddPopup}
      >
        <Icon name="plus" size={24} color="white" />
      </TouchableOpacity>


      {showAddPopup && (
        <Modal visible={showAddPopup} animationType="slide" transparent={true}>
          <View style={styles.modalContainer}>
            <View style={styles.popupContainer}>
              <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
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

      {/* Render the details popup */}
      {renderDetailsPopup()}
      <Modal visible={showEditPopup} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.popupContainer}>
            {/* Close Icon */}
            <TouchableOpacity onPress={closeEditPopup} style={styles.closeIcon}>
              <Icon name="close" size={24} color={theme.colors.primary} />
            </TouchableOpacity>
            <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
              <Text style={styles.header}>Edit Crop</Text>
              <TextInput
                style={styles.smallInput}
                placeholder="Crop Age"
                value={cropAgeEdit}
                onChangeText={(text) => setCropAgeEdit(text)}
              />
              <TextInput
                style={styles.smallInput}
                placeholder="Acreage"
                value={acreageEdit}
                onChangeText={(text) => setAcreageEdit(text)}
              />
              <TextInput
                style={styles.smallInput}
                placeholder="Trees 0-3"
                value={trees0To3Edit}
                onChangeText={(text) => setTrees0To3Edit(text)}
              />
              <TextInput
                style={styles.smallInput}
                placeholder="Trees 4-7"
                value={trees4To7Edit}
                onChangeText={(text) => setTrees4To7Edit(text)}
              />
              <TextInput
                style={styles.smallInput}
                placeholder="Trees 7+"
                value={trees7PlusEdit}
                onChangeText={(text) => setTrees7PlusEdit(text)}
              />
              <TextInput
                style={styles.smallInput}
                placeholder="Farm Plot No"
                value={farmPlotNoEdit}
                onChangeText={(text) => setFarmPlotNoEdit(text)}
              />
             
              {/* Update Button */}
              <Button mode="contained" onPress={confirmUpdateCrop}>
                <Text>Update</Text>
              </Button>
            </ScrollView>
          </View>
        </View>
      </Modal>

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
    width: '100%',
    flex: 1,
    marginBottom: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    paddingHorizontal: 12,
  },
  picker: {
    width: 300,
    marginBottom: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  cropItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    elevation: 2,
    height : 60
  },
  cropType: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: theme.colors.text,
  },
  cropVariety: {
    fontSize: 14,
    color: theme.colors.text,
  },
  cropList: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 20,
    justifyContent: 'space-between',
  },
  closeIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
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
  },
  closeIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: theme.colors.primary,
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    width: '40%',
  },
  detailValue: {
    fontSize: 16,
    width: '60%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 50,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: theme.colors.primary, // Use your desired button background color
    borderRadius: 50, // Make it a circle
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5, // Add elevation for a shadow effect
  },
  
});

export default CropsScreen;
