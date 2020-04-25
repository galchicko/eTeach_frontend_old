import i18next from 'i18next';

export const ALL_SCHOOLS = 'All schools';

export const EntityTypes = {
    SCHOOL : 'School',
    TEACHER:'Teacher',
    STUDENT:'Student',
    WORKCLASS:'WorkClass',
    ALL: 'all'
};

const EntityTypeLabelsMapper = () => {
    return {
        [EntityTypes.SCHOOL]: i18next.t('app.devices.types.school'),
        [EntityTypes.TEACHER]: i18next.t('app.devices.types.teacher'),
        [EntityTypes.STUDENT]: i18next.t('app.devices.types.student'),
        [EntityTypes.WORKCLASS]: i18next.t('app.devices.types.workclass')
    };
};

export const getLabelForEntityType = (type) => {
    return  type ? EntityTypeLabelsMapper()[type] : '';
};

export const isAllSchools=(selectedEntity)=>{
    return selectedEntity.type === EntityTypes.SCHOOL && selectedEntity.id === 0;
};
export const isSchool=(type)=>{
    return type === EntityTypes.SCHOOL;
};

export const isTeacher=(type)=>{
    return type === EntityTypes.TEACHER;
};

export const isStudent=(type)=>{
    return type === EntityTypes.STUDENT;
};
export const isWorkClass=(type)=>{
    return type === EntityTypes.WORKCLASS;
};
