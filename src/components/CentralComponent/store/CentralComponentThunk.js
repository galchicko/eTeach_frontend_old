import {centralComponentTypes} from './CentralComponentActionTypes';
import {mapTimelineEventsToTimelines} from '../helpers/timelineEventsHepler';
import http from '../../../network';

const fetchTimeLineForDevice = (dispatch, device, filter) => new Promise((resolve, reject) => {
    http.post({url: `${process.env.REACT_APP_APPS_BE}/events/${device.type}/${device.id}`, body:{filter}})
        .then(({payload}) => {
            const timelines = mapTimelineEventsToTimelines(payload.list);
            dispatch({type: centralComponentTypes.SET_DEVICE_TIMELINE, payload: {id: device.id, timelines}});
            resolve();
        })
        .catch(reject);
});

export const fetchDevicesTimeLine = (devicesArr) => (dispatch, getState) => {
    const date = getState().centralComponent.dateRange;
    const devices = devicesArr || getState().selectedDevice.device.devices;
    const region = getState().app.currentRegion;
    const regionId = region ? region.id : null;

    if (!Array.isArray(devices) || devices.length === 0) {
        return;
    }

    dispatch({type: centralComponentTypes.SET_IN_PROGRESS, payload: true});

    const filter = {
        date, 
        regionId,
        severity: {Critical: true, Major: true, Minor: true, Warning: true, Normal: true},
        sort: {
            sortedField: 'Time',
            sortDirection: 'ascending'
        }
    };
    const fetchPromises = devices.map(device => fetchTimeLineForDevice(dispatch, device, filter));
    Promise.all(fetchPromises)
        .then(() => {
            dispatch({type: centralComponentTypes.SET_IN_PROGRESS, payload: false});
        })
        .catch((error) => console.error(error));

};
