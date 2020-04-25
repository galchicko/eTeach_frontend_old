import {eventListActionTypes} from '../actions/actionTypes';
import http from '../../../network';
import i18next from 'i18next';
import {changeDatesToTimestamps} from '../../../helpers/dateHelper';
import {downloadCSVFile} from '../../../helpers/csvHelper';


export const fetchEventList = (entityId, entityType) => (dispatch, getState) => {
    dispatch({type: eventListActionTypes.FETCH_EVENT_LIST});
    const filter = changeDatesToTimestamps(getState().eventsListFilter);

    return http.post({
        url: `${process.env.REACT_APP_APPS_BE}/events/${entityType}/${entityId}`,
        body: {filter: filter}
    })
        .then(({payload}) => {

            const res = payload.list.length > filter.pagination.offset
                ? payload.list.slice(filter.pagination.offset, filter.pagination.resultsPerPage)
                : payload.list.slice(filter.pagination.offset);
            dispatch({
                type: eventListActionTypes.FETCH_EVENT_LIST_SUCCESS,
                list: res,
                count: payload.count
            });
            dispatch({
                type: eventListActionTypes.FETCH_EVENT_LIST_SUCCESS,
                list: payload.list,
                count: payload.count,
                isLoading: false
            });
        })
        .catch(({payload}) => {
            dispatch({
                type: eventListActionTypes.FETCH_EVENT_LIST_FAILED,
                isLoading: false,
                error: payload
            });
        });
};


export const downloadCSV = (entityId,entityName, entityType) => (dispatch, getState) => {

    const filter = changeDatesToTimestamps(getState().eventsListFilter);
    delete filter.pagination;

    return http.post({
        url: `${process.env.REACT_APP_APPS_BE}/reports/events/${entityType}/${entityId}`,
        body: {filter: filter}
    }).then(({payload}) => {
        downloadCSVFile(payload,entityName + ' - ' + i18next.t('events.csvFileName') + '.csv');
    }).catch(({payload}) => {
        console.log(payload);
    });
};



