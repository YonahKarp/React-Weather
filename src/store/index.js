import { createStore } from "redux";
import reducer from "../reducers";

const initialState = {
    doneLoading: false
}
export const store = createStore(reducer, initialState);