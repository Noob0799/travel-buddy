import { createStore } from "redux";

const getSelectedCities = () => {
    let cities = sessionStorage.getItem('cities');
    console.log(cities);
    if(!cities) {
        cities = [];
    } else {
        cities = JSON.parse(cities)
    }
    return cities;
}

const initState = {
    selectedCities: getSelectedCities()
}

const citiesReducer = (state = initState, action) => {
    console.log(action.type);
    if(action.type === 'UPDATE_CITIES'){
        console.log(action.cities);
        state.selectedCities = [...action.cities];
        sessionStorage.setItem('cities', JSON.stringify(state.selectedCities));
        return state;
    }
    console.log('State', state);
    return state;
}

const store = createStore(citiesReducer);

export default store;