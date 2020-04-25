import React, {Component} from 'react';
import PropTypes from 'prop-types';
import CentralTabs from './CentralTabs/CentralTabsComponent';
import Breadcrumb from '../Breadcrumb';
import EventsTable from '../Events';
import AssignmentsTable from '../AssignmentList';
import LessonsTable from '../Lessons';
import {Progress} from '../Progress';
import {CENTRAL_TABS,getTabsForEntityType,getDefaultTabForEntityType} from './consts';

import EntityInfoTab from '../EntityInfo/containers/EntityInfoTab/EntityInfoTabContainer';

import './CentralComponent.scss';

class CentralComponent extends Component {

    componentDidMount() {
        if (this.props.selectedEntity) {
            this.props.setActiveTab(getDefaultTabForEntityType(this.props.selectedEntity.type));
            this.props.setTabs(getTabsForEntityType(this.props.selectedEntity.id, this.props.selectedEntity.type));
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.selectedEntity && (nextProps.selectedEntity !== this.props.selectedEntity)) {
            this.props.setTabs(getTabsForEntityType(nextProps.selectedEntity.id,nextProps.selectedEntity.type));
        }
    }

    renderListView = () => {
        const {
            selectedEntity,
            tabs,
            activeTab,
            setActiveTab,
            inProgress
        } = this.props;

        //const devicesList = selectedDevice.devices;
        
        return  (
            <div className="CentralComponent--ListView">
                
                <CentralTabs
                    tabs={tabs}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    selectedEntity={selectedEntity}/>


                <div className="TabContentContainer">
                    <Progress isShown={inProgress}/>



                    {(activeTab.value === CENTRAL_TABS.LESSONS.value) && (
                        <LessonsTable />
                    )
                    }
                    {(activeTab.value === CENTRAL_TABS.EVENTS.value) && (
                        <EventsTable />
                    )
                    }
                    {(activeTab.value === CENTRAL_TABS.ASSIGNMENTS.value) && (
                        <AssignmentsTable />
                    )
                    }
                    {(activeTab.value === CENTRAL_TABS.INFORMATION.value) && (
                        <EntityInfoTab />
                    )
                    }
                </div>
            </div>
        );
    }

    render() {
        const {
            selectedEntity
        } = this.props;

        return (
            <div className="CentralComponent">
                <div className="CentralComponentHeader">
                    <Breadcrumb selectedEntity={selectedEntity}/>
                </div>
                {this.renderListView()}
            </div>
        );
    }
}

CentralComponent.propTypes = {
    tabs: PropTypes.array,
    activeTab: PropTypes.object,
    setActiveTab: PropTypes.func,
    selectedEntity: PropTypes.object,
    inProgress: PropTypes.bool
};

export default CentralComponent;
