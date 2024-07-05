

import React, { useState } from 'react';

const MedicalDiagnosis = () => {
  const [age, setAge] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [gender, setGender] = useState('');
  const [diagnosis, setDiagnosis] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const payload = {
      age,
      symptoms,
      gender
    };

    try {
      const response = await fetch('http://localhost:5000/api/medical/diagnose', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setDiagnosis(data.possibilities);
      setError(null);
    } catch (error) {
      console.error('Error:', error);
      setError(error.message);
    }
  };

  return (
    <div style={styles.container}>
    <h2>Symptom Disease Predictor</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>
          Age:
          <input type="number" value={age} onChange={(e) => setAge(e.target.value)} style={styles.input} />
        </label>
        <label style={styles.label}>
          Symptoms:
          <input type="text" value={symptoms} onChange={(e) => setSymptoms(e.target.value)} style={styles.input} />
        </label>
        <label style={styles.label}>
          Gender:
          <input type="text" value={gender} onChange={(e) => setGender(e.target.value)} style={styles.input} />
        </label>
        <button type="submit" style={styles.button}>Submit</button>
      </form>

      {error && <div style={styles.error}>Error: {error}</div>}

      {diagnosis && (
        <div>
          <h3 style={styles.heading}>Diagnosis Results:</h3>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Disease</th>
                <th style={styles.th}>Probability (%)</th>
              </tr>
            </thead>
            <tbody>
              {diagnosis.map((possibility, index) => (
                <tr key={index}>
                  <td style={styles.td}>{possibility.disease}</td>
                  <td style={styles.td}>{(possibility.probability * 100).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '20px',
  },
  label: {
    marginBottom: '10px',
    fontWeight: 'bold',
  },
  input: {
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    marginBottom: '20px',
  },
  heading: {
    marginBottom: '10px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    borderBottom: '1px solid #ddd',
    padding: '8px',
    textAlign: 'left',
  },
  td: {
    borderBottom: '1px solid #ddd',
    padding: '8px',
  },
};

export default MedicalDiagnosis;
