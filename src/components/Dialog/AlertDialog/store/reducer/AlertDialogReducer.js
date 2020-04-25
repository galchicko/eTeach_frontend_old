import * as Immutable from 'seamless-immutable';
import { alertDialogActionNames } from '../../../../../consts';

const initialState = Immutable.from({
    isOpen: false,
    text: 'You need to provide text and handleClose',
    okBtnText: 'You need to provide button ok text'
});

const alertDialogReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case alertDialogActionNames.SET_IS_OPEN:
            return state.merge({ isOpen: payload });

        case alertDialogActionNames.SET_CONFIG:
            return state.merge(payload);

        case alertDialogActionNames.CLEAR:
            return state.merge(initialState);

        default:
            return state;
    }
};

export default alertDialogReducer;