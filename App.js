import React from 'react';
import WeatherNavigator from './navgation/AppNavigation';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import cityReducer from './redux/reducers/cityReducers';
import Thunk from 'redux-thunk';
const rootReducer = combineReducers({
  city: cityReducer
})

const store = createStore(rootReducer,applyMiddleware(Thunk));

export default function App() {
  return (
    <Provider store={store}>
      <WeatherNavigator />
    </Provider>
  );
}

