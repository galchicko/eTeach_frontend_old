import {EntityTypes} from '../../../consts/entityTypes';

export const CENTRAL_TABS = {
    LESSONS: { value: 'LESSONS'},
    EVENTS: { value: 'EVENTS'},
    ASSIGNMENTS: {value: 'ASSIGNMENTS'},
    INFORMATION: {value: 'INFORMATION'}
};

const tabsMapper = {
    [EntityTypes.SCHOOL]: [
        CENTRAL_TABS.EVENTS,
        CENTRAL_TABS.INFORMATION

    ],
    [EntityTypes.WORKCLASS]: [
        CENTRAL_TABS.LESSONS,
        CENTRAL_TABS.EVENTS,
        CENTRAL_TABS.ASSIGNMENTS,
        CENTRAL_TABS.INFORMATION
    ],
    [EntityTypes.STUDENT]: [
        CENTRAL_TABS.LESSONS,
        CENTRAL_TABS.EVENTS,
        CENTRAL_TABS.ASSIGNMENTS,
        CENTRAL_TABS.INFORMATION
    ]
};

const tabMapperForUserRole = {tabsMapper};

const allSchoolsTabs=[
    CENTRAL_TABS.INFORMATION
];

export const ALL_ACTIVE_CENTRAL_TABS = allSchoolsTabs;


const defaultTabMapper = {
    [EntityTypes.SCHOOL]: CENTRAL_TABS.INFORMATION,
    [EntityTypes.WORKCLASS]: CENTRAL_TABS.LESSONS,
    [EntityTypes.STUDENT]:  CENTRAL_TABS.LESSONS
};
export const getTabsForEntityType = (entityId,entityType) => {
    if(entityId === 0)
        return allSchoolsTabs;
    //return  deviceType && userRole ? tabMapperForUserRole[userRole][deviceType] : [];
    return entityType ? tabsMapper[entityType]: [];
};

export const getDefaultTabForEntityType = (type) => {
    return  type ? defaultTabMapper[type] : CENTRAL_TABS.INFORMATION;
};