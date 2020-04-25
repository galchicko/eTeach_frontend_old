import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import {withStyles} from '@material-ui/core/styles';

import {withNamespaces} from 'react-i18next';
import logo from '../../assets/logo.png';
import UserMenu from '../UserMenu';
import {withRouter} from 'react-router';
import {Link} from 'react-router-dom';

import cn from 'classnames';

const styles = theme => ({
    root: {
        width: '100%',
        '& header': {
            boxShadow: 'none'
        }
    },
    toolBar: {
        backgroundColor: '#333E8B'
    },
    grow: {
        flexGrow: 1
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block'
        },
        marginRight: '13px'
    },
    formControl: {
        width: 162,
        position: 'relative',
        color: theme.palette.common.white,
        marginTop: 5
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex'
        }
    },
    navBlock: {
        margin: '0 10px',
        padding: '0 10px',
        borderLeft: '1px solid #1A2362',
        borderRight: '1px solid #1A2362'
    },
    selectRegionLabel: {
        fontSize: 16,
        color: theme.palette.common.white,
        marginLeft: 10,
        // need this because of a library issue https://github.com/mui-org/material-ui/issues/11244
        '&$selectRegionLabelFocused': { color: theme.palette.common.white }
    },
    selectRegionLabelFocused: {
        color: theme.palette.common.white
    },
    selectRegion: {
        textAlign: 'left',
        marginLeft: 10,
        fontSize: 15,
        color: theme.palette.common.white
    },
    selectRegionIcon: {
        fontSize: 27,
        marginTop: -12,
        color: theme.palette.common.white
    },
    selectRegionMenu: {
        fontSize: 14
    },
    navContent: {
        paddingLeft: 30,
        paddingRight: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 14
    },
    notificationBtnContainer: {
        marginRight: -8
    },
    navLinks: {
        display: 'flex'
    },
    navLink: {
        display: 'inline-block',
        padding: '20px 30px',
        fontSize: 15,
        color: 'white',
        textDecoration: 'none'
    },
    navLinkActive: {
        borderBottom: 'solid 6px #267FFA'
    }
});

class PrimarySearchAppBar extends React.Component {

    handleChangeRegion = event => {
        const newCurrentRegion = this.props.regions.find((region) => region.id.toString() === event.target.value.toString());
        this.props.setCurrentRegion(newCurrentRegion);
    };

    isOverview = () => {
        return Boolean(this.props.match.params.deviceType);
    }

    isDashboard = () => {
        return this.props.match.url.indexOf('dashboard') !== -1;
    }

    isMaterial = () => {
        return this.props.match.url.indexOf('material') !== -1;
    }

    renderNavLinks() {
        const {classes, t} = this.props;

            return (
                <div className={classes.navLinks}>
                    <Link to={`/dashboard`}
                        className={cn(classes.navLink, {[classes.navLinkActive]: this.isDashboard()})}>
                        {t('navigation.dashboard')}
                    </Link>
                    <Link to={`/overview`}
                        className={cn(classes.navLink, {[classes.navLinkActive]: this.isOverview()})}>
                        {t('navigation.overview')}
                    </Link>
                    <Link to={`/material`}
                        className={cn(classes.navLink, {[classes.navLinkActive]: this.isMaterial()})}>
                        {t('navigation.material')}
                    </Link>
                </div>
            );
    }

    render() {
        const {classes, t} = this.props;

        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar className={classes.toolBar}>
                        <Link to="/"><img className={classes.title} src={logo} alt="LMS"/></Link>

                        {this.renderNavLinks()}
                        <div className={classes.grow}/>


                        <div className={classes.navContent}>
                            <UserMenu />
                        </div>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

PrimarySearchAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
    regions: PropTypes.array,
    currentRegion: PropTypes.object,
    setCurrentRegion: PropTypes.func
};

export default  withRouter(withStyles(styles)(withNamespaces('translation')(PrimarySearchAppBar)));
// How to use localize
// https://github.com/i18next/react-i18next/blob/master/example/react/src/App.js