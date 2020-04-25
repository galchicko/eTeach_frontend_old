import React, { Component } from 'react';
import WebSocketComponent from './WebSocketComponent';

export const withWebsocket = (View) => {
    return class AuthGuardComponent extends Component {
        render() {
            return (
                <div className="hoc-with-web-socket">
                    <WebSocketComponent />
                    <View/>
                </div>
            );
        }
    };
};

