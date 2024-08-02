import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  // State for form fields and errors
  const [form, setForm] = useState({ fullname: '', email: '', phone: '', password: '' });
  const [errors, setErrors] = useState({ fullname: '', email: '', phone: '', password: '' });

  // Validate individual form fields
  const validateField = (name, value) => {
    let error = '';
    switch (name) {
      case 'fullname':
        if (!value) error = 'Full name is required';
        break;
      case 'email':
        if (!value) error = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(value)) error = 'Invalid email format';
        break;
      case 'phone':
        if (!value) error = 'Phone number is required';
        else if (!/^\d{10}$/.test(value)) error = 'Phone number must be 10 digits';
        break;
      case 'password':
        if (!value) error = 'Password is required';
        else if (value.length < 6) error = 'Password must be at least 6 characters';
        break;
      default:
        break;
    }
    return error;
  };

  // Handle form field changes and validate
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    const error = validateField(name, value);
    setErrors({ ...errors, [name]: error });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const { fullname, email, phone, password } = form;
    let valid = true;
    let newErrors = { fullname: '', email: '', phone: '', password: '' };

    // Validate all fields before submission
    newErrors.fullname = validateField('fullname', fullname);
    newErrors.email = validateField('email', email);
    newErrors.phone = validateField('phone', phone);
    newErrors.password = validateField('password', password);

    if (Object.values(newErrors).some(error => error)) {
      valid = false;
    }

    if (valid) {
      // Store data in localStorage
      localStorage.setItem('formData', JSON.stringify(form));
      alert('Form data saved successfully!');
    } else {
      setErrors(newErrors);
    }
  };

  // Load data from localStorage on component mount
  useEffect(() => {
    const storedData = localStorage.getItem('formData');
    if (storedData) {
      setForm(JSON.parse(storedData));
    }
  }, []);

  return (
    <div className="App">
      <h1>Registration Form Using ReactJS</h1>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="fullname">Full Name:</label>
          <input
            id="fullname"
            name="fullname"
            type="text"
            value={form.fullname}
            onChange={handleChange}
          />
          {errors.fullname && <p className="error">{errors.fullname}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone Number:</label>
          <input
            id="phone"
            name="phone"
            type="text"
            value={form.phone}
            onChange={handleChange}
          />
          {errors.phone && <p className="error">{errors.phone}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
