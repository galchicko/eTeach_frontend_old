import {disconnectedDeviceActions} from '../../DisconnectedDeviceGraph/actions/actionTypes';
import * as Immutable from 'seamless-immutable';
import { acknowledgedEventsChartActions } from '../../AcknowledgedEventsChart/actions/actionTypes';
import { outstandingEventsChartActions } from '../../OutstandingEventsChart/actions/actionTypes';
import { getLastDayRange } from '../../../../helpers/dateHelper';

export const createInitialState = () => (
    Immutable.from({
        disconnectedDevices: {
            dateRange: getLastDayRange(),
            graph:[]
        },
        acknowledgedEventsChart: {
            dateRange: getLastDayRange(),
            data: null
        },
        outstandingEventsChart: {
            dateRange: getLastDayRange(),
            data: null
        }
    })
);

const initialState = createInitialState();

export default function(state = initialState, action){
    switch (action.type) {

    case disconnectedDeviceActions.SET_DISCONNECTED_DEVICES_DATE_RANGE:
        return {
            ...state,
            disconnectedDevices: {
                ...state.disconnectedDevices,
                dateRange: action.payload
            }
        };
    case disconnectedDeviceActions.FETCH_DISCONNECTED_DEVICES_SUCCESS:
        return {
            ...state,
            disconnectedDevices: {
                ...state.disconnectedDevices,
                graph: {
                    meta: action.payload.meta,
                    data : action.payload.data
                }
            }
        };

    case acknowledgedEventsChartActions.SET_DATE_RANGE:
        return {
            ...state,
            acknowledgedEventsChart: {
                ...state.acknowledgedEventsChart,
                dateRange: action.payload
            }
        };
    case acknowledgedEventsChartActions.FETCH_EVENTS_SUCCESS:
        return {
            ...state,
            acknowledgedEventsChart: {
                ...state.acknowledgedEventsChart,
                data: action.payload
            }
        };

    case outstandingEventsChartActions.SET_DATE_RANGE:
        return {
            ...state,
            outstandingEventsChart: {
                ...state.outstandingEventsChart,
                dateRange: action.payload
            }
        };
    case outstandingEventsChartActions.FETCH_EVENTS_SUCCESS:
        return {
            ...state,
            outstandingEventsChart: {
                ...state.outstandingEventsChart,
                data: action.payload
            }
        };

    default:
        return state;
    }
}

