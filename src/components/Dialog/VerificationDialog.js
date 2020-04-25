import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import styles from './DialogStyles';

class VerificationDialog extends React.Component {
    handleOk = () => {
        this.props.handleClose();
        if (this.props.okBtnFunction) {
            this.props.okBtnFunction();
        }
    };
    handleCancel = () => {
        this.props.handleClose();
        if (this.props.cancelBtnFunction) {
            this.props.cancelBtnFunction();
        }

    };

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Dialog
                    open={this.props.open}
                    onClose={this.props.handleClose}
                    aria-labelledby="alert-dialog-title">
                    {(this.props.title) && <DialogTitle id="alert-dialog-title">{this.props.title}</DialogTitle>}
                    <div className={classes.dialogBox}>
                        <IconButton aria-label="Close" className={classes.dialogCloseButton}
                                    onClick={this.handleCancel}>
                            <CloseIcon/>
                        </IconButton>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description" className={classes.text}>
                                {this.props.text}
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions className={classes.actions}>
                            {this.props.cancelBtnText && (
                                <Button onClick={this.handleCancel} className={classes.dialogCancelBtn}>
                                    {this.props.cancelBtnText}
                                </Button>)}
                            {this.props.okBtnText && (
                                <Button onClick={this.handleOk} className={classes.dialogOkBtn} autoFocus>
                                    {this.props.okBtnText}
                                </Button>)}

                        </DialogActions>
                    </div>
                </Dialog>
            </div>
        );
    }
}

VerificationDialog.propTypes = {
    title: PropTypes.string,
    text: PropTypes.string,
    okBtnText: PropTypes.string,
    okBtnFunction: PropTypes.func,
    cancelBtnText: PropTypes.string,
    cancelBtnFunction: PropTypes.func,
    handleClose: PropTypes.func,
    open: PropTypes.bool
};
export default withStyles(styles)(VerificationDialog);
