import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Websocket from 'react-websocket';
import { setWebSocket, handleMessage, handleOnOpen } from './WebSocketService';

const webSocketUrl = process.env.REACT_APP_WEB_SOCKET_URL;

class WebSocketComponent extends Component {

    handleData = (data) => {
        console.debug('handleData ', data);
        handleMessage(data);
    };

    handleOpen = () => {
        console.debug('WebSocket Connected');
        handleOnOpen();
    };

    handleClose = () => {
        console.debug('WebSocket Disconnected');
    };

    setWebSocketRef = (Websocket) => {
        console.debug('setWebSocketRef');
        setWebSocket(Websocket);
    };

    getWebSocketUrl = () => {
       return  webSocketUrl.replace("%LOCALHOST%", window.location.host);
    };

    render() {
        const url = this.getWebSocketUrl();

        return (
            <div className="WebSocket__component">
                <Websocket url={url}
                           onMessage={this.handleData}
                           onOpen={this.handleOpen}
                           onClose={this.handleClose}
                           reconnect={false}
                           debug={true}
                           ref={this.setWebSocketRef}/>
            </div>
        );
    }
}

WebSocketComponent.propTypes = {
    debug: PropTypes.bool,
    reconnect: PropTypes.bool
};

export default WebSocketComponent;
