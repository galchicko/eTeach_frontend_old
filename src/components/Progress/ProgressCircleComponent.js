import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = {
    root: {
        flexGrow: 1,
        marginTop: '20px'
    }
};

function CircleIndeterminate(props) {
    const { classes, isShown } = props;
    return (
        <div className={classes.root}>
            {isShown &&  <CircularProgress />}
        </div>
    );
}

CircleIndeterminate.propTypes = {
    classes: PropTypes.object.isRequired,
    isShown: PropTypes.bool
};

export default withStyles(styles)(CircleIndeterminate);