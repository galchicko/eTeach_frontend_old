import {connect} from 'react-redux';
import EventList from './EventList';
import {eventListActionTypes} from '../actions/actionTypes';

const mapStateToProps = state => {
    return ({
        eventToExpand: state.eventList.eventToExpand,
        isEventsLoading: state.eventList.isLoading,
        filter: state.eventsListFilter,
        user: state.app.currentUser
    });
};

const mapDispatchToProps = (dispatch) => ({
    toggleEvent: (id) => {
        dispatch({type: eventListActionTypes.TOGGLE_EVENT_DESC, payload: id});
    },
    expandEventFromAlerts: (id) => {
        dispatch({type: eventListActionTypes.EXPAND_EVENT_FROM_ALERTS, payload: id});
    },
    collapseAllEvents: () => {
        dispatch({type: eventListActionTypes.COLLAPSE_ALL_EVENTS_DESC});
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(EventList);
