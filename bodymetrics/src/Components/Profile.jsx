import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Profile.css';

function Profile() {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [quote, setQuote] = useState("");
    
    
    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("male");
    const [activityLevel, setActivityLevel] = useState(1.2);

    
    const [bmi, setBmi] = useState(null);
    const [bmr, setBmr] = useState(null);
    const [tdee, setTdee] = useState(null);
    const [idealWeight, setIdealWeight] = useState(null);
    const [suggestions, setSuggestions] = useState([]);

    const motivationalQuotes = [
        "Take care of your body. It’s the only place you have to live. – Jim Rohn",
        "Health is not just about what you're eating. It’s also about what you’re thinking and saying.",
        "You don’t have to be extreme, just consistent.",
        "A fit body, a calm mind, a house full of love. These things cannot be bought – they must be earned.",
        "Small steps every day lead to big results.",
        "Your body deserves the best. Don’t compromise on your health.",
        "Strive for progress, not perfection.",
        "The groundwork of all happiness is good health. – Leigh Hunt"
    ];

    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
        setQuote(motivationalQuotes[randomIndex]);

        async function fetchUser() {
            try {
                const userId = localStorage.getItem('id') || id || "defaultId";
                const response = await fetch(`http://localhost:8001/api/auth/user/${userId}`);
                const data = await response.json();
                if (data.success) {
                    setUser(data.user);
                } else {
                    console.error('Failed to fetch user:', data.message);
                }
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        }

        fetchUser();
    }, [id]);

    const calculateHealthStats = () => {
        if (!height || !weight || !age) {
            alert("Please enter height, weight, and age.");
            return;
        }

        
        const heightM = height / 100;
        const calculatedBmi = weight / (heightM * heightM);
        setBmi(calculatedBmi.toFixed(2));

        
        let calculatedBmr = gender === "male"
            ? 10 * weight + 6.25 * height - 5 * age + 5
            : 10 * weight + 6.25 * height - 5 * age - 161;
        setBmr(calculatedBmr.toFixed(0));

        
        const calculatedTdee = calculatedBmr * activityLevel;
        setTdee(calculatedTdee.toFixed(0));

        const heightInInches = height / 2.54;
        let baseWeight = gender === "male" ? 50 : 45.5;
        let extraInches = heightInInches - 60;
        let devineWeight = baseWeight + extraInches * 2.3;
        const minWeight = (18.5 * (heightM ** 2)).toFixed(1);
        const maxWeight = (24.9 * (heightM ** 2)).toFixed(1);
        setIdealWeight(`${devineWeight.toFixed(1)} kg |  Range: ${minWeight} - ${maxWeight} kg`);

        const tips = [];
        if (calculatedBmi < 18.5) tips.push("You are underweight. Consider increasing calorie intake and strength training.");
        else if (calculatedBmi >= 25) tips.push("You are overweight. Consider a balanced diet and regular cardio.");
        else tips.push("Your BMI is in a healthy range. Maintain your current lifestyle!");

        if (calculatedTdee < 1800) tips.push("Your daily energy needs are low — ensure nutrient-rich meals.");
        else if (calculatedTdee > 2500) tips.push("High daily energy needs — stay hydrated and balance macros.");

        setSuggestions(tips);
    };

    if (!user) {
        return <div className="loading">Loading Profile...</div>;
    }

    return (
        <div>
            <div className="profile-container">
                <div className="profile-card">
                    <h1>👤 User Profile</h1>
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                </div>

                
                <div className="health-inputs">
                    <h2>📊 Your Health Data</h2>
                    <input type="number" placeholder="Height (cm)" value={height} onChange={e => setHeight(e.target.value)} />
                    <input type="number" placeholder="Weight (kg)" value={weight} onChange={e => setWeight(e.target.value)} />
                    <input type="number" placeholder="Age" value={age} onChange={e => setAge(e.target.value)} />
                    <select value={gender} onChange={e => setGender(e.target.value)}>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                    <select value={activityLevel} onChange={e => setActivityLevel(Number(e.target.value))}>
                        <option value={1.2}>Sedentary</option>
                        <option value={1.375}>Lightly Active</option>
                        <option value={1.55}>Moderately Active</option>
                        <option value={1.725}>Very Active</option>
                        <option value={1.9}>Extra Active</option>
                    </select>
                    <button onClick={calculateHealthStats} className="btn">Check My Health</button>
                </div>

                
                {bmi && (
                    <div className="results-section">
                        <h2>📈 Health Results</h2>
                        <p><strong>BMI:</strong> {bmi} kg/m²</p>
                        <p><strong>BMR:</strong> {bmr} kcal/day</p>
                        <p><strong>TDEE:</strong> {tdee} kcal/day</p>
                        <p><strong>Ideal Weight:</strong> {idealWeight}</p>
                    </div>
                )}

                
                {suggestions.length > 0 && (
                    <div className="suggestions-section">
                        <h2>💡 Health Suggestions</h2>
                        <ul>
                            {suggestions.map((tip, index) => (
                                <li key={index}>{tip}</li>
                            ))}
                        </ul>
                    </div>
                )}

                
                <div className="health-section">
                    <h2>🩺 Daily Health Recommendations</h2>
                    <ul>
                        <li>💧 Drink at least 8-10 glasses of water</li>
                        <li>🚶‍♂️ Aim for 10,000 steps daily</li>
                        <li>🛌 Get 7–8 hours of sleep</li>
                        <li>🥗 Include vegetables & fruits in meals</li>
                        <li>🧘‍♀️ Take 10 mins for mindfulness/meditation</li>
                    </ul>
                </div>

                
                <div className="quote-section">
                    <h2>💡 Daily Motivation</h2>
                    <blockquote>“{quote}”</blockquote>
                </div>
            </div>

            <footer className="footer">
                <p>© 2025 Health Conscious | Stay Healthy, Stay Happy!</p>
            </footer>
        </div>
    );
}

export default Profile;
