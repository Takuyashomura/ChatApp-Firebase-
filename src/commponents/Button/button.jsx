import React from 'react';
import './button.css';

function Button(props){
    const onClickHandler = () => {
        if( typeof props.onClickHandler === 'function'){
            props.onClickHandler();
        };
    };

    return(
        <span className="button" onClick={ onClickHandler }>
            { props.children }
        </span>
    )
}

export default Button;