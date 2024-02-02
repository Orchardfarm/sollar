import React, { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, View , TouchableOpacity } from "react-native";
import { BASE_URL } from "../../env";
import { theme } from "../../src/core/theme";
import Button from "../../src/components/Button";

const CartScreen = () => {
  const [cartItems, setCartItems] = useState(dummyData);
  const [paidCartItems , setPaidCartItems] = useState(paidData)
  const [showPending , setShowPending] = useState(true)
  const [shoPaid , setShowPaid] = useState(false)

  const url = BASE_URL;
const showPendingItems  = () =>{
  setShowPending(true)
  setShowPaid(false)
}

const showPiadItems  = () =>{
  setShowPending(false)
  setShowPaid(true)
}

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
            {showPending ? 
            (    <Text style={styles.detailText}>
              Total: ${totalAmount.toFixed(2)}
            </Text>) : (
               <Text style={[styles.detailText , {color : theme.colors.primary}]}>
               Total amount paid : ${totalAmount.toFixed(2)}
             </Text>
            )}
         
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
      <View style={{flexDirection : 'row' , justifyContent:'space-evenly' , marginBottom :12}}>
      <TouchableOpacity onPress={showPendingItems} style={{backgroundColor : showPending ?  theme.colors.primary: 'white' , paddingVertical : 10 ,borderRadius : 5 , width : 120 , }}>
        <Text style={{textAlign : 'center' , fontWeight : 'bold' , color :showPending ? 'white' : 'black'}}>pending</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{backgroundColor : shoPaid ? theme.colors.primary : 'white' , paddingVertical : 10 ,borderRadius : 5 , width : 120 , color : 'white'}} onPress={showPiadItems}>
      <Text style={{textAlign : 'center' , fontWeight : 'bold' , color : shoPaid ? 'white' : 'black'}}>paid</Text>
      </TouchableOpacity>
      </View>
     
      <FlatList
        data={showPending ? cartItems : paidCartItems}
        renderItem={renderCartItem}
        keyExtractor={(item) => item.id.toString()}
        style={styles.cartList}
      /> 
      {showPending &&  (
              <View style={styles.totalContainer}>
              <Text style={styles.totalText}>
                Total Amount: ${totalAmount.toFixed(2)}
              </Text>
              <Button mode="contained" style={styles.checkoutButton}>
                <Text style={styles.checkoutButtonText}>Checkout</Text>
              </Button>
            </View>
      )}

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
    fontWeight : 'bold'
  },
  totalContainer: {
    backgroundColor: theme.colors.primary,
    borderRadius: 10,
    padding: 15,
    marginTop: 10,
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color : 'white'
  },
  checkoutButton: {
    backgroundColor: 'white',
  },
  checkoutButtonText: {
    color : 'black'
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
const paidData = [
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
