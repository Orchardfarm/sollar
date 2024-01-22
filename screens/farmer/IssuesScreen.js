import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, Modal, TextInput, Button } from 'react-native';
import { theme } from '../../src/core/theme';

const IssuesScreen = () => {
  const [issues, setIssues] = useState([
    { id: 1, title: 'Pest Infestation', description: 'Crops affected by pests', image: require('../../assets/pest.jpg') },
    { id: 2, title: 'Drought Stress', description: 'Crops facing water scarcity', image: require('../../assets/drought.jpg') },
    { id: 3, title: 'Fungal Infection', description: 'Crops infected by fungus', image: require('../../assets/fungus.jpg') },
  ]);

  const [selectedIssue, setSelectedIssue] = useState(null);
  const [issueDetails, setIssueDetails] = useState('');
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const openPopup = (issue) => {
    setSelectedIssue(issue);
    setIssueDetails('');
    setIsPopupVisible(true);
  };

  const closePopup = () => {
    setIsPopupVisible(false);
  };

  const saveIssueDetails = () => {
    // Add your logic to save issue details
    console.log(`Details for issue ${selectedIssue.title}: ${issueDetails}`);
    closePopup();
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={issues}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.issueItem} onPress={() => openPopup(item)}>
            <Image source={item.image} style={styles.issueImage} />
            <Text style={styles.issueTitle}>{item.title}</Text>
            <Text style={styles.issueDescription}>{item.description}</Text>
          </TouchableOpacity>
        )}
      />

      <Modal visible={isPopupVisible} animationType="slide" transparent>
        <View style={styles.popupContainer}>
          <Text style={styles.popupTitle}>{selectedIssue?.title}</Text>
          <TextInput
          multiline={true}
            style={styles.popupInput}
            placeholder="Add issue details"
            onChangeText={(text) => setIssueDetails(text)}
            value={issueDetails}
          />
          <View style={{flexDirection :'row' , gap : 20}}>
          <TouchableOpacity onPress={saveIssueDetails} style={{backgroundColor : theme.colors.primary , padding : 10 , borderRadius : 10 , width  : 80 , textAlign : 'center'}}>
          <Text style={{textAlign : 'center'}}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={closePopup}  style={{backgroundColor : theme.colors.primary  , padding : 10 , borderRadius : 10 , width  : 80}}>
            <Text style={{textAlign : 'center'}}>Close</Text>
          </TouchableOpacity>
          </View>
         
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  issueItem: {
    marginBottom: 16,
    padding: 16,
    alignItems: "center",
elevation : 2,
    backgroundColor : '#fff',
    borderRadius : 15
  },
  issueImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginBottom: 8,
  },
  issueTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  issueDescription: {
    fontSize: 16,
    color: "#555",
  },
  popupContainer: {
    marginTop : 280,
    width : 300,
    alignSelf :'center',
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 16,
    gap : 20,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,

  },
  popupTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    textTransform : 'uppercase'
  },
  popupInput: {
    width: "80%",
    height: 80,
    borderColor: theme.colors.primary,
    borderWidth: 1,
    paddingLeft: 8,
  },
});

export default IssuesScreen;
