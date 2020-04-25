import React, {Component} from 'react';

import {EntityTypes} from '../../../consts/entityTypes';
import schoolIcon from '../../../assets/school.png';
import workClassIcon from '../../../assets/workclass.png';
import studentIcon from '../../../assets/student.png';
import { getDefaultTabForEntityType } from '../../CentralComponent/consts';
import {isSchool} from '../../../consts/entityTypes';

export default class Entity extends Component {

    onToggleClick = (event) => {
        this.props.toggleClick(this.props.entityData);
        event.stopPropagation();
    };

    onTitleClick = () => {
        this.props.selectEntity(this.props.entityData);
        this.props.setActiveTab(getDefaultTabForEntityType(this.props.entityData.type));
        if(this.props.isAllEntitiesElement){
            this.props.collapseAll();
        }
    };

    getIconSrc (type) {
        switch (type) {
            case EntityTypes.ALL:
            case EntityTypes.SCHOOL:
                return schoolIcon;
            case EntityTypes.WORKCLASS:
                return workClassIcon;
            case EntityTypes.STUDENT:
                // icon for mobile will be added later
                return studentIcon;
            default: return null;
        }
    }
    render(){
        const {name, isConnected, children, entityData,type} = this.props;

        const isCollapsed = entityData.isCollapsed;
        const isCollapsible = children == null ? false : children.length > 0;

        const panelBodyClass = `panel-body-${ isCollapsed ? 'collapsed' :'expended'}`;
        const collapsibleToggleIconClass =`collapse-arrow arrow-${ isCollapsed ? 'down' :'up'}`;
        const toggleIconClass = `${ isCollapsible ? '' :'not-'}collapsible ${collapsibleToggleIconClass}`;

        const entityIcon = this.getIconSrc(entityData.type);
        const titleClass = `${this.props.titleClass}`;
        const isAllSchools = entityData.name === 'All Schools';
        const isSchoolEntity = isSchool(type);

        return (
            <div className={this.props.containerClass}>
                <div className={titleClass} onClick={this.onTitleClick}>
                    <div className="status">
                        {!isAllSchools && !isSchoolEntity &&<img className="status-icon" src={entityIcon} alt="entity icon" />}
                    </div>
                    {name}
                    <div className="arrow-container">
                        <span className={toggleIconClass} onClick={this.onToggleClick}>></span>
                    </div>

                </div>
                <div className="panel-collapse">
                    <div className={panelBodyClass}>
                        {children}
                    </div>
                </div>
            </div>
        );
    }
}
