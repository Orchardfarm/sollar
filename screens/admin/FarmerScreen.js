import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Modal, Image } from 'react-native';
import { theme } from '../../src/core/theme';
import Button from '../../src/components/Button';
import * as base from '../../env';
const url = base.BASE_URL;

const FarmersScreen = () => {
  const [customersList, setCustomersList] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showCustomerPopup, setShowCustomerPopup] = useState(false);

  useEffect(() => {
    fetchCustomersList();
  }, []);

  const fetchCustomersList = async () => {
    try {
      const response = await fetch(url + '/api/v1/profiles');
      const json = await response.json();
      console.log(json);
      const customers = json.data.filter((user) => user.role === 'farmer');
      setCustomersList(customers);
      console.log(customers);
    } catch (error) {
      alert('Error fetching customers:', error);
    }
  };

  const handleCustomerClick = (user) => {
    setSelectedCustomer(user);
    setShowCustomerPopup(true);
  };

  const closeCustomerPopup = () => {
    setShowCustomerPopup(false);
  };

  const renderCustomerItem = ({ item }) => (
    <TouchableOpacity style={styles.customerItem} onPress={() => handleCustomerClick(item)}>
      <Image source={{ uri: item.avatar_url }} style={styles.customerAvatar} />
      <Text style={styles.customerName}>
        {item.first_name} {item.last_name}
      </Text>
      <Text style={styles.customerEmail}>{item.email}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={customersList}
        renderItem={renderCustomerItem}
        keyExtractor={(item) => (item.id ? item.id.toString() : 'defaultKey')}
        style={styles.customerList}
      />

{selectedCustomer && showCustomerPopup && (
  <Modal visible={showCustomerPopup} animationType="slide" transparent={true}>
    <View style={styles.modalContainer}>
      <View style={styles.popupContainer}>
        <Text style={styles.header}>Grower Details</Text>
        {selectedCustomer && (
          <>
            <Image source={{ uri: selectedCustomer.avatar_url }} style={styles.customerAvatar} />
            <Text style={styles.customerDetailText}>
              Name: {selectedCustomer.first_name} {selectedCustomer.last_name}
            </Text>
            <Text style={styles.customerDetailText}>Email: {selectedCustomer.email}</Text>
            <Text style={styles.customerDetailText}>National ID: {selectedCustomer.national_id}</Text>
            <Text style={styles.customerDetailText}>Address: {selectedCustomer.location}</Text>
            <Text style={styles.customerDetailText}>Phone Number: {selectedCustomer.phone_number}</Text>
    
          </>
        )}
        <Button mode="contained" onPress={closeCustomerPopup}>
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
    backgroundColor: '#F2F2F2',
    padding: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: theme.colors.primary,
  },
  customerList: {
    flex: 1,
  },
  customerItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    elevation: 2,
  },
  customerAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 5,
  },
  customerName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: theme.colors.text,
  },
  customerEmail: {
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
  customerDetailText: {
    fontSize: 16,
    marginBottom: 5,
    color: theme.colors.text,
  },
});

export default FarmersScreen;
