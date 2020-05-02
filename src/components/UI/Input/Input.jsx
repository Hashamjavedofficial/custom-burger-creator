import React from 'react'
import classes from './Input.module.css'

const input=(props)=>{
    let input=null;
    switch(props.elementType){
        case"input":
            input= <input className={classes.InputElement} {...props.elementConfig} value={props.value} />
            break
        case'textarea':
            input= <textarea className={classes.InputElement} {...props.elementConfig} value={props.value} />
            break
        default:
            input= <input  className={classes.InputElement} {...props.elementConfig} value={props.value} />
    }
    return(
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {input}
        </div>
    )
}
export default input;