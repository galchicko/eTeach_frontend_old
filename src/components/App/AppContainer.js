import {connect} from 'react-redux';
import App from './App';
import { alertDialogActionNames } from '../../consts';
import { dialogAlertConfigurations } from '../Dialog/AlertDialog/AlertDialogConfig';
import { logoutUser } from '../../redux/thunk/appThunk';

const mapStateToProps = state => {
    return ({
        user: state.app.currentUser
    });
};

const mapDispatchToProps = (dispatch) => ({
    handleOnDisconnect: (data) => {
        dispatch(logoutUser(true));
        dispatch({ type: alertDialogActionNames.SET_CONFIG, payload: { ...dialogAlertConfigurations.ON_DISCONNECT, text: data.reason } });
    },
    handleOnExpired: () => {
        dispatch(logoutUser(true));
        dispatch({ type: alertDialogActionNames.SET_CONFIG, payload: { ...dialogAlertConfigurations.ON_EXPIRED } });
    }
});

export default connect (mapStateToProps,mapDispatchToProps)(App);
