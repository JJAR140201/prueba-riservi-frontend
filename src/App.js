import './App.css';
import Cliente from './clientes/cliente.js';
import HorarioDisponible from './horariodisponible/HorarioDisponible.js'
import HorarioReserva from './HorarioReserva/HorarioReserva.js'
import Reservacion from './Reservacion/Reservacion.js'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>¡Bienvenido al Sistema de Reservaciones!</h1>
        <p>Gestiona tus clientes, horarios y reservaciones de manera eficiente.</p>
      </header>
      <main>
        <Cliente />
        <HorarioDisponible />
        <HorarioReserva />
        <Reservacion />
      </main>
    </div>
  );
}

export default App;