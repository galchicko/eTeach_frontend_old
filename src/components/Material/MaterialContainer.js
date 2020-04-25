import {connect} from 'react-redux';
import MaterialComponent from './MaterialComponent';
import {withRouter} from 'react-router';

const mapDispatchToProps = (dispatch) => ({

});

const mapStateToProps = state => {
    return ({
        user: state.app.currentUser
    });
};

const MaterialContainer = connect(mapStateToProps, mapDispatchToProps)(MaterialComponent);

export default withRouter(MaterialContainer);
