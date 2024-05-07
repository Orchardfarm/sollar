import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList, ScrollView,ImageBackground, Keyboard, DrawerLayoutAndroid } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import DrawerContent from './DrawerContent'; 

const WeatherScreen = () => {
    const [showFilters, setShowFilters] = useState(false);
    const [selectedCountyIndex, setSelectedCountyIndex] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const flatListRef = useRef(null);

    const handleNextCounty = () => {
        const filteredCountiesLength = filterCounties().length;
        if (filteredCountiesLength > 0 && selectedCountyIndex < filteredCountiesLength - 1) {
            setSelectedCountyIndex(selectedCountyIndex + 1);
            flatListRef.current.scrollToIndex({ index: selectedCountyIndex + 1, animated: true });
        }
    };
    



    const countiesWeatherData = [
        {
            countyName: 'Nairobi',
            currentTime: '11:17',
            atmosphericPressure: '1008 hpa',
            weatherDescription: 'BROKEN CLOUDS',
            temperature: '11°C',
            humidity: '66%',
            windSpeed: '5 m/s',
            nextFiveDays: [
                { day: 'MON', condition: 'cloud', temperature: '22°C' },
                { day: 'TUE', condition: 'rainy', temperature: '19°C' },
                { day: 'WED', condition: 'sunny', temperature: '25°C' },
                { day: 'THU', condition: 'cloud', temperature: '21°C' },
                { day: 'FRI', condition: 'rainy', temperature: '18°C' }
            ],
            lastUpdate: 'MON 8 APR 2019 11:14',
            sunriseTime: '03:18',
            sunsetTime: '16:07',
            backgroundImage: require('./../assets/sun.jpg')
        },
        {
            countyName: 'Kisumu',
            currentTime: '11:17',
            atmosphericPressure: '1008 hpa',
            weatherDescription: 'CLOUDS',
            temperature: '21°C',
            humidity: '66%',
            windSpeed: '5 m/s',
            nextFiveDays: [
                { day: 'MON', condition: 'cloud', temperature: '22°C' },
                { day: 'TUE', condition: 'rainy', temperature: '19°C' },
                { day: 'WED', condition: 'sunny', temperature: '25°C' },
                { day: 'THU', condition: 'cloud', temperature: '21°C' },
                { day: 'FRI', condition: 'rainy', temperature: '18°C' }
            ],
            lastUpdate: 'MON 8 APR 2019 11:14',
            sunriseTime: '03:18',
            sunsetTime: '16:07',
            backgroundImage: require('./../assets/sun.jpg')
        },
        {
            countyName: 'Kiambu',
            currentTime: '11:17',
            atmosphericPressure: '1008 hpa',
            weatherDescription: 'COLD',
            temperature: '13°C',
            humidity: '66%',
            windSpeed: '5 m/s',
            nextFiveDays: [
                { day: 'MON', condition: 'cloud', temperature: '22°C' },
                { day: 'TUE', condition: 'rainy', temperature: '19°C' },
                { day: 'WED', condition: 'sunny', temperature: '25°C' },
                { day: 'THU', condition: 'cloud', temperature: '21°C' },
                { day: 'FRI', condition: 'rainy', temperature: '18°C' }
            ],
            lastUpdate: 'MON 8 APR 2019 11:14',
            sunriseTime: '03:18',
            sunsetTime: '16:07',
            backgroundImage: require('./../assets/sun.jpg')
        },
        {
            countyName: 'Kajiado',
            currentTime: '11:17',
            atmosphericPressure: '1008 hpa',
            weatherDescription: 'RAINY',
            temperature: '15°C',
            humidity: '66%',
            windSpeed: '5 m/s',
            nextFiveDays: [
                { day: 'MON', condition: 'cloud', temperature: '22°C' },
                { day: 'TUE', condition: 'rainy', temperature: '19°C' },
                { day: 'WED', condition: 'sunny', temperature: '25°C' },
                { day: 'THU', condition: 'cloud', temperature: '21°C' },
                { day: 'FRI', condition: 'rainy', temperature: '18°C' }
            ],
            lastUpdate: 'MON 8 APR 2019 11:14',
            sunriseTime: '03:18',
            sunsetTime: '16:07',
            backgroundImage: require('./../assets/sun.jpg')
        },
    ];

    const filterCounties = () => {
        if (!searchQuery) {
            return countiesWeatherData;
        } else {
            return countiesWeatherData.filter(county =>
                county.countyName.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

    };

    const drawerRef = useRef(null);

    const openDrawer = () => {
        drawerRef.current.openDrawer();
    };

    const closeDrawer = () => {
        drawerRef.current.closeDrawer();
    };

    const renderItem = ({ item, index }) => (
        <ImageBackground source={item.backgroundImage} style={styles.backgroundImage}>
            <ScrollView>
                <View style={styles.weatherData}>
                    <View style={styles.weatherInfo}>
                    
                        <Ionicons name="cloud" size={150} color="#0a6622" style={styles.weatherIcon} />
                        <Text style={styles.weatherDescription}>{item.weatherDescription}</Text>
                    </View>
                    <Text style={styles.temperature}>{item.temperature}</Text>
                    <View style={styles.weatherDetails}>
                        <View style={styles.detail}>
                            <MaterialIcons name="thermostat" size={24} color="#0a6622" />
                            <Text style={styles.detailText}>{item.atmosphericPressure}</Text>
                        </View>
                        <View style={styles.detail}>
                            <MaterialIcons name="opacity" size={24} color="#0a6622" />
                            <Text style={styles.detailText}>{item.humidity}</Text>
                        </View>
                        <View style={styles.detail}>
                            <MaterialIcons name="waves" size={24} color="#0a6622" />
                            <Text style={styles.detailText}>{item.windSpeed}</Text>
                        </View>
                    </View>
                    <View style={styles.forecast}>
                        <Text style={styles.forecastTitle}>Next 5 Days</Text>
                        <View style={styles.forecastRow}>
                            {item.nextFiveDays.map((day, index) => (
                                <View key={index} style={styles.forecastItem}>
                                    <Text style={styles.forecastDay}>{day.day}</Text>
                                    <Ionicons name={day.condition} size={30} color="#0a6622" />
                                    <Text style={styles.forecastTemperature}>{day.temperature}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                    <Text style={styles.lastUpdate}>LAST UPDATE {item.lastUpdate}</Text>
                    <View style={styles.sunTimes}>
                        <View style={{ alignItems: 'center', width: '20%', position: 'relative' }}>
                            <Text style={styles.sunTime}>{item.sunriseTime} sunrise</Text>
                            <View style={styles.dot}></View>
                            <View style={styles.line}></View>
                        </View>
                        <View style={styles.semicircle}>
                            <View style={styles.border} />
                        </View>
                        <View style={{ alignItems: 'center', width: '20%', position: 'relative' }}>
                            <Text style={styles.sunTime}>{item.sunsetTime} sunset</Text>
                            <View style={styles.dot}></View>
                            <View style={styles.line}></View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </ImageBackground>
    );

    const onViewableItemsChanged = ({ viewableItems }) => {
        if (viewableItems.length > 0) {
            const visibleIndex = viewableItems[0].index;
            setSelectedCountyIndex(visibleIndex);
        }
    };

    const renderNoResults = () => (
        <Text style={styles.noResults}>No results found matching "{searchQuery}"</Text>
    );

    const handleSearchSubmit = () => {
        // Hide keyboard
        Keyboard.dismiss();
    
        // Find the index of the selected county in the filtered list
        const filteredCounties = filterCounties();
        const selectedIndex = filteredCounties.findIndex(county => county.countyName === countiesWeatherData[selectedCountyIndex]?.countyName);
    
        // Update the selected index if the county is found
        if (selectedIndex !== -1) {
            setSelectedCountyIndex(selectedIndex);
        }
    };
    


    return (
        <DrawerLayoutAndroid
            ref={drawerRef}
            drawerWidth={300}
            drawerPosition="left"
            renderNavigationView={() => <DrawerContent onCloseDrawer={closeDrawer} />}
        >
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={openDrawer}>
                        <Ionicons name="menu" size={30} color="#0a6622" />
                    </TouchableOpacity>
                    <Text style={styles.countyName}>{countiesWeatherData[selectedCountyIndex]?.countyName}</Text>
                    <TouchableOpacity style={styles.searchBar} onPress={() => setShowFilters(!showFilters)}>
                        <Ionicons name="search" size={24} color="#0a6622" />
                    </TouchableOpacity>
                </View>

                {showFilters && (
                    <View style={styles.filterContainer}>
                        <TextInput
                            style={styles.filterInput}
                            placeholder="Filter by County Name"
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                            onSubmitEditing={handleSearchSubmit} // Trigger filtering when "Done" is clicked
                        />
                    </View>
                )}

                <FlatList
                    ref={flatListRef}
                    data={filterCounties()}
                    renderItem={renderItem}
                    ListEmptyComponent={renderNoResults}
                    keyExtractor={(item, index) => index.toString()}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onEndReachedThreshold={0.5}
                    onEndReached={handleNextCounty}
                    onViewableItemsChanged={onViewableItemsChanged}
                    viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
                />
            </View>
        </DrawerLayoutAndroid>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 40,
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#CCCCCC',
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    countyName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#0a6622',
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    filterContainer: {
        paddingHorizontal: 20,
        paddingTop: 10,
    },
    filterInput: {
        borderWidth: 1,
        borderColor: '#0a6622',
        borderRadius: 5,
        paddingVertical: 8,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    weatherData: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
        alignItems: 'center',
    },
    weatherInfo: {
        alignItems: 'center',
        marginTop: 0,
    },
    weatherIcon: {
        marginBottom: 0,
    },
    weatherDescription: {
        fontSize: 25,
        color: '#0a6622',
        marginTop: 10,
    },
    temperature: {
        fontSize: 50,
        fontWeight: 'bold',
        color: '#0a6622',
        marginBottom: 10,
    },
    weatherDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        marginLeft: 30,
        marginRight: 30,
        width: '100%',
    },
    detail: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    detailText: {
        marginLeft: 3,
        fontSize: 16,
        color: '#0a6622',
    },
    forecast: {
        marginTop: 20,
        alignItems: 'center',
    },
    forecastTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#0a6622',
        marginBottom: 10,
        width: '90%',
        paddingHorizontal: 20,
    },
    forecastRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTopWidth: 1,
        borderTopColor: '#CCCCCC',
        paddingTop: 20,
        width: '90%',
    },
    forecastItem: {
        alignItems: 'center',
        marginHorizontal: 10,
    },
    forecastDay: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#0a6622',
        marginBottom: 5,
    },
    forecastTemperature: {
        fontSize: 16,
        color: '#0a6622',
    },
    lastUpdate: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#0a6622',
        marginBottom: 10,
        width: '90%',
        paddingHorizontal: 20,
        marginTop: 20,
    },
    sunTimes: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    sunTime: {
        fontSize: 14,
        color: '#666666',
        marginRight: 10,
        marginTop: 5,
    },
    semicircle: {
        width: 160,
        height: 120,
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 220, 
    },
    border: {
        width: '100%', 
        height: '50%', 
        position: 'absolute',
        bottom: 0, 
        borderTopColor: '#0a6622', 
        borderLeftColor: 'transparent', 
        borderRightColor: 'transparent', 
        borderBottomColor: 'transparent', 
        borderTopWidth: 4,
    },
    dot: {
        height: 10,
        width: 10,
        borderRadius: 5,
        backgroundColor: '#0a6622',
        marginTop: -5,
    },
});

export default WeatherScreen;
