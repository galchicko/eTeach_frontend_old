import {lessonStatuses} from '../consts';

const TimeLineColorStatusMapper = {
    [lessonStatuses.ATTENDED]: '#1FDA2F',
    [lessonStatuses.MISSED]: '#E20000',
    [lessonStatuses.SCHEDULED]: '#1fda2f',
    [lessonStatuses.ACTIVE]: '#1FDA2F',
    [lessonStatuses.ENDED]: '#E20000',
};

export const mapAttandanceToTimeLineData = (lessonStartAt,lessonEndAt, attandanceIntervals) => {
    const cloneAttandanceIntervals = JSON.parse(JSON.stringify(attandanceIntervals));
    return cloneAttandanceIntervals.map((interval, index) => {
        return {
            starting_time: interval.joinedAt,
            ending_time: interval.leftAt ? interval.leftAt : lessonEndAt,
            color: TimeLineColorStatusMapper[lessonStatuses.ATTENDED]
        };
    });
};

export const mapLessonStatusToTimeLineData = (lessonStartAt,lessonEndAt, status) => {
        return [{
            starting_time: lessonStartAt,
            ending_time: lessonEndAt,
            color: TimeLineColorStatusMapper[status]
        }];
};
export const getInitialData = (lessonStartAt,lessonEndAt) => ([
    {
        'starting_time': lessonStartAt,
        'ending_time': lessonEndAt,
        color: TimeLineColorStatusMapper[lessonStatuses.MISSED]
    }
]);