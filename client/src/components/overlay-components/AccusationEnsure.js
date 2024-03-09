import React, { useState } from 'react';

//Component to ensure the user wants to make an accusation
const AccusationEnsure = ({onYes, onNo}) => {    
    return(
        <div className='accusation-ensure'>
            <p style={{fontWeight: 'bold', margin: '5px'}}>Are you sure you want to make this accusation?</p>
            <p>If you are incorrect you will lose.</p>
            <div className='accusation-ensure-button-container'>
                <button onClick={() => onYes(true)}>Yes</button>
                <button onClick={() => onNo(false)}>No</button>
            </div>
        </div>
    );
};

export default AccusationEnsure;