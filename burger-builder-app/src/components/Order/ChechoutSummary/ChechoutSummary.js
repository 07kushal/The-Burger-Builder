import React from 'react';
import Burger from "../../Burger/Burger";

import Button from '../../UI/Button/Button';
import classes from './ChechoutSummary.css'
const ChechoutSummary = (props) => {
    console.log(props.ingredients);
    
    return (
        <div className={classes.ChechoutSummary}>
            <h1>We Hope it tastes well!</h1>
            <div style={{ width: '100%' , margin: 'auto' }}>
                <Burger ingredients={props.ingredients} />
            </div>
            <Button
                btnType='Danger'
                clicked={props.chechoutCancelled}>CANCEL</Button>
            <Button
                btnType='Success'
                clicked={props.chechoutContinued}>CONTINUE</Button>
        </div>
    );
};

export default ChechoutSummary;