import i18next from 'i18next';

export const transfromEventsData = (data) => {
    return [
        {
            count: data.Critical,
            color: '#E20000',
            name: i18next.t('events.severity.critical')
        },
        {
            count: data.Major,
            color: '#F5A623',
            name: i18next.t('events.severity.major')
        },
        {
            count: data.Minor,
            color: '#FEE000',
            name: i18next.t('events.severity.minor')
        }
    ];
};