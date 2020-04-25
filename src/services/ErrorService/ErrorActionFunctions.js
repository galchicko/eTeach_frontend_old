import { HTTP_ERROR_ACTION_TYPE } from './ErrorServiceConstatns';
import {HTTP_CODES} from '../../consts';

export const providePayloadNext = () => {};

export const mainError401 = () => {
    window.location.reload();
};

export const mainError500 = ({ payload, dispatch }) => {
    if (payload.data && payload.data.error && HTTP_CODES[payload.data.error.code]) {
        dispatch({ type: HTTP_CODES[payload.data.error.code] });
    }
};

export const mainUnexpectedError = ({ payload, dispatch }) => {
    console.error('UNEXPECTED_ERROR');
    dispatch({ type: HTTP_ERROR_ACTION_TYPE, payload });
};