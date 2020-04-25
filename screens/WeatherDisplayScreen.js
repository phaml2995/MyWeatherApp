import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';
import ENV from '../env';
import colors from '../constants/colors';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import Card from '../components/Card.component';
import { FontAwesome } from '@expo/vector-icons';

const WeatherDisplayScreen = props => {
    const zipCode = props.navigation.getParam('zip');
    const coords = props.navigation.getParam('coords');
    const name = props.navigation.getParam('cityName');
    const [isLoading, setIsLoading] = useState(false);
    const [forecast, setForecast] = useState();
    
    let endPoint;
    if (coords) {
        endPoint = `http://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.long}&units=imperial&appid=${ENV.OWM_API}`
    } else if (zipCode) {
        endPoint = `http://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&units=imperial&appid=${ENV.OWM_API}`
    } else if (name) {
        endPoint = `http://api.openweathermap.org/data/2.5/weather?q=${name}&units=imperial&appid=${ENV.OWM_API}`
    }
    
    const fetchForecast = async () => {
        const response = await fetch(endPoint);
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
        setIsLoading(true)
        fetchForecast()
            .then(() => setIsLoading(false));
    }, [zipCode, setIsLoading])

    let content, tempContent, cityName, source, icon;
    if (forecast) {
        const description = forecast.weather[0].description[0].toUpperCase() + forecast.weather[0].description.slice(1)
        content = <Text style={styles.contentText}>{description}</Text>
        tempContent = <Text style={styles.tempText}>{forecast.main.temp.toFixed(0)}°F</Text>
        cityName = <Text style={styles.text}>{forecast.name}</Text>
        if (forecast.dt < forecast.sys.sunset) {
            source = <Image source={require('../assets/sunny.jpg')} style={styles.image} resizeMode='contain' />
        } else {
            source = <Image source={require('../assets/night.jpg')} style={styles.image} resizeMode='contain' />
        }
        if (forecast.weather[0].main === "Rain") {
            icon = <Image source={require('../assets/rain.png')} style={styles.icon} resizeMode='contain' />
        } else {
            icon = <Image source={require('../assets/sun.png')} style={styles.icon} resizeMode='contain' />
        }
    }

    const onSwipeHandler = () => {
        props.navigation.navigate('Origin');
    }

    const buttonPressHandler = () => {
        props.navigation.navigate('List',{forecast: forecast});
    }

    if (isLoading) {
        return (
            <View style={styles.loadingView}>
                <ActivityIndicator size='large' color={colors.primary} />
            </View>
        )
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
                    <Card style={styles.tempContainer}>
                        {tempContent}
                    </Card>
                </View>
            <View style={styles.buttonContainer}>
                <FontAwesome.Button name="list" onPress={buttonPressHandler}>City List</FontAwesome.Button>
            </View>
            </View> 
        </GestureRecognizer>

    )
}
WeatherDisplayScreen.navigationOptions = {
    headerShown: false
}
const styles = StyleSheet.create({
    loadingView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }, 
    mainView: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 40,
        color: '#FFFF',
        fontWeight: "500"
    },
    contentText: {
        fontSize: 25,
        color: '#FFFF',
        fontWeight: "500"
    },
    textContainer: {
        height: 400,
        position: 'absolute',
        margin: 30,
        alignItems: 'center',

    },
    tempText: {
        fontSize: 80,
        color: '#FFFF',
        fontWeight: '500',

    },
    image: {
        width: '100%',
        height: '100%',
        opacity: 0.7
    },
    imageContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.2)'
    },
    icon: {
        width: '100%',
        height: 300
    },
    iconContainer: {
        position: 'absolute',
        width: 150,
        height: '100%'
    },
    tempContainer: {
        backgroundColor: 'rgba(191, 125, 63, 0.16)',
        marginVertical: 10,
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 20,
        right: 20
    }
});

export default WeatherDisplayScreen;

