import React, { Component } from 'react';
import Order from "../.././components/Order/Order";
import { connect } from "react-redux";
import axios from "../../axios-order";
import * as actions from "../../store/actions/index";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Spinner from "../../components/UI/Spinner/Spinner";
class Orders extends Component {
    // state = {
    //     orders: [],
    //     loading: true
    // }
    componentDidMount() {
        this.props.onFeatchOrders()
    }

    render() {
        let orders = <Spinner />
        if (!this.props.loading) {
            orders = (
                <div>
                    {this.props.orders.map(order => (
                        <Order key={order.id}
                            ingredients={order.ingredients}
                            price={order.price}
                        />
                    ))}
                </div>
            )
        }
        return (
            orders
        );
    }
}

const mapStateToProps = (state) => {
    return {
        orders: state.order.orders,
        loading:state.order.loading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onFeatchOrders: () => dispatch(actions.fetchOrders())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));