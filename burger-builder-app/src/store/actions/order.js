import * as actionTypes from './actionTypes';
import axios from '../../axios-order';

export const purchaseBurgerSuccess = (id, orderData) => {
	return {
		type: actionTypes.PURCHASE_BURGER_SUCCESS,
		orderData: orderData,
		orderId: id
	};
};

export const purchaseBurgerFail = error => {
	return {
		type: actionTypes.PURCHASE_BURGER_FAIL,
		error: error
	};
};

export const purchaseBurgerStart = () => {
	return {
		type: actionTypes.PURCHASE_BURGER_START
	};
};

export const purchaseBurger = (token, orderData) => {
	console.log(orderData, token);
	return dispatch => {
		dispatch(purchaseBurgerStart());
		// axios.post('/orders.json', orderData).then(response => {
		axios
			.post('/orders.json?auth=' + token, orderData)
			.then(response => {
				console.log(response);
				dispatch(purchaseBurgerSuccess(response.data.name, orderData));
			})
			.catch(error => {
				dispatch(purchaseBurgerFail(error));
			});
	};
};

export const purchaseInit = () => {
	return {
		type: actionTypes.PURCHASE_INIT
	};
};

export const fetchOrderSuccess = orders => {
	return {
		type: actionTypes.FETCH_ORDER_SUCCESS,
		orders: orders
	};
};

export const fetchOrderFail = error => {
	return {
		type: actionTypes.FETCH_ORDER_FAIL,
		error: error
	};
};

export const fetchOrderStart = () => {
	return {
		type: actionTypes.FETCH_ORDER_START
	};
};

export const fetchOrders = (token, userId) => {
	return dispatch => {
		dispatch(fetchOrderStart());
		let queryParams = '?auth=' + token + '&orderBy="userId"&"equalTo=' + userId + '"';
		axios
			// .get('/orders.json')
			// .get('/orders.json?auth=' + token)
			.get('/orders.json' + queryParams)
			.then(res => {
				console.log(res.data);
				const fetchedOrders = [];
				for (let key in res.data) {
					fetchedOrders.push({
						...res.data[key],
						id: key
					});
				}
				dispatch(fetchOrderSuccess(fetchedOrders));
			})
			.catch(err => {
				dispatch(fetchOrderFail(err));
			});
	};
};
