import {Severity} from '../../../consts';

const alarmClassMapper = {
    [Severity.CRITICAL]: 'alarmCritical',
    [Severity.MAJOR]: 'alarmMajor',
    [Severity.MINOR]: 'alarmMinor',
    [Severity.WARNING]: 'alarmWarning'
};

export const getAlarmClass = (severity) => {
    return  severity ? alarmClassMapper[severity] : '';
};
