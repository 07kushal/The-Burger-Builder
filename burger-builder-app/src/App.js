import React, { Component } from 'react';
import Layout from './hoc/Layouts/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './store/actions';

class App extends Component {
	componentDidMount() {
		this.props.tryAutoSignUp();
	}

	render() {
		let routes = (
			<Switch>
				<Route path="/" exact component={BurgerBuilder} />
				<Route path="/auth" component={Auth} />
				<Redirect to="/" />
			</Switch>
		);
		if (this.props.isAuthenticated) {
			routes = (
				<Switch>
					<Route path="/" exact component={BurgerBuilder} />
					<Route path="/checkout" component={Checkout} />
					<Route path="/orders" component={this.props.isAuthenticated ? Orders : BurgerBuilder} />
					<Route path="/logout" component={Logout} />
					<Route path="/auth" component={Auth} />
					<Redirect to="/" />
				</Switch>
			);
		}
		return (
			<div>
				<Layout>{routes}</Layout>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		isAuthenticated: state.auth.token !== null
	};
};
const mapDispatchToProps = dispatch => {
	return {
		tryAutoSignUp: () => dispatch(actions.checkAuthState())
	};
};
export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(App)
);
