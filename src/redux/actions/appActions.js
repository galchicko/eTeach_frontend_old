import {centralComponentTypes} from '../../components/CentralComponent/store/CentralComponentActionTypes';
import { dashboardTypes } from '../../components/Dashboard/store/actions/DashboardActionTypes';


export function clearAllOnRegionChange (dispatch) {
    dispatch({type: centralComponentTypes.CLEAR_ALL});
    dispatch({type: dashboardTypes.CLEAR_ALL});
}