import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';

const HomePage = () => {
  const symptomsList = [
    'itching', 'skin_rash', 'nodal_skin_eruptions', 'continuous_sneezing', 'shivering',
    'chills', 'joint_pain', 'stomach_pain', 'acidity', 'ulcers_on_tongue', 'muscle_wasting',
    'vomiting', 'burning_micturition', 'spotting_urination', 'fatigue', 'weight_gain',
    'anxiety', 'cold_hands_and_feets', 'mood_swings', 'weight_loss', 'restlessness',
    'lethargy', 'patches_in_throat', 'irregular_sugar_level', 'cough', 'high_fever',
    'sunken_eyes', 'breathlessness', 'sweating', 'dehydration', 'indigestion', 'headache',
    'yellowish_skin', 'dark_urine', 'nausea', 'loss_of_appetite', 'pain_behind_the_eyes',
    'back_pain', 'constipation', 'abdominal_pain', 'diarrhoea', 'mild_fever', 'yellow_urine',
    'yellowing_of_eyes', 'acute_liver_failure', 'fluid_overload', 'swelling_of_stomach',
    'swelled_lymph_nodes', 'malaise', 'blurred_and_distorted_vision', 'phlegm',
    'throat_irritation', 'redness_of_eyes', 'sinus_pressure', 'runny_nose', 'congestion',
    'chest_pain', 'weakness_in_limbs', 'fast_heart_rate', 'pain_during_bowel_movements',
    'pain_in_anal_region', 'bloody_stool', 'irritation_in_anus', 'neck_pain', 'dizziness',
    'cramps', 'bruising', 'obesity', 'swollen_legs', 'swollen_blood_vessels',
    'puffy_face_and_eyes', 'enlarged_thyroid', 'brittle_nails', 'swollen_extremeties',
    'excessive_hunger', 'drying_and_tingling_lips', 'slurred_speech', 'knee_pain',
    'hip_joint_pain', 'muscle_weakness', 'stiff_neck', 'swelling_joints', 'movement_stiffness',
    'spinning_movements', 'loss_of_balance', 'unsteadiness', 'weakness_of_one_body_side',
    'loss_of_smell', 'bladder_discomfort', 'foul_smell_of_urine', 'continuous_feel_of_urine',
    'passage_of_gases', 'internal_itching', 'depression', 'irritability', 'muscle_pain',
    'belly_pain', 'abnormal_menstruation', 'watering_from_eyes', 'increased_appetite',
    'family_history', 'mucoid_sputum', 'lack_of_concentration', 'visual_disturbances',
    'receiving_blood_transfusion', 'receiving_unsterile_injections', 'coma', 'stomach_bleeding',
    'distention_of_abdomen', 'history_of_alcohol_consumption', 'blood_in_sputum',
    'prominent_veins_on_calf', 'palpitations', 'painful_walking', 'pus_filled_pimples',
    'blackheads', 'scurring', 'skin_peeling', 'blister', 'red_sore_around_nose'
  ];

  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredSymptoms, setFilteredSymptoms] = useState([]);
  const [transcription, setTranscription] = useState('');
  const [predictedDisease, setPredictedDisease] = useState(null);
  const [resultData, setResultData] = useState({
    description: '',
    precautions: [],
    medications: [],
    workouts: [],
    diets: []
  });
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('disease');

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredSymptoms([]);
    } else {
      const filtered = symptomsList
        .filter(symptom => 
          symptom.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .slice(0, 5);
      setFilteredSymptoms(filtered);
    }
  }, [searchTerm]);

  const startSpeechRecognition = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.lang = 'en-US';

      recognition.onresult = (event) => {
        const result = event.results[0][0].transcript;
        setTranscription(result);
        const spokenSymptoms = symptomsList.filter(symptom => 
          result.toLowerCase().includes(symptom.toLowerCase())
        );
        if (spokenSymptoms.length > 0) {
          setSelectedSymptoms([...new Set([...selectedSymptoms, ...spokenSymptoms])]);
        }
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error', event.error);
      };

      recognition.start();
    } else {
      alert('Speech recognition not supported in your browser');
    }
  };

  const handleSymptomSelect = (symptom) => {
    if (!selectedSymptoms.includes(symptom)) {
      setSelectedSymptoms([...selectedSymptoms, symptom]);
    }
    setSearchTerm('');
    setFilteredSymptoms([]);
  };

  const removeSymptom = (symptomToRemove) => {
    setSelectedSymptoms(selectedSymptoms.filter(symptom => symptom !== symptomToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (selectedSymptoms.length === 0) {
        throw new Error("Please select at least one symptom");
      }

      const response = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ symptoms: selectedSymptoms })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      
      setPredictedDisease(data.Disease);
      setResultData({
        description: data.description,
        precautions: data.precautions,
        medications: data.medications,
        workouts: data.workout,
        diets: data.diet
      });
      setActiveTab('disease');
    } catch (error) {
      console.error("Error:", error);
      alert(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'disease':
        return (
          <div className="text-center py-4">
            <h2 className="display-4 mb-4">Predicted Disease</h2>
            <div className="p-4 bg-light rounded">
              <p className="display-5 text-primary">{predictedDisease}</p>
            </div>
          </div>
        );
      case 'description':
        return (
          <div className="p-4">
            <h2 className="text-center mb-4">Description</h2>
            <div className="p-4 bg-light rounded" style={{ minHeight: '200px' }}>
              <p className="lead">{resultData.description}</p>
            </div>
          </div>
        );
      case 'precautions':
        return (
          <div className="p-4">
            <h2 className="text-center mb-4">Precautions</h2>
            <div className="list-group">
              {resultData.precautions.map((item, index) => (
                <div key={index} className="list-group-item list-group-item-action">
                  <i className="bi bi-check-circle-fill text-success me-2"></i>
                  {item}
                </div>
              ))}
            </div>
          </div>
        );
      case 'medications':
        return (
          <div className="p-4">
            <h2 className="text-center mb-4">Medications</h2>
            <div className="list-group">
              {resultData.medications.map((item, index) => (
                <div key={index} className="list-group-item list-group-item-action">
                  <i className="bi bi-capsule text-primary me-2"></i>
                  {item}
                </div>
              ))}
            </div>
          </div>
        );
      case 'workouts':
        return (
          <div className="p-4">
            <h2 className="text-center mb-4">Workouts</h2>
            <div className="list-group">
              {resultData.workouts.map((item, index) => (
                <div key={index} className="list-group-item list-group-item-action">
                  <i className="bi bi-activity text-info me-2"></i>
                  {item}
                </div>
              ))}
            </div>
          </div>
        );
      case 'diets':
        return (
          <div className="p-4">
            <h2 className="text-center mb-4">Diets</h2>
            <div className="list-group">
              {resultData.diets.map((item, index) => (
                <div key={index} className="list-group-item list-group-item-action">
                  <i className="bi bi-egg-fried text-warning me-2"></i>
                  {item}
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100" style={{ backgroundColor: '#f8f9fa' }}>
      <Navbar />
      
      <div className="container-fluid flex-grow-1 py-4">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card shadow-lg mb-4">
              <div className="card-header bg-primary text-white">
                <h1 className="text-center mb-0">Health Care Center</h1>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="symptoms" className="form-label">Select Symptoms:</label>
                    <div className="input-group mb-2">
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        id="symptoms"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search for symptoms..."
                      />
                      <button
                        type="button"
                        onClick={startSpeechRecognition}
                        className="btn btn-outline-secondary"
                        title="Voice Input"
                      >
                        <i className="bi bi-mic-fill"></i>
                      </button>
                    </div>
                    
                    <div className="d-flex flex-wrap gap-2 mb-3">
                      {selectedSymptoms.map((symptom, index) => (
                        <span key={index} className="badge bg-primary d-flex align-items-center">
                          {symptom.replace(/_/g, ' ')}
                          <button 
                            type="button" 
                            className="btn-close btn-close-white ms-2" 
                            style={{ fontSize: '0.5rem' }}
                            onClick={() => removeSymptom(symptom)}
                            aria-label="Remove"
                          ></button>
                        </span>
                      ))}
                    </div>
                    
                    {filteredSymptoms.length > 0 && (
                      <div className="list-group" style={{ position: 'absolute', zIndex: 1000, width: 'calc(100% - 30px)' }}>
                        {filteredSymptoms.map((symptom, index) => (
                          <button
                            key={index}
                            type="button"
                            className="list-group-item list-group-item-action"
                            onClick={() => handleSymptomSelect(symptom)}
                          >
                            {symptom.replace(/_/g, ' ')}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  {transcription && (
                    <div className="alert alert-info mb-3">
                      <small>Voice input:</small>
                      <p className="mb-0">{transcription}</p>
                    </div>
                  )}
                  
                  <button
                    type="submit"
                    className="btn btn-danger btn-lg w-100 py-3"
                    disabled={loading || selectedSymptoms.length === 0}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Predicting...
                      </>
                    ) : (
                      'Predict Disease'
                    )}
                  </button>
                </form>
              </div>
            </div>

            {predictedDisease && (
              <div className="card shadow-lg">
                <div className="card-header bg-primary text-white py-3">
                  <div className="d-flex flex-wrap justify-content-center gap-2">
                    {['disease', 'description', 'precautions', 'medications', 'diets', 'workouts'].map((tab) => (
                      <button
                        key={tab}
                        className={`btn btn-sm ${activeTab === tab ? 'btn-light' : 'btn-outline-light'}`}
                        onClick={() => setActiveTab(tab)}
                      >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="card-body p-0">
                  {renderContent()}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <footer className="bg-dark text-white text-center py-3">
        <div className="container">
          <p className="mb-0">© {new Date().getFullYear()} Health Care Center - AI Disease Prediction System</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;