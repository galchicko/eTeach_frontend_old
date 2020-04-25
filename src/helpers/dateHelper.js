import originalMoment from 'moment';
import {extendMoment} from 'moment-range';
import 'moment-timezone';

const DEFAULT_DATE_FORMAT='YYYY-MM-DD';
const HEADER_TIME_FORMAT='hh:mm';
const EVENT_DATE_FORMAT='MM.DD.YYYY | hh:mm:ss';
const GRAPH_DATE_FORMAT_SHORT='hh:mm:ss';
const GRAPH_DATE_FORMAT_FULL='MM.DD.YYYY | hh:mm:ss';
const moment = extendMoment(originalMoment);

const getCurrentTimezone = () => {
    return moment.tz(moment.tz.guess()).zoneAbbr();
};

export const formatDateForHeader=(timestamp)=>{
    return moment(timestamp).format(HEADER_TIME_FORMAT) + ' ' + getCurrentTimezone();
};

export const formatDateForEvents=(timestamp)=>{
    return moment(timestamp).format(EVENT_DATE_FORMAT) + ' ' + getCurrentTimezone();
};

export const formatDateForGraph=(timestamp)=>{
    return moment(timestamp).format(GRAPH_DATE_FORMAT_SHORT);
};
export const formatDateForGraphTitle=(timestamp)=>{
    return moment(timestamp).format(GRAPH_DATE_FORMAT_FULL) + ' ' + getCurrentTimezone();
};

export const timestampToDate=(timestamp)=>{
    if(timestamp){
        return moment(timestamp).format(DEFAULT_DATE_FORMAT);
    }
    return  timestamp;
};

export const dateToTimestamp=(date)=>{
    return moment(date).valueOf();
};
export const dateStrToTimestamp=(dateStr)=>{
    const date = new Date(dateStr);
    return moment(date).valueOf();
};

export const getInitialDateRange = () => {
    const today = moment();
    const end = today.clone();
    const start = today.clone().subtract(7, 'days');

    return {
        from: start.valueOf(),
        to: end.valueOf()
    };
};

export const getTodayDateRange = () => {
    const today = moment();
    let start = today.subtract(1, 'days').endOf('day'); 
    let end = today;
    return {
        from: start.valueOf(),
        to: end.valueOf()
    };
};

export const getLastHour = () => {
    const today = moment();
    const end = today.clone();
    const start = today.clone().subtract(1, 'hours');
    return moment.range(start, end);
};

export const getLastDay = () => {
    const today = moment();
    const end = today.clone();
    const start = today.clone().subtract(1, 'days');
    return moment.range(start, end);
};

export const getLastDayRange = () => {
    return mapRangeMomentToTimestamp(getLastDay());
};

export const getLastMonth = () => {
    const today = moment();
    const end = today.clone();
    const start = today.clone().subtract(1, 'month');
    return moment.range(start, end);
};

export const getLastWeek = () => {
    const today = moment();
    const end = today.clone();
    const start = today.clone().subtract(1, 'week');
    return moment.range(start, end);
};

export const mapToRangeMoment = (dateRange) => {
    const start = moment(dateRange.from).clone();
    const end = moment(dateRange.to).clone();
    return moment.range(start, end);
};

export const mapRangeMomentToTimestamp = (momentRange, selection) => {

    let tsRange = {
        from: momentRange.start.valueOf(),
        to: momentRange.end.valueOf()
    };
    if(selection !== 'hour'){
        tsRange = {
            from: momentRange.start.startOf('day').valueOf(),
            to: momentRange.end.endOf('day').valueOf()
        };
    }

    return tsRange;
};

export const changeDatesToTimestamps=(filter)=>{
    let fromTimestamp = null;
    let toTimestamp = null;
    if(filter.date){
        if(filter.date.from){
            fromTimestamp=  dateToTimestamp(filter.date.from);
        }
        if(filter.date.to){
            toTimestamp= dateToTimestamp(filter.date.to);
        }
    }
    return {
        ...filter,
        date:{
            from: fromTimestamp,
            to: toTimestamp
        }
    };
};