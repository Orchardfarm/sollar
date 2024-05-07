import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const DrawerContent = ({ onCloseDrawer }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onCloseDrawer} style={styles.closeButton}>
                <Ionicons name="close" size={30} color="#0a6622" />
            </TouchableOpacity>
            <View style={styles.content}>
                <View style={styles.header}>
                    <Image source={require('../assets/logo.png')} style={styles.logo} />
                </View>
                <View style={styles.menu}>
                    <TouchableOpacity style={styles.menuItem} onPress={() => {/* handle County click */}}>
                        <Text style={styles.menuItemText}>County</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuItem} onPress={() => {/* handle Subcounty click */}}>
                        <Text style={styles.menuItemText}>Subcounty</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuItem} onPress={() => {/* handle Ward click */}}>
                        <Text style={styles.menuItemText}>Ward</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'ffffff',
        paddingTop: 40,
        paddingHorizontal: 20,
        justifyContent: 'center',
    },
    closeButton: {
        position: 'absolute',
        top: 20,
        right: 20,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 30,
        justifyContent: 'center',
    },
    logo: {
        width: 200,
        height: 40,
        borderRadius: 0,
        marginRight: 15,
    },
    logoText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    menu: {
        borderTopWidth: 1,
        borderTopColor: '#DDD',
        marginTop: 30,
    },
    menuItem: {
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#DDD',
    },
    menuItemText: {
        fontSize: 18,
        color: '#555',
        marginLeft: 10,
    },
});

export default DrawerContent;
