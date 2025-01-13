import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './HorarioDisponible.css';

function HorarioDisponible() {
  const [horarios, setHorarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newHorario, setNewHorario] = useState({ horaInicio: '', horaFin: '' });
  const [selectedHorario, setSelectedHorario] = useState(null);

  const baseUrl = 'http://localhost:8080/api/horarioDisponible';

  // Obtener todos los horarios disponibles
  const fetchHorarios = async () => {
    setLoading(true);
    try {
      const response = await axios.get(baseUrl);
      setHorarios(response.data);
      setLoading(false);
    } catch (err) {
      setError('Error al obtener los horarios disponibles');
      setLoading(false);
    }
  };

  // Crear un nuevo horario
  const createHorario = async () => {
    try {
      await axios.post(baseUrl, newHorario);
      setNewHorario({ horaInicio: '', horaFin: '' });
      fetchHorarios(); // Actualizar la lista
    } catch (err) {
      setError('Error al crear el horario');
    }
  };

  // Actualizar un horario existente
  const updateHorario = async (id) => {
    try {
      await axios.put(`${baseUrl}/${id}`, selectedHorario);
      setSelectedHorario(null);
      fetchHorarios(); // Actualizar la lista
    } catch (err) {
      setError(`Error al actualizar el horario con ID ${id}`);
    }
  };

  // Eliminar un horario
  const deleteHorario = async (id) => {
    try {
      await axios.delete(`${baseUrl}/${id}`);
      fetchHorarios(); // Actualizar la lista
    } catch (err) {
      setError(`Error al eliminar el horario con ID ${id}`);
    }
  };

  // Llamar a fetchHorarios cuando el componente se monta
  useEffect(() => {
    fetchHorarios();
  }, []);

  return (
    <div className="horario-component">
      <h2>Gestión de Horarios Disponibles</h2>

      {loading && <p>Cargando horarios...</p>}
      {error && <p className="error">{error}</p>}

      {/* Listar Horarios */}
      <div className="horarios-list">
        {horarios.map((horario) => (
          <div className="horario-item" key={horario.idHorario}>
            <div className="horario-info">
              <strong>{horario.horaInicio} - {horario.horaFin}</strong>
            </div>
            <div className="horario-actions">
              <button className="edit-button" onClick={() => setSelectedHorario(horario)}>Editar</button>
              <button className="delete-button" onClick={() => deleteHorario(horario.idHorario)}>Eliminar</button>
            </div>
          </div>
        ))}
      </div>

      {/* Formulario para Crear Horario */}
      <div className="form">
        <h3>Crear Nuevo Horario</h3>
        <input
          type="time"
          placeholder="Hora Inicio"
          value={newHorario.horaInicio}
          onChange={(e) => setNewHorario({ ...newHorario, horaInicio: e.target.value })}
        />
        <input
          type="time"
          placeholder="Hora Fin"
          value={newHorario.horaFin}
          onChange={(e) => setNewHorario({ ...newHorario, horaFin: e.target.value })}
        />
        <button onClick={createHorario}>Crear Horario</button>
      </div>

      {/* Formulario para Editar Horario */}
      {selectedHorario && (
        <div className="form">
          <h3>Editar Horario</h3>
          <input
            type="time"
            placeholder="Hora Inicio"
            value={selectedHorario.horaInicio}
            onChange={(e) => setSelectedHorario({ ...selectedHorario, horaInicio: e.target.value })}
          />
          <input
            type="time"
            placeholder="Hora Fin"
            value={selectedHorario.horaFin}
            onChange={(e) => setSelectedHorario({ ...selectedHorario, horaFin: e.target.value })}
          />
          <button onClick={() => updateHorario(selectedHorario.idHorario)}>Guardar Cambios</button>
        </div>
      )}
    </div>
  );
}

export default HorarioDisponible;