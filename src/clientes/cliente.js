import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './cliente.css';

function Cliente() {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newCliente, setNewCliente] = useState({ nombre: '', email: '', telefono: '' });
  const [selectedCliente, setSelectedCliente] = useState(null);

  const baseUrl = 'http://localhost:8080/api/clientes';

  // Función para obtener todos los clientes
  const fetchClientes = async () => {
    setLoading(true);
    try {
      const response = await axios.get(baseUrl);
      setClientes(response.data);
      setLoading(false);
    } catch (err) {
      setError('Error al obtener los clientes');
      setLoading(false);
    }
  };

  // Función para crear un cliente
  const createCliente = async () => {
    try {
      await axios.post(baseUrl, newCliente);
      setNewCliente({ nombre: '', email: '', telefono: '' });
      fetchClientes(); // Actualizar lista de clientes
    } catch (err) {
      setError('Error al crear el cliente');
    }
  };

  // Función para actualizar un cliente
  const updateCliente = async (id) => {
    try {
      await axios.put(`${baseUrl}/${id}`, selectedCliente);
      setSelectedCliente(null);
      fetchClientes(); // Actualizar lista de clientes
    } catch (err) {
      setError(`Error al actualizar el cliente con ID ${id}`);
    }
  };

  // Función para eliminar un cliente
  const deleteCliente = async (id) => {
    try {
      await axios.delete(`${baseUrl}/${id}`);
      fetchClientes(); // Actualizar lista de clientes
    } catch (err) {
      setError(`Error al eliminar el cliente con ID ${id}`);
    }
  };

  // Llama a fetchClientes cuando el componente se monta
  useEffect(() => {
    fetchClientes();
  }, []);

  return (
    <div className="cliente-component">
      <h2>Gestión de Clientes</h2>

      {loading && <p>Cargando clientes...</p>}
      {error && <p className="error">{error}</p>}

      {/* Listar Clientes */}
      <div className="clientes-list">
        {clientes.map((cliente) => (
          <div className="cliente-item" key={cliente.idCliente}>
            <div className="cliente-info">
              <strong>{cliente.nombre}</strong> <br />
              {cliente.email} <br />
              {cliente.telefono}
            </div>
            <div className="cliente-actions">
              <button className="edit-button" onClick={() => setSelectedCliente(cliente)}>Editar</button>
              <button className="delete-button" onClick={() => deleteCliente(cliente.idCliente)}>Eliminar</button>
            </div>
          </div>
        ))}
      </div>

      {/* Formulario para Crear Cliente */}
      <div className="form">
        <h3>Crear Nuevo Cliente</h3>
        <input
          type="text"
          placeholder="Nombre"
          value={newCliente.nombre}
          onChange={(e) => setNewCliente({ ...newCliente, nombre: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={newCliente.email}
          onChange={(e) => setNewCliente({ ...newCliente, email: e.target.value })}
        />
        <input
          type="tel"
          placeholder="Teléfono"
          value={newCliente.telefono}
          onChange={(e) => setNewCliente({ ...newCliente, telefono: e.target.value })}
        />
        <button onClick={createCliente}>Crear Cliente</button>
      </div>

      {/* Formulario para Editar Cliente */}
      {selectedCliente && (
        <div className="form">
          <h3>Editar Cliente</h3>
          <input
            type="text"
            placeholder="Nombre"
            value={selectedCliente.nombre}
            onChange={(e) => setSelectedCliente({ ...selectedCliente, nombre: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            value={selectedCliente.email}
            onChange={(e) => setSelectedCliente({ ...selectedCliente, email: e.target.value })}
          />
          <input
            type="tel"
            placeholder="Teléfono"
            value={selectedCliente.telefono}
            onChange={(e) => setSelectedCliente({ ...selectedCliente, telefono: e.target.value })}
          />
          <button onClick={() => updateCliente(selectedCliente.idCliente)}>Guardar Cambios</button>
        </div>
      )}
    </div>
  );
}

export default Cliente;