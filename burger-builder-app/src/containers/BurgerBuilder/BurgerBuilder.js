import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index'; //pointing index.js file of action
import Aux from '../../hoc/Aux_/Aux_';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Burger from '../../components/Burger/Burger';
import BulidControls from '../../components/Burger/BulidControls/BulidControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-order';

// const INGREDIENT_PRICES = {
//     salad: 0.5,
//     bacon: 0.4,
//     cheese: 1.3,
//     meat: 0.7
// }
class BurgerBuilder extends Component {
	// constructor(props){
	//     super(props);
	// }
	state = {
		purchasing: false
	};
	componentDidMount() {
		this.props.fetchIngredients();
		// console.log(this.props);
	}
	updatedPurchaseState = ingredients => {
		const sum = Object.keys(ingredients)
			.map(igKey => {
				return ingredients[igKey];
			})
			.reduce((sum, el) => {
				return sum + el; // el is ingredients[igKey] is return by  above map
			}, 0);
		return sum > 0;
	};
	purchaseHandler = () => {
		if (this.props.isAuthenticated) {
			this.setState({
				purchasing: true
			});
		} else {
			this.props.onSetAuthRedirectPath('/checkout');
			this.props.history.push('/auth');
		}
	};
	purchaseCencelHandler = () => {
		this.setState({
			purchasing: false
		});
	};
	purchaseContinueHandler = () => {
		this.props.onInitPurchase();
		this.props.history.push('/checkout');
	};
	render() {
		console.log(this.props.isAuthenticated);
		const disabledInfo = {
			...this.props.ings
		};
		for (let key in disabledInfo) {
			// console.log(key);
			disabledInfo[key] = disabledInfo[key] <= 0;
			// console.log(disabledInfo);
		}
		//{salad: true, bacon: true, cheese: true, meat: true}

		let orderSummary = null;
		let burger = this.props.error ? <p>ingredients cant't be loaded!!!</p> : <Spinner />;
		if (this.props.ings) {
			burger = (
				<Aux>
					<Burger ingredients={this.props.ings} />
					<BulidControls
						// ingredientAdded={this.addIngredientHandler}
						ingredientAdded={this.props.onIngredientAdded}
						// ingredientRemoved={this.removeIngredientHandler}
						isAuth={this.props.isAuthenticated}
						ingredientRemoved={this.props.onIngredientRemove}
						disabled={disabledInfo}
						price={this.props.price}
						purchasable={this.updatedPurchaseState(this.props.ings)}
						ordered={this.purchaseHandler}
					/>
				</Aux>
			);
			orderSummary = (
				<OrderSummary
					purchaseCenceled={this.purchaseCencelHandler}
					purchaseContinue={this.purchaseContinueHandler}
					ingredients={this.props.ings}
					price={this.props.price}
				/>
			);
		}
		return (
			<Aux>
				<Modal modalClosed={this.purchaseCencelHandler} show={this.state.purchasing}>
					{orderSummary}
				</Modal>
				{burger}
			</Aux>
		);
	}
}

const mapStateToProps = state => {
	return {
		ings: state.burgerBuilder.ingredients,
		price: state.burgerBuilder.totalPrice,
		error: state.burgerBuilder.error,
		isAuthenticated: state.auth.token !== null
	};
};
const mapDispatchToProps = dispatch => {
	return {
		onIngredientAdded: ingName => dispatch(actions.addIngredient(ingName)),
		onIngredientRemove: ingName => dispatch(actions.removeIngredient(ingName)),
		fetchIngredients: () => dispatch(actions.initIngredients()),
		onInitPurchase: () => dispatch(actions.purchaseInit()),
		onSetAuthRedirectPath: path => dispatch(actions.setAuthRedirectPath(path))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
