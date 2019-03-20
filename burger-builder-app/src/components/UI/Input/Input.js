import React from 'react';
import classes from './Input.css';
const Input = (props) => {
    // console.log(props);
    
    let inputElement = null;
    let inputClasses = [classes.InputElement]
    if(props.invalid && props.shouldValidate && props.touched){
        inputClasses.push(classes.Invalid)
    }
    switch (props.elementType) {
        case ('input'):
            inputElement = <input
                className={inputClasses.join(' ')}
                onChange={props.change}
                {...props.elementConfig}
                value={props.value} />;
            break
        case ('textarea'):
            inputElement = <textarea
                className={inputClasses.join(' ')}
                onChange={props.change}
                {...props.elementConfig}
                value={props.value} />;
            break
        case ('select'):
            inputElement = (
                <select
                    className={inputClasses.join(' ')}
                    onChange={props.change}
                    value={props.value}>
                    {props.elementConfig.options.map(opt=>{
                        return(
                            <option key={opt.value} value={opt.value} >{opt.displayValue}</option>
                        )
                    })}
                </select>
            );
            break
        default:
            inputElement = <input
                className={inputClasses.join(' ')}
                onChange={props.change}
                {...props.elementConfig}
                value={props.value} />
    }
    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    )
}
export default Input;                                                                                                                 