import React from 'react';

import classes from './BulidControls.css';
import BulidControl from './BulidControl/BulidControl';
const controls = [
	{ label: 'Salad', type: 'salad' },
	{ label: 'Bacon', type: 'bacon' },
	{ label: 'Cheese', type: 'cheese' },
	{ label: 'Meat', type: 'meat' }
];

const bulidControls = props => {
	// console.log(props);

	return (
		<div className={classes.BuildControls}>
			<p>
				Current Price : <strong> {props.price.toFixed(2)}</strong>
			</p>
			{controls.map(ctrl => (
				<BulidControl
					key={ctrl.label}
					label={ctrl.label}
					added={() => props.ingredientAdded(ctrl.type)}
					removed={() => props.ingredientRemoved(ctrl.type)}
					disabled={props.disabled[ctrl.type]}
				/>
			))}
			<button disabled={!props.purchasable} className={classes.OrderButton} onClick={props.ordered}>
				{props.isAuth ? 'ORDER NOW' : 'SIGN UP TO ORDER'}
			</button>
		</div>
	);
};

export default bulidControls;
