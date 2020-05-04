import React from 'react';

import { StyleSheet, FlatList } from 'react-native'
import ListItem from '../components/ListItem.component';
import { useSelector } from 'react-redux';

const CityWeatherList = props => {
    const cities = useSelector(state => state.city.cityList);
    return (

        <FlatList
            contentContainerStyle={styles.mainVew}
            data={cities}
            keyExtractor={item => item.id}
            renderItem={itemData =>
                <ListItem
                    onSelect={() => {
                        props.navigation.navigate('SecDisplay', { cityName: itemData.item.name })
                    }}
                    title={itemData.item.name}
                    temp={itemData.item.temp}
                />
            }
        />
    )
};

CityWeatherList.navigationOptions = {
    headerShown: false
}

const styles = StyleSheet.create({
    mainVew: {
 
        justifyContent: 'center',
        
    }
});

export default CityWeatherList;