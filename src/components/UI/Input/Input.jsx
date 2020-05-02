import React from 'react'
import classes from './Input.module.css'

const input=(props)=>{
    let input=null;
    switch(props.inputtype){
        case"input":
            input= <input className={classes.InputElement} {...props}/>
            break
        case'textarea':
            input= <textarea className={classes.InputElement} {...props} />
            break
        default:
            input= <input  className={classes.InputElement} {...props}/>
    }
    return(
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {input}
        </div>
    )
}
export default input;