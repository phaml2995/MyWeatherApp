import React, { useState,useEffect } from 'react';
import {
    View,
    Text,
    Alert,
    StyleSheet,
    TextInput,
    TouchableWithoutFeedback,
    Keyboard,
    KeyboardAvoidingView,
    Button
} from 'react-native';
import Card from '../components/Card.component';
import { LinearGradient } from 'expo-linear-gradient';
import ENV from '../env';
import { FontAwesome } from '@expo/vector-icons';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

const StartScreen = props => {
    const [userInput, setUserInput] = useState('');
    const [userLocation, setUserLocation] = useState();

    const inputHandler = inputText => {
        setUserInput(inputText);
    }
    const resetPressHandler = () => {
        setUserInput('');
    }

    useEffect(() => {
        if (userLocation){
            props.navigation.navigate('Display', {coords: userLocation});
        }
    },[userLocation]);

    const confirmedPressHandler = () => {
        const parseNum = parseInt(userInput);
        if (isNaN(parseNum) || parseNum.toString().length < 5) {
            Alert.alert(
                'Invalid Input',
                'Please check your zip code',
                [
                    { text: 'Retry', style: 'destructive', onPress: resetPressHandler }
                ]
            )
            return;
        }
        props.navigation.navigate('Display', { zip: userInput});
        setUserInput('');
        Keyboard.dismiss();
    }

    const getPermissionHandler = async () => {
        const result = await Permissions.askAsync(Permissions.LOCATION);
        if (result.status !== 'granted') {
            Alert.alert(
                'Access Denied!',
                "You can't access Location without permission",
                [{ text: 'Okay' }]
            )
            return false;
        }
        return true;
    };


    const getLocationHandler = async () => {
        const hasPermission = await getPermissionHandler();
        if (!hasPermission) {
            return;
        }
        try {
            const location = await Location.getCurrentPositionAsync({ timeout: 5000 });
           
            setUserLocation({
                lat: location.coords.latitude,
                long: location.coords.longitude
            })
        
        } catch (error) {
            Alert.alert(
                "Can't find location",
                "Please try again!",
                [{ text: "Okay" }]
            )
        }
    }

    return (
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
            <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={0} style={styles.mainView}>
                <LinearGradient colors={['#FFFFFF', '#6DD5FA', '#2980B9']} style={styles.gradient}>
                    
                    <Text style={styles.text}>Welcome to the Weather App!</Text>
                    <Card style={styles.inputContainer}>
                        <Text style={styles.inputPrompt}>Please enter your Zip code</Text>
                        <TextInput
                            style={styles.input}
                            keyboardType='number-pad'
                            onChangeText={inputHandler}
                            value={userInput}
                        />
                        <View style={styles.buttonContainer}>
                            <View style={styles.button}><Button title="Clear" onPress={resetPressHandler} color="#6DD5FA" /></View>
                            <View style={styles.button}><Button title="Confirm" onPress={confirmedPressHandler} color="#00C9FF" /></View>
                        </View>
                    </Card>
                    <View style={styles.iconContainer}>
                        <FontAwesome.Button name="location-arrow" onPress={getLocationHandler}>Locate Me</FontAwesome.Button>
                    </View>
                </LinearGradient>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>

    )
}

StartScreen.navigationOptions = {
    headerShown: false
}

const styles = StyleSheet.create({
    mainView: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 30,
        marginVertical: 10,
        color: '#FFFF'
    },
    inputContainer: {
        width: 300,
        alignItems: 'center'
    },
    input: {
        height: 30,
        width: 100,
        textAlign: 'center',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        marginVertical: 10
    },
    inputPrompt: {
        fontSize: 20,
    },
    gradient: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        width: 100
    },
    buttonContainer: {
        flexDirection: "row",
        width: '100%',
        justifyContent: 'space-between',
        padding: 10
    },
    iconContainer: {
        marginTop: 20
    }
});

export default StartScreen;

