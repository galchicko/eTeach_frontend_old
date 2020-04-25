import React, {Component} from 'react';
import {Helmet} from 'react-helmet';
import { withNamespaces } from 'react-i18next';
import './App.scss';
import {Router, Route, Switch, Redirect} from 'react-router-dom';
import history from '../../services/historyService';
import {Layout,MaterialLayout} from '../Layout/LayoutContainer';
import { subscribe, unsubscribe, WEB_SOCKET_CODES } from '../WebSocketService';
import LoginComponent from '../LoginComponent';
import AuthGuard from '../AuthGuard';
import i18n from 'i18next';
import AlertDialog from '../Dialog/AlertDialog/AlertDialogContainer';

console.debug('Version 1.1 - Libraries');
console.debug(`Environment: ${process.env.REACT_APP_ENV_NAME}`);

class App extends Component {
    constructor(props) {
        super(props);
        this.timeout = null;
    }

    componentDidMount () {
        this.wsSubcribtionIdOnDisconnect = subscribe(WEB_SOCKET_CODES.ON_DISCONNECT, this.props.handleOnDisconnect);
    }

    componentWillUnmount () {
        unsubscribe(this.wsSubcribtionIdOnDisconnect);
    }

    componentWillReceiveProps (nextProps) {
        if (nextProps.user && (!this.props.user ||
            nextProps.user.language !== this.props.user.language)) {
            i18n.changeLanguage(nextProps.user.language, (err) => {
                if (err) return console.log('something went wrong with language change', err);
            });
        }
        if (nextProps.user && this.props.user !== nextProps.user && nextProps.user.expirationTimeout) {
            this.startExpirationTimeout(nextProps.user.expirationTimeout);
        }
    }

    startExpirationTimeout = (minutes) => {
        if (this.timeout) {
            clearTimeout(this.timeout);
        }

        this.timeout = setTimeout(this.props.handleOnExpired, minutes * 60 * 1000);
    };

    render() {
        const {t} = this.props;
        return (
            <div className="App">
                <Helmet>
                    <title>{t('app.baseTitle')}</title>
                </Helmet>
                <AlertDialog />
                <Router history={history}>
                    <AuthGuard>
                        <div className="AppRouter">
                            <Switch>
                                <Route path="/login" component={LoginComponent}/>
                                <Route path="/overview/:entityType?/:entityId?" component={Layout}/>
                                <Route path="/material" component={MaterialLayout}/>
                                <Redirect from='/' to='/overview/all'/>
                            </Switch>
                        </div>
                    </AuthGuard>
                </Router>
            </div>
        );
    }
}

export default withNamespaces('translation')(App);
