import httpMockConfig from './httpMockConfig';
import {MockHttp} from './httpMockLibruary';
import httpProvider from '../http';

export const appConfig = {
    HTTP_MOCK: {
        IS_MOCKED: false,
        LOGGING: false,
        ENABLE_HTTP_PROVIDER: true
    },
    ORIGINS: {
        APPS_BE: process.env.REACT_APP_APPS_BE
    }
};

const createMockHttp = () => {
    return new MockHttp({
        appConfig,
        httpMockConfig,
        httpProvider
    });
};

export default createMockHttp;

