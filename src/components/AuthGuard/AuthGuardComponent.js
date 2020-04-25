import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {withStyles} from '@material-ui/core/styles';
import {styles} from './AuthGuardStyles';

import CircularProgress from '@material-ui/core/CircularProgress';

class AuthGuardComponent extends Component {
    componentDidMount() {
        this.props.fetchCurrentUser();
    }

    render() {
        const {currentUser, classes} = this.props;

        if (!currentUser) {
            return (<CircularProgress  className={classes.progress}/>);
        }

        return this.props.children;
    }
}

AuthGuardComponent.propTypes = {
    children: PropTypes.element,
    currentUser: PropTypes.object,
    fetchCurrentUser: PropTypes.func
};

export default withStyles(styles)(AuthGuardComponent);
