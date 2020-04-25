import React, {Component} from 'react';
import './User.scss';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid/Grid';
import Avatar from '@material-ui/core/Avatar/Avatar';
import {withStyles} from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox/Checkbox';
import Button from '@material-ui/core/Button/Button';
import TextField from '@material-ui/core/TextField/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel/FormControlLabel';
import {ProgressCircle} from '../../Progress';
import {resultType} from '../actions/actionTypes';
import {getUserRolesTypes} from '../../../consts/userRoles';
import avatarImg from '../../../assets/avatar.svg';
import { withNamespaces } from 'react-i18next';
import {UserRoles} from '../../../consts/userRoles';
import { Dialog, DialogTitle, DialogActions } from '@material-ui/core';

const styles = theme => ({
    checkbox: {
        color: '#F5F5F5',
        '&$checked': {
            color: 'rgba(38,127,250,0.68)'
        }
    },
    apply: {
        height: '24px',
        borderRadius: '17.5px',
        color: '#FFFFFF',
        backgroundColor: '#267FFA',
        marginLeft: theme.spacing.unit
    },
    cancel: {
        height: '24px',
        borderRadius: '17.5px',
        backgroundColor: '#E0E0E0',
        color: '#000000'
    },

    fab: {
        width: '114px',
        padding: '0 16px',
        fontSize: '11px'
    },
    checked: {},
    paper: {
        width: '500px',
        margin: '0 auto',
        padding: '40px'
    },
    bigAvatar: {
        width: 60,
        height: 60
    },
    grid: {
        textAlign: 'left'
    },
    gridRight: {
        textAlign: 'right'
    }
});

class User extends Component {

    constructor(props) {
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            role: UserRoles.ADMIN,
            email: '',
            regions: [],
            password: '',
            username: ''
        };
    }

    componentDidMount() {
        const {id} = this.props.match.params;
        id ? this.props.fetchUser(id): this.props.handleMode();
        this.props.fetchRegions();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.user && nextProps.user !== this.props.user) {
            const user = nextProps.user;
            const username = user.name.split(' ');
            const lastName = username[username.length - 1];
            const firstName = username.splice(0, username.length - 1).join(' ');

            this.setState({
                firstName: firstName,
                lastName: lastName,
                role: user.role,
                email: user.email,
                regions: user.regions,
                username: user.username,
                isConfirmDialogOpen: false
            });
        }
        if (nextProps.result
            && nextProps.result !== this.props.result
            && nextProps.result === resultType.success) {
            this.props.handleResetData();
            const {history} = this.props;
            history.push('/admin/users');
        }
    }

    componentWillUnmount() {
        this.props.handleResetData();
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value
        });
    };


    handleRegionChange = region => event => {
        let {regions} = this.state;

        regions = event.target.checked
            ? regions.concat(region)
            : regions.filter(i => i.id !== region.id);
        this.setState({
            regions: regions
        });
    };

    handleApply = () => {
        if (!this.state.regions.length) {
            this.setState({isConfirmDialogOpen: true});
        } else {
            this.confirmApply();
        }
    };

    handleModalCancelClick=()=>{
        this.setState({isConfirmDialogOpen: false});
    };

    handleModalYesClick=()=>{
        this.confirmApply();
        this.setState({isConfirmDialogOpen: false});
    };

    confirmApply = () => {
        this.props.saveUserMetadata({
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            role: this.state.role,
            email: this.state.email,
            regions: this.state.regions,
            password: this.state.password,
            username: this.state.username
        });
        this.props.isNew ? this.props.handleCreate() : this.props.handleUpdate();
    }

    close = () => {
        this.props.handleCancel();
    };

    renderApplyWithoutRegionsDialog=()=>{
        const { t } = this.props;
        return (
            <Dialog
                open={this.state.isConfirmDialogOpen}
                onClose={this.handleModalCancelClick}>
                <DialogTitle id="alert-dialog-title">{t('users.noRegionsWarning')}</DialogTitle>
                <DialogActions>
                    <Button onClick={this.handleModalCancelClick} color="primary">
                        {t('users.noRegionsCancel')}
                    </Button>
                    <Button onClick={this.handleModalYesClick} color="primary" autoFocus>
                        {t('users.noRegionsYes')}
                    </Button>
                </DialogActions>
            </Dialog>
        );
    };

    render() {
        const {t} = this.props;
        if ((!this.props.user && !this.props.isNew) || this.props.isLoading) {
            return (<ProgressCircle isShown={true}/>);
        }

        return (
            <div className="User-edit">
                {this.renderApplyWithoutRegionsDialog()}
                <div className="User-edit_title">{t('users.edit.editUsers')}</div>
                <Paper className={this.props.classes.paper}>
                    <Grid container spacing={24}>
                        <Grid item xs={12} className={this.props.classes.grid}>
                            <Avatar alt="Remy Sharp"
                                src={avatarImg}
                                className={this.props.classes.bigAvatar}/>
                        </Grid>
                        <Grid item xs={4} className={this.props.classes.grid}>
                            {t('users.edit.username')}
                        </Grid>
                        <Grid item xs={8} className={this.props.classes.grid}>
                            <TextField
                                value={this.state.username}
                                name="login"
                                fullWidth
                                margin="none"
                                onChange={this.handleChange('username')}/>
                        </Grid>
                        <Grid item xs={4} className={this.props.classes.grid}>
                            {t('users.edit.email')}
                        </Grid>
                        <Grid item xs={8} className={this.props.classes.grid}>
                            <TextField
                                value={this.state.email}
                                name="email"
                                fullWidth
                                margin="none"
                                onChange={this.handleChange('email')}/>
                        </Grid>
                        <Grid item xs={4} className={this.props.classes.grid}>
                            {t('users.edit.firstName')}
                        </Grid>
                        <Grid item xs={8} className={this.props.classes.grid}>
                            <TextField
                                value={this.state.firstName}
                                name="firstname"
                                fullWidth
                                margin="none"
                                onChange={this.handleChange('firstName')}/>
                        </Grid>
                        <Grid item xs={4} className={this.props.classes.grid}>
                            {t('users.edit.lastName')}
                        </Grid>
                        <Grid item xs={8} className={this.props.classes.grid}>
                            <TextField
                                fullWidth
                                name="lastname"
                                margin="none"
                                value={this.state.lastName}
                                onChange={this.handleChange('lastName')}/>
                        </Grid>
                        <Grid item xs={4} className={this.props.classes.grid}>
                            {t('users.edit.password')}
                        </Grid>
                        <Grid item xs={8} className={this.props.classes.grid}>
                            <TextField
                                type="password"
                                name="password"
                                inputProps={{autoComplete: 'new-password'}}
                                fullWidth
                                margin="none"
                                autoComplete="current-password"
                                onChange={this.handleChange('password')}/>
                        </Grid>
                        <Grid item xs={4} className={this.props.classes.grid}>
                            {t('users.edit.role')}
                        </Grid>
                        <Grid item xs={8} className={this.props.classes.grid}>
                            <TextField
                                select
                                fullWidth
                                value={this.state.role}
                                onChange={this.handleChange('role')}
                                SelectProps={{
                                    native: true
                                }}
                                margin="none">
                                {getUserRolesTypes().map(option => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} className={this.props.classes.grid}>
                            <div>
                                <div>
                                    {t('users.edit.accessToRegions')}
                                </div>
                                <div>
                                    {this.props.regions.map(region => (
                                        <FormControlLabel
                                            key={region.id}
                                            control={
                                                <Checkbox
                                                    onChange={this.handleRegionChange(region)}
                                                    checked={this.state.regions.some(i => i.id === region.id)}
                                                    value={region.name}
                                                    classes={{
                                                        root: this.props.classes.checkbox,
                                                        checked: this.props.classes.checked
                                                    }}/>
                                            }
                                            label={region.name}/>
                                    ))}
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={12} className={this.props.classes.gridRight}>
                            <Button className={[this.props.classes.fab, this.props.classes.cancel].join(' ')}
                                onClick={() => this.close()}> {t('users.edit.cancel')}</Button>
                            <Button className={[this.props.classes.fab, this.props.classes.apply].join(' ')}
                                onClick={() => this.handleApply()}>{t('users.edit.save')}</Button>
                        </Grid>
                    </Grid>
                </Paper>
            </div>
        );
    }
}

export default withStyles(styles)(withNamespaces('translation')(User));
