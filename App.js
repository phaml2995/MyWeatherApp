import React from 'react';
import WeatherNavigator from './navgation/AppNavigation';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import cityReducer from './redux/reducers/cityReducers';

const rootReducer = combineReducers({
  city: cityReducer
})

const store = createStore(rootReducer);

export default function App() {
  return (
    <Provider store={store}>
      <WeatherNavigator />
    </Provider>
  );
}

