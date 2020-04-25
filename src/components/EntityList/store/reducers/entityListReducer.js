import {entityListActionNames} from '../../actions/actionTypes';
import {toggleEntity,addIsCollapsed,collapseAll,expandEntity,
    getSearchEntityList, changeEntityInfo, addEntity, removeEntity} from '../../helpers';

import * as Immutable from 'seamless-immutable';

export const createInitialState = () => (
    Immutable.from({
        schools: null,
        searchList: null,
        isLoading: false
    })
);

const initialState = createInitialState();

export default function(state = initialState, action){
    switch (action.type) {
    case entityListActionNames.FETCH_ENTITY_LIST:
        return state.merge({ isLoading: true });
    case entityListActionNames.FETCH_ENTITY_LIST_SUCCESS:
        const schools = action.payload;
        schools.forEach(addIsCollapsed);
        return state.merge({ isLoading: false, schools, searchList: getSearchEntityList(schools) });
    case entityListActionNames.TOGGLE_CLICK_ENTITY_LIST:
        return state.merge({ schools: toggleEntity(state.schools,action.payload) });
    case entityListActionNames.COLLAPSE_ALL:
        return state.merge({ schools: collapseAll(state.schools) });
    case entityListActionNames.EXPAND_ENTITY:
        return state.merge({ schools: expandEntity(state.schools,action.payload) });
    case entityListActionNames.CHANGE_ENTITY_INFO_IN_LIST:
        return state.merge({ schools: changeEntityInfo(state.schools,action.payload) });
    case entityListActionNames.ON_ENTITY_ADD:
        return state.merge({ schools: addEntity(state.schools,action.payload) });
    case entityListActionNames.ON_ENTITY_REMOVE:
        return state.merge({ devices: removeEntity(state.schools,action.payload) });

    default:
        return state;
    }
}

