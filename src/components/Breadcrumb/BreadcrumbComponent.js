import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { getAllParentEntitiesByPath } from '../EntityList/helpers';
import './BreadcrumbComponent.scss';
import { getDefaultTabForEntityType } from '../CentralComponent/consts';

class BreadcrumbComponent extends Component {

    onBreadcrumbClick = (entity) => {
        this.props.selectEntity(entity);
        this.props.setActiveTab(getDefaultTabForEntityType(entity.type));
    };

    renderLinks () {
        const {selectedEntity, entityList} = this.props;
        if (!selectedEntity || !entityList || !selectedEntity.pathName) {
            return null;
        }

        const parrentNames = selectedEntity.pathName.split('/');
        const parrentDevices = getAllParentEntitiesByPath(entityList, selectedEntity.path);

        if (!parrentDevices.length) {
            // All Towers case
            return (<a className="BreadcrumbComponent__link">{parrentNames[0]}</a>);
        }
        
        return parrentDevices.map(entity => {
            return (
                <a key={entity.id+entity.type}
                    className="BreadcrumbComponent__link" 
                    onClick={() => this.onBreadcrumbClick(entity)}>
                    {entity.name}
                </a>
            );
        });
    }

    render() {
        return (
            <div className='BreadcrumbComponent'>
                {this.renderLinks()}
            </div>
        );
    }
}

BreadcrumbComponent.propTypes = {
    selectedDevice: PropTypes.object
};

export default BreadcrumbComponent;