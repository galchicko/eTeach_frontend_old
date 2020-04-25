import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Entity from './entityContainer';
import { EntityTypes, isSchool, isWorkClass } from '../../../consts/entityTypes';
import {isEntitySelected, getTitleClassForType, getContainerClassForType, getAllSchoolsData} from '../helpers';
//import DeviceSearchComponent from '../../DeviceSearch/DeviceSearchComponent';
import '../styles/deviceList.scss';
import { getDefaultTabForEntityType } from '../../CentralComponent/consts';
//import { subscribe, unsubscribe, WEB_SOCKET_CODES } from '../../WebSocketService';

export default class EntityList extends Component {
    componentDidMount() {
       // this.wsSubcribtionIdChangeDevice = subscribe(WEB_SOCKET_CODES.ON_DEVICE_INFO_CHANGE, this.props.onDeviceInfoChangedImmediately);
       // this.wsSubcribtionIdAddDevice = subscribe(WEB_SOCKET_CODES.ON_ADD_DEVICE, this.props.onDeviceAdd);
        //this.wsSubcribtionIdAddRemove = subscribe(WEB_SOCKET_CODES.ON_REMOVE_DEVICE, this.onDeviceRemove);
    }

    onEntityRemove = (payload) => {
        if (payload && this.props.selectedEntity) {
            if (payload.id === this.props.selectedEntity.id && payload.type === this.props.selectedEntity.type) {
                window.location.reload();
            }
        }
        this.props.onEntityRemove(payload);
    };

    componentWillUnmount() {
      //  unsubscribe(this.wsSubcribtionIdChangeDevice);
       // unsubscribe(this.wsSubcribtionIdAddDevice);
        //unsubscribe(this.wsSubcribtionIdAddRemove);
    }

    onSearchSelect = (device) => {
  //      this.props.expandAndSelectDevice(device);
    //    this.props.setActiveTab(getDefaultTabForDeviceType(device.type));
    };

    renderEntity = (currentEntity) => {
        const isSelected = isEntitySelected(this.props.selectedEntity, currentEntity);
        const selectedClass = ` ${isSelected ? 'selected' : ''}`;
        const titleClass = getTitleClassForType(currentEntity.type) + selectedClass;
        const containerClass = getContainerClassForType(currentEntity.type);
        return (
            <Entity
                key={currentEntity.id}
                name={currentEntity.name}
                type={currentEntity.type}
                isConnected={currentEntity.isConnected}
                containerClass={containerClass}
                isSelected={isSelected}
                titleClass={titleClass}
                entityData={currentEntity}
                isAllSchoolsElement={false}>


                {(isSchool(currentEntity.type) && currentEntity.workclasses) ? (currentEntity.workclasses.map(this.renderEntity)) :
                    (isWorkClass(currentEntity.type) && currentEntity.students) ? (currentEntity.students.map(this.renderEntity)) : ''
                }


            </Entity>
        );
    };

    renderAllSchools = () => {
        const data = getAllSchoolsData(this.props.schools);
        const isSelected = this.props.selectedEntity &&
            this.props.selectedEntity.id === data.id;
        const titleClass = `tower-title  ${isSelected ? 'selected' : ''}`;

        return (
            <Entity
                key={data.id}
                name={data.name}
                type={EntityTypes.SCHOOL}
                isConnected={data.isConnected}
                containerClass="tower-container"
                isSelected={isSelected}
                titleClass={titleClass}
                entityData={data}
                isAllSchoolsElement={true}>
            </Entity>
        );
    };

    render() {
        const { schools } = this.props;

        return (
            <div>
                <div>
                    {this.renderAllSchools()}
                </div>
                <div className="line-6"/>
                <div>
                    {schools ? schools.map(this.renderEntity) : 'no schools'}
                </div>
            </div>
        );
    }
}


EntityList.propTypes = {
    schools: PropTypes.array,
    searchList: PropTypes.array,
    entityInfo: PropTypes.object,
    match: PropTypes.object,
    history: PropTypes.object,
    selectedEntity: PropTypes.object,
    onEntityInfoChangedImmediately: PropTypes.func,
    onEntityAdd: PropTypes.func,
    onEntityRemove: PropTypes.func
};
