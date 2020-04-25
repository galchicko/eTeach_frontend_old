import {connect} from 'react-redux';
import EntityInfoTab from './EntityInfoTab';

const mapStateToProps = state => {
    return ({
        selectedEntity : state.selectedEntity.entity
    });
};

export default connect (mapStateToProps)(EntityInfoTab);
