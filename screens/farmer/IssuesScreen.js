import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import * as base from '../../env';

const IssuesScreen = () => {
  const [issues, setIssues] = useState([]);
  const url = base.BASE_URL;

  const fetchIssues = async () => {
    try {
      const response = await fetch(`${url}/api/issues`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        console.error('Failed to fetch issues');
        return;
      }

      const data = await response.json();
      setIssues(data); 
    } catch (error) {
      console.error('Error fetching issues:', error);
    }
  };

  useEffect(() => {
    fetchIssues();
  }, []); 
console.log(issues)
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Issues</Text>
      <FlatList
        data={issues}
        keyExtractor={(item) => item.id.toString()} 
        renderItem={({ item }) => (
          <View style={styles.issueItem}>
            <Text>{item.title}</Text>
          </View>
        )}
      />
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
    fontWeight: 'bold',
    marginBottom: 16,
  },
  issueItem: {
    marginBottom: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
});

export default IssuesScreen;
