import {connect} from 'react-redux';
import LoginComponent from './LoginComponent';
import {sendCredentials} from './store/loginThunks';

const mapStateToProps = state => {
    return ({
        inProgress: state.login.inProgress,
        error: state.login.error,
        errorCount: state.login.errorCount
    });
};
const mapDispatchToProps = (dispatch) => ({
    sendCredentials: (username, password) => dispatch(sendCredentials(username, password))
});

export default connect (mapStateToProps,mapDispatchToProps)(LoginComponent);
