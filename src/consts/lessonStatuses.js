import i18next from 'i18next';

export const lessonStatuses = {
    ATTENDED : 'Attended',
    MISSED:'MISSED',
    SCHEDULED: 'SCHEDULED',
    ACTIVE: 'ACTIVE',
    ENDED: 'ENDED'
};

const LessonStatusLabelsMapper = () => {
    return {
        [lessonStatuses.ATTENDED]: i18next.t('lesson.statuses.attended'),
        [lessonStatuses.MISSED]: i18next.t('lesson.statuses.missed')
    };
};

export const getLabelForLessonStatus = (type) => {
    return  type ? LessonStatusLabelsMapper()[type] : '';
};