import * as actiontypes from '../actions/actionTypes';

const initialState = {
	token: null,
	userId: null,
	error: null,
	loading: null,
	authRedirectPath: '/'
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actiontypes.AUTH_START:
			return {
				...state,
				error: null,
				loading: true
			};
		case actiontypes.AUTH_SUCCESS:
			return {
				...state,
				token: action.idToken,
				userId: action.userId,
				error: null,
				loading: false
			};
		case actiontypes.AUTH_FAIL:
			return {
				...state,
				error: action.error,
				loading: false
			};
		case actiontypes.AUTH_LOGOUT:
			return {
				...state,
				token: null,
				userId: null
			};
		case actiontypes.SET_AUTH_REDIRECT_PATH:
			return {
				...state,
				authRedirectPath: action.path
			};
		default:
			return { ...state };
	}
};

export default reducer;
