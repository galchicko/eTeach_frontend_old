import {userActionTypes, resultType} from '../../actions/actionTypes';
import * as Immutable from 'seamless-immutable';
import {UserRoles} from '../../../../consts/userRoles';

export const createInitialState = () => (
    Immutable.from({
        user: {
            name: '',
            email: '',
            role: UserRoles.ADMIN,
            username: '',
            imagePath: '',
            password: '',
            regions: [],
            language: ''
        },
        regions: [],
        isLoading: true,
        result: null,
        isNew: false
    })
);

const initialState = createInitialState();

export default function (state = initialState, action) {
    switch (action.type) {
    case userActionTypes.FETCH_USER:
        return {
            ...state,
            resultType: null,
            isLoading: true
        };
    case userActionTypes.FETCH_USER_SUCCESS:
        return {
            ...state,
            user: action.payload,
            isLoading: false
        };
    case userActionTypes.FETCH_REGIONS_SUCCESS:
        return {
            ...state,
            regions: action.payload,
            isLoading: false
        };
    case userActionTypes.UPDATE_USER_SUCCESS:
        return {
            ...state,
            isLoading: false,
            result: resultType.success
        };
    case userActionTypes.FETCH_USER_FAILED:
        return {
            ...state,
            result: resultType.failed
            //TODO add error handler
        };
    case userActionTypes.HANDLE_MODE:
        return {
            ...state,
            isNew: true
            //TODO add error handler
        };
    case userActionTypes.RESET_STATE:
        return initialState;
    case userActionTypes.HANDLE_METADATA:
        const {firstName, lastName, email, role, username, regions, password} = action.fields;
        return {
            ...state,
            isLoading: true,
            user: {
                ...state.user,
                name: [firstName, lastName].join(' '),
                email: email,
                role: role,
                regions: regions,
                password: password,
                username: username
            }
        };
    default:
        return state;
    }
}