/** @format */
import React, { useState } from "react";
import Navbar from './Navbar.jsx';
import "./CalorieCalculator.css";
const CalorieCalculator = () => {
  const [gender, setGender] = useState("male");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [activityLevel, setActivityLevel] = useState(1.2);
  const [bmr, setBmr] = useState(0);
  const [tdee, setTdee] = useState(0);

  const calculateCalories = (e) => {
    e.preventDefault();

    let calculatedBMR = 0;
    
    if (gender === "male") {
      calculatedBMR = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      calculatedBMR = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    const calculatedTDEE = calculatedBMR * activityLevel;
    setBmr(calculatedBMR.toFixed(0));
    setTdee(calculatedTDEE.toFixed(0));
  };

  return (
    <div className="page">
      <div className="maine1">
      <h1 className="main-title">Calorie Calculator</h1>

      <div className="content">
        
        <div className="card">
          <form onSubmit={calculateCalories}>
            <div className="form-group">
              <label>Gender:</label>
              <select value={gender} onChange={(e) => setGender(e.target.value)}>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            <div className="form-group">
              <label>Age (years):</label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
                placeholder="Enter your age"
              />
            </div>

            <div className="form-group">
              <label>Weight (kg):</label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                required
                placeholder="Enter your weight in kg"
              />
            </div>

            <div className="form-group">
              <label>Height (cm):</label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                required
                placeholder="Enter your height in cm"
              />
            </div>

            <div className="form-group">
              <label>Activity Level:</label>
              <select
                value={activityLevel}
                onChange={(e) => setActivityLevel(Number(e.target.value))}
              >
                <option value={1.2}>Sedentary (little/no exercise)</option>
                <option value={1.375}>Lightly Active (light exercise)</option>
                <option value={1.55}>Moderately Active (moderate exercise)</option>
                <option value={1.725}>Very Active (hard exercise)</option>
                <option value={1.9}>Extra Active (very hard exercise)</option>
              </select>
            </div>

            <button type="submit" className="btn">Calculate</button>
          </form>

          <div className="results">
            <h3>BMR: <span>{bmr} kcal/day</span></h3>
            <h3>TDEE: <span>{tdee} kcal/day</span></h3>
          </div>
        </div>
        

        
<div className="image-container">
  <img
    src="https://macrofactorapp.com/wp-content/uploads/2024/09/9-Normal-rangeBMR_Image-1.png"
    alt="BMR Range"
    className="bmr-image"
  />
  <img
    src="https://cdn.prod.website-files.com/674177daacf9bfe2dd82ac50/6799f26359ea2e1651229d62_674177daacf9bfe2dd82b6fc_tdee-calculation-table-based-on-physical-activity.png"
    alt="TDEE"
    className="bmr-image1"
  />
</div>

        </div>
        </div>
    </div>
  );
};

export default CalorieCalculator;
