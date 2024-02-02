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
import svgs from "../../src/assets/Svgs";
import { SvgXml } from "react-native-svg";
import catimg from "../../src/assets/cart.png";
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
    <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
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
              <Text style={styles.header}>Welcome customer</Text>
              <Text style={styles.totalFruits}> karan</Text>
            </View>
          </View>
          <View
            style={{
              height: 280,
              backgroundColor: "white",
              width: 370,
              alignSelf: "center",
              borderRadius: 20,
              marginTop: -180,
              elevation: 10,
            }}
          >
            <View style={styles.cropGrid}>
              {cropNames.slice(0, 6).map((cropName, index) => {
                const totalForCrop = cropData.filter(
                  (data) => data.attributes.crop_name === cropName
                ).length;
                return (
                  <View key={index} style={styles.cropContainer}>
                    <Text style={styles.cropName}> {cropName} </Text>
                    <Image
                      style={styles.cropImage}
                      source={cropImageMapping[cropName]} // Set the image source based on the crop name
                    />
                    <View></View>
                    <TouchableOpacity
                      style={{
                        backgroundColor: "white",
                        borderRadius: 10,
                        padding: 2,
                        width: 90,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-evenly",
                        alignSelf: "center",
                      }}
                    >
                      {/* <Text style={styles.cropTotal}>Add to Cart</Text> */}
                      <Text style={styles.cropTotal}>$100</Text>
                      <Image
                        source={catimg}
                        style={{ width: 30, height: 30 }}
                      />
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>
          </View>
          <Text style={styles.featured}>featured</Text>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            horizontal
            style={{
              height: 150,
              marginTop: 20,
            }}
          >
            {cropNames.map((cropName, index) => {
              return (
                <View
                  key={index}
                  onPress={() => setCropName(cropName)}
                  style={styles.cropButton}
                >
                  <Text style={styles.cropButtonText}>{cropName}</Text>
                  <Image
                    source={cropImageMapping[cropName]}
                    style={styles.cropImage}
                  />
                  <TouchableOpacity
                      style={{
                        backgroundColor: "white",
                        borderRadius: 10,
                        padding: 2,
                        width: 90,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-evenly",
                        alignSelf: "center",
                      }}
                    >
                      {/* <Text style={styles.cropTotal}>Add to Cart</Text> */}
                      <Text style={styles.cropTotal}>$100</Text>
                      <Image
                        source={catimg}
                        style={{ width: 30, height: 30 }}
                      />
                    </TouchableOpacity>
                </View>
              );
            })}
          </ScrollView>
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
                  alignItems: "center",
                  justifyContent: "center",
                },
              ]}
            >
              <Text style={styles.header}>Go To Cart</Text>
              {/* <Text style={styles.totalFruits}>: {cropData.length}</Text> */}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
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
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    height: 128,
    width: 130,
    margin: 10,
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    elevation: 10,
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 20,
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: theme.colors.primary,
    textAlign: "center",
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
    marginTop: 15,
    marginBottom: 10,
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
    fontSize: 18,
    color: "black",
    textAlign: "center",
  },
  cropButtonText: {
    textAlign: "center",
  },
});

export default Home;
