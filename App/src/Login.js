import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css'; 
import backgroundImage from './llaves_casa.jpg';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Hook para navegar

  const loginStyle = {
    height: '100vh',
    width: '100vw',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2c2c2c', 
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // Se alambra un inicio de sesión fácil para pruebas
     if (email === 'admin@admin.com' && password === 'admin') {
      navigate('/dashboard'); 
    } else {
      alert('Credenciales incorrectas'); // Alerta temporal
    } 
  };

  return (
    <div className="login-container" style={loginStyle}>
      <div className="login-image" style={{ backgroundImage: `url(${backgroundImage})` }} />
      <div className="login-form">
        <img src={`${process.env.PUBLIC_URL}/logo1.png`} alt="InmoNexo Logo" className="logo"/>
        <h2>Bienvenido de vuelta</h2>
        <form onSubmit={handleLogin}>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                type="email"
                id="email"
                value={email}
                placeholder="Ingresa tu correo"
                onChange={e => setEmail(e.target.value)}
                required
                />
            </div>
            <div className="form-group">
                <label htmlFor="password">Contraseña</label>
                <input
                type="password"
                id="password"
                value={password}
                placeholder="Ingresa tu contraseña"
                onChange={e => setPassword(e.target.value)}
                required
                />
                <a href="/forgot-password" className="forgot-password">¿Olvidaste tu contraseña?</a>
            </div>
          <button type="submit" className="login-button">Iniciar sesión</button>
        </form>
        <div className="register-link">
            ¿Aún no tienes cuenta? <Link to="/register">Crea una</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
