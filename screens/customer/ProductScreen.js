import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
  Alert,
  Image,
} from "react-native";
import { theme } from "../../src/core/theme";
import Button from "../../src/components/Button";
import TextInput from "../../src/components/TextInput";
import * as base from "../../env";
import Icon from "react-native-vector-icons/FontAwesome";

const url = base.BASE_URL;

const ProductScreen = () => {
  const [productList, setProductList] = useState([]);
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showDetailsPopup, setShowDetailsPopup] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [cropId, setCrop] = useState("");
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [priceEdit, setPriceEdit] = useState("");
  const [quantityEdit, setQuantityEdit] = useState("");
  const [cart, setCart] = useState([]); // State to store items in the cart

  const fetchProductList = async () => {
    try {
      const response = await fetch(url + "/api/products");
      const data = await response.json();
      setProductList(data.data);
    } catch (error) {
      console.error("Error fetching products list:", error);
    }
  };

  useEffect(() => {
    fetchProductList();
  }, []);

  const addProduct = async () => {
    try {
      const response = await fetch(url + "/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          description: description,
          price: price,
          quantity: quantity,
          crop_id: cropId,
        }),
      });
      const data = await response.json();

      if (response.ok) {
        alert("Save successful");
        fetchProductList();
        resetForm();
        setShowAddPopup(false);
      } else {
        console.error("Failed to save product:", data.message);
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const resetForm = () => {
    setName("");
    setDescription("");
    setPrice("");
    setQuantity("");
    setCrop("");
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setSelectedProductId(product.id);
    setShowDetailsPopup(true);
    setShowEditPopup(false);
  };

  const openDetailsPopup = () => {
    setShowDetailsPopup(true);
  };

  const closeDetailsPopup = () => {
    setShowDetailsPopup(false);
  };

  const renderDetailsPopup = () => {
    if (!showDetailsPopup || !selectedProduct) {
      return null;
    }
    return (
      <Modal
        visible={showDetailsPopup}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.popupContainer}>
            <TouchableOpacity
              onPress={closeDetailsPopup}
              style={styles.closeIcon}
            >
              <Icon name="close" size={24} color={theme.colors.primary} />
            </TouchableOpacity>

            <ScrollView contentContainerStyle={styles.scrollContainer}>
              <Text style={styles.header}>Product Details</Text>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Product Name:</Text>
                <Text style={styles.detailValue}>
                  {selectedProduct.attributes.crop_name}
                </Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Price:</Text>
                <Text style={styles.detailValue}>
                  {selectedProduct.attributes.price}
                </Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Product Quantity:</Text>
                <Text style={styles.detailValue}>
                  {selectedProduct.attributes.quantity}
                </Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Description:</Text>
                <Text style={styles.detailValue}>
                  {selectedProduct.attributes.description}
                </Text>
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => setShowEditPopup(true)}>
                  <Icon name="edit" size={20} color="#528508" />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => deleteProduct(selectedProduct.id)}
                >
                  <Icon name="trash" size={20} color="#528508" />
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    );
  };

  const updateProduct = async () => {
    try {
      if (!selectedProduct || !selectedProduct.id) {
        console.error("No selected product to update");
        return;
      }

      const response = await fetch(
        `${url}/api/products/${selectedProduct.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            price: price,
            quantity: quantity,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        Alert.alert(
          "Update Successful",
          "Are you sure you want to update this product?",
          [
            {
              text: "Cancel",
              style: "cancel",
            },
            {
              text: "Confirm",
              onPress: () => {
                alert("Update confirmed");
                fetchProductList();
              },
            },
          ]
        );
      } else {
        console.error("Failed to update product:", data.message);
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const confirmUpdateProduct = () => {
    Alert.alert(
      "Confirm Update",
      "Are you sure you want to update this product?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Update",
          onPress: () => {
            updateProduct();
          },
        },
      ],
      { cancelable: false }
    );
  };

  const deleteProduct = async (productId) => {
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete this product?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Deletion canceled"),
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: async () => {
            try {
              const response = await fetch(`${url}/api/products/${productId}`, {
                method: "DELETE",
              });

              if (response.status === 204) {
                alert("Delete successful");
                fetchProductList();
              } else {
                const data = await response.json();
                console.error("Failed to delete product:", data.message);
              }
            } catch (error) {
              console.error("Error deleting product:", error);
            }
          },
          style: "destructive",
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
  const cropImageMapping = {
    "Passion fruits": require("./../../assets/passion.jpeg"),
    Beans: require("./../../assets/beans.jpg"),
    Banana: require("./../../assets/banana.jpg"),
    Maize: require("./../../assets/maize.jpeg"),
    Tea: require("./../../assets/tea.jpeg"),
    Sugarcane: require("./../../assets/sugar.jpeg"),
    Avocado: require("./../../assets/avo.jpeg"),
  };

  const renderItem = ({ item }) => (
    <View>
      <TouchableOpacity
        style={styles.productItem}
        onPress={() => handleProductClick(item)}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View>
            <Image
              style={styles.cropImage}
              source={cropImageMapping[item.attributes.crop_name]}
            />
          </View>

          <View style={{ marginLeft: 20 }}>
            <Text style={styles.productType}>
              {item.attributes.crop_name}
            </Text>
            <Text style={styles.productVariety}>
              price {item.attributes.price}
            </Text>
            <Text style={styles.productVariety}>
              quantity {item.attributes.quantity}
            </Text>
          </View>
          <TouchableOpacity onPress={() => addToCart(item)}>
            <Icon name="cart-plus" size={24} color="#528508" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );

  const addToCart = (product) => {
    setCart([...cart, product]); // Add the selected product to the cart
    Alert.alert("Product added to cart");
  };

  const checkout = async () => {
    try {
      const totalPrice = cart.reduce((acc, curr) => acc + curr.attributes.price, 0);
      const response = await fetch('https://connect.squareupsandbox.com/v2/payments', {
        method: 'POST',
        headers: {
          'Square-Version': '2024-04-17',
          'Authorization': 'Bearer EAAAlpxsmpxeuC7_qxFW4H3yjx8lMHc3ibmg2KlTWxYuU6cLWzDc6NMQNnmmNfef',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "amount_money": {
            "amount": totalPrice * 100, // convert to cents
            "currency": "USD"
          },
          "idempotency_key": "2e8bf0c5-b0a4-441b-9620-5becdcaa9778",
          "source_id": "cnon:card-nonce-ok",
          "autocomplete": true,
          "buyer_email_address": "vigehi2017@gmail.com",
          "cash_details": {
            "buyer_supplied_money": {
              "amount": totalPrice * 100, // convert to cents
              "currency": "USD"
            }
          },
          "customer_id": "HC8AMVGJA9G6Y9H2HNMMD0SNNM",
          "location_id": "LXM1REAR0Q9FE"
        })
      });
      
      if (response.ok) {
        const responseData = await response.json();
        console.log('Payment successful:', responseData);
        // Clear the cart
        setCart([]);
        Alert.alert('Payment successful. Cart cleared.');
      } else {
        console.error('Payment failed:', response.status);
        Alert.alert('Payment failed. Please try again later.');
      }
    } catch (error) {
      console.error('Error processing payment:', error);
      Alert.alert('Error processing payment. Please try again later.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={{height : 280 , backgroundColor : '#2d4c35' , borderBottomLeftRadius : 80 , borderBottomRightRadius : 80 ,}}>

      </View>
      <View style={{flex : 1 , marginTop : -230}}>
      <FlatList
        data={productList}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.productList}
      />
      </View>
   

      <TouchableOpacity style={styles.addButton} onPress={toggleAddPopup}>
        <Icon name="plus" size={24} color="white" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.checkoutButton} onPress={checkout}>
        <Icon name="shopping-cart" size={24} color="white" />
        <Text style={styles.checkoutButtonText}>Checkout</Text>
        <Text style={styles.totalPrice}>Total: ${cart.reduce((acc, curr) => acc + curr.attributes.price, 0)}</Text>
      </TouchableOpacity>

      {showAddPopup && (
        <Modal visible={showAddPopup} animationType="slide" transparent={true}>
          <View style={styles.modalContainer}>
            <View style={styles.popupContainer}>
              <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                <Text style={styles.header}>Add Product</Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.smallInput}
                    placeholder="Enter product name"
                    value={name}
                    onChangeText={(text) => setName(text)}
                  />
                  <TextInput
                    style={styles.smallInput}
                    placeholder="Enter Price"
                    value={price}
                    onChangeText={(text) => setPrice(text)}
                  />
                  <TextInput
                    style={styles.smallInput}
                    placeholder="Enter Quantity"
                    value={quantity}
                    onChangeText={(text) => setQuantity(text)}
                  />
                  <TextInput
                    style={styles.smallInput}
                    placeholder="Enter description"
                    value={description}
                    onChangeText={(text) => setDescription(text)}
                  />
                  <TextInput
                    style={styles.smallInput}
                    placeholder="Enter crop_id"
                    value={cropId}
                    onChangeText={(text) => setCrop(text)}
                  />
                  <Button mode="contained" onPress={addProduct}>
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

      {showDetailsPopup && renderDetailsPopup()}

      <Modal visible={showEditPopup} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.popupContainer}>
            <TouchableOpacity onPress={closeEditPopup} style={styles.closeIcon}>
              <Icon name="close" size={24} color={theme.colors.primary} />
            </TouchableOpacity>
            <ScrollView
              contentContainerStyle={styles.scrollContainer}
              showsVerticalScrollIndicator={false}
            >
              <Text style={styles.header}>Edit Product</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.smallInput}
                  placeholder="Enter new price"
                  value={priceEdit}
                  onChangeText={(text) => setPriceEdit(text)}
                />
                <TextInput
                  style={styles.smallInput}
                  placeholder="Enter new quantity"
                  value={quantityEdit}
                  onChangeText={(text) => setQuantityEdit(text)}
                />
                <Button mode="contained" onPress={confirmUpdateProduct}>
                  <Text>Update</Text>
                </Button>
                <Button mode="contained" onPress={closeEditPopup}>
                  <Text>Cancel</Text>
                </Button>
              </View>
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
    backgroundColor: "#FFF",
  },
  productItem: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  productType: {
    fontSize: 18,
    fontWeight: "bold",
  },
  productVariety: {
    fontSize: 16,
    color: "#666",
  },
  addButton: {
    position: "absolute",
    right: 20,
    bottom: 20,
    backgroundColor: theme.colors.primary,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
  },
  checkoutButton: {
    position: "absolute",
    right: 20,
    bottom: 100,
    backgroundColor: theme.colors.primary,
    width: 160,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    elevation: 3,
  },
  checkoutButtonText: {
    color: "white",
    marginLeft: 5,
  },
  totalPrice: {
    color: "white",
    position: "absolute",
    right: 10,
    bottom: -10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  popupContainer: {
    backgroundColor: "white",
    width: "80%",
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  closeIcon: {
    alignSelf: "flex-end",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  detailItem: {
    marginBottom: 10,
  },
  detailLabel: {
    fontWeight: "bold",
  },
  detailValue: {
    marginLeft: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  inputContainer: {
    marginTop: 20,
  },
  smallInput: {
    marginBottom: 10,
  },
  productList: {
    flex: 1,
    marginHorizontal: 10,
  },
  cropImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
});

export default ProductScreen;
