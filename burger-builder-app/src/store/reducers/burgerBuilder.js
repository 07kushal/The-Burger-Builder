import * as actionType from '../actions/actionTypes';

const initialState = {
	ingredients: null,
	totalPrice: 4,
	loading: false,
	error: false,
	building: false
};

const INGREDIENT_PRICES = {
	salad: 0.5,
	bacon: 0.4,
	cheese: 1.3,
	meat: 0.7
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionType.SET_INGREDIENTS:
			return {
				...state,
				ingredients: {
					salad: action.ingredients.salad,
					bacon: action.ingredients.bacon,
					cheese: action.ingredients.cheese,
					meat: action.ingredients.meat
				},
				totalPrice: 4,
				error: false,
				building: false
			};
		case actionType.FETCH_INGREDIENTS_FAILED:
			return {
				...state,
				error: true
			};
		case actionType.ADD_INGREDIENTS:
			return {
				...state,
				ingredients: {
					...state.ingredients,
					[action.ingredientName]: state.ingredients[action.ingredientName] + 1
				},
				totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
				building: true
			};
		case actionType.REMOVE_INGREDIENTS:
			return {
				...state,
				ingredients: {
					...state.ingredients,
					[action.ingredientName]: state.ingredients[action.ingredientName] - 1
				},
				totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
				building: true
			};
		default:
			return state;
	}
	// return state;
};

export default reducer;
