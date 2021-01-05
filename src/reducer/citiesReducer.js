import { createStore } from "redux";

const initState = {
    selectedCities: []
}

const citiesReducer = (state = initState, action) => {
    console.log(action.type);
    if(action.type === 'UPDATE_CITIES'){
        console.log(action.cities);
        state.selectedCities = [...action.cities];
        return state;
    }
    console.log('State', state);
    return state;
}

const store = createStore(citiesReducer);

export default store;