import  { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { dataSliceActions } from '../../store/data';
import { useNavigate } from 'react-router';
import { BACKENDURL } from '../../App';

const Form = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    bloodGroup: '',
    gender: '',
    role: 'patient',
    weight: '',
    specialization: '',
    qualification: '',
    height: '',
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(()=>{
    console.log('Backend URL:', BACKENDURL);
  },[]);

  const { isSignedIn, user, isLoaded } = useUser();

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(()=>{
    console.log('User:', user ? user: 'No user');
  },[]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try{
      if(!user){
        toast.error('User not found');
        return;
      }
      const bodyContent = {
        ...formData,
        clerkId : user.id,
        email : user.primaryEmailAddress.emailAddress
      }
      console.log(bodyContent);

      const response = await fetch(`${BACKENDURL}/user/create`,{
        method : 'POST',
        body : JSON.stringify(bodyContent),
        headers : {
          'Content-Type' : 'application/json'
        }
      });

      const res = await response.json();
      if(!res.success){
        toast.error(res.message);
        return;
      }
      toast.success('Form submitted successfully');
      dispatch(dataSliceActions.setUser(res.user));
      navigate('/dashboard');
    }
    catch(err){
      console.error(err);
      toast.error('Error in form submission');
    }

    // try{
    //   const response = await fetch('https://recursive-innon8.onrender.com/user/update',{
    //     method : 'POST',
    //     body : JSON.stringify(bodyContent),
    //     headers : {
    //       'Content-Type' : 'application/json'
    //     }
    //   });
    //   const res = await response.json();
    //   console.log(res);
    // }
    // catch(err){
    //   console.error(err);
    // }
    // Perform further form submission tasks (e.g., sending data to a server)
  };


  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">User Information Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4 flex justify-around w-full">
          <label className="block text-gray-700">Role</label>
          <div className="flex items-center">
            <input
              type="radio"
              name="role"
              value="doctor"
              checked={formData.role === 'doctor'}
              onChange={handleChange}
              className="mr-2"
              required
            />
            <label className="mr-4">Doctor</label>
            <input
              type="radio"
              name="role"
              value="patient"
              checked={formData.role === 'patient'}
              onChange={handleChange}
              className="mr-2"
              required
            />
            <label>Patient</label>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded"
            required
          />
        </div>
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
          <label className="block text-gray-700">Blood Group</label>
          <input
            type="text"
            name="bloodGroup"
            value={formData.bloodGroup}
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
        {formData.role === 'doctor' && (
          <>
            <div className="mb-4">
              <label className="block text-gray-700">Specializations</label>
              <input
                type="text"
                name="specialization"
                value={formData.specialization}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Qualifications</label>
              <input
                type="text"
                name="qualification"
                value={formData.qualification}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded"
                required
              />
            </div>
          </>
        )}
        { formData.role !== 'doctor' && <>
          <div className="mb-4">
            <label className="block text-gray-700">Weight (in Kg)</label>
            <input
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Height (in Inches)</label>
            <input
              type="number"
              name="height"
              value={formData.height}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded"
              required
            />
          </div>
        </> }
        <button
          type="submit"
          className="mt-4 p-2 w-full bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;
