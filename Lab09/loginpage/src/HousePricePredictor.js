import React, { useState } from 'react';

const HousePricePredictor = () => {
  // State for form fields
  const [city, setCity] = useState('');
  const [province, setProvince] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [leaseTerm, setLeaseTerm] = useState('');
  const [type, setType] = useState('');
  const [beds, setBeds] = useState('');
  const [baths, setBaths] = useState('');
  const [sqFeet, setSqFeet] = useState('');
  const [furnishing, setFurnishing] = useState('Unfurnished');
  const [smoking, setSmoking] = useState('');
  const [pets, setPets] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState('');


  const containerStyle = {
    maxWidth: '600px',
    padding: '24px',
    margin: '40px auto',
    border: '1px solid lightgray',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  };

  const formGroupStyle = {
    marginBottom: '12px',

  };

  const labelStyle = {
    display: 'block',
    marginBottom: '4px'
  };

  const inputStyle = {
    width: '100%',
    padding: '8px',
    border: '1px solid lightgray',
    borderRadius: '4px'
  };

  const buttonStyle = {
    backgroundColor: '#007BFF',
    color: '#fff',
    padding: '12px 24px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    width: '100%',
  };

  const resultStyle = {
    marginTop: '16px',
    backgroundColor: '#DFF0D8',
    border: '1px solid #3C763D',
    padding: '12px',
    borderRadius: '4px',
    fontWeight: 'bold'
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setPrediction(null);


    const requestData = {
      city,
      province,
      latitude,
      longitude,
      lease_term: leaseTerm,
      type,
      beds,
      baths,
      sq_feet: sqFeet,
      furnishing,
      smoking,
      pets
    };

    try {
      const response = await fetch('http://localhost:5000/predict_house_price', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData)
      });

      if (response.ok) {
        const data = await response.json();

        setPrediction(data.predicted_price);
      } else {
        setError('Prediction failed. Please check your input.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div style={containerStyle}>
      <h2>House Price Predictor</h2>
      <form onSubmit={handleSubmit}>
        <div style={formGroupStyle}>
          <label style={labelStyle}>City:</label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            style={inputStyle}
            required
          />
        </div>
        <div style={formGroupStyle}>
          <label style={labelStyle}>Province:</label>
          <input
            type="text"
            value={province}
            onChange={(e) => setProvince(e.target.value)}
            style={inputStyle}
            required
          />
        </div>
        <div style={formGroupStyle}>
          <label style={labelStyle}>Latitude:</label>
          <input
            type="number"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            style={inputStyle}
            required
          />
        </div>
        <div style={formGroupStyle}>
          <label style={labelStyle}>Longitude:</label>
          <input
            type="number"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            style={inputStyle}
            required
          />
        </div>
        <div style={formGroupStyle}>
          <label style={labelStyle}>Lease Term:</label>
          <input
            type="text"
            value={leaseTerm}
            onChange={(e) => setLeaseTerm(e.target.value)}
            style={inputStyle}
            required
          />
        </div>
        <div style={formGroupStyle}>
          <label style={labelStyle}>Type of House:</label>
          <input
            type="text"
            value={type}
            onChange={(e) => setType(e.target.value)}
            style={inputStyle}
            required
          />
        </div>
        <div style={formGroupStyle}>
          <label style={labelStyle}>Beds:</label>
          <input
            type="number"
            value={beds}
            onChange={(e) => setBeds(e.target.value)}
            style={inputStyle}
            required
          />
        </div>
        <div style={formGroupStyle}>
          <label style={labelStyle}>Baths:</label>
          <input
            type="number"
            value={baths}
            onChange={(e) => setBaths(e.target.value)}
            style={inputStyle}
            required
          />
        </div>
        <div style={formGroupStyle}>
          <label style={labelStyle}>Square Feet:</label>
          <input
            type="number"
            value={sqFeet}
            onChange={(e) => setSqFeet(e.target.value)}
            style={inputStyle}
            required
          />
        </div>
        <div style={formGroupStyle}>
          <label style={labelStyle}>Furnishing:</label>
          <select
            value={furnishing}
            onChange={(e) => setFurnishing(e.target.value)}
            style={inputStyle}
            required
          >
            <option value="Unfurnished">Unfurnished</option>
            <option value="Partially Furnished">Partially Furnished</option>
            <option value="Fully Furnished">Fully Furnished</option>
          </select>
        </div>
        <div style={formGroupStyle}>
          <label style={labelStyle}>Smoking:</label>
          <select
            value={smoking}
            onChange={(e) => setSmoking(e.target.value)}
            style={inputStyle}
            required
          >
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">Non-Smoking</option>
          </select>
        </div>
        
        <div style={formGroupStyle}>
          <label style={labelStyle}>
            I have a pet:       <input
              type="checkbox"
              checked={pets}
              onChange={(e) => setPets(e.target.checked)}
              style={{ marginRight: '8px'}}
            />
          </label>

    
        </div>

   
        <button
          type="submit"
          style={buttonStyle}
          onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor = '#0056b3')
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.backgroundColor = '#007BFF')
          }
        >
          Predict
        </button>
      </form>
      {error && <p style={{ color: 'red', marginTop: '16px' }}>{error}</p>}
      {prediction && (
        <div style={resultStyle}>
          Predicted Rental Price: {prediction}
        </div>
      )}
    </div>
  );
};

export default HousePricePredictor;
