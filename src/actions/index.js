
export const SET_DATA = 'SET_DATA',
			 SET_ACTIVE_WEATHER = 'SET_ACTIVE_WEATHER',
			 SET_ACTIVE_WEATHER_AND_TIMELINE = 'SET_ACTIVE_WEATHER_AND_TIMELINE';

export function setData(weatherData) {
	return {
		type: SET_DATA,
		payload: {
			weatherData: weatherData
		}
	}
}

export function setActiveWeather(active) {
	return {
		type: SET_ACTIVE_WEATHER,
		payload: {
			activeWeather: active
		}
	}
}

export function setActiveWeatherAndTimeline(active, hourly) {
	return {
		type: SET_ACTIVE_WEATHER_AND_TIMELINE,
		payload: {
			activeWeather: active,
			hourly: hourly
		}
	}
}

