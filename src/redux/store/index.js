import { createStore } from 'redux';
import reducer from '../reducers';

const initialState = {
    doneLoading: false,
    metrix:  JSON.parse(localStorage.getItem('metrixState')) || [],
    selectedIndex: -1,
    currentScreen: 'AddMetrix',
    lastScreen: '',
    metricToUpdate: false,
    chartsTransform: 105,
    menuTransform: 105,
    lists: [{
        name: 'Home',
        color: '#0000ff'
    },{
        name: 'Work',
        color: '#00ff00'
    }]
}

export const store = createStore(reducer, initialState);