import {HTTP_CODES} from '../../consts';
import {ERROR_FLOWS, UNEXPECTED_ERROR} from './ErrorServiceConstatns';
import * as actionFunctions from './ErrorActionFunctions';

export const ErrorSchema = {
    [ERROR_FLOWS.AUTH]: {
        [HTTP_CODES.STATUS_401]: actionFunctions.providePayloadNext,
        [HTTP_CODES.STATUS_500]: actionFunctions.mainError500,
        [UNEXPECTED_ERROR]: actionFunctions.mainUnexpectedError
    },
    [ERROR_FLOWS.MAIN]: {
        [HTTP_CODES.STATUS_400]: actionFunctions.providePayloadNext,
        [HTTP_CODES.STATUS_401]: actionFunctions.mainError401,
        [HTTP_CODES.STATUS_403]: actionFunctions.providePayloadNext,
        [HTTP_CODES.STATUS_500]: actionFunctions.mainError500,
        [UNEXPECTED_ERROR]: actionFunctions.mainUnexpectedError
    }
};