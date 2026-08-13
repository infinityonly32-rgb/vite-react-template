import { useState } from "react";
import "./App.css";

function App() {
  const [dni, setDni] = useState("");

  return (
    <div className="coin">
      <header>
        <div>
          <h1>OFICINA CENTRAL</h1>
          <span>Sistema de Gestión Interna</span>
        </div>
        <div className="status">● Sistema activo</div>
      </header>

      <main>
        <section className="hero">
          <p className="label">PLATAFORMA INTERNA</p>
          <h2>Oficina Central</h2>
          <p>Acceso centralizado a los módulos de gestión interna.</p>
        </section>

        <section className="search">
          <label>Documento de identidad</label>

          <div className="searchRow">
            <input
              type="text"
              placeholder="Ingrese DNI"
              value={dni}
              onChange={(e) => setDni(e.target.value)}
              maxLength={8}
            />
            <button>Buscar</button>
          </div>
        </section>

        <section className="options">
          <div className="card">
            <div className="icon">ID</div>
            <div>
              <h3>DNI</h3>
              <p>Consultar información del colaborador</p>
            </div>
            <span>→</span>
          </div>

          <div className="card">
            <div className="icon">S/</div>
            <div>
              <h3>Boletas de pago</h3>
              <p>Consultar y descargar boletas</p>
            </div>
            <span>→</span>
          </div>
        </section>
      </main>

      <footer>OFICINA CENTRAL · Sistema de Gestión Interna</footer>
    </div>
  );
}

export default App;
