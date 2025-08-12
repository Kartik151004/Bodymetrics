import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './M1.css';

function M1() {
  const navigate = useNavigate();

  const exercises = [
    {
      name: 'Push-Ups',
      description: 'A bodyweight exercise that strengthens your chest, shoulders, and arms.',
      image: 'https://i.pinimg.com/originals/7e/51/8f/7e518fbecfdebefe167b7d222a692efd.gif',
    },
    {
      name: 'Squats',
      description: 'A lower body workout that targets thighs, hips, and glutes.',
      image: 'https://cdna.artstation.com/p/assets/images/images/014/918/690/original/milo-beltramelli-ex09-squat.gif?1546273341',
    },
    {
      name: 'Plank',
      description: 'A core exercise that improves stability and posture.',
      image: 'https://assets-v2.lottiefiles.com/a/4b7998d8-1169-11ee-8186-73e36376f87a/cX71Ek2Ol2.gif',
    },
    {
      name: 'Deadlift',
      description: 'Improvements to strength and speed can be attained from the deadlift which translate to an increase in overall power.',
      image: 'https://i.pinimg.com/originals/b3/ae/fa/b3aefa18e3bb00c01725cf8fa2930de3.gif',
    },
    {
      name: 'Jumping Jacks',
      description: 'A cardio exercise that boosts heart rate and burns calories.',
      image: 'https://cdn.dribbble.com/userupload/23995967/file/original-b7327e47be94975940e98b26277e5ead.gif',
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % exercises.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + exercises.length) % exercises.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide,10000);
    return () => clearInterval(interval);
  }, );

  return (
    <div className="main-container">
      <header className="header">
        <h1>🌿 Health Conscious</h1>
        <p>Your daily companion for a healthier lifestyle</p>
      </header>

      <div className="button-section">
        <button onClick={() => navigate('/bmi-calculator')} className="btn">
          Check BMI
        </button>
        <button onClick={() => navigate('/calorie')} className="btn">
          Calorie Tracker
        </button>
        <button onClick={() => navigate('/idealweight')} className="btn">
          Ideal Weight Calculator
        </button>
      </div>

      <section className="exercise-section">
        <h2>🏋️ Learn Basic Exercises</h2>
        <div className="slider">
          <button className="nav-btn" onClick={prevSlide}>⬅</button>
          <div className="slide">
            <img src={exercises[currentSlide].image} alt={exercises[currentSlide].name} />
            <h3>{exercises[currentSlide].name}</h3>
            <p>{exercises[currentSlide].description}</p>
          </div>
          <button className="nav-btn" onClick={nextSlide}>➡</button>
        </div>
      </section>

      <footer className="footer">
        <p>© 2025 Health Conscious | Stay Healthy, Stay Happy!</p>
      </footer>
    </div>
  );
}

export default M1;
