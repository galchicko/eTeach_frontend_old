import i18next from 'i18next';

export const assignmentStatuses = {
    OUTSTANDING : 'Outstanding',
    ACKNOWLEDGED:'Acknowledged',
    CLEARED:'Cleared'
};

const AssignmentStatusLabelsMapper = () => {
    return {
        [assignmentStatuses.OUTSTANDING]: i18next.t('events.statuses.outstanding'),
        [assignmentStatuses.ACKNOWLEDGED]: i18next.t('events.statuses.acknowledged'),
        [assignmentStatuses.CLEARED]: i18next.t('events.statuses.cleared')
    };
};

export const getLabelForAssignmentStatus = (type) => {
    return  type ? AssignmentStatusLabelsMapper()[type] : '';
};