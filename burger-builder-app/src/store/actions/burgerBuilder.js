import * as actionTypes from "./actionTypes";
import axios from '../../axios-order';

export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENTS,
        ingredientName: name
    }
}


export const removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENTS,
        ingredientName: name
    }
}

const setIngredient = (ings) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ings
    }
}

const fetchIngredientFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED,
    }
}

export const initIngredients = () => {
    return (dispatch) => {
        axios.get('https://react-my-burger07.firebaseio.com/ingredient.json')
            .then(response => {
                dispatch(setIngredient(response.data))
                console.log(response)
            }).catch(error => {
                dispatch(fetchIngredientFailed())
            })
    }
}