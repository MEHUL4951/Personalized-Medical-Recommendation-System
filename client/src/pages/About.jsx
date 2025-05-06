import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../components/Navbar.jsx';

const About = () => {
  return (
    <>
      <Navbar />
      <div className="container py-4">
        <h2 className="mb-4 text-center">About Us</h2>

        <p className="mb-4">
          Welcome to <strong>Medical Health Center</strong>, where health meets technology for a brighter, healthier future.
        </p>

        <h4 className="mt-4">Our Vision</h4>
        <p className="mb-3">
          We envision a world where access to healthcare information is not just a luxury but a fundamental right. Our journey began with a simple yet powerful idea: to empower individuals with the knowledge and tools they need to take control of their health.
        </p>

        <h4 className="mt-4">Who We Are</h4>
        <p className="mb-3">
          We are a passionate team of healthcare professionals, data scientists, and technology enthusiasts who share a common goal: to make healthcare accessible, understandable, and personalized for you.
        </p>

        <h4 className="mt-4">Our Mission</h4>
        <p className="mb-3">
          At Medical Health Center, our mission is to provide you with a seamless and intuitive platform that leverages the power of AI and machine learning. We want to assist you in identifying potential health concerns based on your reported symptoms, offering educational resources to enhance your health literacy.
        </p>

        <h4 className="mt-4">How We Do It</h4>
        <p className="mb-3">
          Our platform uses a robust machine learning model trained on a vast dataset of symptoms and diseases. By inputting your symptoms, our system generates accurate predictions about potential illnesses, allowing you to make informed health decisions.
        </p>

        <h4 className="mt-4">Your Well-being, Our Priority</h4>
        <p className="mb-3">
          Your health is our top priority. We provide not only accurate predictions but also comprehensive information about diseases — including descriptions, precautions, medications, dietary advice, and workout tips.
        </p>

        <h4 className="mt-4">Join Us on this Journey</h4>
        <p className="mb-3">
          Explore our platform, engage with educational content, and take control of your health journey. Together, we can revolutionize how individuals access and understand healthcare information.
        </p>
      </div>
    </>
  );
};

export default About;
