import CITY from '../../data/dummy';
import { ADD_CITY } from '../actions/cityActions';
import City from '../../model/city';

const initialState = {
    cityList: CITY
};

const cityReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_CITY:
            const newCity = new City(action.payload.id,action.payload.title, action.payload.temp);
            return {
               ...state,
               cityList: state.cityList.concat(newCity)
            }
        default:
            return state;

    }
}

export default cityReducer;