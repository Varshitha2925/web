import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './register.css';

const Register: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); // Default role is "user"
  const [error, setError] = useState('');
  const [ssn, setssn] = useState('')
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if(role === "user"){
      try {
        console.log("data to API",{firstName,
          lastName,
          email,
          phone,
          password})
  
        const response = await axios.post(`http://localhost:3001/api/users/register`, {
          "firstName":firstName,
          "lastName":lastName,
          "email":email,
          "phone":phone,
          "password":password
        });
      
       
        console.log("response:",response)
        if (response.data === "Organizer registered successfully") {
          console.log('Registration successful');
          navigate('/'); // Redirect to login page
        } else {
          setError(response.data.message || 'Registration failed');
        }
      } catch (err: any) {
        setError(err.response?.data?.message || 'An error occurred. Please try again.');
        console.error('Registration error:', err);
      }

    }
    else{
      try {
        console.log("data to API",{firstName,
          lastName,
          email,
          phone,
          password,
          ssn
        })
  
        const response = await axios.post(`http://localhost:3001/api/auth/register`, {
          "firstName":firstName,
          "lastName":lastName,
          "email":email,
          "phone":phone,
          "password":password,
          "ssn":ssn
        });
        console.log("response", response)
        if (response.data) {
          console.log('Registration successful');
          navigate('/'); // Redirect to login page
        } else {
          setError(response.data || 'Registration failed');
        }
      } catch (err: any) {
        setError(err.response?.data?.message || 'An error occurred. Please try again.');
        console.error('Registration error:', err);
      }

    }
  };

  return (
    <div className="register-page">
      <h2>Register</h2>
      <form className="register-form" onSubmit={handleRegister}>
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          id="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />

        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          id="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="phone">Phone:</label>
        <input
          type="text"
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <label htmlFor="role">Role:</label>
        <select
          id="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="user">User</option>
          <option value="organizer">Organizer</option>
        </select>


        {role === "organizer" && (
        <div>
          <label >Social Security Number:</label>
          <input
            type="text"
            id="ssn"
            value={ssn}
            onChange={(e) => setssn(e.target.value)}
            placeholder="Enter organizer details"
          />
        </div>
      )}


        {error && <p className="error-message">{error}</p>}

        <button type="submit">Register</button>
      </form>

      <p className="login-link">
        Already have an account?{' '}
        <a href="/login" onClick={() => navigate('/login')}>
          Login here
        </a>
      </p>
    </div>
  );
};

export default Register;
