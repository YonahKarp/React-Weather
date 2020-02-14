import { createStore } from 'redux';
import reducer from '../reducers';

const initialState = {
    doneLoading: false,
    metrix:  JSON.parse(localStorage.getItem('metrixState')) || [],
    selectedIndex: -1,
    currentScreen: 'Home',
    lastScreen: ''
}

export const store = createStore(reducer, initialState);