import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import './Register.css'; 

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('owner'); // Estado para manejar el rol seleccionado en el switch

  const navigate = useNavigate(); 

  const handleRegistration = (e) => {
    e.preventDefault();
    // Nota para Darío: lógica de registro aquí con el backend
    console.log('Registro con:', name, email, password, role);
    
    navigate('/'); // Redirige a la página de inicio de sesión
  };

  return (
    <div className="register-container">
      <img src={`${process.env.PUBLIC_URL}/logo2.png`} alt="InmoNexo Logo" className="logo"/>
      <h2>Crea una nueva cuenta</h2>
      <form onSubmit={handleRegistration}>
        <div className="form-group">
          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            id="name"
            placeholder="Ingresa tu nombre completo"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Ingresa tu correo"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            placeholder="Ingresa tu contraseña"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <label htmlFor="password">¿Qué eres?</label>
        </div>
        <div className="switch-field">
          <input
            type="radio"
            id="owner"
            name="role"
            value="owner"
            checked={role === 'owner'}
            onChange={e => setRole(e.target.value)}
          />
          <label htmlFor="owner">Propietario</label>
          <input
            type="radio"
            id="agent"
            name="role"
            value="agent"
            checked={role === 'agent'}
            onChange={e => setRole(e.target.value)}
          />
          <label htmlFor="agent">Agente Inmobiliario</label>
        </div>
        <button type="submit" className="register-button">Crear cuenta</button>
      </form>
    </div>
  );
};

export default Register;
