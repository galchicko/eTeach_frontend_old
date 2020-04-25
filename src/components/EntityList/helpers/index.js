import {EntityTypes, isSchool, isWorkClass} from '../../../consts';
import i18next from 'i18next';

const containerClassMapper = {
    [EntityTypes.SCHOOL]: 'tower-container',
    [EntityTypes.WORKCLASS]: 'basestation-container',
    [EntityTypes.STUDENT]: 'remote-container'
};

const titleClassMapper = {
    [EntityTypes.SCHOOL]: 'tower-title',
    [EntityTypes.WORKCLASS]: 'basestation-title',
    [EntityTypes.STUDENT]: 'remote-title'
};

export const getContainerClassForType = (type) => {
    return  type ? containerClassMapper[type] : '';
};

export const getTitleClassForType = (type) => {
    return  type ? titleClassMapper[type] : '';
};

export const isEntitySelected = (selectedEntity, entity) => {
    return selectedEntity &&
        selectedEntity.id === entity.id &&
        selectedEntity.type === entity.type;
};

export const convertEntitiesToPlainList = (entityList) => {
    const plainList = [];

    entityList.forEach(item => {
        plainList.push(item);
        if (isSchool(item.type) && item.workclasses) {
            plainList.push(...convertEntitiesToPlainList(item.workclasses));
        }else if (isWorkClass(item.type) && item.students) {
            plainList.push(...convertEntitiesToPlainList(item.students));
        }
    });
    return plainList;
};

export const getSearchEntityList = (entityList) => {
    const plainList = convertEntitiesToPlainList(entityList);
    return plainList.map((item)=>{
        return {
            id: item.name + item.type,
            label: item.name,
            entity: item
        };
    });
};


export const getAllSchoolsData = (entityList) => {
    const ALL_SCHOOLS_INDEX = 0;
    const ALL_SCHOOLS_NAME = i18next.t('app.allSchools');

    return {
        id: ALL_SCHOOLS_INDEX,
        type: EntityTypes.SCHOOL,
        name: ALL_SCHOOLS_NAME,
        path: '0',
        pathName: ALL_SCHOOLS_NAME,
        workclasses: entityList
    };
};

export const getSelectedEntityFromList = (entityList, type, id) => {
    if (type === EntityTypes.ALL) {
        return getAllSchoolsData(entityList);
    }
    const idAndType = id + type;
    const plainList = convertEntitiesToPlainList(getAllSchoolsData);
    return plainList.find(item => (item.id+item.type) === idAndType);
};

const deepCopy = object => JSON.parse(JSON.stringify(object));

export const addIsCollapsed = (entity) => {
    if(!entity.hasOwnProperty('isCollapsed')){
        entity.isCollapsed = true;
        if (isSchool(entity.type) && entity.workclasses) {
            entity.workclasses.forEach(addIsCollapsed);
        }else if (isWorkClass(entity.type) && entity.students) {
            entity.students.forEach(addIsCollapsed);
        }
    }
};

export const toggleEntity = (entities, togEntity) => {
    try{
        let entities_=deepCopy(entities);
        let entity = locateEntity(entities_,togEntity);
        entity.isCollapsed = !entity.isCollapsed;
        return entities_;
    }catch(e){
        console.log(e);
    }
};

export const changeEntityInfo = (entities, changedEntity) => {
    try{
        let entities_=deepCopy(entities);
        let entity = locateEntity(entities_,changedEntity);
        Object.assign(entity, changedEntity);
        return entities_;
    }catch(e){
        console.log(e);
    }
};

export const findEntityByPath = (entities, path) => {
    const parsedPath = parseEntityPath(path);
    let entity = null;
    if (parsedPath.schoolId) {
        entity = locateEntityInOneLevel(entities, parsedPath.schoolId);
    }
    if (parsedPath.workclassIs) {
        entity = locateEntityInOneLevel(entity.workclasses, parsedPath.workclassId);
    }
    if (parsedPath.studentId) {
        entity = locateEntityInOneLevel(entity.students, parsedPath.studentId);
    }
    return entity;
};

export const getAllParentEntitiesByPath = (list, path) => {
    const parents = [];
    let currentlist = list;
    let parsedPath = path.split('/');
    parsedPath.forEach((id) => {
        id = parseInt(id);
        const parent  = locateEntityInOneLevel(currentlist, id);
        if (parent) {
            parents.push(parent);
            if (isSchool(parent.type)) {
                currentlist = parent.workclasses;
            }else if (isWorkClass(parent.type)) {
                currentlist = parent.students;
            }
        } else {
            parsedPath = [];
            currentlist = [];
        }
    });
    return parents;
};

export const returnParentEntity= (entities, entity) => {
    let parentEntity = null;
    let parentEntities = null;
    const path = parseEntityPath(entity.path);

    if(path.workclassId){
        parentEntities = entities;
        parentEntity = locateEntityInOneLevel(parentEntities, path.schoolId);
    }

    if(path.studentId){
        parentEntities = parentEntity.students;
        parentEntity = locateEntityInOneLevel(parentEntities, path.schoolId); //???
    }
    return parentEntity;
};


export const addEntity = (entities, addedEntity) => {
    try{
        let entities_=deepCopy(entities);
        let parentEntities = entities_;
        const path = parseEntityPath(addedEntity.path);

        if(path.workclassId){
            parentEntities = locateEntityInOneLevel(parentEntities, path.schoolId).workclasses;
        }

        if(path.studentId){
            parentEntities = locateEntityInOneLevel(parentEntities, path.workclassId).students;
        }
        parentEntities.push(addedEntity);
        return entities_;
    }catch(e){
        console.log(e);
    }
};

export const removeEntity = (entities, removedEntity) => {
    try{
        let entities_=deepCopy(entities);
        let parentEntities = entities_;
        const path = parseEntityPath(removedEntity.path);

        if(path.workclassId){
            parentEntities = locateEntityInOneLevel(parentEntities, path.shcoolId).workclasses;
        }

        if(path.studentId){
            parentEntities = locateEntityInOneLevel(parentEntities, path.workclassId).students;
        }

        for (let index = 0; index < parentEntities.length; index++) {
            if (parentEntities[index].id === removedEntity.id) {
                parentEntities.splice(index, 1);
                break;
            }
        }
        return entities_;
    }catch(e){
        console.log(e);
    }
};

export const collapseAll = (entities) => {
    let entities_=deepCopy(entities);
    entities_.map(collapseEntity);
    return entities_;
};

const collapseEntity = (entity) => {
    entity.isCollapsed = true;

    if (isSchool(entity.type) && entity.workclasses) {
        entity.workclasses.map(collapseEntity);
    }else if (isWorkClass(entity.type) && entity.students) {
        entity.students.map(collapseEntity);
    }
};


export const expandEntity = (entities,entityToExpand) => {
    try{
        let entities_=deepCopy(entities);

        const entityPathJson=locateEntityPath(entities_,entityToExpand);

        if(entityPathJson.school){
            entityPathJson.school.isCollapsed = false;
        }
        if(entityPathJson.workclass){
            entityPathJson.workclass.isCollapsed = false;
        }
        if(entityPathJson.student){
            entityPathJson.student.isCollapsed = false;
        }
        return entities_;
    }catch(e){
        console.log(e);
    }
};

const locateEntity = (entities,entityToLocate) => {
    const entityPathJson  =locateEntityPath(entities,entityToLocate);
    return locateEntityFromEntityPath(entityPathJson,entityToLocate);
};

const locateEntityFromEntityPath = (entityPathJson,entityToLocate) => {
    switch(entityToLocate.type){
    case EntityTypes.SCHOOL:
        return entityPathJson.school;
    case EntityTypes.WORKCLASS:
        return entityPathJson.workclass;
    case EntityTypes.STUDENT:
        return entityPathJson.student;
    default: return null;
    }
};


const locateEntityPath = (entities,entityToLocate) => {
    let entityPathJson={};
    const path = parseEntityPath(entityToLocate.path);
    let school = locateEntityInOneLevel(entities, path.schoolId);
    entityPathJson.school = school;
    switch(entityToLocate.type){
    case EntityTypes.SCHOOL:
        return entityPathJson;
    case EntityTypes.WORKCLASS:
        entityPathJson.workclass = locateEntityInOneLevel(school.workclasses, path.workclassId);
        return entityPathJson;
    case EntityTypes.STUDENT:
        let workclass = locateEntityInOneLevel(school.workclasses, path.workclassId);
        entityPathJson.workclass = workclass;
        entityPathJson.student = locateEntityInOneLevel(workclass.students, path.studentId);
        return entityPathJson;
    default: return null;
    }
};

export const parseEntityPath = (entityPath) => {
    //"schoolId" or "schoolId/workclassId" or "schoolId/workclassId/studentId"
    const SCHOOL_INDEX = 0;
    const WORKCLASS_INDEX=1;
    const STUDENT_INDEX=2;
    let pathArray = entityPath.split('/');

    let resultJson = {};

    if(pathArray.length > SCHOOL_INDEX){
        resultJson.schoolId = parseInt(pathArray[SCHOOL_INDEX]);
    }
    if(pathArray.length > WORKCLASS_INDEX){
        resultJson.workclassId = parseInt(pathArray[WORKCLASS_INDEX]);
    }
    if(pathArray.length > STUDENT_INDEX){
        resultJson.studentId = parseInt(pathArray[STUDENT_INDEX]);
    }
    return resultJson;
};

const locateEntityInOneLevel = (entities, id) => {
    for(let entityIndex in entities){
        if(entities[entityIndex].id === id){
            return entities[entityIndex];
        }
    }
};
