import React, { useState } from 'react';
import '../XModal/XModal.css';

const XModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    dob: ''
  });

  const [errors, setErrors] = useState({});

  const toggleModal = () => {
    setIsOpen(!isOpen);
    setFormData({
      username: '',
      email: '',
      phone: '',
      dob: ''
    });
    setErrors({});
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    let tempErrors = {};
    if (!formData.username) tempErrors.username = "Please fill out your username";
    if (!formData.email.includes('@')) tempErrors.email = "Invalid email. Please check your email address.";
    if (formData.phone.length !== 10) tempErrors.phone = "Invalid phone number. Please enter a 10-digit phone number.";
    const today = new Date();
    const dob = new Date(formData.dob);
    if (dob > today) tempErrors.dob = "Invalid Date of Birth. Please enter a valid date.";
    return tempErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const tempErrors = validateForm();
    setErrors(tempErrors);

    if (Object.keys(tempErrors).length === 0) {
      alert("Form submitted successfully");
      toggleModal();
    }
  };

  return (
    <div className="app">
      <h2>User Details Modal</h2>
      <button onClick={toggleModal}>Open Form</button>

      {isOpen && (
        <div className="modal" onClick={toggleModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Fill Details</h3>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="username">Username:</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                />
                {errors.username && <p>{errors.username}</p>}
              </div>
              <div>
                <label htmlFor="email">Email Address:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <p>{errors.email}</p>}
              </div>
              <div>
                <label htmlFor="phone">Phone Number:</label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
                {errors.phone && <p>{errors.phone}</p>}
              </div>
              <div>
                <label htmlFor="dob">Date of Birth:</label>
                <input
                  type="date"
                  id="dob"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                />
                {errors.dob && <p>{errors.dob}</p>}
              </div>
              <button className="submit-button" type="submit">Submit</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default XModal;
