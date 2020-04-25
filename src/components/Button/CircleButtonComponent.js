/**
 * Created by HBRlabs6 on 8/12/2019.
 */
import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    circleButton: {
        height: 35,
        width: 36,
        minWidth: 36,
        border: '1px solid #CACACA',
        borderRadius: 23.5,
        backgroundColor: '#FFFFFF',
        marginRight: 15
    },
    circleButtonIcon: {
        height: 19.11,
        width: 15.82
    }
});

class CircleButtonComponent extends Component {
    render(){
        const { alt, icon, onClick, classes} = this.props;

        return (
            <Button className={classes.circleButton} onClick={onClick}>
                <img src={icon} className={classes.circleButtonIcon} alt={alt}/>
            </Button>
        );
    };
}

export default withStyles(styles)(CircleButtonComponent);