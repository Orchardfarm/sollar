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
    console.log(productList);
    console.log(productList);
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
    console.log(item, "item"),
    (
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
          </View>
        </TouchableOpacity>
      </View>
    )
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={productList}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.productList}
      />

      <TouchableOpacity style={styles.addButton} onPress={toggleAddPopup}>
        <Icon name="plus" size={24} color="white" />
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
                  <View style={{flexDirection : 'row'}}>
                  <TouchableOpacity onPress={addProduct} style={styles.button}>
                    <Text style={{color : 'white'}}>Add</Text>
                  </TouchableOpacity >
                  <TouchableOpacity  onPress={toggleAddPopup} style={styles.button}>
                    <Text style={{color : 'white'}}>Cancel</Text>
                  </TouchableOpacity>
                  </View>
               
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
              <TextInput
                style={styles.smallInput}
                placeholder="Product Price"
                value={price}
                onChangeText={(text) => setPrice(text)}
              />
              <TextInput
                style={styles.smallInput}
                placeholder="Product Quantity"
                value={quantity}
                onChangeText={(text) => setQuantity(text)}
              />
              <Button mode="contained" onPress={confirmUpdateProduct}>
                <Text >Update</Text>
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
    backgroundColor: "#F2F2F2",
    padding: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: theme.colors.primary,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  popupContainer: {
    width: "90%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
    maxHeight: "70%",
  },
  button : {
width : 100,
height : 40,
backgroundColor :   theme.colors.primary,
borderRadius : 20,
justifyContent : 'center',
alignItems : 'center',
marginHorizontal  : 10,
gap : 5
  },
  inputContainer: {
    width: "100%",
  },
  smallInput: {
    width: "100%",
    flex: 1,
    marginBottom: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    paddingHorizontal: 12,
    textAlign : 'left'
  },
  productItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    elevation: 2,
  },
  productType: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: theme.colors.text,
  },
  productVariety: {
    fontSize: 14,
    color: theme.colors.text,
  },
  productList: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 20,
    justifyContent: "space-between",
  },
  closeIcon: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  popupContainer: {
    width: "90%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
    maxHeight: "70%",
  },
  closeIcon: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1,
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: theme.colors.primary,
  },
  detailItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: "bold",
    width: "40%",
  },
  detailValue: {
    fontSize: 16,
    width: "60%",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 50,
  },
  addButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: theme.colors.primary, // Use your desired button background color
    borderRadius: 50, // Make it a circle
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5, // Add elevation for a shadow effect
  },
  cropImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
});

export default ProductScreen;
