import React, { useState } from "react";
import "./IdealWeightCalculator.css";

const IdealWeightCalculator = () => {
  const [height, setHeight] = useState("");
  const [gender, setGender] = useState("male");
  const [idealWeight, setIdealWeight] = useState(null);

  const calculateIdealWeight = () => {
    if (!height || height <= 0) {
      setIdealWeight("Please enter a valid height.");
      return;
    }

    const heightInInches = height / 2.54; 
    let baseWeight = gender === "male" ? 50 : 45.5;
    let extraInches = heightInInches - 60; 

    let devineWeight = baseWeight + extraInches * 2.3; 

    // BMI Range (18.5 - 24.9)
    const heightInMeters = height / 100;
    const minWeight = (18.5 * (heightInMeters ** 2)).toFixed(1);
    const maxWeight = (24.9 * (heightInMeters ** 2)).toFixed(1);

    setIdealWeight(
      `Devine Formula: ${devineWeight.toFixed(1)} kg | BMI Range: ${minWeight} - ${maxWeight} kg`
    );
  };

  return (
    <div className="maine2">
      <div className="ideal-container">
      <h2>Ideal Weight Calculator</h2>
      <div className="input-group">
        <label>Height (cm):</label>
        <input
          type="number"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          placeholder="Enter height in cm"
        />
      </div>

      <div className="input-group">
        <label>Gender:</label>
        <select value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>

      <button onClick={calculateIdealWeight} className="btn">Calculate</button>

      {idealWeight && <p className="result">{idealWeight}</p>}
    </div>
    </div>

  );
};

export default IdealWeightCalculator;
