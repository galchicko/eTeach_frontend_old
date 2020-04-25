import {connect} from 'react-redux';
import BreadcrumbComponent from './BreadcrumbComponent';
import { selectEntityAction } from '../EntityList/actions/entityListActions';
import { centralTabsTypes } from '../CentralComponent/store/CentralTabsActionTypes';

const mapStateToProps = state => {
    return ({
        entityList: state.entityList.schools
    });
};

const mapDispatchToProps = (dispatch) => ({
    selectEntity: payload => selectEntityAction(dispatch, payload),
    setActiveTab: (activeTab) => {
        dispatch({type: centralTabsTypes.SET_ACTIVE_TAB, payload: activeTab});
    },
});

export default connect (mapStateToProps, mapDispatchToProps)(BreadcrumbComponent);
