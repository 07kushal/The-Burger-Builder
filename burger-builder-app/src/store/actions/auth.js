import axios from 'axios';
import * as actionTypes from './actionTypes';

// this auth is crearted for loading state
export const authStart = () => {
	return {
		type: actionTypes.AUTH_START
	};
};

// this auth data comes succesfully form loading state
export const authSuccess = (idToken, localId) => {
	return {
		type: actionTypes.AUTH_SUCCESS,
		idToken: idToken,
		userId: localId
	};
};

// this auth Fail form loading state
export const authFail = error => {
	return {
		type: actionTypes.AUTH_FAIL,
		error: error
	};
};

export const logout = () => {
	localStorage.removeItem('token');
	localStorage.removeItem('expirationDate');
	localStorage.removeItem('userId');
	return {
		type: actionTypes.AUTH_LOGOUT
	};
};

export const checkAuthTimeout = expirationTime => {
	console.log(expirationTime);
	return dispatch => {
		setTimeout(() => {
			dispatch(logout());
		}, expirationTime * 1000);
	};
};

// main auth acton which hold Async Code
//isSignUp means auth for signup or signin
export const auth = (email, password, isSignUp) => {
	return dispatch => {
		dispatch(authStart(email, password));
		const authData = {
			email: email,
			password: password,
			returnSecureToken: true
		};
		let authUrl =
			'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyAk-tkxHY0VRPBW8ssJYuxTn57bvKlv6Bw';
		if (!isSignUp) {
			authUrl =
				'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyAk-tkxHY0VRPBW8ssJYuxTn57bvKlv6Bw';
		}
		axios
			.post(authUrl, authData)
			.then(response => {
				console.log(response);
				const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
				localStorage.setItem('token', response.data.idToken);
				localStorage.setItem('userId', response.data.localId);
				localStorage.setItem('expirationDate', expirationDate);
				dispatch(authSuccess(response.data.idToken, response.data.localId));
				dispatch(checkAuthTimeout(response.data.expiresIn));
			})
			.catch(error => {
				// console.log(error.response.data.error);
				dispatch(authFail(error.response.data.error));
			});
	};
};

// SET_AUTH_REDIRECT_PATH Reducer

export const setAuthRedirectPath = path => {
	return {
		type: actionTypes.SET_AUTH_REDIRECT_PATH,
		path: path
	};
};

export const checkAuthState = () => {
	let expirationTime = null;
	return dispatch => {
		const token = localStorage.getItem('token');
		if (!token) {
			dispatch(logout());
		} else {
			const expirationDate = new Date(localStorage.getItem('expirationDate'));
			if (expirationDate <= new Date()) {
				dispatch(logout());
			} else {
				const userId = localStorage.getItem('userId');
				expirationTime = expirationDate.getTime() - new Date().getTime();
				dispatch(authSuccess(token, userId));
				dispatch(checkAuthTimeout(expirationTime / 1000));
				// https://www.googleapis.com/identitytoolkit/v3/relyingparty/getAccountInfo?key=[API_KEY]
			}
		}
	};
};
