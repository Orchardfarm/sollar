import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Linking,
} from "react-native";
import { theme } from "../../src/core/theme";
import Button from "../../src/components/Button";
import TextInput from "../../src/components/TextInput";
import * as base from "../../env";
import Icon from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView } from "react-native-gesture-handler";
const url = base.BASE_URL;

const CropsScreen = () => {
  const [cropsList, setCropsList] = useState([]);
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [showCropPopup, setShowCropPopup] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [user, setUser] = useState();

  const fetchCropsList = async () => {
    try {
      const response = await fetch(url + "/api/crops");
      const data = await response.json();
      setCropsList(data.data); // Assuming the crops are in the 'data' property
    } catch (error) {
      console.error("Error fetching crops list:", error);
    }
  };

  const fetchCartItems = async () => {
    try {
      const response = await fetch(url + "/api/cart_items");

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Cart items from server:", data.data);
      setCartItems(data.data);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  useEffect(() => {
    fetchCropsList();
    fetchCartItems();
  }, []); // Fetch crops list once when the component mounts

  const handleCropClick = (crop) => {
    setSelectedCrop(crop);
    setShowCropPopup(true);
  };

  const closeCropPopup = () => {
    setShowCropPopup(false);
  };
  const addToCart = async () => {
    try {
      const response = await fetch(url + "/api/cart_items", {
        method: "POST",
        body: JSON.stringify({
          crop_id: selectedCrop.id,
          quantity: quantity,
        }),
      });
      const data = await response.json();
      console.log("Response from server:", data); // Log the response
      setShowCropPopup(false);
      fetchCartItems(); // Refresh cart items after adding to cart
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const authToken = await AsyncStorage.getItem("authToken");
        if (authToken) {
          const response = await fetch(url + "/current_user", {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          });

          if (response.ok) {
            const userData = await response.json();
            setUser(userData?.data ?? {});
            console.log("User:", userData);
          } else {
            // Handle fetch user data error
          }
        }
      } catch (error) {
        // Handle any errors that occur during AsyncStorage or fetch operations
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  // const initiatePayment = async () => {
  //   try {
  //     // Implement logic to initiate payment with M-Pesa API
  //     // This could involve making another API call to the payment gateway
  //     // and handling the response accordingly
  //     console.log('Initiating payment...');
  //     console.log(user)
  //     if (user?.phone_number) {
  //       const stkResponse = await fetch(`https://stk.cradlevoices.com/Api/account/stkpush`, {
  //         method: "POST",
  //         body: JSON.stringify({
  //           accountID: "2",
  //           amount: `100`,
  //           appCode: "2",
  //           phone: `${user?.phone_number}`,
  //           type: "cradlevoices",
  //           callbackUrl: "https://173.212.241.254:8080/Api/account/callback",
  //           updateAmount: "50"
  //         }),
  //         headers: {
  //           "Content-Type": "application/json"
  //         }
  //       }).then((res) => { return res });

  //       console.log(stkResponse)
  //     }
  //   } catch (error) {
  //     console.log(error)
  //     console.error('Error initiating payment:', error);
  //   }
  // };

  const initiatePayment = async () => {
    try {
      console.log("Initiating payment...");
      console.log(user);

      if (user?.phone_number) {
        // Step 1: Make API call to initiate payment
        const stkResponse = await fetch(
          `https://stk.cradlevoices.com/Api/account/stkpush`,
          {
            method: "POST",
            body: JSON.stringify({
              accountID: "2",
              amount: `100`,
              appCode: "2",
              phone: `${user?.phone_number}`,
              type: "cradlevoices",
              callbackUrl: "https://173.212.241.254:8080/Api/account/callback",
              updateAmount: "50",
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        ).then((res) => res.json());

        console.log("Payment initiation response:", stkResponse);

        const smsResponse = await fetch(
          "https://farm-b-y78k.onrender.com/send_sms",
          {
            method: "POST",
            body: JSON.stringify({
              to: user?.phone_number,
              message:
                "Thank you for using Africas Talking your items will be ready in 1 hour",
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        ).then((res) => res.json());

        console.log("SMS Response:", smsResponse);
      }
    } catch (error) {
      console.error("Error initiating payment:", error);
    }
  };

  const renderCropItem = ({ item }) => (
    <TouchableOpacity
      style={styles.cropItem}
      onPress={() => handleCropClick(item)}
    >
      <Text style={styles.cropType}>{item.attributes.crop_name}</Text>
      <Text style={styles.cropVariety}>{item.attributes.variety}</Text>
    </TouchableOpacity>
  );
  const renderCartItem = ({ item }) => {
    console.log("Rendering cart item:", item);
    return (
      <View style={styles.cartItem}>
        <Text>
          {item.attributes.quantity} x {item.attributes.crop_name}
          {"     "}
          {item.attributes.total}{" "}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={cropsList}
        renderItem={renderCropItem}
        keyExtractor={(item) => item.id}
        style={styles.cropList}
      />
      {/* <View style={styles.cartContainer}>
        <Text style={styles.cartTitle}>Cart</Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          <FlatList
            data={cartItems}
            renderItem={renderCartItem}
            keyExtractor={(item) => item.id.toString()} // Ensure the key is a string
            style={styles.cartList}
          />
        </ScrollView>

        <Button mode="contained" onPress={initiatePayment}>
          <Text>Checkout</Text>
        </Button>
      </View> */}

      {selectedCrop && showCropPopup && (
        <Modal visible={true} animationType="slide" transparent={true}>
          <View style={styles.modalContainer}>
            <View style={styles.popupContainer}>
              <View>
                <Text style={styles.header}>Crop Details</Text>
              </View>
              <TouchableOpacity
                style={{ position: "absolute", left: 12, top: 10 }}
                onPress={closeCropPopup}
              >
                <Icon name="close" size={44} color={theme.colors.primary} />
              </TouchableOpacity>

              <Text style={styles.cropDetailText}>
                Crop Type: {selectedCrop.attributes.crop_name}
              </Text>
              <Text style={styles.cropDetailText}>
                Variety Planted: {selectedCrop.attributes.variety}
              </Text>
              <Text style={styles.cropDetailText}>
                Crop Age: {selectedCrop.attributes.crop_age}
              </Text>
              <Text style={styles.cropDetailText}>
                Acreage: {selectedCrop.attributes.acreage}
              </Text>
              <Text style={styles.cropDetailText}>
                Trees (0-3 years): {selectedCrop.attributes.trees_0_to_3}
              </Text>
              <Text style={styles.cropDetailText}>
                Trees (4-7 years): {selectedCrop.attributes.trees_4_to_7}
              </Text>
              <Text style={styles.cropDetailText}>
                Trees (7+ years): {selectedCrop.attributes.trees_7_plus}
              </Text>
              <Text style={styles.header}>Grower contact Details</Text>
              <Text style={styles.cropDetailText}>
                Grower Name: {selectedCrop.attributes.first_name}
              </Text>
              <Text
                style={styles.cropDetailText}
                // onPress={() => {
                //         const phoneNumber = selectedCrop.attributes.phone_number;
                //         if (phoneNumber) {
                //           Linking.openURL(`tel:${phoneNumber}`);
                //         }
                //       }}
              >
                Grower Contact: {selectedCrop.attributes.phone_number}
              </Text>

              <View style={styles.quantityContainer}>
                <Text style={styles.quantityLabel}>Quantity:</Text>
                <TextInput
                  keyboardType="numeric"
                  value={quantity.toString()}
                  onChangeText={(text) => setQuantity(parseInt(text, 10) || 1)}
                />
              </View>
              <TouchableOpacity onPress={addToCart}>
                <Icon name="cart-plus" size={35} color="#528508" />
              </TouchableOpacity>
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
    backgroundColor: "#f2f2f2",
    marginHorizontal: 20,
    paddingTop: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: theme.colors.primary,
  },
  cropList: {
    flex: 1,
  },
  cropItem: {
    backgroundColor: "#FFFFFF",
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
    elevation: 2,
  },
  cropType: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: theme.colors.text,
  },
  cropVariety: {
    fontSize: 14,
    color: theme.colors.secondary,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  popupContainer: {
    width: "80%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 30,
    alignItems: "center",
  },
  // cropDetailText: {
  //   fontSize: 16,
  //   marginBottom: 5,
  //   color: theme.colors.text,
  // },
  cartContainer: {
    padding: 20,
    backgroundColor: "#FFFFFF",
    marginTop: 20,
    elevation: 3,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    minHeight: 200,
    maxHeight: 400,
  },
  cartTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: theme.colors.primary,
  },
  cartList: {
    marginBottom: 10,
  },
  cartItem: {
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    padding: 10,
    marginBottom: 5,
  },
  cropDetailText: {
    fontSize: 16,
    marginBottom: 5,
    color: theme.colors.text,
    fontWeight: "600",
  },
  quantityLabel: {
    fontSize: 20,
    marginRight: 10,
    color: theme.colors.text,
  },
  quantityInput: {
    flex: 1,
    height: 80,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
  quantityContainer: {
    alignItems: "center",
    flexDirection: "row",
    width: 150,
    alignSelf: "center",
    justifyContent: "center",
  },
});

export default CropsScreen;
