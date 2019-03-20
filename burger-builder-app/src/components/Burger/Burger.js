import React from 'react';
import classes from './Burger.css'
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

const Burger = (props) => {
    let transformedIngredient = Object.keys(props.ingredients).map(igKey => {
        // console.log(transformedIngredient);
        // console.log(props.ingredients[igKey]);
        return [...Array(props.ingredients[igKey])].map((_, i) => {
            // console.log(igKey);
            return <BurgerIngredient key={igKey + i} type={igKey} />
        });
    }).reduce((arr, el) => {
        return arr.concat(el)
    }, []);
    // console.log(transformedIngredient);

    if (transformedIngredient.length === 0) {
        transformedIngredient = <p>Please start adding ingredient!</p>
    }


    return (
        <div className={classes.Burger} >
            <BurgerIngredient type='bread-top' />
            {transformedIngredient}
            {/* <BurgerIngredient type='cheese' />
            <BurgerIngredient type='meat' /> */}
            <BurgerIngredient type='bread-bottom' />
        </div>
    );
};

export default Burger;