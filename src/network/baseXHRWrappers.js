import { errorService } from '../services/ErrorService';

/**
 * For each request, handle error.
 * It will pass error data to ErrorService and handle it with the ErrorSchema.
 * !!! Warning !!! Side effects could be here (log, reload, redirect, logout, dispatch).
 * @param {Function} reject The reject function passed from the compositor.
 * @returns {Function} The reject function passed from the compositor wrapped.
 */
export const rejectHandleByErrorService = (reject) => (data) => {
    return reject(errorService.handleError(data));
};

const requestWrappers = [];

const resolveWrappers = [];

const rejectWrappers = [
    rejectHandleByErrorService
];

/**
 * Wrap the promise with N wrapping functions, each will add/amend the arguments passed to the Promise differently.
 * @param {*} args The Arguments to pass to the wrappers
 * @returns {Function} The function to run after the arguments have been modified.
 */
export const composeRequestWrappers = (args) => (func) => func(requestWrappers.reduce((args, func) => func(args), args));

/**
 * Wrap the resolve function (Resolve of a promise) with middlewares that add/amend the data that is returned from the Promises'
 * Executor function.
 * @param {Function} resolve The resolve function to wrap.
 * @returns {Function} The wrapped resolve function.
 */
export const composeResolveWrappers = (resolve) => resolveWrappers.reduce((resolve, func) => func(resolve), resolve);

/**
 * Wrap the reject function (Reject of a promise) with middlewares that add/ammend the data that is returned from the Promises's
 * Executor function.
 * @param {Function} reject The reject function to wrap.
 * @returns {Function} The wrapped resolve function.
 */
export const composeRejectWrappers = (reject) => rejectWrappers.reduce((reject, func) => func(reject), reject);
