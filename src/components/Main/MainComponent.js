import React, {Component} from 'react';
import cn from 'classnames';
import EntityList from '../EntityList/containers/entityListContainer';
import EntityInfo from '../EntityInfo/containers/entityInfoContainer';
import CircularProgress from '@material-ui/core/CircularProgress';
import CentralComponent from '../CentralComponent';
import {withStyles} from '@material-ui/core/styles';
import './MainComponent.scss';
import { withNamespaces } from 'react-i18next';
import {isTeacher} from '../../consts/entityTypes';

const styles = theme => ({
    center: {
        margin: theme.spacing.unit * 2
    }
});

class MainComponent extends Component {

    componentDidMount() {
        const {entityType, entityId} = this.props.match.params;
        this.defineSelectedEntity(entityType, entityId);
        if(isTeacher(this.props.user.type)) {
            this.props.fetchEntityListAndDefineSelected(this.props.user.id, entityType, entityId);
        }
    }

    componentWillReceiveProps(nextProps) {
        const {entityType, entityId} = nextProps.match.params;

        // A new device was selected
        if (nextProps.location.pathname !== this.props.location.pathname) {
            this.defineSelectedEntity(entityType, entityId);
        }
    }

    defineSelectedEntity = (entityType, entityId) => {
        console.log(entityType,entityId);
        /*
        if (entityType && entityId) {
            return this.props.fetchDeviceInfo(deviceId, deviceType);
        }
        // All towers
        this.props.fetchDeviceInfo();
        */
    };

    render() {
        const { t , pannelCollapsed, schools, classes, entityListLoading } = this.props;

        if (!schools || entityListLoading) {
            return (<CircularProgress className={classes.center}/>);
        }

        if (!schools.length) {
            return (<h3 className={classes.center}>{t('app.noDevices')}</h3>);
        }

        return (
            <div className={cn('Main', {'infoCollapsed': pannelCollapsed})}>
                <div className="DeviceList">
                    <EntityList />
                </div>
                <div className="Central" id="js-central">
                    <CentralComponent/>
                </div>
                <div className="DeviceInfo">
                    <EntityInfo/>
                </div>
            </div>
        );
    }
}

export default withNamespaces('translation')(withStyles(styles)(MainComponent));
