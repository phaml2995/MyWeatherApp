export const ADD_CITY = 'ADD_CITY';

export const addCity = (id,title,temp) => {
    return {
        type: ADD_CITY,
        payload: {
            id: id,
            title: title,
            temp: temp
        }
    }
}