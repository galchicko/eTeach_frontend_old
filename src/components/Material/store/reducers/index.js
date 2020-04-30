import {combineReducers} from 'redux';
import { reducer as formReducer } from 'redux-form';


const INIT_RESOURCES_STATE = [
    {name: "Google", url: "http://google.com"},
    {name: "Amazon", url: "http://amazon.com"}
]

const resourceCardExpansionReducer = (state=false, action) => {
    if (action.type === 'TOGGLE_RESOURCE_CARD_EXPANSION') {
        return !state;
    }
    return state;
}

const resourcesReducer = (state=INIT_RESOURCES_STATE, action) => {
    if (action.type === 'DELETE_RESOURCE') {
        return state.filter((obj) => obj.name !== action.payload);

    } else if (action.type === 'CREATE_RESOURCE') {
        return [...state, action.payload]
    }

    return state
}


const MaterialReducer =  combineReducers({
    resources: resourcesReducer,
    resourceCardExpansion: resourceCardExpansionReducer
})

export default MaterialReducer;