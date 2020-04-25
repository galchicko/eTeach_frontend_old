const UrlPattern = require('url-pattern');

const defaultOptions = {
    TIMEOUT: 0,
    IS_MOCKED: true,
    LOGGING: false
};

export class HttpMockEndpointModel {
    constructor(importOptions) {
        const options = { ...defaultOptions, ...importOptions };
        this.URL_PATTERN = new UrlPattern(options.URL);
        this.URL = options.URL;
        this.TIMEOUT = options.TIMEOUT;
        this.STATUS = options.STATUS;
        this.VALUE = options.VALUE;
        this.IS_MOCKED = options.IS_MOCKED;
        this.LOGGING = options.LOGGING;
    }
}
