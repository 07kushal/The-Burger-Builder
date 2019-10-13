import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';
import Spinner from '../../components/UI/Spinner/Spinner';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import * as actions from '../../store/actions';
class Auth extends Component {
	state = {
		controls: {
			email: {
				elementType: 'input',
				elementConfig: {
					type: 'type',
					placeholder: 'Mail Address'
				},
				value: '',
				validation: {
					required: true,
					isEmail: true
				},
				valid: false,
				touched: false
			},
			password: {
				elementType: 'input',
				elementConfig: {
					type: 'password',
					placeholder: 'Password'
				},
				value: '',
				validation: {
					required: true,
					minLength: 6
				},
				valid: false,
				touched: false
			}
		},
		isSignUp: true
	};
	inputChangeHandler = (event, controlName) => {
		// console.log(event.target.value);
		const updatedControls = {
			...this.state.controls,
			[controlName]: {
				...this.state.controls[controlName],
				value: event.target.value,
				valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
				touched: true
			}
		};
		this.setState({ controls: updatedControls });
	};

	componentDidMount() {
		if (!this.props.isBurgerBuilding && this.props.authRedirectPath !== '/') {
			this.props.onSetRedirectPath('/checkout');
		}
	}

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

	switchAuthModeHandler = () => {
		this.setState(prevState => {
			return { isSignUp: !prevState.isSignUp };
		});
	};

	submitHandler = event => {
		// console.log(this.state.controls.email.value, this.state.controls.password.value);
		event.preventDefault();
		this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp);
	};
	render() {
		let formElementArray = [];
		for (let key in this.state.controls) {
			formElementArray.push({
				id: key,
				config: this.state.controls[key]
			});
		}
		let errorMessage = null;
		if (this.props.error) {
			errorMessage = <p>{this.props.error.message}</p>;
		}
		let authRedirect = null;
		if (this.props.isAuthenticated) {
			// authRedirect = <Redirect to="/" />;
			authRedirect = <Redirect to={this.props.authRedirectPath} />;
		}
		let form = formElementArray.map(formElement => (
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
		));
		if (this.props.loading) {
			form = <Spinner />;
		}
		return (
			<div className={classes.Auth}>
				{authRedirect}
				<form onSubmit={this.submitHandler}>
					{errorMessage}
					{form}
					<Button btnType="Success">SUBMIT</Button>
				</form>
				<Button clicked={this.switchAuthModeHandler} btnType="Danger">
					SWITCH TO {this.state.isSignUp ? 'SIGNIN' : 'SIGNUP'}
				</Button>
			</div>
		);
	}
}
const mapStateToProps = state => {
	return {
		loading: state.auth.loading,
		error: state.auth.error,
		isAuthenticated: state.auth.token !== null,
		isBurgerBuilding: state.burgerBuilder.building,
		authRedirectPath: state.auth.authRedirectPath
	};
};
const mapDispatchToProps = dispatch => {
	return {
		onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
		onSetRedirectPath: path => dispatch(actions.setAuthRedirectPath(path))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Auth);
