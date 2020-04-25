import {connect} from 'react-redux';
import EntityInfo from './entityInfo';

import { entityInfoActionNames } from '../../../consts';

const mapStateToProps = state => {
    return ({
        selectedEntity : state.selectedEntity.entity,
        user: state.app.currentUser
    });
};
const mapDispatchToProps = (dispatch) => ({
    togglePanelcollapse: () => {
        dispatch({ type: entityInfoActionNames.TOGGLE_PANEL_COLLAPSE });
    },
    onEntityInfoChangedImmediately: (payload) => {
        dispatch({ type: entityInfoActionNames.FETCH_ENTITY_INFO_SUCCESS, payload });
    }
});

export default connect (mapStateToProps,mapDispatchToProps)(EntityInfo);
