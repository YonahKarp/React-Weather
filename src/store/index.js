import { createStore } from "redux";
import reducer from "../reducers";

const initialState = {
    weatherData: {
        currently: {},
        daily: {data:[]},
        hourly: {data:[]},
    },
    active: {}

}
export const store = createStore(reducer, initialState);