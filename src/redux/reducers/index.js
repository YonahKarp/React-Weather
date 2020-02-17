
import { 
    SET_DATA, SET_CURRENT_SCREEN,
    UPDATE_METRIC_LIST, ADD_NEW_METRIC, DELETE_METRIC, SET_INDEX,
    UPDATE_METRIC, SET_METRIC_TO_UPDATE,
    SET_MENU_TRANSFORM, SET_CHARTS_TRANSFORM
} from "../actions";

function reducerFunc(state, action){
    switch(action.type){
        case SET_CURRENT_SCREEN:
            return{
                ...state,
                lastScreen: state.currentScreen,
                currentScreen: action.payload.screenName || 'Home'

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
                metrix: state.metrix.map((metric) => metric.id == action.payload.updatedMetric.id ? action.payload.updatedMetric : metric),
                metricToUpdate: false
            }
        case SET_METRIC_TO_UPDATE:
            return {
                ...state,
                metricToUpdate: action.payload.metricToUpdate
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
        case SET_MENU_TRANSFORM:
            return {
                ...state,
                menuTransform: action.payload.menuTransform
            }
        case SET_CHARTS_TRANSFORM:
            return {
                ...state,
                chartsTransform: action.payload.chartsTransform
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