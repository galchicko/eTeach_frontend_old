import {connect} from 'react-redux';
import {userActionTypes} from '../actions/actionTypes';
import User from './User';
import {fetchUser, fetchRegions, editUser, createUser} from '../store/thunk/userThunk';
import {withRouter} from 'react-router';

const mapStateToProps = state => {
    return ({
        user: state.userInfo.user,
        regions: state.userInfo.regions,
        isLoading: state.userInfo.isLoading,
        result: state.userInfo.result,
        isNew: state.userInfo.isNew
    });
};

const mapDispatchToProps = (dispatch) => ({
    fetchUser: (id) => {
        dispatch(fetchUser(id));
    },
    fetchRegions: () => {
        dispatch(fetchRegions());
    },
    handleUpdate: () => (
        dispatch(editUser())
    ),
    handleCreate: () => {
        dispatch(createUser());
    },
    saveUserMetadata: (fields) => (
        dispatch({type: userActionTypes.HANDLE_METADATA, fields: fields})
    ),
    handleCancel: () => (
        dispatch({type: userActionTypes.UPDATE_USER_SUCCESS})
    ),
    handleResetData: () => (
        dispatch({type: userActionTypes.RESET_STATE})
    ),
    handleMode: () => (
        dispatch({type: userActionTypes.HANDLE_MODE})
    )
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(User));
