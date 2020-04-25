import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import Navigation from '../Navigation';
import {withNamespaces} from 'react-i18next';
import {Route, Switch} from 'react-router-dom';
import {withStyles} from '@material-ui/core/styles';
import {styles} from './styles/LayoutStyles';
import LayoutBase from './LayoutBase';
import Material from '../Material';

class MaterialLayout extends LayoutBase {

    render() {
        const {t, classes} = this.props;

        return (
            <div className="Layout">
                <Navigation />
                <Switch>
                    <Route path="/material" component={Material}/>
                </Switch>
            </div>
        );
    }
}

MaterialLayout.propTypes = {
    classes: PropTypes.object,
    match: PropTypes.object,
    history: PropTypes.object
};

export default withNamespaces('translation')(withStyles(styles)(MaterialLayout));
