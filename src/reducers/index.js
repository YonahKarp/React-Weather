
import {SET_DATA, SET_ACTIVE_WEATHER, SET_ACTIVE_WEATHER_AND_TIMELINE} from "../actions";

function reducer(state, action) {
    switch(action.type){
        case SET_DATA:
            return{
                ...state,
                weatherData: {
                    ...action.payload.weatherData,
                    currently: {
                        ...action.payload.weatherData.currently,
                        temperatureHigh: action.payload.weatherData.daily.data[0].temperatureHigh,
                        temperatureLow: action.payload.weatherData.daily.data[0].temperatureLow,
                    }
                },  

                active: {
                    ...action.payload.weatherData.currently,
                    temperatureHigh: action.payload.weatherData.daily.data[0].temperatureHigh,
                    temperatureLow: action.payload.weatherData.daily.data[0].temperatureLow,
                },
                doneLoading: true

            }
        case SET_ACTIVE_WEATHER:
            return{
                ...state,
                active: action.payload.activeWeather
            }

        case SET_ACTIVE_WEATHER_AND_TIMELINE:
        return{
            ...state,
            active: action.payload.activeWeather,
            weatherData: {
                ...state.weatherData,
                hourly: action.payload.hourly
            }
        }
        default:
            return state;
    } 
}

export default reducer;