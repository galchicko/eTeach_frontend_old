import i18next from 'i18next';

export const Severity = {
    CRITICAL : 'Critical',
    MAJOR:'Major',
    MINOR:'Minor',
    WARNING:'Warning',
    NORMAL: 'Normal'
};

const SeverityLabelsMapper = () => {
    return {
        [Severity.CRITICAL]: i18next.t('events.severity.critical'),
        [Severity.MAJOR]: i18next.t('events.severity.major'),
        [Severity.MINOR]: i18next.t('events.severity.minor'),
        [Severity.WARNING]: i18next.t('events.severity.warning'),
        [Severity.NORMAL]: i18next.t('events.severity.normal')
    };
};

export const getLabelForSeverity = (type) => {
    return  type ? SeverityLabelsMapper()[type] : '';
};