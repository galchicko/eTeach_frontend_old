import { connect } from 'react-redux';
import AuthGuardComponent from './AuthGuardComponent';
import {fetchCurrentUser} from '../../redux/thunk/appThunk';
import { withRouter } from 'react-router';

const mapStateToProps = state => {
    return ({
        currentUser: state.app.currentUser
    });
};

const mapDispatchToProps = (dispatch) => ({
    fetchCurrentUser: () => dispatch(fetchCurrentUser())
});

const AuthGuardComponentContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(AuthGuardComponent);

export default withRouter(AuthGuardComponentContainer);
