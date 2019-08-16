// import {API_GET_DATA_CATEGORIES} from './action.creators'
import queryString from "query-string";
import { trottle } from "./app.utils";
const checkRoutIfNoChange = trottle();
export const middleWare = store => next => action => {
    next(action);
    //TODO: check if the user login and has the profile?
    const {payload} = action;
    if (action.type === "$$mw-ROUTE_ON_CHANGE") {
        if (checkRoutIfNoChange(payload.location.search)) return;
        const queryStringObject = queryString.parse(payload.location.search);
        // const { navState } = store.getState().appReducer;
        if(queryStringObject.department_id){
            store.dispatch({
                type: "$$ui-NAV_STATE",
                payload:parseInt(queryStringObject.department_id)-1,
            });
        }else{
            store.dispatch({
                type: "$$ui-NAV_STATE",
                payload:false,
            });
        }

    }
    

   
}