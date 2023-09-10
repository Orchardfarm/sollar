import React, { useState } from 'react';
import { View, Text, TextInput, Button, Linking, Share, Modal, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { theme } from '../src/core/theme';

const ShareAppScreen = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
  
    const shareApp = () => {
      setModalVisible(true);
    };

  const handleShare = async () => {
    try {
        const message = `Check out our awesome app: https://your-app-download-link.com`;

        // Create the share URL with the message
        const shareURL = `sms:${phoneNumber}?body=${encodeURIComponent(message)}`;
    
        // Open the messaging app with the pre-filled message
        Linking.openURL(shareURL);
      // Construct the message to include the phone number
      const messageWithPhoneNumber = `${message}`;

      // Share the message
      const result = await Share.share({
        message: messageWithPhoneNumber,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log(`Shared via ${result.activityType}`);
        } else {
          console.log('Shared successfully');
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('Share dismissed');
      }

      // Close the modal
      setModalVisible(false);
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

 

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
        <Text style={styles.shareButtonText}>Share App</Text>
      </TouchableOpacity>
     
      {/* Icons for App Store and Play Store */}
      <View style={styles.storeIcons}>
        <TouchableOpacity
          style={styles.storeIcon}
          onPress={() => Linking.openURL('https://dummy-app-store-link.com')}
        >
          <MaterialCommunityIcons name="apple" size={40} color={theme.colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.storeIcon}
          onPress={() => Linking.openURL('https://dummy-play-store-link.com')}
        >
          <MaterialCommunityIcons name="google-play" size={40} color={theme.colors.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: 20,
  },
  shareButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
  },
  shareButtonText: {
    color: theme.colors.surface,
    fontSize: 18,
    fontWeight: 'bold',
  },
  phoneNumberInput: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: theme.colors.primary,
    borderRadius: 5,
    marginBottom: 20,
  },
  storeIcons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  storeIcon: {
    marginRight: 20,
  },
};

export default ShareAppScreen;
