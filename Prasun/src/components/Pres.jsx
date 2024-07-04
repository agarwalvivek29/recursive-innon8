import React, { useState } from 'react';

function Pres() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setResult('');
    setError('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) {
      alert('Please select a file first!');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://127.0.0.1:5000/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      const data = await response.json();
      setResult(data.extracted_text);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className=" m-12 bg-slate-200  rounded-2xl h-96">
      <div className='bg-slate-300 rounded-t-2xl p-8'>
      <h1 className='font-bold text-3xl mb-6'>Upload a File</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit" className='bg-slate-400 p-2 px-4 rounded-xl'>Upload</button>
      </form>
      </div>
      {result && (
        <div>
          <h2>Extracted Text</h2>
          <pre>{result}</pre>
        </div>
      )}
      {error && (
        <div>
          <h2>Error</h2>
          <pre>{error}</pre>
        </div>
      )}
    </div>
  );
}

export default Pres;
