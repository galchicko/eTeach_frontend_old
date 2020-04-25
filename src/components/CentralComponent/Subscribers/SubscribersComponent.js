import React, {Component} from 'react';
import PropTypes from 'prop-types';

import CentralAxis from '../CentralAxis/CentralAxisComponent';
import CentralDeviceList from '../CentralDeviceList/CentralDeviceListComponent';
import EventFilters from '../EventFilters';

class SubscribersComponent extends Component {
    render() {
        return (
            <div className="SubscribersComponent">
                <CentralAxis dateRange={this.props.dateRange}/>
                <EventFilters
                    applyEventFilters={(dateRange) => this.props.fetchDevicesTimeline(this.props.devicesList, dateRange)}/>
                <CentralDeviceList
                    devicesList={this.props.devicesList}
                    dateRange={this.props.dateRange}
                    selectedDevice={this.props.selectedDevice}
                    deviceEventsTimeline={this.props.deviceEventsTimeline}/>
            </div>
        );
    }
}

SubscribersComponent.propTypes = {
    dateRange: PropTypes.object,
    fetchDevicesTimeline: PropTypes.func,
    devicesList: PropTypes.array,
    deviceEventsTimeline: PropTypes.object,
    selectedDevice: PropTypes.object
};

export default SubscribersComponent;