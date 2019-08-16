const initState = {
   categories : [],
   itemsFullCategories : [],
   categoriesPerDepartment : {},
   productsByCategory:[]

}

export const productListingReducer = (state = initState, action) => {
    const { type, payload } = action;
    switch (type) {
        case '$$model-DATA_CATEGORIES':
            return state = { ...state, categories: payload.data,  categoriesPerDepartment: { ...state.categoriesPerDepartment, [payload.department] : payload.data } }; // set @spinner
        case '$$model-DATA_FULL_CATEGORIES':
            return state = { ...state, categories: payload.data.rows, itemsFullCategories : payload.data.rows }; // set @spinner
        case '$$model-DATA_PRODuCT_BY_CATEGORIES':
            return state = { ...state, productsByCategory: payload.data.rows};
        default:
            return state
    }
}
