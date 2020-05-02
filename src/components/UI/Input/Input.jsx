import React from 'react'
import classes from './Input.module.css'

const input=(props)=>{
    let input=null;
    let inputClasses=[classes.InputElement]
    if(props.invalid && props.validations && props.touched){
        inputClasses.push(classes.Invalid);
    }
    switch(props.elementType){
        case"input":
            input= <input className={inputClasses.join(' ')} {...props.elementConfig} onChange={props.changed} value={props.value} />
            break;
        case"textarea":
            input= <textarea className={inputClasses.join(' ')} {...props.elementConfig} onChange={props.changed} value={props.value} />
            break;
        case "select":
            input= <select value={props.value} onChange={props.changed} className={inputClasses.join(' ')}>
                {props.elementConfig.options.map(option=>(
                    <option key={option.value} value={option.value}>{option.displayValue}</option>
                ))}
            </select>
            break;
        default:
            input= <input  className={inputClasses.join(' ')} onChange={props.changed} {...props.elementConfig} value={props.value} />
    }
    return(
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {input}
        </div>
    )
}
export default input;