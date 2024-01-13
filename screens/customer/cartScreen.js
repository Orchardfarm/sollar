import React, { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { BASE_URL } from "../../env";
import { theme } from "../../src/core/theme";
import Button from "../../src/components/Button";

const CartScreen = () => {
  const [cartItems, setCartItems] = useState(dummyData);

  const url = BASE_URL;

  const renderCartItem = ({ item }) => {
    const totalAmount = item.quantity * item.price;

    return (
      <View style={{flexDirection : 'column',     backgroundColor: "#f0f0f0",
      borderRadius: 10, padding: 10 , marginBottom: 10}}>
        <View>
          <Text style={styles.cartItemTitle}>{item.itemName}</Text>
        </View>
        <View style={styles.cartItem}>
          <Image source={item.image} style={styles.cropImage} />
          <View style={styles.itemDetails}>
            <Text style={styles.detailText}>Quantity: {item.quantity}</Text>
            <Text style={styles.detailText}>
              Price: ${item.price.toFixed(2)}
            </Text>
            <Text style={styles.detailText}>
              Total: ${totalAmount.toFixed(2)}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const totalAmount = cartItems.reduce((acc, item) => {
    return acc + item.quantity * item.price;
  }, 0);

  return (
    <View style={styles.container}>
      <FlatList
        data={cartItems}
        renderItem={renderCartItem}
        keyExtractor={(item) => item.id.toString()}
        style={styles.cartList}
      />
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>
          Total Amount: ${totalAmount.toFixed(2)}
        </Text>
        <Button mode="contained" style={styles.checkoutButton}>
          <Text style={styles.checkoutButtonText}>Checkout</Text>
        </Button>
      </View>
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: 15,
  },
  cartTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
    color: theme.colors.primary,
  },
  cartList: {
    marginBottom: 10,
  },
  cartItem: {
    flexDirection: "row",
    alignItems: "center",

    padding: 10,
    marginBottom: 10,
  },
  cropImage: {
    width: 60,
    height: 60,
    borderRadius: 5,
    marginRight: 10,
  },
  itemName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 10,
  },
  detailText: {
    fontSize: 16,
  },
  totalContainer: {
    backgroundColor: theme.colors.surface,
    borderRadius: 10,
    padding: 15,
    marginTop: 10,
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  checkoutButton: {
    backgroundColor: theme.colors.primary,
  },
  checkoutButtonText: {
    color: theme.colors.white,
  },
  cartItemTitle: {
    fontSize: 20,
  }
});

const dummyData = [
  {
    id: 1,
    itemName: "Passion fruits",
    quantity: 100,
    price: 2.5,
    image: require("./../../assets/passion.jpeg"),
  },
  {
    id: 2,
    itemName: "Beans",
    quantity: 50,
    price: 1.5,
    image: require("./../../assets/beans.jpg"),
  },
  {
    id: 3,
    itemName: "Banana",
    quantity: 200,
    price: 0.75,
    image: require("./../../assets/banana.jpg"),
  },
  {
    id: 1,
    itemName: "Passion fruits",
    quantity: 100,
    price: 2.5,
    image: require("./../../assets/passion.jpeg"),
  },
  {
    id: 2,
    itemName: "Beans",
    quantity: 50,
    price: 1.5,
    image: require("./../../assets/beans.jpg"),
  },
  {
    id: 3,
    itemName: "Banana",
    quantity: 200,
    price: 0.75,
    image: require("./../../assets/banana.jpg"),
  },
  {
    id: 1,
    itemName: "Passion fruits",
    quantity: 100,
    price: 2.5,
    image: require("./../../assets/passion.jpeg"),
  },
  {
    id: 2,
    itemName: "Beans",
    quantity: 50,
    price: 1.5,
    image: require("./../../assets/beans.jpg"),
  },
  {
    id: 3,
    itemName: "Banana",
    quantity: 200,
    price: 0.75,
    image: require("./../../assets/banana.jpg"),
  },
  {
    id: 1,
    itemName: "Passion fruits",
    quantity: 100,
    price: 2.5,
    image: require("./../../assets/passion.jpeg"),
  },
  {
    id: 2,
    itemName: "Beans",
    quantity: 50,
    price: 1.5,
    image: require("./../../assets/beans.jpg"),
  },
  {
    id: 3,
    itemName: "Banana",
    quantity: 200,
    price: 0.75,
    image: require("./../../assets/banana.jpg"),
  },
  {
    id: 1,
    itemName: "Passion fruits",
    quantity: 100,
    price: 2.5,
    image: require("./../../assets/passion.jpeg"),
  },
  {
    id: 2,
    itemName: "Beans",
    quantity: 50,
    price: 1.5,
    image: require("./../../assets/beans.jpg"),
  },
  {
    id: 3,
    itemName: "Banana",
    quantity: 200,
    price: 0.75,
    image: require("./../../assets/banana.jpg"),
  },
];
