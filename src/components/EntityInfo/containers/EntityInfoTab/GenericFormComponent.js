import React, { Component } from 'react';

const withGenericContainer = () => WrappedComponent => {
    return class GenericContainer extends Component {

        constructor(props) {
            super(props);
        }

        render() {
            return(
                <WrappedComponent {...this.props} />);
        }
    };
};

export default withGenericContainer;
