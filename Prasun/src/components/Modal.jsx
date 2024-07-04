import React, { useState } from 'react';

const Modal = () => {
  const [formData, setFormData] = useState({
    symptoms: '',
    selfOrOther: 'self',
    age: '',
    gender: '',
  });
  const [response, setResponse] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setResponse(`Form submitted with data: ${JSON.stringify(formData)}`);
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Health Information Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Symptoms</label>
          <input
            type="text"
            name="symptoms"
            value={formData.symptoms}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Is this for you or someone else?</label>
          <div className="flex items-center">
            <input
              type="radio"
              name="selfOrOther"
              value="self"
              checked={formData.selfOrOther === 'self'}
              onChange={handleChange}
              className="mr-2"
              required
            />
            <label className="mr-4">Self</label>
            <input
              type="radio"
              name="selfOrOther"
              value="other"
              checked={formData.selfOrOther === 'other'}
              onChange={handleChange}
              className="mr-2"
              required
            />
            <label>Other</label>
          </div>
        </div>
        {formData.selfOrOther === 'other' && (
          <>
            <div className="mb-4">
              <label className="block text-gray-700">Age</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded"
                required
              >
                <option value="" disabled>Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </>
        )}
        <button
          type="submit"
          className="mt-4 p-2 w-full bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
      {response && (
        <div className="mt-4 p-2 bg-green-100 text-green-700 rounded">
          {response}
        </div>
      )}
    </div>
  );
};

export default Modal
