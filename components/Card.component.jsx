import React from 'react';

import { View, StyleSheet } from 'react-native';

const Card = props => {
    return(
        <View style={{...styles.TextInput,...props.style}}>
            {props.children}
        </View>
    )

}

const styles = StyleSheet.create({
    TextInput: {
        shadowColor:'black',
        shadowOffset:{width: 0, height: 2},
        shadowRadius: 6,
        shadowOpacity: 0.25,
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10
    }
})

export default Card;