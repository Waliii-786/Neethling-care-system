import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost/react-auth/login.php', { email, password });
      if (response.data.success) {
        setMessage('Login successful!');
        // Navigate to dashboard or perform some actions
        window.location.href = '/home';
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      setMessage('Error logging in');
    }
  };

  return (
    <div style={styles.background}>
      <div style={styles.container}>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
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
          <div style={styles.formGroup}>
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <button type="submit" style={styles.button}>Login</button>
        </form>
        {message && <p style={styles.message}>{message}</p>}
        <p><Link to="/signup" style={styles.link}>New user? Register here</Link></p>
        <p><Link to="/forgot-password" style={styles.link}>Forgot Password?</Link></p>
      </div>
    </div>
  );
}

const styles = {
  background: {
    backgroundImage: 'url(https://c02.purpledshub.com/uploads/sites/41/2011/02/GettyImages-591712165-cda012a.jpeg)',
    backgroundSize: 'cover',
    minHeight: '100vh', // Ensure the background covers the entire viewport
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
    backgroundColor: '#fff', // Set a background color to make the form stand out
  },
  formGroup: {
    marginBottom: '15px',
  },
  input: {
    width: '95%',
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
    color: 'green',
  },
  link: {
    color: '#007BFF',
    textDecoration: 'none',
  },
};

export default Login;
