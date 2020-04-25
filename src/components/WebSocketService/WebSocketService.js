let _webSocket = null;
let subscribtionId = 0;
let _subscribers = [];
let _requestSequence = [];

const generateSubscribtionId = () => {
    return subscribtionId++;
};

export const setWebSocket = (webSocketRef) => {
    _webSocket = webSocketRef;
};

export const handleOnOpen = () => {
    //Todo: delete
    console.debug('on open websocket');
};

export const sendMessage = (action, payload) => {
    const message = {
        action,
        payload
    };

    if (_webSocket) {
        _webSocket.sendMessage(JSON.stringify(message));
    } else {
        _requestSequence.push(message);
    }
};

export const handleMessage = (data) => {
    console.log(data);
    try {
        const message = JSON.parse(data);
        _subscribers.forEach((subscriber) => {
            if (message.action === subscriber.action) {
                if (subscriber.callback) {
                    //Todo: delete
                    console.log('WebSocket callback executed with:', message.payload);
                    subscriber.callback(message.payload);
                }
            }
        });
    } catch (e) {
        console.error('WebSocket Service: handleMessage error: ', e);
    }
};

export const subscribe = (action, callback) => {
    const id = generateSubscribtionId();
    _subscribers.push({
        id,
        action,
        callback
    });
};

export const unsubscribe = (id) => {
    _subscribers = _subscribers.filter((subscriber) => subscriber.id !== id);
};