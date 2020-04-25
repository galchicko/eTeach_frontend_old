import {connect} from 'react-redux';
import {entityListActionNames} from '../actions/actionTypes';
import Entity from './entity';
import {centralTabsTypes} from '../../CentralComponent/store/CentralTabsActionTypes';
import { selectEntityAction } from '../actions/entityListActions';


const mapDispatchToProps = (dispatch) => ({
    selectEntity: payload => selectEntityAction(dispatch, payload),
    toggleClick: payload => {
        dispatch({ type: entityListActionNames.TOGGLE_CLICK_ENTITY_LIST, payload });
    },
    collapseAll: () => {
        dispatch({type: entityListActionNames.COLLAPSE_ALL});
    },
    setActiveTab: (activeTab) => {
        dispatch({type: centralTabsTypes.SET_ACTIVE_TAB, payload: activeTab});
    }
});


export default connect (null, mapDispatchToProps)(Entity);
