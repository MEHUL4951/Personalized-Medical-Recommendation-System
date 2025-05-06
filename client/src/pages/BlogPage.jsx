import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../components/Navbar';

const BlogPost = () => {
  return (
    <>
      <Navbar />
      <div className="container py-4">

        {/* Header */}
        <div className="text-center mb-4">
          <h2 className="fw-bold">Building a Symptom-Based Disease Diagnosis Web App with Flask and Machine Learning</h2>
        </div>

        {/* Introduction */}
        <p className="mb-3">
          In the age of technology and information, access to accurate and timely healthcare is more critical than ever. With the increasing importance of remote healthcare solutions, we embarked on a journey to develop a symptom-based disease diagnosis web application. Leveraging Flask for the backend and a Decision Tree Classifier model, we created a user-friendly platform that can help users identify potential illnesses based on their reported symptoms.
        </p>

        {/* Problem Section */}
        <h4 className="mt-4">The Problem</h4>
        <p className="mb-3">
          The project began with recognizing a common issue: people often experience symptoms and want quick answers about their health concerns. It can be challenging to differentiate between various diseases, especially when symptoms overlap. Our goal was to provide a convenient solution for users to input their symptoms and receive potential diagnoses.
        </p>

        {/* Solution Section */}
        <h4 className="mt-4">The Solution</h4>
        <p className="mb-3">
          We developed a web app that allows users to enter a list of symptoms they are experiencing. The app then uses a pre-trained Decision Tree Classifier model to predict the most likely disease based on the provided symptoms. Here's how it works:
        </p>

        <ul className="mb-3">
          <li>Users select symptoms from a predefined list.</li>
          <li>The selected symptoms are fed into the machine learning model.</li>
          <li>The model analyzes the symptoms and predicts the possible disease.</li>
          <li>Results are shown along with basic disease information and suggestions.</li>
        </ul>

        {/* Key Features */}
        <h4 className="mt-4">Key Features</h4>
        <ul className="mb-3">
          <li>Simple and intuitive user interface.</li>
          <li>Quick predictions using a trained ML model.</li>
          <li>Basic disease information and guidance provided.</li>
          <li>Backend built with Flask, Frontend using HTML/CSS/JS.</li>
        </ul>

        {/* Conclusion */}
        <h4 className="mt-4">Conclusion</h4>
        <p className="mb-2">
          Our Symptom-Based Disease Diagnosis Web App brings the power of machine learning and healthcare information to the fingertips of users. It bridges the gap between technology and health awareness, providing a helpful resource for preliminary health analysis.
        </p>

      </div>
    </>
  );
};

export default BlogPost;
