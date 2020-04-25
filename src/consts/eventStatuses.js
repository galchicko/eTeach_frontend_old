import i18next from 'i18next';

export const eventStatuses = {
    OUTSTANDING : 'Outstanding',
    ACKNOWLEDGED:'Acknowledged',
    CLEARED:'Cleared'
};

const EventStatusLabelsMapper = () => {
    return {
        [eventStatuses.OUTSTANDING]: i18next.t('events.statuses.outstanding'),
        [eventStatuses.ACKNOWLEDGED]: i18next.t('events.statuses.acknowledged'),
        [eventStatuses.CLEARED]: i18next.t('events.statuses.cleared')
    };
};

export const getLabelForEventStatus = (type) => {
    return  type ? EventStatusLabelsMapper()[type] : '';
};