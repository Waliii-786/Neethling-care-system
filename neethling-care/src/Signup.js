import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Signup() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();

    // Password validation
    const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/;
    if (!passwordRegex.test(password)) {
      setMessage('Password must contain at least 8 characters with at least one letter and one digit.');
      return;
    }

    // Confirm password validation
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    // Username validation
    if (/\s/.test(username)) {
      setMessage('Username cannot contain whitespace');
      return;
    }

    // Name validation
    if (/\d/.test(name)) {
      setMessage('Name cannot contain digits');
      return;
    }

    try {
      const response = await axios.post('http://localhost/react-auth/signup.php', { name, username, email, password });
      if (response.data.success) {
        setMessage('Account created successfully. Please login.');
        setTimeout(() => {
          window.location.href = '/login';
        }, 2000);
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      setMessage('Error signing up');
    }
  };

  return (
    <div style={styles.background}>
      <div style={styles.container}>
        <h2>Register</h2>
        <form onSubmit={handleSignup}>
          <div style={styles.formGroup}>
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={styles.input}
            />
          </div>
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
          <div style={styles.formGroup}>
            <label>Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <button type="submit" style={styles.button}>Register</button>
        </form>
        {message && <p style={styles.message}>{message}</p>}
        <p><Link to="/login" style={styles.link}>Already have an account? Login</Link></p>
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
    color: 'red',
  },
  link: {
    color: '#007BFF',
    textDecoration: 'none',
  },
};

export default Signup;
