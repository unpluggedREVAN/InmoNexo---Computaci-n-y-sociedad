import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHome, 
  faBuilding, 
  faUsers, 
  faNetworkWired, 
  faMoneyCheckAlt, 
  faCalendarAlt, 
  faCog, 
  faEdit,
  faTrash
} from '@fortawesome/free-solid-svg-icons';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Calendario.css';

const Calendario = () => {
  const location = useLocation();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [activities, setActivities] = useState([]);

  const [activityName, setActivityName] = useState('');
  const [activityDescription, setActivityDescription] = useState('');

  const menuItems = [
    { name: 'Página principal', icon: faHome, path: '/dashboard' },
    { name: 'Propiedades', icon: faBuilding, path: '/properties' },
    { name: 'Clientes', icon: faUsers, path: '/clients' },
    { name: 'Red InmoNexo', icon: faNetworkWired, path: '/network' },
    { name: 'Seguimiento pagos', icon: faMoneyCheckAlt, path: '/payments' },
    { name: 'Calendario', icon: faCalendarAlt, path: '/calendar' },
    { name: 'Configuración', icon: faCog, path: '/settings' },
  ];

  useEffect(() => {
    // se puede hacer un fetch de actividades por fecha en el backend aquí
  }, [currentDate]);

  const handleDateChange = date => {
    setCurrentDate(date);
  };

  const handleAddActivity = () => {
    const newActivity = {
      id: activities.length + 1,
      name: activityName,
      description: activityDescription,
      date: currentDate.toISOString().split('T')[0]  // solo se almacena la parte de la fecha
    };
    setActivities([...activities, newActivity]);
    setActivityName('');
    setActivityDescription('');
  };

  const handleDeleteActivity = id => {
    setActivities(activities.filter(activity => activity.id !== id));
  };

  const handleEditActivity = (id, name, description) => {
    const updatedActivities = activities.map(activity => {
      if (activity.id === id) {
        return {...activity, name, description};
      }
      return activity;
    });
    setActivities(updatedActivities);
  };

  const filteredActivities = activities.filter(activity =>
    activity.date === currentDate.toISOString().split('T')[0]
  );

  return (
    <div className="dashboard">
      <aside className="sidebar">
        {menuItems.map(item => (
          <Link key={item.name} to={item.path} className={`menu-item ${location.pathname === item.path ? 'active' : ''}`}
                aria-current={location.pathname === item.path ? 'page' : undefined}>
            <FontAwesomeIcon icon={item.icon} className="menu-icon" />
            {item.name}
          </Link>
        ))}
      </aside>

      <div className="main-content">
        <nav className="navbar">
          <div className="logo-container">
            <Link to="/dashboard" aria-label="Volver a la página de inicio">
              <img 
                src={`${process.env.PUBLIC_URL}/logo2.png`} 
                alt="InmoNexo Logo" 
                className="logo"
              />
            </Link>
          </div>
          <div className="user-container">
            <Link to="/account-info" className="account-info-btn" aria-label="Configuración de la cuenta">
              <FontAwesomeIcon icon={faCog} className="menu-icon"/>
            </Link>
          </div>
        </nav>
        <h1 className='titulo1'>Calendario</h1>
        <section className="content-calendar">
          <div className="activities-section">
            <div className="add-activity">
              <input value={activityName} onChange={e => setActivityName(e.target.value)} placeholder="Nombre de actividad" aria-label="Nombre de actividad"/>
              <textarea value={activityDescription} onChange={e => setActivityDescription(e.target.value)} placeholder="Descripción de actividad" aria-label="Descripción de actividad"></textarea>
              <button onClick={handleAddActivity} aria-label="Agregar actividad al calendario">Agregar al día</button>
            </div>
            <div className="activities-list">
              {filteredActivities.map(activity => (
                <div key={activity.id} className="activity">
                  <span>{activity.name}</span>
                  <button onClick={() => handleEditActivity(activity.id, 'Updated Name', 'Updated Description')} aria-label={`Editar ${activity.name}`}><FontAwesomeIcon icon={faEdit} /></button>
                  <button onClick={() => handleDeleteActivity(activity.id)} aria-label={`Eliminar ${activity.name}`}><FontAwesomeIcon icon={faTrash} /></button>
                </div>
              ))}
            </div>
          </div>
          <div className="calendar-section">
            <Calendar onChange={handleDateChange} value={currentDate} aria-label="Calendario de eventos" role="application"/>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Calendario;
