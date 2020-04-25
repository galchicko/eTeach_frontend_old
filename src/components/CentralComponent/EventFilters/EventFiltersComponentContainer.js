import {connect} from 'react-redux';
import EventFiltersComponent from './EventFiltersComponent';
import {centralComponentTypes} from '../store/CentralComponentActionTypes';


const mapStateToProps = state => {
    return ({
        inProgress: state.centralComponent.inProgress,
        dateRange: state.centralComponent.dateRange
    });
};
const mapDispatchToProps = (dispatch) => ({
    setFilters: (update) => {
        dispatch({type: centralComponentTypes.SET_DATE_RANGE, payload: update});
    },
    clearFilters: () => {
        dispatch({type: centralComponentTypes.CLEAR_DATE_RANGE});
    }

});

export default connect (mapStateToProps,mapDispatchToProps)(EventFiltersComponent);
