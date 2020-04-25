import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import VerificationDialog from './VerificationDialog';
import { withStyles } from '@material-ui/core/styles';
import styles from './DialogStyles';

class DialogButton extends React.Component {
    state = {
        open: false
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        const {classes} = this.props;
        return (
            <div>
                <Button className={classes.dialogOpenBtn} onClick={this.handleClickOpen}>
                    {(this.props.openBtnIcon) && <img src={this.props.openBtnIcon} className={classes.dialogOpenBtnIcon} alt="Open"/>}
                    {this.props.openBtnText}
                </Button>

                <VerificationDialog
                    open = {this.state.open}
                    handleClose = {this.handleClose}
                    cancelBtnText={this.props.cancelBtnText}
                    okBtnFunction={this.props.okBtnFunction}
                    okBtnText={this.props.okBtnText}
                    text={this.props.text} />
            </div>
        );
    }
}

DialogButton.propTypes = {
    openBtnText: PropTypes.string,
    openBtnIcon: PropTypes.string,
    title: PropTypes.string,
    text: PropTypes.string,
    okBtnText:  PropTypes.string,
    okBtnFunction: PropTypes.func,
    cancelBtnText:  PropTypes.string,
    cancelBtnFunction: PropTypes.func
};
export default  withStyles(styles)(DialogButton);
