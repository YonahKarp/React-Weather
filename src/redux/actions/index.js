
export const SET_DATA = 'SET_DATA';
export const UPDATE_METRIC_LIST = 'UPDATE_METRIC_LIST';
export const ADD_NEW_METRIC = 'ADD_NEW_METRIC';
export const UPDATE_METRIC = 'UPDATE_METRIC';
export const DELETE_METRIC = 'DELETE_METRIC';
export const SET_INDEX = 'SET_INDEX';
export const SET_CURRENT_SCREEN = 'SET_CURRENT_SCREEN';
export const SET_METRIC_TO_UPDATE = 'SET_METRIC_TO_UPDATE';
export const SET_MENU_TRANSFORM = 'SET_MENU_TRANSFORM';
export const SET_CHARTS_TRANSFORM = 'SET_CHARTS_TRANSFORM';

export function setIndex(index) {
	return createAction(SET_INDEX, {index})
}

export function setCurrentScreen(screenName) {
	return createAction(SET_CURRENT_SCREEN, {screenName})
}

export function setData(data) {
	return createAction(SET_DATA, {data})
}

export function updateMetixList(metrixList) {
	return createAction(UPDATE_METRIC_LIST, {metrixList})
}

export function addNewMetric(newMetric) {
	return createAction(ADD_NEW_METRIC, {newMetric})
}

export function updateMetric(updatedMetric, i) {
	return createAction(UPDATE_METRIC, {updatedMetric,i})
}

export function setMetricToUpdate(metricToUpdate) {
	return createAction(SET_METRIC_TO_UPDATE, {metricToUpdate})
}

export function deleteMetric(id) {
	return createAction(DELETE_METRIC, {id})
}

export function setMenuTransform(menuTransform) {
	return createAction(SET_MENU_TRANSFORM, {menuTransform})
}

export function setChartsTransform(chartsTransform) {
	return createAction(SET_CHARTS_TRANSFORM, {chartsTransform})
}

function createAction(type, payload){
	return {
		type,
		payload
	}
}