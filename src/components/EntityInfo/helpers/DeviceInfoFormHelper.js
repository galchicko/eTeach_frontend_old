import {dateToTimestamp} from '../../../helpers/dateHelper';


export const _handleChange=(event, updateStateF)=>{
    updateStateF(getChangePayload(event));
    const updatedInfo = {
        [event.target.name]: event.target.value
    };
};

export const _handleAssetInfoChange=(event, updateStateF)=>{
    updateStateF(getChangePayload(event));
    const updatedInfo = {
        assetInfo :{
            [event.target.name]: event.target.value
        }
    };
};
export const _handleLocationChange=(event, updateStateF)=>{
    updateStateF(getChangePayload(event));
    const updatedInfo = {
        location :{
            [event.target.name]: event.target.value
        }
    };
};
export const _handleInstallationDateChange=(name, dateStr, updateStateF)=>{
    const date = new Date(dateStr);
    const timestamp = dateToTimestamp(date);
    const payload = {
        name: name,
        value: date,
        connectedField: 'installationDate'
    };
    updateStateF(payload);

    const updatedInfo = {
        assetInfo :{
            [name]: date,
            installationDate: timestamp
        }
    };
};

export const _handleLastVisitedDateChange=(name, dateStr, updateStateF)=>{
    let date = null;
    let timestamp = null;
    if(dateStr !== null){
        date = new Date(dateStr);
        timestamp = dateToTimestamp(date);
    }

    const payload = {
        name: name,
        value: date,
        connectedField: 'lastVisitedOn'
    };
    updateStateF(payload);

    const updatedInfo = {
        assetInfo :{
            [name]: date,
            lastVisitedOn: timestamp
        }
    };
};


const getChangePayload=(event)=>({
    name: event.target.name,
    value: event.target.value
});

