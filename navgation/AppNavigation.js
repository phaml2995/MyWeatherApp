import { createAppContainer } from 'react-navigation';
import  { createStackNavigator } from 'react-navigation-stack';
import StartScreen from '../screens/StartScreen';
import WeatherDisplayScreen from '../screens/WeatherDisplayScreen';

import colors from '../constants/colors';
import CityWeatherList from '../screens/CityWeatherList';
import SecondDisplay from '../screens/SecondDisplay';

const WeatherNavigator = createStackNavigator({
    Origin: StartScreen,
    Display: WeatherDisplayScreen,
    List: CityWeatherList,
    SecDisplay: SecondDisplay
}, {
    defaultNavigationOptions:{
        headerStyle: {
            backgroundColor: colors.accent
        },
        headerBackTitle: 'Back',
        headerTintColor: 'white'
    }
});

export default createAppContainer(WeatherNavigator);