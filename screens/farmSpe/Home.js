import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Linking,
} from "react-native";
import * as base from "./../../env";
import { theme } from "../../src/core/theme";

const url = base.BASE_URL;
const cropImageMapping = {
  "Passion fruits": require("./../../assets/passion.jpeg"),
  Beans: require("./../../assets/beans.jpg"),
  Banana: require("./../../assets/banana.jpg"),
  Maize: require("./../../assets/maize.jpeg"),
  Tea: require("./../../assets/tea.jpeg"),
  Sugarcane: require("./../../assets/sugar.jpeg"),
  Avocado: require("./../../assets/avo.jpeg"),
};

const cropNames = [
  "Beans",
  "Passion fruits",
  "Banana",
  "Maize",
  "Tea",
  "Sugarcane",
  "Avocado",
];

const Home = () => {
  const [totalCrops, setTotalCrops] = useState(0);
  const [cropName, setCropName] = useState("Passion fruits");
  const [cropData, setCropData] = useState([]);

  useEffect(() => {
    fetchCrops();
  }, []);

  const fetchCrops = async () => {
    try {
      const response = await fetch(url + "/api/crops");
      const json = await response.json();
      setCropData(json.data);
    } catch (error) {
      alert(error);
    }
  };

  const openMap = (latitude, longitude) => {
    const url = `https://www.google.com/maps/place/${latitude},${longitude}`;
    Linking.openURL(url);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.container}>
        <View style={{ backgroundColor: "white" }}>
          <View
            style={{
              height: 330,
              backgroundColor: "#2d4c35",
              borderBottomLeftRadius: 80,
              borderBottomRightRadius: 80,
            }}
          >
            <View
              style={[
                styles.bcontainer,
                {
                  flexDirection: "row",
                  paddingHorizontal: 15,
                  marginTop: 40,
                  flexDirection: "column",
                  alignItems: "flex-start",
                },
              ]}
            >
              <Text style={styles.header}>Welcome support spacialist </Text>
              <Text style={styles.totalFruits}> kaara</Text>
            </View>
          </View>
          <View
            style={{
              height: 450,
              backgroundColor: "white",
              width: 370,
              alignSelf: "center",
              borderRadius: 20,
              marginTop: -180,
              elevation: 10,
            }}
          >
            <Text style={[styles.header , {  backgroundColor : theme.colors.primary , paddingTop : 5 , paddingHorizontal : 10 , color : 'white'}]}>All issues</Text>
            <ScrollView
  showsHorizontalScrollIndicator={false}
  showsVerticalScrollIndicator={false}
  vertical
  style={{
    height: 150,
    marginTop: 20,
  }}
>
  {cropNames.map((cropName, index) => {
    const latitude ='0.7482185'
    const longitude ='34.9897577'

    return (
      <TouchableOpacity
        key={index}
        onPress={() => setCropName(cropName)}
        style={styles.cropButton}
      >
        <Text style={styles.cropButtonText}>Farmer name: test 12</Text>
        <Text style={styles.cropButtonText}>issue name: no water</Text>
        <TouchableOpacity
          style={{
            backgroundColor: "white",
            borderRadius: 20,
            width: 100,
            alignSelf: "center",
            height: 25,
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 10,
          }}
          onPress={() => openMap(latitude, longitude)}
        >
          <Text style={{ color: theme.colors.primary, fontWeight: "bold" }}>
            View details
          </Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  })}
</ScrollView>
          </View>

          <View
            style={{
              height: 180,
              backgroundColor: "#2d4c35",
              borderTopRightRadius: 120,
              borderTopLeftRadius: 120,
              marginTop: 20,
            }}
          >
            <TouchableOpacity
              style={[
                styles.bcontainer,
                {
                  flexDirection: "row",
                  paddingHorizontal: 15,
                  marginTop: 70,
                  borderRadius: 100,
                },
              ]}
            >
              <Text style={styles.header}>Total Issues</Text>
              <Text style={styles.totalFruits}>: {cropData.length}</Text>
        
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    position: "relative",
  },
  bcontainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 10,

    alignItems: "center",
    marginHorizontal: 20,
  },
  cropButton: {
    backgroundColor: theme.colors.primary,
    paddingBottom : 40,
    alignSelf : 'center',
    borderRadius: 10,
    padding: 10,
    height: 100,
    width: 300,
    margin: 10,
  
    marginHorizontal: 10,
    elevation: 10,
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 20,
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: theme.colors.primary,
  },
  featured: {
    marginTop: 20,
    marginHorizontal: 20,
    fontSize: 20,
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  totalFarmers: {
    fontSize: 20,
    fontWeight: "bold",
    color: theme.colors.text,
  },
  totalFruits: {
    fontSize: 20,
    fontWeight: "bold",
    color: theme.colors.text,
  },
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    position: "relative",
  },
  bcontainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    alignItems: "center",
    marginHorizontal: 20,
  },
  // ... other existing styles ...

  cropGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 0,
    flexWrap: "wrap",
    paddingHorizontal: 3,
  },

  cropContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: "white",
    width: 120,
    height: 110,
    marginTop: 10,
  },
  cropImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginBottom: 5,
  },
  cropName: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 10,
    color: theme.colors.text,
    marginTop: 0,
    textAlign: "center",
  },
  cropTotal: {
    fontSize: 14,
    color: theme.colors.text,
  },
  cropButtonText: {
    marginBottom: 10,
    textAlign : 'left',
    color : 'white',
    fontWeight : 'bold'
  },
});

export default Home;
