import React from 'react';

import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TouchableNativeFeedback,
    Platform
} from 'react-native';
import colors from '../constants/colors';
import { LinearGradient } from 'expo-linear-gradient';
colors
const ListItem = props => {
    let TouchableCmp = TouchableOpacity;
    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableCmp = TouchableNativeFeedback;
    }

    return (

        <TouchableCmp onPress={props.onSelect} useForeground>
            <View style={styles.mainView}>
                <LinearGradient
                    colors={['#FFFFFF', '#6DD5FA', '#2980B9']}
                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
                    style={styles.gradient}
                >
                    <View style={styles.textContainer}>
                        <Text style={styles.title}>{props.title}</Text>
                        <Text style={styles.temp}>{props.temp}°F</Text>
                    </View>
                </LinearGradient>
            </View>
        </TouchableCmp>

    )
};

const styles = StyleSheet.create({
    mainView: {
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',
        height: 100,
        margin: 10,
        overflow: 'hidden'

    },
    textContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: '100%',
        padding: 10,
        justifyContent: 'space-between',
        
    },
    title: {
        fontSize: 40,
        
    },
    temp: {
        fontSize: 50,
        
    },
});

export default ListItem;