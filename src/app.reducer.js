const initState = {
    user: {},
    spinnerState: false,
    navState:false,
    department_id:null,
    
}

export const appReducer = (state = initState, action) => {
    const { type, payload } = action;
    switch (type) {
        case '$$ui-TOGGLE_SPINNER':
            return state = { ...state, spinnerState: payload }; // set @spinner
        case '$$ui-NAV_STATE':
            return state = { ...state, navState : payload , departmentId: payload === false ? null : payload+1 }; // 
                default:
            return state
    }
}
