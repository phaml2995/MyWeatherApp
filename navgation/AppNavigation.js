import { createAppContainer } from 'react-navigation';
import  { createStackNavigator } from 'react-navigation-stack';
import StartScreen from '../screens/StartScreen';
import WeatherDisplayScreen from '../screens/WeatherDisplayScreen';

import colors from '../constants/colors';

const WeatherNavigator = createStackNavigator({
    Origin: StartScreen,
    Display: WeatherDisplayScreen
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