import React, { useState } from 'react';
import Navbar from './Navbar.jsx';
import './Calculation.css';

function Calculation() {
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [bmi, setBmi] = useState(null);

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!height || !weight) {
            alert("Please enter both height and weight.");
            return;
        }

        const heightInMeters = height / 100;
        const calculatedBmi = weight / (heightInMeters * heightInMeters);

        setBmi(calculatedBmi);
    };

    return (
        <div>
            <div className='maine'>
                <div className="main_bmi">
                    <div>
                        <h1>BMI Calculator</h1>
                        <form className="bmi_form" onSubmit={handleSubmit}>
                            <label>
                                Height (cm): 
                                <input 
                                    type="number" 
                                    value={height} 
                                    onChange={(e) => setHeight(e.target.value)} 
                                    placeholder="Enter height in cm" 
                                />
                            </label>
                            <label>
                                Weight (kg): 
                                <input 
                                    type="number" 
                                    value={weight} 
                                    onChange={(e) => setWeight(e.target.value)} 
                                    placeholder="Enter weight in kg" 
                                />
                            </label>
                            <button className="btn" type="submit">Calculate BMI</button>
                        </form>

                        {bmi !== null && (
                            <p className="result">
                                <span>Result:</span> Your BMI is {bmi.toFixed(2)} kg/m²
                            </p>
                        )}

                        <img 
                            className="bmi_image" 
                            src="https://www.trifectanutrition.com/hs-fs/hubfs/BMI-chart-ranges.jpg?width=1000&height=500&name=BMI-chart-ranges.jpg" 
                            alt="BMI Chart" 
                        />
                    </div>
                </div>
            </div>    
        </div>
    );
}

export default Calculation;
