import {HTTP_METHODS, STATUS_TYPES} from './httpMockConstants';

import * as responses from '../../stubs';

export default [
    {
        URL: '/users/current',
        METHOD: HTTP_METHODS.GET,
        TIMEOUT: 1500,
        STATUS: STATUS_TYPES.FAILED,
        VALUE: responses.currentUserStub,
        IS_MOCKED: false,
        LOGGING: true
    },
    {
        URL: '/login',
        METHOD: HTTP_METHODS.POST,
        TIMEOUT: 1000,
        STATUS: STATUS_TYPES.SUCCESS,
        VALUE: '"User not found."',
        IS_MOCKED: false,
        LOGGING: false
    },
    {
        URL: '/deviceList',
        METHOD: HTTP_METHODS.GET,
        TIMEOUT: 2000,
        STATUS: STATUS_TYPES.SUCCESS,
        VALUE: responses.deviceListStub,
        IS_MOCKED: false,
        LOGGING: false
    },
    {
        URL: '/deviceInfo',
        METHOD: HTTP_METHODS.GET,
        TIMEOUT: 2000,
        STATUS: STATUS_TYPES.SUCCESS,
        VALUE: responses.deviceInfoStub,
        IS_MOCKED: false,
        LOGGING: false
    },
    {
        URL: '/regions',
        METHOD: HTTP_METHODS.GET,
        TIMEOUT: 2000,
        STATUS: STATUS_TYPES.SUCCESS,
        VALUE: responses.regionListStub,
        IS_MOCKED: false,
        LOGGING: true
    },
    {
        URL: '/devices/1',
        METHOD: HTTP_METHODS.GET,
        TIMEOUT: 2000,
        STATUS: STATUS_TYPES.SUCCESS,
        VALUE: responses.deviceListStub,
        IS_MOCKED: false,
        LOGGING: false
    },
    {
        URL: '/regions/:regionId',
        METHOD: HTTP_METHODS.GET,
        TIMEOUT: 2000,
        STATUS: STATUS_TYPES.SUCCESS,
        VALUE: responses.region1Stub,
        IS_MOCKED: false,
        LOGGING: false
    },
    {
        URL: '/devices/all',
        METHOD: HTTP_METHODS.GET,
        TIMEOUT: 1000,
        STATUS: STATUS_TYPES.SUCCESS,
        VALUE: responses.deviceInfoAllStub,
        IS_MOCKED: false,
        LOGGING: false
    },
    {
        URL: '/devices/Tower/:deviceId',
        METHOD: HTTP_METHODS.GET,
        TIMEOUT: 2000,
        STATUS: STATUS_TYPES.SUCCESS,
        VALUE: responses.tower1Stub,
        IS_MOCKED: false,
        LOGGING: false
    },
    {
        URL: '/devices/BaseStation/:deviceId',
        METHOD: HTTP_METHODS.GET,
        TIMEOUT: 2000,
        STATUS: STATUS_TYPES.SUCCESS,
        VALUE: responses.bs1Stub,
        IS_MOCKED: false,
        LOGGING: false
    },
    {
        URL: '/devices/:anotherType/:deviceId',
        METHOD: HTTP_METHODS.GET,
        TIMEOUT: 2000,
        STATUS: STATUS_TYPES.SUCCESS,
        VALUE: responses.fixedStationAnyStub,
        IS_MOCKED: false,
        LOGGING: false
    },
    {
        URL: '/regions/1',
        METHOD: HTTP_METHODS.PUT,
        TIMEOUT: 2000,
        STATUS: STATUS_TYPES.SUCCESS,
        VALUE: responses.region1UpdatedStub,
        IS_MOCKED: false,
        LOGGING: false
    },
    {
        URL: '/devices/Tower/1',
        METHOD: HTTP_METHODS.PUT,
        TIMEOUT: 2000,
        STATUS: STATUS_TYPES.SUCCESS,
        VALUE: responses.tower1UpdatedStub,
        IS_MOCKED: false,
        LOGGING: false
    },
    {
        URL: '/devices/BaseStation/1',
        METHOD: HTTP_METHODS.PUT,
        TIMEOUT: 2000,
        STATUS: STATUS_TYPES.SUCCESS,
        VALUE: responses.bs1UpdatedStub,
        IS_MOCKED: false,
        LOGGING: false
    },
    {
        URL: '/regions/',
        METHOD: HTTP_METHODS.POST,
        TIMEOUT: 2000,
        STATUS: STATUS_TYPES.SUCCESS,
        VALUE: responses.region100Stub,
        IS_MOCKED: false,
        LOGGING: false
    },
    {
        URL: '/devices/Tower/',
        METHOD: HTTP_METHODS.POST,
        TIMEOUT: 2000,
        STATUS: STATUS_TYPES.SUCCESS,
        VALUE: responses.tower100Stub,
        IS_MOCKED: false,
        LOGGING: false
    },
    {
        URL: '/devices/BaseStation/',
        METHOD: HTTP_METHODS.POST,
        TIMEOUT: 2000,
        STATUS: STATUS_TYPES.SUCCESS,
        VALUE: responses.bs100Stub,
        IS_MOCKED: false,
        LOGGING: false
    },
    {
        URL: '/regions/2',
        METHOD: HTTP_METHODS.DELETE,
        TIMEOUT: 2000,
        STATUS: STATUS_TYPES.SUCCESS,
        VALUE: {},
        IS_MOCKED: false,
        LOGGING: false
    },
    {
        URL: '/devices/Tower/10',
        METHOD: HTTP_METHODS.DELETE,
        TIMEOUT: 2000,
        STATUS: STATUS_TYPES.SUCCESS,
        VALUE: {},
        IS_MOCKED: false,
        LOGGING: false
    },
    {
        URL: '/devices/BaseStation/1',
        METHOD: HTTP_METHODS.DELETE,
        TIMEOUT: 2000,
        STATUS: STATUS_TYPES.SUCCESS,
        VALUE: {},
        IS_MOCKED: false,
        LOGGING: false
    },
    {
        URL: '/events',
        METHOD: HTTP_METHODS.POST,
        TIMEOUT: 2000,
        STATUS: STATUS_TYPES.SUCCESS,
        VALUE: responses.eventsStub,
        IS_MOCKED: false,
        LOGGING: false
    },
    {
        URL: '/graph/options/:type',
        METHOD: HTTP_METHODS.GET,
        TIMEOUT: 2000,
        STATUS: STATUS_TYPES.SUCCESS,
        VALUE: responses.ssGraphTypes,
        IS_MOCKED: false,
        LOGGING: true
    },
    {
        URL: '/graph/performance/:id',
        METHOD: HTTP_METHODS.GET,
        TIMEOUT: 100,
        STATUS: STATUS_TYPES.SUCCESS,
        VALUE: responses.performanceStub,
        IS_MOCKED: false,
        LOGGING: false
    },
    {
        URL: '/users/list',
        METHOD: HTTP_METHODS.POST,
        TIMEOUT: 2000,
        STATUS: STATUS_TYPES.SUCCESS,
        VALUE: {list: responses.userListStub,count: 7},
        IS_MOCKED: false,
        LOGGING: true
    },
    {
        URL: '/users/delete',
        METHOD: HTTP_METHODS.POST,
        TIMEOUT: 2000,
        STATUS: STATUS_TYPES.SUCCESS,
        VALUE: responses.userListStub,
        IS_MOCKED: false,
        LOGGING: true
    },
    {
        URL: '/users',
        METHOD: HTTP_METHODS.POST,
        TIMEOUT: 2000,
        STATUS: STATUS_TYPES.SUCCESS,
        VALUE: responses.userListStub[0],
        IS_MOCKED: false,
        LOGGING: true
    },
    {
        URL: '/users/:id',
        METHOD: HTTP_METHODS.PUT,
        TIMEOUT: 2000,
        STATUS: STATUS_TYPES.SUCCESS,
        VALUE: responses.userListStub[0],
        IS_MOCKED: false,
        LOGGING: true
    },
    {
        URL: '/users/:id',
        METHOD: HTTP_METHODS.GET,
        TIMEOUT: 2000,
        STATUS: STATUS_TYPES.SUCCESS,
        VALUE: responses.userListStub[0],
        IS_MOCKED: false,
        LOGGING: true
    },
    {
        URL: '/users/:id',
        METHOD: HTTP_METHODS.PUT,
        TIMEOUT: 2000,
        STATUS: STATUS_TYPES.SUCCESS,
        VALUE: responses.userListStub[0],
        IS_MOCKED: false,
        LOGGING: true
    },
    {
        URL: '/users/:id',
        METHOD: HTTP_METHODS.GET,
        TIMEOUT: 2000,
        STATUS: STATUS_TYPES.SUCCESS,
        VALUE: responses.userListStub[0],
        IS_MOCKED: false,
        LOGGING: true
    },
    {
        URL: '/events/:deviceType/:deviceId',
        METHOD: HTTP_METHODS.POST,
        TIMEOUT: 1000,
        STATUS: STATUS_TYPES.SUCCESS,
        VALUE: responses.timelineEvents,
        IS_MOCKED: false,
        LOGGING: false
    }
];
