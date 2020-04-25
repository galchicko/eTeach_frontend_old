/**
 * Created by HBRlabs6 on 8/22/2019.
 */
import React from 'react';
import Field from '../../Form/components/Field';
import DateField from '../../Form/components/DateField';
import ConfField from '../../Form/components/ConfField';
import BinaryMapConfField from '../../Form/components/BinaryMapConfField';
import TextArea from '../../Form/components/TextArea';
import TextField from '@material-ui/core/TextField';
import {formatDateForEvents} from '../../../helpers/dateHelper';
import {isTower} from '../../../consts/deviceTypes';
import refreshIcon from '../../../assets/refresh.svg';
import CircleButtonComponent from '../../Button/CircleButtonComponent';


export const renderDeviceSection=(obj, device,isUserObsever,props, deviceDependedPath,handleRefresh)=>{
    const { t,classes, selectedDeviceInfo, user } = props;
    const isDeviceTower = isTower(device.type);
    return (
        <div className={classes.infoContainer}>
            <div className={classes.infoTitleContainer}>
                <div className={classes.infoTitle}>{t('deviceInfoPanel.Device')}</div>
                {/*!isDeviceTower && (<div className={classes.refreshBtnContainer}>
                   <CircleButtonComponent  alt="refresh" icon={refreshIcon} onClick={() => handleRefresh(device)} />
                </div>)*/}
            </div>
            <div className={classes.infoTable}>
                <div className={classes.infoTable}>
                    <div className={classes.divRow}>
                        <div className={classes.leftColumn}>
                            <Field
                                name="name"
                                type="text"
                                label={t(deviceDependedPath + '.name')}
                                value={device.name}
                                onChange={obj.handleChange}
                                classes = {classes}
                                editable = {!isUserObsever}
                                error = {(device.name.trim() === '') ? t('deviceInfoPanel.invalidMessages.required') : undefined}
                            />
                        </div>
                        <div className={classes.rightColumn}>
                            <div className={classes.locationTable}>
                                <div className={classes.divRow}>
                                    <TextField
                                        id="latitude"
                                        name="latitude"
                                        label={t('deviceInfoPanel.Latitude')}
                                        className={classes.locationField}
                                        InputProps={{
                                            classes: {
                                                input: classes.locationField
                                            },
                                            disableUnderline: isUserObsever
                                        }}
                                        InputLabelProps={{
                                            classes: {
                                                root: classes.formTextLabel
                                            }
                                        }}
                                        value={device.location.latitude ? device.location.latitude : ''}
                                        onChange={obj.handleLocationChange}
                                        margin="normal"/>
                                    <TextField
                                        label=""
                                        className={classes.locationFieldSep}
                                        InputProps={{
                                            classes: {
                                                input: classes.locationFieldSep
                                            },
                                            disableUnderline: true
                                        }}
                                        value=","
                                        margin="normal"/>
                                    <TextField
                                        id="longitude"
                                        name="longitude"
                                        label={t('deviceInfoPanel.Longitude')}
                                        className={classes.locationField}
                                        InputProps={{
                                            classes: {
                                                input: classes.locationField
                                            },
                                            disableUnderline: isUserObsever
                                        }}
                                        InputLabelProps={{
                                            classes: {
                                                root: classes.formTextLabel
                                            }
                                        }}
                                        value={device.location.longitude ? device.location.longitude : ''}
                                        onChange={obj.handleLocationChange}
                                        margin="normal"/>
                                </div></div>
                        </div>
                    </div>
                    {!isDeviceTower && (<div className={classes.divRow}>
                        <div className={classes.leftColumn}>
                            <ConfField
                                name="type"
                                label={t(deviceDependedPath + '.vehicleType')}
                                value={device.assetInfo.vehicleType}
                                classes = {classes} />
                        </div>
                        <div className={classes.rightColumn}>
                            <ConfField
                                name="db2Type"
                                label={t('reports.db2Type')}
                                value={device.configuration.db2Type}
                                classes = {classes} />
                        </div>
                    </div>)}
                    {!isDeviceTower && (<div className={classes.divRow}>
                        <div className={classes.leftColumn}>
                            <ConfField
                                name="cbbVersion"
                                label={t('reports.cbbVersion')}
                                value={device.configuration.cbbVersion}
                                classes = {classes} />
                        </div>
                        <div className={classes.rightColumn}>
                            <ConfField
                                name="rfmVersion"
                                label={t('reports.rfmVersion')}
                                value={device.configuration.rfmVersion}
                                classes = {classes} />
                        </div>
                    </div>)}
                    {!isDeviceTower && ( <div className={classes.divRow}>
                        <div className={classes.leftColumn}>
                            <ConfField
                                name="macVersion"
                                label={t('reports.macVersion')}
                                value={device.configuration.macVersion}
                                classes = {classes} />
                        </div>
                        <div className={classes.rightColumn}>
                            <ConfField
                                name="phyVersion"
                                label={t('reports.phyVersion')}
                                value={device.configuration.phyVersion}
                                classes = {classes} />
                        </div>
                    </div>)}
                    {!isDeviceTower && (<div className={classes.divRow}>
                        <div className={classes.leftColumn}>
                            <ConfField
                                name="MACAddress"
                                label={t('deviceInfoPanel.MACAddress')}
                                value={device.mac}
                                classes = {classes} />
                        </div>
                        <div className={classes.rightColumn}>
                            <ConfField
                                name="BootTime"
                                label={t('deviceInfoPanel.BootTime')}
                                value={formatDateForEvents(device.bootTime)}
                                classes = {classes} />
                        </div>
                    </div>)}
                </div>
            </div>
        </div>
    );
};
export const renderInfoSection=(obj, device,isUserObsever,props,deviceDependedPath)=>{
    const { t,classes, selectedDeviceInfo, user } = props;
    return (
        <div className={classes.infoContainer}>
            <div className={classes.infoTitleContainer}>
                <div className={classes.infoTitle}>{t('deviceInfoPanel.Information')}</div>
            </div>
            <div className={classes.infoTable}>
                <div className={classes.divRow}>
                    <div className={classes.leftColumn}>
                        <DateField
                            name="installationDateInput"
                            required={false}
                            label={t(deviceDependedPath + '.installationDate')}
                            value={device.assetInfo.installationDateInput}
                            onChange={obj.handleInstallationDateChange}
                            classes = {classes}
                            editable = {!isUserObsever} />
                    </div>
                    <div className={classes.rightColumn}>
                        <Field
                            name="installerName"
                            required={false}
                            type="text"
                            label={t(deviceDependedPath + '.installerName')}
                            value={device.assetInfo.installerName}
                            onChange={obj.handleAssetInfoChange}
                            classes = {classes}
                            editable = {!isUserObsever} />

                    </div>
                </div>

                <div className={classes.divRow}>
                    <div className={classes.leftColumn}>
                        <DateField
                            name="lastVisitedOnInput"
                            required={false}
                            type="date"
                            label={t(deviceDependedPath + '.lastVisitedOn')}
                            value={device.assetInfo.lastVisitedOnInput}
                            onChange={obj.handleLastVisitedDateChange}
                            classes = {classes}
                            editable = {!isUserObsever} />
                    </div>
                    <div className={classes.rightColumn}>
                        <Field
                            name="lastVisitedBy"
                            required={false}
                            type="text"
                            label={t(deviceDependedPath + '.lastVisitedBy')}
                            value={device.assetInfo.lastVisitedBy}
                            onChange={obj.handleAssetInfoChange}
                            classes = {classes}
                            editable = {!isUserObsever} />
                    </div>
                </div>
                <div className={classes.divRow}>
                    <div className={classes.leftColumn}>
                        <Field
                            type="number"
                            name="towerHeight"
                            label={t(deviceDependedPath + '.height')}
                            value={device.assetInfo.towerHeight}
                            onChange={obj.handleAssetInfoChange}
                            units={t(deviceDependedPath + '.heightUnits')}
                            classes = {classes}
                            editable = {!isUserObsever} />

                    </div>
                    <div className={classes.rightColumn}>
                        <Field
                            type="text"
                            name="antennaGain"
                            label={t(deviceDependedPath + '.gain')}
                            value={device.assetInfo.antennaGain}
                            onChange={obj.handleAssetInfoChange}
                            units={t(deviceDependedPath + '.gainUnits')}
                            classes = {classes}
                            editable = {!isUserObsever} />

                    </div>
                </div>
            </div>

            <TextArea
                name="additionalInfo"
                label={t(deviceDependedPath + '.additionalInfo')}
                value={device.assetInfo.additionalInfo}
                onChange={obj.handleAssetInfoChange}
                classes = {classes}
                rows = "5"
                editable = {!isUserObsever} />
        </div>
    );
};

export const renderConfigurationSection=(obj, device,isUserObserver,props)=>{
    const { t,classes, selectedDeviceInfo, user } = props;
    return (
        <div className={classes.infoContainer}>
            <div className={classes.infoTitleContainer}>
                <div className={classes.infoTitle}>{t('deviceInfoPanel.Configuration')}</div>
            </div>
            <div className={classes.infoTable}>
                <div className={classes.divRow}>
                    <div className={classes.leftColumn}>
                        <ConfField
                            name="frequency"
                            label={t('admin.devices.configuration.centerFrequency')}
                            value={device.frequency === undefined ? '' : device.frequency.toLocaleString() + ' Hz'}
                            classes = {classes} />
                    </div>
                    <div className={classes.rightColumn}>
                        <ConfField
                            name="permutationScheme"
                            label={t('admin.devices.configuration.permutationScheme')}
                            value={device.configuration.permutationScheme}
                            classes = {classes} />
                    </div>
                </div>
                <div className={classes.divRow}>
                    <div className={classes.leftColumn}>
                        <ConfField
                            name="channelBandwidth"
                            label={t('admin.devices.configuration.channelBandwidth')}
                            value={device.channelBW === undefined ? '' : device.channelBW + ' kHz'}
                            classes = {classes}/>
                    </div>
                    <div className={classes.rightColumn}>
                        <ConfField
                            name="preambleID"
                            label={t('admin.devices.configuration.preambleID')}
                            value={device.configuration.preambleID}
                            classes = {classes} />
                    </div>
                </div>

                <div className={classes.divRow}>
                    <div className={classes.leftColumn}>
                        <BinaryMapConfField
                            name="dlSubchannels"
                            label={t('admin.devices.configuration.dlSubchannels')}
                            value={device.configuration.dlSubchannels}
                            classes = {classes}/>
                    </div>
                    <div className={classes.rightColumn}>
                        <ConfField
                            name="frameDuration"
                            label={t('admin.devices.configuration.frameDuration')}
                            value={device.configuration.frameDuration}
                            classes = {classes} />
                    </div>
                </div>

                <div className={classes.divRow}>
                    <div className={classes.leftColumn}>
                        <BinaryMapConfField
                            name="ulSubchannels"
                            label={t('admin.devices.configuration.ulSubchannels')}
                            value={device.configuration.ulSubchannels}
                            classes = {classes}/>
                    </div>
                    <div className={classes.rightColumn}>
                        <ConfField
                            name="symbols"
                            label={t('admin.devices.configuration.symbols')}
                            value={ (device.configuration.dlSynbols === undefined ? '' : device.configuration.dlSynbols)
                            + '/' +
                            (device.configuration.ulSynbols === undefined ? '' : device.configuration.ulSynbols)}
                            classes = {classes} />
                    </div>
                </div>
                <div className={classes.divRow}>
                    <div className={classes.leftColumn}>
                        <ConfField
                            name="txPower"
                            label={t('admin.devices.configuration.txPower')}
                            value={device.configuration.txPower === undefined ? '' : device.configuration.txPower  + ' dBm'}
                            classes = {classes} />
                    </div>
                    <div className={classes.rightColumn}>
                        <ConfField
                            name="rxGain"
                            label={t('admin.devices.configuration.rxGain')}
                            value={device.configuration.rxGain === undefined ? '' : device.configuration.rxGain  + ' dB'}
                            classes = {classes} />
                    </div>
                </div>

            </div>
        </div>
    );
};
