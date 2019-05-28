import { createStore } from "redux";
import reducer from "../reducers";

const initialState = {
    weatherData: {
        currently: {},
        daily: {data:[]},
        hourly: {data:[]},
    },
    active: {},
    doneLoading: false

}
export const store = createStore(reducer, initialState);