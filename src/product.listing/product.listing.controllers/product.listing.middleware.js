// import { API_GET_DATA_CATEGORIES } from "./../../action.creators";
import queryString from "query-string";
import { trottle } from "./../../app.utils";
const checkRoutIfNoChange = trottle();
export const productListingMiddleWare = store => next => action => {
	next(action);
	const { payload } = action;
    /** checking the route and desipatch action base on queryString */
	if (action.type === "$$mw-ROUTE_ON_CHANGE") {
		/** if user hit the same route do nothing */
		if (checkRoutIfNoChange(payload.location.search)) return;
		const queryStringObject = queryString.parse(payload.location.search);
		const categoriesPerDepartment = store.getState().productListingReducer
			.categoriesPerDepartment[queryStringObject.department_id];
		// console.log(payload.location, queryStringObject.department_id);
        
        /** queryString just the homepage with route param*/
		if (payload.location.pathname === "/") {
			store.dispatch({
				type: "$$api-GET_DATA_ASYNC",
				payload: {
					url: "https://backendapi.turing.com/categories",
					typeOnSuccess: "$$model-DATA_FULL_CATEGORIES",
				},
			});
        }
        /** queryString is only category_id */
		if (
			payload.location.pathname === "/items" &&
			!queryStringObject.department_id &&
			queryStringObject.category_id
		) {
            store.dispatch({
				type: "$$api-GET_DATA_ASYNC",
				payload: {
					url: "https://backendapi.turing.com/categories",
					typeOnSuccess: "$$model-DATA_FULL_CATEGORIES",
				},
			});
            store.dispatch({
                type: "$$api-GET_DATA_ASYNC",
                payload: {
                    url: `https://backendapi.turing.com/products/inCategory/${
                        queryStringObject.category_id
                    }?page=1&limit=20&description_length=100`,
                    typeOnSuccess: "$$mw-DATA_ITEMS_PER_CATEGORIES",
                    relayData: queryStringObject.department_id,
                },
            });
        }
        /** queryString is only department_id */
		if (
			payload.location.pathname === "/items" &&
			queryStringObject.department_id &&
			!queryStringObject.category_id
		) {
            if (categoriesPerDepartment) {
				return store.dispatch({
					type: "$$model-DATA_CATEGORIES",
					payload: {
						data: categoriesPerDepartment,
						department: queryStringObject.department_id,
					},
				});
			}
            store.dispatch({
                type: "$$api-GET_DATA_ASYNC",
                payload: {
                    url: `https://backendapi.turing.com/categories/inDepartment/${
                        queryStringObject.department_id
                    }`,
                    typeOnSuccess: "$$mw-DATA_CATEGORIES",
                    relayData: queryStringObject.department_id,
                },
            });
        }
        /** full of queryString with department and category */
		if (
			payload.location.pathname === "/items" &&
			queryStringObject.department_id &&
			queryStringObject.category_id
		) {
			/**  @ if category is already requset from api then just assign to data */
			if (categoriesPerDepartment) {
				store.dispatch({
					type: "$$model-DATA_CATEGORIES",
					payload: {
						data: categoriesPerDepartment,
						department: queryStringObject.department_id,
					},
				});
			} else {
				/** @ if the category in the department is new then need to request from api */
				store.dispatch({
					type: "$$api-GET_DATA_ASYNC",
					payload: {
						url: `https://backendapi.turing.com/categories/inDepartment/${
							queryStringObject.department_id
						}`,
						typeOnSuccess: "$$mw-DATA_CATEGORIES",
						relayData: queryStringObject.department_id,
					},
				});
            }
            store.dispatch({
                type: "$$api-GET_DATA_ASYNC",
                payload: {
                    url: `https://backendapi.turing.com/products/inCategory/${
                        queryStringObject.category_id
                    }?page=1&limit=20&description_length=100`,
                    typeOnSuccess: "$$mw-DATA_ITEMS_PER_CATEGORIES",
                    relayData: queryStringObject.department_id,
                },
            });
		}
	}

	if (action.type === "$$mw-DATA_CATEGORIES") {
		store.dispatch({
			type: "$$model-DATA_CATEGORIES",
			payload: {
				data: payload.data,
				department: payload.relayData,
			},
		});
    }
    if (action.type === "$$mw-DATA_ITEMS_PER_CATEGORIES") {
        store.dispatch({
			type: "$$model-DATA_PRODuCT_BY_CATEGORIES",
			payload: {
				data: payload.data,
				department: payload.relayData,
			},
		});
    }

};
