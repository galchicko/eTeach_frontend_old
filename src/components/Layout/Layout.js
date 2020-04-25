import React from 'react';
import PropTypes from 'prop-types';
import Navigation from '../Navigation';
import {withNamespaces} from 'react-i18next';
import {Route, Switch} from 'react-router-dom';
import {withStyles} from '@material-ui/core/styles';
import Main from '../Main';
import {styles} from './styles/LayoutStyles';
import LayoutBase from './LayoutBase';



class Layout extends LayoutBase {

    changeUrlParamRegionSilent = () => {
        this.props.history.push(`/overview/all`);
    };

    render() {
        const {t , classes} = this.props;

        return (
            <div className="Layout">
                <Navigation />
                <Switch>
                    <Route path="/overview/:entityType/:entityId?" component={Main}/>
                </Switch>
            </div>
        );
    }
}

Layout.propTypes = {
    classes: PropTypes.object,
    match: PropTypes.object,
    history: PropTypes.object
};

export default withNamespaces('translation')(withStyles(styles)(Layout));
