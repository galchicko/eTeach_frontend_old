import { composeRequestWrappers, composeResolveWrappers, composeRejectWrappers } from './baseXHRWrappers';
import { HTTP_CODES } from '../consts';
let token;

const defaultHeaders = {
    'Content-Type': 'application/json'
};

export const setToken = (t) => {
    token = t;
};

export const _onError = (xhr) => {
    let data;
    try {
        data = JSON.parse(xhr.responseText);
    } catch (e) {
        data = xhr.responseText;
    }
    return { payload: { XHRstatus: xhr.status, XHRstatusText: xhr.statusText, data }};
};

export const _onSuccess = (xhr, url, method) => {
    let payload;
    const meta = {
        XHRstatus: xhr.status,
        XHRstatusText: xhr.statusText,
        url,
        method
    };

    // Fix when we have no Etag headers in response
    // When using CORS server should set the Access-Control-Expose-Headers: ETag
    if (xhr.getAllResponseHeaders().match(/etag/g)) {
        meta.etag = xhr.getResponseHeader('etag');
    }

    try {
        payload = JSON.parse(xhr.responseText);
    } catch (e) {
        payload = xhr.responseText;
    }

    return { payload, meta };
};

export const _req = ({
    method,
    url,
    headers = {},
    body = {},
    timeout = 20000,
    withCredentials = true
}) => composeRequestWrappers({
    method, url, headers, body, timeout, withCredentials
})(
    ({ method, url, headers, body, timeout, withCredentials }) => new Promise((resolve, reject) => {
        resolve = composeResolveWrappers(resolve);
        reject = composeRejectWrappers(reject);
        const xhr = new XMLHttpRequest();

        xhr.withCredentials = withCredentials;

        xhr.onload = ()=> {
            if (!(xhr.status >= HTTP_CODES.STATUS_200 && xhr.status < HTTP_CODES.STATUS_300) && xhr.status !== HTTP_CODES.STATUS_304) {
                return reject(_onError(xhr));
            } else {
                return resolve(_onSuccess(xhr, url, method));
            }
        };

        xhr.onerror = xhr.onload;

        xhr.ontimeout = () => {
            reject({
                meta: {
                    XHRstatus: HTTP_CODES.TIMEOUT_STATUS_CODE,
                    XHRstatusText: 'request timed out'
                }
            });
        };

        xhr.open(method, url);

        // Line below must appear after xhr.open due to an IE11 bug - https://github.com/stephanebachelier/superapi/issues/5
        xhr.timeout = timeout;

        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        // if (url.includes(process.env.REACT_APP_APPS_BE)) {
        //     //Todo: delete log
        //     console.debug('X-Ads-Token-Data goes');
        //     headers['X-Ads-Token-Data'] = `Bearer ${token}`;
        // }

        const xhrHeaders = { ...defaultHeaders, ...headers };
        Object.keys(xhrHeaders).forEach((key) => {
            xhr.setRequestHeader(key, xhrHeaders[key]);
        });

        // make sure to include the auth header from somewhere!

        if (['GET', 'DELETE', 'OPTIONS', 'HEAD'].indexOf(method) > -1) {
            xhr.send();
        } else {
            const bodyToSend = (typeof body === 'object') ?
                JSON.stringify(body) : body;
            // if body is a string, no need to stringify!
            // this is so when using "Content-type": "application/x-www-form-urlencoded"

            xhr.send(bodyToSend);
        }

    })
);

export default {
    get: ({ url, headers, body, timeout, withCredentials }) => {
        return _req({ method: 'GET', url, headers, body, timeout, withCredentials });
    },
    post: ({ url, headers, body, timeout, withCredentials }) => {
        return _req({ method: 'POST', url, headers, body, timeout, withCredentials });
    },
    put: ({ url, headers, body, timeout, withCredentials }) => {
        return _req({ method: 'PUT', url, headers, body, timeout, withCredentials });
    },
    patch: ({ url, headers, body, timeout, withCredentials }) => {
        return _req({ method: 'PATCH', url, headers, body, timeout, withCredentials });
    },
    delete: ({ url, headers, body, timeout, withCredentials }) => {
        return _req({ method: 'DELETE', url, headers, body, timeout, withCredentials });
    }
};
