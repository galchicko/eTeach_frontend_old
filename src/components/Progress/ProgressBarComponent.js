import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const styles = {
    root: {
        flexGrow: 1
    }
};

function LinearIndeterminate(props) {
    const { classes, isShown } = props;
    return (
        <div className={classes.root}>
            {isShown &&  <LinearProgress />}
        </div>
    );
}

LinearIndeterminate.propTypes = {
    classes: PropTypes.object.isRequired,
    isShown: PropTypes.bool
};

export default withStyles(styles)(LinearIndeterminate);