import React from 'react';

import {StyleSheet, FlatList } from 'react-native'
import ListItem from '../components/ListItem.component';
import { useSelector } from 'react-redux';

const CityWeatherList = props => {
    const forecast = props.navigation.getParam('forecast');
    const cities = useSelector(state => state.city.cityList);
    
    return (

        <FlatList
            data={cities}
            keyExtractor={item => item.id}
            renderItem={itemData =>
                <ListItem
                    onSelect={() => {
                        props.navigation.navigate('Display',{cityName: itemData.item.name})
                    }}
                    title={itemData.item.name}
                    temp={itemData.item.temp}
                />
            }
        />
    )
};

CityWeatherList.navigationOptions = {
    headerTitle: 'All Cities'
}

const styles = StyleSheet.create({
    mainVew: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default CityWeatherList;