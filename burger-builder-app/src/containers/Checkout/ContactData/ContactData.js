import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import * as orderActions from '../../../store/actions/index';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../../axios-order';

class ContactData extends Component {
	state = {
		orderForm: {
			name: {
				elementType: 'input',
				elementConfig: {
					type: 'type',
					placeholder: 'Your Name'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			street: {
				elementType: 'input',
				elementConfig: {
					type: 'type',
					placeholder: 'Your Street'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			zipcode: {
				elementType: 'input',
				elementConfig: {
					type: 'type',
					placeholder: 'ZIP CODE'
				},
				value: '',
				validation: {
					required: true,
					minLength: 1,
					maxLength: 10
				},
				valid: false,
				touched: false
			},
			country: {
				elementType: 'input',
				elementConfig: {
					type: 'type',
					placeholder: 'Country'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			email: {
				elementType: 'email',
				elementConfig: {
					type: 'type',
					placeholder: 'Your E-mail'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			deliveryMethod: {
				elementType: 'select',
				elementConfig: {
					options: [{ value: 'fastest', displayValue: 'Fastest' }, { value: 'cheapest', displayValue: 'Cheapest' }]
				},
				value: 'fastest',
				validation: {},
				valid: true
			}
		},
		formIsValid: false
	};

	checkValidity = (value, rules) => {
		let isValid = true;
		if (!rules) {
			return true;
		}
		if (rules.required) {
			isValid = value.trim() !== '' && isValid;
		}
		if (rules.minLength) {
			isValid = value.length >= rules.minLength && isValid;
		}

		if (rules.maxLength) {
			isValid = value.length <= rules.maxLength && isValid;
		}
		return isValid;
	};

	orderHandler = event => {
		event.preventDefault();
		// console.log(this.props);
		let formData = {};
		for (let formElementIdentifier in this.state.orderForm) {
			formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
		}

		const order = {
			ingredients: this.props.ings,
			price: this.props.price,
			orderData: formData,
			userId: this.props.userId
		};
		console.log(order);
		console.log(this.props.token);
		this.props.onOrderBurger(this.props.token, order);
	};
	inputChangeHandler = (event, inputIdentifier) => {
		// console.log(event.target.value);
		const updatedOrderForm = {
			...this.state.orderForm
		};
		const updatedFromElement = {
			...updatedOrderForm[inputIdentifier]
		};
		//input value=''
		updatedFromElement.value = event.target.value;

		updatedFromElement.valid = this.checkValidity(updatedFromElement.value, updatedFromElement.validation);

		updatedFromElement.touched = true;

		updatedOrderForm[inputIdentifier] = updatedFromElement;

		console.log(updatedFromElement);

		let formIsValid = true;

		for (let inputIdentifier in updatedOrderForm) {
			formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
		}
		// console.log(formIsValid);

		this.setState({
			orderForm: updatedOrderForm,
			formIsValid: formIsValid
		});
	};
	render() {
		let formElementArray = [];
		for (let key in this.state.orderForm) {
			formElementArray.push({
				id: key,
				config: this.state.orderForm[key]
			});
		}
		let form = (
			<form onSubmit={this.orderHandler}>
				{formElementArray.map(formElement => {
					return (
						<Input
							key={formElement.id}
							elementConfig={formElement.config.elementConfig}
							elementType={formElement.config.elementType}
							value={formElement.config.value}
							change={event => this.inputChangeHandler(event, formElement.id)}
							invalid={!formElement.config.valid}
							shouldValidate={formElement.config.validation}
							touched={formElement.config.touched}
						/>
					);
				})}
				<Button btnType="Success" disabled={!this.state.formIsValid}>
					ORDER
				</Button>
			</form>
		);
		if (this.props.loading) {
			form = <Spinner />;
		}

		return (
			<div className={classes.ContactData}>
				<h4> Enter your Contact Data </h4>
				{form}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		ings: state.burgerBuilder.ingredients,
		price: state.burgerBuilder.totalPrice,
		loading: state.order.loading,
		token: state.auth.token,
		userId: state.auth.userId
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onOrderBurger: (token, orderData) => dispatch(orderActions.purchaseBurger(token, orderData))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withErrorHandler(ContactData, axios));
