import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
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
  return (
    <ScrollView>
      <View style={styles.container}>
        <TouchableOpacity
          style={[
            styles.bcontainer,
            { flexDirection: "row", paddingHorizontal: 15 },
          ]}
        >
          <Text style={styles.header}>Total Crops</Text>
          <Text style={styles.totalFruits}>: {cropData.length}</Text>
        </TouchableOpacity>
        <View style={styles.cropGrid}>
          {cropNames.map((cropName, index) => {
            const totalForCrop = cropData.filter(
              (data) => data.attributes.crop_name === cropName
            ).length;
            return (
              <View key={index} style={styles.cropContainer}>
                <Image
                  style={styles.cropImage}
                  source={cropImageMapping[cropName]}
                />
                <View style={{ flex: 1, flexDirection: "column" }}>
                  <View style={[styles.cropInfo, { flex: 0.5 }]}>
                    <Text style={styles.cropName}>{cropName}</Text>
                  </View>
                  <View style={[styles.cropInfo, { flex: 0.5 }]}>
                    <Text style={styles.cropTotal}>Total: {totalForCrop}</Text>
                  </View>
                </View>
              </View>
            );
          })}
        </View>

        {/* Add other content related to the dashboard here */}
        <View style={styles.addFruitContainer}>
          {/* Existing code for adding fruits */}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    padding: 20,
  },
  bcontainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    alignItems: "center",
  },
  addFruitContainer: {
    // Your styles for the container
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: theme.colors.primary,
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
  cropGrid: {
    flexDirection: "column",
    flexWrap: "wrap", // Wrap to the next row if the screen width is not enough
    justifyContent: "center", // Center the content horizontally
    marginTop: 0,
  },
  cropContainer: {
    margin: 5,
    flexDirection: "row",
    width: "100%",
    alignItems: "center", // Center the content horizontally
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 10,
    gap: 20,
  },
  cropImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  cropName: {
    fontSize: 16,
    fontWeight: "bold",
    color: theme.colors.text,
    marginTop: 5,
  },
  cropTotal: {
    fontSize: 14,
    color: theme.colors.text,
  },
});

export default Home;
