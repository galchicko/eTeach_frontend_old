import http from '../network';

export const httpFetchDeviceInfo = (deviceId, deviceType, regionId) => {
    const url = (deviceId && deviceType)
        ? `${process.env.REACT_APP_APPS_BE}/devices/${deviceType}/${deviceId}`
        : `${process.env.REACT_APP_APPS_BE}/devices/${regionId}/all`;

    return http.get({url});
};