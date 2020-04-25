import { connect } from 'react-redux';
import LayoutComponent from './Layout';
import { withRouter } from 'react-router';
import {fetchEntityListAndDefineSelected} from '../EntityList/store/thunk/entityListThunk';
import { clearAllOnRegionChange } from '../../redux/actions/appActions';
import { withWebsocket } from '../WebSocketService';
import MaterialLayoutComponent from './MaterialLayout';

const mapDispatchToProps = (dispatch) => ({
    onHomeNavigate: (teacherId) => {
        dispatch(fetchEntityListAndDefineSelected(teacherId));
        clearAllOnRegionChange(dispatch);
    }
});

const mapStateToProps = state => {
    return ({
        user: state.app.currentUser
    });
};

export const Layout = withWebsocket(withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(LayoutComponent)));


export const MaterialLayout = withWebsocket(withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(MaterialLayoutComponent)));