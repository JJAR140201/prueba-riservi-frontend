import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Reservacion.css';

function Reservacion() {
  const [reservaciones, setReservaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newReservacion, setNewReservacion] = useState({ idCliente: '', idHorarioReserva: '', fechaReserva: '' });
  const [selectedReservacion, setSelectedReservacion] = useState(null);

  const baseUrl = 'http://localhost:8080/api/reservaciones';

  // Obtener todas las reservaciones
  const fetchReservaciones = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${baseUrl}/fecha/${new Date().toISOString().split('T')[0]}`); // Obtener por fecha actual como ejemplo
      setReservaciones(response.data);
      setLoading(false);
    } catch (err) {
      setError('Error al obtener las reservaciones');
      setLoading(false);
    }
  };

  // Crear una nueva reservación
  const createReservacion = async () => {
    try {
      await axios.post(`${baseUrl}/crear-reservacion`, newReservacion);
      setNewReservacion({ idCliente: '', idHorarioReserva: '', fechaReserva: '' });
      fetchReservaciones(); // Actualizar lista
    } catch (err) {
      setError('Error al crear la reservación');
    }
  };

  // Actualizar una reservación existente
  const updateReservacion = async (id) => {
    try {
      await axios.put(`${baseUrl}/${id}`, selectedReservacion);
      setSelectedReservacion(null);
      fetchReservaciones(); // Actualizar lista
    } catch (err) {
      setError(`Error al actualizar la reservación con ID ${id}`);
    }
  };

  // Eliminar una reservación
  const deleteReservacion = async (id) => {
    try {
      await axios.delete(`${baseUrl}/${id}`);
      fetchReservaciones(); // Actualizar lista
    } catch (err) {
      setError(`Error al eliminar la reservación con ID ${id}`);
    }
  };

  // Llamar a fetchReservaciones cuando el componente se monta
  useEffect(() => {
    fetchReservaciones();
  }, []);

  return (
    <div className="reservacion-component">
      <h2>Gestión de Reservaciones</h2>

      {loading && <p>Cargando reservaciones...</p>}
      {error && <p className="error">{error}</p>}

      {/* Listar Reservaciones */}
      <div className="reservaciones-list">
        {reservaciones.map((reservacion) => (
          <div className="reservacion-item" key={reservacion.idReservacion}>
            <div className="reservacion-info">
              <strong>ID Cliente:</strong> {reservacion.idCliente} |{' '}
              <strong>ID Horario:</strong> {reservacion.idHorarioReserva} |{' '}
              <strong>Fecha:</strong> {reservacion.fechaReserva}
            </div>
            <div className="reservacion-actions">
              <button className="edit-button" onClick={() => setSelectedReservacion(reservacion)}>
                Editar
              </button>
              <button className="delete-button" onClick={() => deleteReservacion(reservacion.idReservacion)}>
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Formulario para Crear Reservación */}
      <div className="form">
        <h3>Crear Nueva Reservación</h3>
        <input
          type="number"
          placeholder="ID Cliente"
          value={newReservacion.idCliente}
          onChange={(e) => setNewReservacion({ ...newReservacion, idCliente: e.target.value })}
        />
        <input
          type="number"
          placeholder="ID Horario Reserva"
          value={newReservacion.idHorarioReserva}
          onChange={(e) => setNewReservacion({ ...newReservacion, idHorarioReserva: e.target.value })}
        />
        <input
          type="date"
          placeholder="Fecha Reserva"
          value={newReservacion.fechaReserva}
          onChange={(e) => setNewReservacion({ ...newReservacion, fechaReserva: e.target.value })}
        />
        <button onClick={createReservacion}>Crear Reservación</button>
      </div>

      {/* Formulario para Editar Reservación */}
      {selectedReservacion && (
        <div className="form">
          <h3>Editar Reservación</h3>
          <input
            type="number"
            placeholder="ID Cliente"
            value={selectedReservacion.idCliente}
            onChange={(e) => setSelectedReservacion({ ...selectedReservacion, idCliente: e.target.value })}
          />
          <input
            type="number"
            placeholder="ID Horario Reserva"
            value={selectedReservacion.idHorarioReserva}
            onChange={(e) => setSelectedReservacion({ ...selectedReservacion, idHorarioReserva: e.target.value })}
          />
          <input
            type="date"
            placeholder="Fecha Reserva"
            value={selectedReservacion.fechaReserva}
            onChange={(e) => setSelectedReservacion({ ...selectedReservacion, fechaReserva: e.target.value })}
          />
          <button onClick={() => updateReservacion(selectedReservacion.idReservacion)}>Guardar Cambios</button>
        </div>
      )}
    </div>
  );
}

export default Reservacion;