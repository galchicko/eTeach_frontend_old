import React, {Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { withNamespaces } from 'react-i18next';
import Button from '@material-ui/core/Button';
import {Dialog, DialogActions, DialogContent, DialogContentText,DialogTitle} from '@material-ui/core';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    dialogWrapper: {
        margin: 10
    }

});


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

class FullScreenDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false
        }
    }

    handleClickOpen = () => {
        this.setState({open: true})
    }

    handleClose = () => {
        this.props.onCancel();
        this.setState({open: false});
    }

    handleSave = () => {
        this.props.onSave();
        this.setState({open: false});
    }
    render() {
        const { t, classes, btnLabel, wTitle, children  } = this.props;

        return (
            <div>
                <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
                    {btnLabel}
                </Button>
                <Dialog fullScreen={true} class={classes.dialogWrapper} open={this.state.open} onClose={this.handleClose} TransitionComponent={Transition} disableBackdropClick={true} >
                    <AppBar className={classes.appBar}>
                        <Toolbar>
                            <IconButton edge="start" color="inherit" onClick={this.handleClose} aria-label="close">
                                <CloseIcon />
                            </IconButton>
                            <Typography variant="h6" className={classes.title}>
                                {wTitle}
                            </Typography>
                            <Button autoFocus color="inherit" onClick={this.handleSave}>
                                {t('buttons.save')}
                            </Button>
                        </Toolbar>
                    </AppBar>
                    <DialogContent>
                        {children}
                    </DialogContent>
                </Dialog>
            </div>
        );
    }
}

export default withNamespaces('translation')(withStyles(styles)(FullScreenDialog));
