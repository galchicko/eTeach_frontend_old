import { createBrowserHistory } from 'history';
import {EntityTypes} from '../consts';

const history = createBrowserHistory();

export default history;

export const pushHistoryRoute = (route) => {
    history.push(route);
};

export const getUrlByEntity = (entity) => {
    if (entity.type === EntityTypes.SCHOOL && entity.id.toString() === '0') {
        return `/overview/all`;
    }
    return `/overview/${entity.type}/${entity.id}`;
};

export const pushHistoryRouteByEntity = (entity) => {
    const url = getUrlByEntity(entity);
    pushHistoryRoute(url);
};