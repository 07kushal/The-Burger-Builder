import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';
const navigationItems = props => {
	return (
		<ul className={classes.NavigationItems}>
			<NavigationItem link="/" exact>
				Burger Bulider
			</NavigationItem>
			{props.isAuthenticated ? <NavigationItem link="/orders">Orders</NavigationItem> : null}
			{!props.isAuthenticated ? (
				<NavigationItem link="/auth">Authenticate</NavigationItem>
			) : (
				<NavigationItem link="/logout">Logout</NavigationItem>
			)}
			{/* <NavigationItem></NavigationItem> */}
		</ul>
	);
};

export default navigationItems;
