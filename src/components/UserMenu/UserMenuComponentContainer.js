import {connect} from 'react-redux';
import UserMenuComponent from './UserMenuComponent';
import {logoutUser} from '../../redux/thunk/appThunk';

const mapStateToProps = state => {
    return ({
        user: state.app.currentUser
    });
};

const mapDispatchToProps = (dispatch) => ({
    logoutUser: () => dispatch(logoutUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(UserMenuComponent);
