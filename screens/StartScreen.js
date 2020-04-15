import React, { useState } from 'react';
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

const StartScreen = props => {
    const [userInput, setUserInput] = useState('');
    const inputHandler = inputText => {
        setUserInput(inputText);
    }

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

        props.navigation.navigate('Display', { zip: userInput });
        setUserInput('');
        Keyboard.dismiss();
    }

    const resetPressHandler = () => {
        setUserInput('');
    }

    return (
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
            <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={50} style={styles.mainView}>
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
                            <View style={styles.button}><Button title="Confirm" onPress={confirmedPressHandler} color="#6DD5FA" /></View>
                            <View style={styles.button}><Button title="Clear" onPress={resetPressHandler} color="#00C9FF" /></View>
                        </View>
                    </Card>
                </LinearGradient>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>

    )
}

StartScreen.navigationOptions = {
    headerTitle: 'Home'
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1
    },
    text: {
        fontSize: 25,
        marginVertical: 10
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
    }
});

export default StartScreen;

