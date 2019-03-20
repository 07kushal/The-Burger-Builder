import React, { Component } from 'react';
import { connect } from "react-redux";
import ChechoutSummary from "../../components/Order/ChechoutSummary/ChechoutSummary";
import { Route, Redirect } from "react-router-dom";
import ContactData from "../Checkout/ContactData/ContactData";
class Checkout extends Component {
    chechoutCancelledHandler = () => {
        this.props.history.goBack();
    }
    chechoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        let summary = <Redirect to="/" />
        if (this.props.ings) {
            const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null
            summary = (
                <div>
                    {purchasedRedirect}
                    <ChechoutSummary
                        chechoutCancelled={this.chechoutCancelledHandler}
                        chechoutContinued={this.chechoutContinuedHandler}
                        ingredients={this.props.ings} />
                    <Route
                        path={this.props.match.path + '/contact-data'}
                        component={ContactData}
                    />
                </div>
            )
        }
        return (
            summary
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
        // price: state.burgerBuilder.totalPrice
    }
}
export default connect(mapStateToProps)(Checkout);