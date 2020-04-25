import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './components/App/AppContainer';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux';
import store from './redux/store';
import {errorService, ERROR_FLOWS} from './services/ErrorService';
import 'typeface-roboto';
import './i18n';

//set flow and dispatch function to ErrorService
errorService.setFlowAndDispatch(ERROR_FLOWS.MAIN, store.dispatch);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
