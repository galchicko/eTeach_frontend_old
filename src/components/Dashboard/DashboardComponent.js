import React, {Component} from 'react';
import Navigation from '../Navigation';
import {withStyles} from '@material-ui/core/styles';
import './DashboardComponent.scss';
import EntityList from '../EntityList/containers/entityListContainer';
import { withNamespaces } from 'react-i18next';
import {isTeacher} from '../../consts/entityTypes';


const styles = theme => ({
    center: {
        margin: theme.spacing.unit * 2
    }
});

class DashboardComponent extends Component {
    componentDidMount() {
        if(isTeacher(this.props.user.type)){
            this.props.fetchEntityListAndDefineSelected(this.props.user.id);
        }
    }

    render() {
        return (
            <div className="Dashboard">
                <Navigation />
            <br />
                <a href="https://meet.gigaclass.com" target="_blank"> Meet Now </a>

                <div className="DeviceList">
                    <EntityList />
                </div>
            </div>
        );
    }
}

export default withNamespaces('translation')(withStyles(styles)(DashboardComponent));
