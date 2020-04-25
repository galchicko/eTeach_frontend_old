import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {withNamespaces} from 'react-i18next';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import Icon from '@material-ui/core/Icon';
import Avatar from '@material-ui/core/Avatar/Avatar';
import Divider from '@material-ui/core/Divider';
import {Link} from 'react-router-dom';
import avatarImg from '../../assets/avatar.svg';
import {isAdmin} from '../../consts/userRoles';

const styles = theme => ({
    userMenuBtn: {
        color: theme.palette.common.white,
        textTransform: 'unset',
        fontWeight: 'inherit',
        '&:hover': {
            backgroundColor: 'inherit'
        },
        padding: 0,
        minWidth: 0
    },
    userMenuBtnIcon: {
        fontSize: 20,
        marginLeft: 5
    },
    userMenuContainer: {
        boxShadow: '0 1px 4px 0 rgba(0,0,0,0.36)',
        overflow: 'unset',
        marginTop: 40,
        borderRadius: 1,
        '& ul': {
            padding: 0
        },
        width: 205,
        '&::before': {
            content: '""',
            position: 'absolute',
            top: -5,
            marginLeft: 182,
            borderLeft: '5px solid transparent',
            borderRight: '5px solid transparent',
            borderBottom: '5px solid white'
        }
    },
    userSection: {
        outline: 'none',
        padding: '15px 10px 15px 15px',
        display: 'flex',
        textDecoration: 'none',
        color: theme.palette.common.black,
        alignItems: 'center'
    },
    avatar: {
        outline: 'none',
        width: 33,
        height: 33,
        border: '1px solid #267FFA'
    },
    userInfoText: {
        fontSize: 13,
        marginLeft: 10,
        flexGrow: 2
    },
    userRoleText: {
        display: 'block',
        color: '#626262',
        fontSize: 11,
        marginTop: 5
    },
    userInfoIcon: {
        fontSize: 16,
        alignSelf: 'flex-start'
    },
    menuLink: {
        outline: 'none',
        padding: '12px 15px',
        textDecoration: 'none',
        color: theme.palette.common.black,
        fontSize: 13,
        display: 'block',
        '&:hover': {
            backgroundColor: '#EEEEEE'
        }
    }
});

class UserMenuComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
            fakeAvatarUrl: avatarImg
        };
    }

    handleClick = event => {
        this.setState({anchorEl: event.currentTarget});
    };

    handleClose = () => {
        this.setState({anchorEl: null});
    };

    handleLogOut = () => {
        this.handleClose();
        this.props.logoutUser();
    };

    render() {
        const {classes, t, user} = this.props;
        const {anchorEl, fakeAvatarUrl} = this.state;
        const avatarUrl = user.avatarUrl || fakeAvatarUrl;
        const isAdministrator = isAdmin(user.role);
        return (
            <div>
                <Button aria-owns={anchorEl ? 'user-menu' : undefined}
                    aria-haspopup="true"
                    disableRipple={true}
                    classes={{root: classes.userMenuBtn}}
                    onClick={this.handleClick}>
                    {t('navigation.hi')} {user.name}
                    <Icon className={classes.userMenuBtnIcon}>keyboard_arrow_down</Icon>
                </Button>
                <Menu id="user-menu"
                    classes={{paper: classes.userMenuContainer}}
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}>
                    <Link onClick={this.handleClose} to="#"
                        className={classes.userSection}>
                        <Avatar alt={user.name}
                            src={avatarUrl}
                            className={classes.avatar}/>
                        <div className={classes.userInfoText}>
                            <span>{user.name}</span>
                            <span className={classes.userRoleText}>{user.role}</span>
                        </div>
                        <Icon className={classes.userInfoIcon}>keyboard_arrow_right</Icon>
                    </Link>

                    {isAdministrator && (
                        <Divider/>
                    )}
                    {isAdministrator && (
                        <Link onClick={this.handleClose} to="/admin/devices"
                            className={classes.menuLink}>{t('navigation.manageTowers')}</Link>
                    )}
                    {isAdministrator && (
                        <Link onClick={this.handleClose} to="/admin/users"
                            className={classes.menuLink}>{t('navigation.manageUsers')}</Link>
                    )}

                    <Divider/>
                    <Link onClick={this.handleClose} to="/admin/about"
                        className={classes.menuLink}>{t('navigation.about')}</Link>
                    <Divider/>
                    <Link onClick={this.handleLogOut} to=""
                        className={classes.menuLink}>{t('navigation.logOut')}</Link>
                </Menu>
            </div>
        );
    }
}

UserMenuComponent.propTypes = {
    user: PropTypes.object,
    logoutUser: PropTypes.func
};

export default withStyles(styles)(withNamespaces('translation')(UserMenuComponent));