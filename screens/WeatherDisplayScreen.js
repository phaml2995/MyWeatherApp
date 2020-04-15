import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import ENV from '../env';
import colors from '../constants/colors';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
const WeatherDisplayScreen = props => {
    const zipCode = props.navigation.getParam('zip');
    const [forecast, setForecast] = useState();
    const fetchForecast = async () => {
        const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&units=imperial&appid=${ENV.OWM_API}`)
        if (!response.ok) {
            throw new Error('Something went wrong');
        }
        const resData = await response.json();
        if (!resData) {
            throw new Error('Something went wrong');
        }
        setForecast(resData)
    }

    useEffect(() => {
        fetchForecast();
    }, [zipCode])

    let content, tempContent, cityName, source, icon;
    if (forecast) {
        const description = forecast.weather[0].description[0].toUpperCase() + forecast.weather[0].description.slice(1)
        content = <Text style={styles.text}>{description}</Text>
        tempContent = <Text style={styles.tempText}>{forecast.main.temp.toFixed(0)}°F</Text>
        cityName = <Text style={styles.text}>{forecast.name}</Text>
        if (forecast.dt < forecast.sys.sunset) {
            source = <Image source={require('../assets/sunny.jpg')} style={styles.image} resizeMode='contain' />
        } else {
            source = <Image source={require('../assets/night.jpg')} style={styles.image} resizeMode='contain' />
        }
        if (forecast.weather[0].main === "Rain"){
            icon = <Image source={require('../assets/rain.png')} style={styles.icon} resizeMode='contain' />
        } else {
            icon = <Image source={require('../assets/sun.png')} style={styles.icon} resizeMode='contain' />
        }
    }

    const onSwipeHandler = () => {
        props.navigation.goBack();
    }

    return (
        <GestureRecognizer onSwipeRight={onSwipeHandler}>
            <View style={styles.mainView}>
                <View style={styles.imageContainer}>
                    {source}
                </View>
                <View style={styles.iconContainer}>
                    {icon}
                </View>
                <View style={styles.textContainer}>
                    {cityName}
                    {content}
                    {tempContent}
                </View>
            </View>
        </GestureRecognizer>


    )
}
WeatherDisplayScreen.navigationOptions = {
    headerShown: false
}
const styles = StyleSheet.create({
    mainView: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 30,
        marginVertical: 10,
    },
    textContainer: {
        height: 400,
        position: 'absolute',
        margin: 30,
        alignItems: 'center',
    },
    tempText: {
        fontSize: 80,

    },
    image: {
        width: '100%',
        height: '100%'
    },
    imageContainer: {
        width: '100%',
        height: '100%'
    },
    icon: {
        width: '100%',
        height: 300
    },
    iconContainer: {
        position: 'absolute',
        width: 150,
        height: '100%'
    }

});

export default WeatherDisplayScreen;

