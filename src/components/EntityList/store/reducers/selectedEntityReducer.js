import {entityListActionNames} from '../../actions/actionTypes';
import {entityInfoActionNames} from '../../../../consts/entityActionTypes';
import {entityInfoTabActionNames} from '../../../EntityInfo/actions/actionTypes';

import * as Immutable from 'seamless-immutable';

export const createInitialState = () => (
    Immutable.from({
        entity: null
    })
);

const initialState = createInitialState();

export default function (state = initialState, action) {
    switch (action.type) {

        case entityInfoTabActionNames.UPDATE_ENTITY_SUCCESS:
        case entityInfoActionNames.FETCH_ENTITY_INFO_SUCCESS:
        case entityListActionNames.SELECT_ENTITY:
            return state.merge({entity: action.payload});

    default:
        return state;
    }
}
