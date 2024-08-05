// src/components/FormStep1.js
import React from 'react';

const FormStep1 = ({ name, handleChange, nextStep }) => {
    return (
        <div>
            <h2>Step 1: Character Name</h2>
            <label>
                Name:
                <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={handleChange}
                />
            </label>
            <button onClick={nextStep}>Next</button>
        </div>
    );
};

export default FormStep1;
