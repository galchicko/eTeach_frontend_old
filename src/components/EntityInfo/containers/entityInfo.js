import React, {Component} from 'react';
import {ProgressCircle} from '../../Progress';
import { withNamespaces } from 'react-i18next';
import '../styles/deviceInfo.scss';
import {isStudent,isSchool,isWorkClass, isAllSchools} from '../../../consts/entityTypes';
import EntityActions from './EntityActions';
import collapseIcon from '../../../assets/collapse.svg';
import { subscribe, unsubscribe, WEB_SOCKET_CODES } from '../../WebSocketService';
import './deviceInfo.scss';

class EntityInfo extends Component {

    componentDidMount () {
        this.wsSubcribtionIdChangeDevice = subscribe(WEB_SOCKET_CODES.ON_DEVICE_INFO_CHANGE, this.props.onDeviceInfoChangedImmediately);
    }

    componentWillUnmount () {
        unsubscribe(this.wsSubcribtionIdChangeDevice);
    }

    toggleCollapseClick = () => {
        this.props.togglePanelcollapse();
    };

    render() {
        if (!this.props.selectedEntity) {
            return (
                (<ProgressCircle isShown={true}/>)
            );
        }

        const info = this.props.selectedEntity;
        const isEntitySchool = isSchool(this.props.selectedEntity.type);
        const isEntityWorkClass = isWorkClass(this.props.selectedEntity.type);
        const isEntityAllSchools = isAllSchools(this.props.selectedEntity);
        const isEntityStudent = isStudent(this.props.selectedEntity.type);

        const {t} = this.props;
        return (
            <div className="container">
                <button className="collapseBtn" onClick={this.toggleCollapseClick}>
                    <img className="collapseIcon" alt="collapse" src={collapseIcon}/>
                </button>
                <div className="containerContent">
                    <div className="mainTitle">{info.name}</div>
                    <div className="subTitle">{t('infoPanel.GeneralSubTitle')}</div>
                    <div className="divTable">

                        {isEntityWorkClass && (
                            <div className="divRow">
                                <div className="divCell label">{t('infoPanel.Students')}:</div>
                                <div className="divCell value">{info.students.length}</div>
                            </div>
                        )}


                        {isEntitySchool && info.address && (
                            <div className="divRow">
                                <div className="divCell label">{t('infoPanel.Address')}:</div>
                                <div className="divCell value">{info.address}</div>
                            </div>
                        )}
                        {isEntitySchool && info.code && (
                            <div className="divRow">
                                <div className="divCell label">{t('infoPanel.Code')}:</div>
                                <div className="divCell value">{info.code}</div>
                            </div>
                        )}


                    </div>
                    <div className="divTable">

                        <div className="divRow">
                            <div className="divCell">
                                <EntityActions
                                    selectedEntity={this.props.selectedEntity}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );

    }
}

export default withNamespaces('translation')(EntityInfo);