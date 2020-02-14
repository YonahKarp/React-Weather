
export const SET_DATA = 'SET_DATA';
export const UPDATE_METRIC_LIST = 'UPDATE_METRIC_LIST';
export const ADD_NEW_METRIC = 'ADD_NEW_METRIC';
export const UPDATE_METRIC = 'UPDATE_METRIC';
export const DELETE_METRIC = 'DELETE_METRIC';
export const SET_INDEX = 'SET_INDEX';
export const SET_CURRENT_SCREEN = 'SET_CURRENT_SCREEN';


export function setIndex(index) {
	return {
		type: SET_INDEX,
		payload: {
			index
		}
	}
}

export function setCurrentScreen(screenName) {
	return {
		type: SET_CURRENT_SCREEN,
		payload: {
			screenName
		}
	}
}

export function setData(data) {
	return {
		type: SET_DATA,
		payload: {
			data
		}
	}
}

export function updateMetixList(newMetrixList) {
	return {
		type: UPDATE_METRIC_LIST,
		payload: {
			metrixList: newMetrixList
		}
	}
}

export function addNewMetric(newMetric) {
	return {
		type: ADD_NEW_METRIC,
		payload: {
			newMetric
		}
	}
}

export function updateMetric(updatedMetric, i) {
	return {
		type: UPDATE_METRIC,
		payload: {
			updatedMetric,
			i
		}
	}
}

export function deleteMetric(id) {
	return {
		type: DELETE_METRIC,
		payload: {
			id
		}
	}
}