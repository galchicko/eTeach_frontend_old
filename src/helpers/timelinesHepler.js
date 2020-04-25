import {Severity} from '../consts';

const TimeLineColorStatusMapper = {
    [Severity.NORMAL]: '#1FDA2F',
    [Severity.CRITICAL]: '#E20000',
    [Severity.MAJOR]: '#F5A623'
};

export const mapEventsToTimeLineData = (dateRange, eventsData) => {
    const cloneEventsData = JSON.parse(JSON.stringify(eventsData));
    return cloneEventsData.map((event, index) => {
        const nextEvent = eventsData[index + 1];
        return {
            starting_time: event.timestamp < dateRange.from ? dateRange.from : event.timestamp,
            ending_time: nextEvent ? nextEvent.timestamp : dateRange.to,
            color: TimeLineColorStatusMapper[event.severity]
        };
    });
};

export const getInitialData = (dateRange) => ([
    {
        'starting_time': dateRange.from,
        'ending_time': dateRange.to,
        color: 'transparent'
    }
]);