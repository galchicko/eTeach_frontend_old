import {combineReducers} from 'redux';
import {appReducer} from './appReducer';
import EntityListReducer from '../../components/EntityList/store/reducers/entityListReducer';
import SelectedEntity from '../../components/EntityList/store/reducers/selectedEntityReducer';
import CentralComponentReducer from '../../components/CentralComponent/store/CentralComponentReducer';
import UserReducer from '../../components/User/store/reducers/userReducer';
import LoginReducer from '../../components/LoginComponent/store/loginReducer';
import AlertDialogReducer from '../../components/Dialog/AlertDialog/store/reducer/AlertDialogReducer';
import EventListFilterReducer from '../../components/Events/store/eventsFilterReducer';
import EventsTableReducer from '../../components/Events/store/eventsReducer';
import AssignmentListFilterReducer from '../../components/AssignmentList/store/assignmentsFilterReducer';
import AssignmentsTableReducer from '../../components/AssignmentList/store/assignmentsReducer';
import LessonListFilterReducer from '../../components/Lessons/store/lessonsFilterReducer';
import LessonsTableReducer from '../../components/Lessons/store/lessonsReducer';


export const appReducers = combineReducers({
    app: appReducer,
    entityList: EntityListReducer,
    selectedEntity: SelectedEntity,
    centralComponent: CentralComponentReducer,
    userInfo: UserReducer,
    login: LoginReducer,
    alertDialog: AlertDialogReducer,
    eventList: EventsTableReducer,
    eventsListFilter: EventListFilterReducer,
    assignmentList: AssignmentsTableReducer,
    assignmentsListFilter: AssignmentListFilterReducer,
    lessonList: LessonsTableReducer,
    lessonsListFilter: LessonListFilterReducer,
});
