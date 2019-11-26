
import {SET_DATA, SET_ACTIVE_WEATHER, SET_ACTIVE_WEATHER_AND_TIMELINE} from "../actions";

function reducer(state, action) {
    switch(action.type){
        case SET_DATA:
            return{
                ...state,
                doneLoading: true

            }
        default:
            return state;
    } 
}

export default reducer;