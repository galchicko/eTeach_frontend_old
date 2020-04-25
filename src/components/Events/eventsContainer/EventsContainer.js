import {connect} from 'react-redux';
import Events from './Events';
import {eventListActionTypes} from '../actions/actionTypes';
import {fetchEventList,downloadCSV} from '../store/eventsThunk';
import { editEventStatus } from '../store/editEventStatusThunk';

const mapStateToProps = state => {
    return ({
        events: state.eventList.events,
        count: state.eventList.count,
        isLoading: state.eventList.isLoading,
        filter: state.eventsListFilter,
        selectedEntity : state.selectedEntity.entity
    });
};

const mapDispatchToProps = (dispatch) => ({
    fetchEventList: (entity) => {
        dispatch(fetchEventList(entity.id, entity.type));
    },
    downloadEvents: (entity) => {
        dispatch(downloadCSV(entity.id,entity.name, entity.type));
    },

    handleChangePerPage: (perPage) => {
        dispatch({type: eventListActionTypes.CHANGE_PER_PAGE, perPage: perPage});
    },
    handleChangePage: (page) => {
        dispatch({type: eventListActionTypes.CHANGE_CURRENT_PAGE, page: page});
    },
    handleChangeSortedField: (sortedField, sortDirection) => {
        dispatch({type: eventListActionTypes.CHANGE_SORTED_FIELD, sortedField: sortedField, sortDirection: sortDirection});
    },
    handleChangeFilter: (date, search, status) => {
        dispatch({type: eventListActionTypes.CHANGE_FILTER, date: date, search: search, status: status});
    },
    editEventStatus: (newStatus, id, entity) => {
        dispatch(editEventStatus(newStatus, id, entity));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Events);
