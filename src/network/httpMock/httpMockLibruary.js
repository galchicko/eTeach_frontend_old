import {HTTP_METHODS, STATUS_TYPES} from './httpMockConstants';
import {HttpMockEndpointModel} from './httpMockEndpointModel';

const defaultGlobalConfig = {
    ENABLE_HTTP_PROVIDER: false
};

/**
 *  Global HttpMock instance to mock all Http requests .
 */

export class MockHttp {
    /**
     * Create a HttpMock instance.
     * @param {object} appConfig - The env-config.
     * @param {object} [httpProvider=null] - The real network provider. This could be any HTTP library or some else which have the same interface.
     * @param {array} httpMockConfig - The collection with all mocks endpoints.
     *    URL: {string} required - Url for mocking.
     *    METHOD: {string} required - HTTP Method (get, post, patch, delete).
     *    VALUE: {any} required - Mock response value.
     *    STATUS: {string} required - HTTP response status (success, error).
     *    TIMEOUT: {number} optional -(ms) Default 0.
     *    IS_MOCKED: {boolean} optional - If false, will use real network provider. Default true.
     *    LOGGING: {boolean} options - If true, will log custom endpoint if logging is enabled in appConfig. Default false.
     */
    constructor({appConfig, httpProvider, httpMockConfig}) {
        appConfig.HTTP_MOCK.LOGGING && MockHttp.logEndpoints(httpMockConfig);
        //create initial state
        this.endpoints = MockHttp.createEndpoints();

        //fill all endpoints from httpMockConfig
        httpMockConfig.forEach((endpoint) => {
            this.endpoints[endpoint.METHOD].push(new HttpMockEndpointModel(endpoint));
        });

        //fill the common configs
        this.config = {...defaultGlobalConfig, ...appConfig.HTTP_MOCK, HOST_API: appConfig.ORIGINS.APPS_BE};

        //create instances for network methods
        Object.values(HTTP_METHODS).forEach((method) => {
            this[method] = (args) => MockHttp.request(args, method, this.config, httpProvider, this.endpoints);
        });
    }

    /**
     * Log response expectation.
     * @param {object} requestConfig - The request config.
     * @param {string} url - The real network provider.
     */
    static logExpectations(requestConfig, url) {
        console.log(`Http Mock request expected in ${requestConfig.TIMEOUT}ms.`);
        console.log(`Request URL: ${url}.`);
    }

    /**
     * Log response results.
     * @param {object} requestConfig - The request config.
     */
    static logResults(requestConfig) {
        console.log('Http Mock requested:');
        console.log(requestConfig);
    }

    /**
     * Log all existing mock endpoints.
     * @param {array} endpoints - The array of endpoints from config.
     */
    static logEndpoints(endpoints) {
        console.log('Http Mock activated with endpoints:');
        console.log(endpoints);
    }

    /**
     * Do mock request and build response.
     * @param {object} args - The arguments from request.
     * @param {string} method - The HTTP method.
     * @param {object} config - The env-config .
     * @param {object} provider - The real network provider.
     * @param {array} endpoints - The array of endpoints from config.
     * @return {Promise} The mocked response.
     */
    static request(args, method, config, provider, endpoints) {
        const urlWithParams = args.url
            .replace(config.HOST_API, '')
            .replace('.', '');
        const url = urlWithParams.split('?')[0];
        //find the mocked endpoint
        const endpoint = endpoints[method].find((route) => !!route.URL_PATTERN.match(url));
        if (!endpoint) {
            if (config.ENABLE_HTTP_PROVIDER) {
                config.LOGGING && console.log(`No mocks for route: ${method.toUpperCase()} ${args.url}. Real Http provided.`);
                return provider ? provider[method](args) : new Promise((resolve, reject) => reject(new Error('No real http Provider')));
            } else {
                throw new Error(`No mocks for route: ${method.toUpperCase()} ${args.url}`);
            }
        }

        //merge configs
        const requestConfig = {...config, ...endpoint, ...{IS_MOCKED: config.IS_MOCKED && endpoint.IS_MOCKED}};
        requestConfig.LOGGING && MockHttp.logExpectations(requestConfig, args.url);

        //custom enabling HttpProvider from endpointConfig
        if (!requestConfig.IS_MOCKED) {
            if (config.ENABLE_HTTP_PROVIDER) {
                return provider ? provider[method](args) : new Promise((resolve, reject) => reject(new Error('No real http Provider')));
            } else {
                throw new Error('HTTP provider is restricted by Global Config. ' + 
                `Turn on IS_MOCKED on you endpoint: ${method.toUpperCase()} ${args.url}`);
            }
        }

        //do mock request
        return new Promise((resolve, reject) => {
            const resultFunction = requestConfig.STATUS === STATUS_TYPES.SUCCESS ? resolve : reject;
            setTimeout(() => {
                resultFunction({payload: requestConfig.VALUE});
                requestConfig.LOGGING && MockHttp.logResults(requestConfig);
            }, requestConfig.TIMEOUT);
        });
    }

    /**
     * Create initial state for endpoints.
     * @return {array} endpoints - The array of endpoints from config.
     */
    static createEndpoints() {
        const endpoints = {};
        Object.values(HTTP_METHODS).forEach((method) => {
            endpoints[method] = [];
        });
        return endpoints;
    }
}
