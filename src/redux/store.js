import { createStore, applyMiddleware, compose } from 'redux';
import { middlewares } from './middleware';
import { appReducers } from './reducers';

export default createStore(
    appReducers,
    compose(applyMiddleware(...middlewares),
        process.env.REACT_APP_DEBUG && window.__REDUX_DEVTOOLS_EXTENSION__ ?
            window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
    )
);