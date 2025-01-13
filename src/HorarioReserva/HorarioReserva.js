import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './HorarioReserva.css';

function HorarioReserva() {
  const [horariosReserva, setHorariosReserva] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newHorarioReserva, setNewHorarioReserva] = useState({ idHorarioDisponible: '', estado: 'disponible' });
  const [selectedHorarioReserva, setSelectedHorarioReserva] = useState(null);

  const baseUrl = 'http://localhost:8080/api/horariosReserva';

  // Obtener todos los horarios de reserva
  const fetchHorariosReserva = async () => {
    setLoading(true);
    try {
      const response = await axios.get(baseUrl);
      setHorariosReserva(response.data);
      setLoading(false);
    } catch (err) {
      setError('Error al obtener los horarios de reserva');
      setLoading(false);
    }
  };

  // Crear un nuevo horario de reserva
  const createHorarioReserva = async () => {
    try {
      await axios.post(baseUrl, newHorarioReserva);
      setNewHorarioReserva({ idHorarioDisponible: '', estado: 'disponible' });
      fetchHorariosReserva(); // Actualizar lista
    } catch (err) {
      setError('Error al crear el horario de reserva');
    }
  };

  // Actualizar un horario de reserva existente
  const updateHorarioReserva = async (id) => {
    try {
      await axios.put(`${baseUrl}/${id}`, selectedHorarioReserva);
      setSelectedHorarioReserva(null);
      fetchHorariosReserva(); // Actualizar lista
    } catch (err) {
      setError(`Error al actualizar el horario de reserva con ID ${id}`);
    }
  };

  // Eliminar un horario de reserva
  const deleteHorarioReserva = async (id) => {
    try {
      await axios.delete(`${baseUrl}/${id}`);
      fetchHorariosReserva(); // Actualizar lista
    } catch (err) {
      setError(`Error al eliminar el horario de reserva con ID ${id}`);
    }
  };

  // Llamar a fetchHorariosReserva cuando el componente se monta
  useEffect(() => {
    fetchHorariosReserva();
  }, []);

  return (
    <div className="horario-reserva-component">
      <h2>Gestión de Horarios de Reserva</h2>

      {loading && <p>Cargando horarios de reserva...</p>}
      {error && <p className="error">{error}</p>}

      {/* Listar Horarios de Reserva */}
      <div className="horarios-reserva-list">
        {horariosReserva.map((horario) => (
          <div className="horario-reserva-item" key={horario.idHorarioReserva}>
            <div className="horario-reserva-info">
              <strong>ID Horario:</strong> {horario.idHorarioDisponible} | <strong>Estado:</strong> {horario.estado}
            </div>
            <div className="horario-reserva-actions">
              <button className="edit-button" onClick={() => setSelectedHorarioReserva(horario)}>Editar</button>
              <button className="delete-button" onClick={() => deleteHorarioReserva(horario.idHorarioReserva)}>Eliminar</button>
            </div>
          </div>
        ))}
      </div>

      {/* Formulario para Crear Horario de Reserva */}
      <div className="form">
        <h3>Crear Nuevo Horario de Reserva</h3>
        <input
          type="number"
          placeholder="ID Horario Disponible"
          value={newHorarioReserva.idHorarioDisponible}
          onChange={(e) => setNewHorarioReserva({ ...newHorarioReserva, idHorarioDisponible: e.target.value })}
        />
        <select
          value={newHorarioReserva.estado}
          onChange={(e) => setNewHorarioReserva({ ...newHorarioReserva, estado: e.target.value })}
        >
          <option value="disponible">Disponible</option>
          <option value="reservado">Reservado</option>
        </select>
        <button onClick={createHorarioReserva}>Crear Horario de Reserva</button>
      </div>

      {/* Formulario para Editar Horario de Reserva */}
      {selectedHorarioReserva && (
        <div className="form">
          <h3>Editar Horario de Reserva</h3>
          <input
            type="number"
            placeholder="ID Horario Disponible"
            value={selectedHorarioReserva.idHorarioDisponible}
            onChange={(e) => setSelectedHorarioReserva({ ...selectedHorarioReserva, idHorarioDisponible: e.target.value })}
          />
          <select
            value={selectedHorarioReserva.estado}
            onChange={(e) => setSelectedHorarioReserva({ ...selectedHorarioReserva, estado: e.target.value })}
          >
            <option value="disponible">Disponible</option>
            <option value="reservado">Reservado</option>
          </select>
          <button onClick={() => updateHorarioReserva(selectedHorarioReserva.idHorarioReserva)}>Guardar Cambios</button>
        </div>
      )}
    </div>
  );
}

export default HorarioReserva;