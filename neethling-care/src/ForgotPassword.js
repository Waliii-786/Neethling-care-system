import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost/react-auth/forgot-password.php', { email });
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Error sending password reset email');
    }
  };

  return (
    <div style={styles.background}>
      <div style={styles.container}>
        <h2>Forgot Password</h2>
        <form onSubmit={handleForgotPassword}>
          <div style={styles.formGroup}>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <button type="submit" style={styles.button}>Submit</button>
        </form>
        {message && <p style={styles.message}>{message}</p>}
        <p><Link to="/login" style={styles.link}>Back to Login</Link></p>
      </div>
    </div>
  );
}

const styles = {
  background: {
    backgroundImage: 'url(https://c02.purpledshub.com/uploads/sites/41/2011/02/GettyImages-591712165-cda012a.jpeg)',
    backgroundSize: 'cover',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    maxWidth: '400px',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    backgroundColor: '#fff',
  },
  formGroup: {
    marginBottom: '15px',
  },
  input: {
    width: '90%',
    padding: '10px',
    marginBottom: '5px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  button: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  message: {
    color: 'red',
  },
  link: {
    color: '#007BFF',
    textDecoration: 'none',
  },
};

export default ForgotPassword;
