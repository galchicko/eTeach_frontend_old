import {disconnectedDeviceActions} from '../../DisconnectedDeviceGraph/actions/actionTypes';
import http from '../../../../network';
import { acknowledgedEventsChartActions } from '../../AcknowledgedEventsChart/actions/actionTypes';
import { outstandingEventsChartActions } from '../../OutstandingEventsChart/actions/actionTypes';

export const fetchDisconnectedDeviceData = (regionId, from, to) => (dispatch) => {
    dispatch({ type: disconnectedDeviceActions.FETCH_DISCONNECTED_DEVICES});

    return http.get({
        url: `${process.env.REACT_APP_APPS_BE}/graph/performance/region/${regionId}?graphTypes=regionDisconnectedDevices&from=${from}&to=${to}`})
        .then(({payload}) => {
            dispatch({
                type: disconnectedDeviceActions.FETCH_DISCONNECTED_DEVICES_SUCCESS,
                payload: payload
            });
        })
        .catch(({payload}) => {
            dispatch({
                type: disconnectedDeviceActions.FETCH_DISCONNECTED_DEVICES_FAILED,
                error: payload
            });
        });
};

export const fetchAcknowledgedEventsData = (regionId) => (dispatch) => {
    dispatch({ type: acknowledgedEventsChartActions.FETCH_EVENTS});

    return http.post({
        url: `${process.env.REACT_APP_APPS_BE}/events/acknowledged`,
        body: {
            filter: {
                regionId
            }
        }
    })
        .then(({payload}) => {
            dispatch({
                type: acknowledgedEventsChartActions.FETCH_EVENTS_SUCCESS,
                payload: payload
            });
        })
        .catch(({payload}) => {
            dispatch({
                type: acknowledgedEventsChartActions.FETCH_EVENTS_FAILED,
                error: payload
            });
        });
};

export const fetchOutstandingEventsData = (regionId) => (dispatch) => {
    dispatch({ type: acknowledgedEventsChartActions.FETCH_EVENTS});

    return http.post({
        url: `${process.env.REACT_APP_APPS_BE}/events/outstanding`,
        body: {
            filter: {
                regionId
            }
        }
    })
        .then(({payload}) => {
            dispatch({
                type: outstandingEventsChartActions.FETCH_EVENTS_SUCCESS,
                payload: payload
            });
        })
        .catch(({payload}) => {
            dispatch({
                type: outstandingEventsChartActions.FETCH_EVENTS_FAILED,
                error: payload
            });
        });
};

