
import { 
    SET_DATA, SET_CURRENT_SCREEN,
    UPDATE_METRIC_LIST, ADD_NEW_METRIC, UPDATE_METRIC, DELETE_METRIC, SET_INDEX
} from "../actions";

function reducerFunc(state, action){
    switch(action.type){
        case SET_CURRENT_SCREEN:
            return{
                ...state,
                lastScreen: state.currentScreen,
                currentScreen: action.payload.screenName

            }
        case SET_DATA:
            return{
                ...state,
                doneLoading: true

            }
        case ADD_NEW_METRIC:
            return {
                ...state,
                metrix: [
                    ...state.metrix,
                    action.payload.newMetric
                ]
            }
        case UPDATE_METRIC_LIST:
            return {
                ...state,
                metrix: action.payload.metrixList 
            }
        case UPDATE_METRIC:
            return {
                ...state,
                metrix: state.metrix.map((metric) => metric.id == action.payload.updatedMetric.id ? action.payload.updatedMetric : metric)
            }
        case DELETE_METRIC:
            return {
                ...state,
                metrix: state.metrix.filter((metric) => metric.id != action.payload.id)
            }
        case SET_INDEX:
            return {
                ...state,
                selectedIndex: action.payload.index
            }
        default:
            return state;
    } 
}

function reducer(state, action) {
    const newState = reducerFunc(state,action);
    saveData(newState);
    return newState;
}

function saveData(state){
    localStorage.setItem("metrixState", JSON.stringify(state.metrix));
}

export default reducer;