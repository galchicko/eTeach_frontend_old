import moment from 'moment';

const datePattern = 'DD MMM, YYYY';

export const getCurrentTime = () => moment();

export const getFromNextWeekDate = () => getCurrentTime().add(7, 'days');