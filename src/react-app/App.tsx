import { useState } from "react";
import "./App.css";

function App() {
  const [modulo, setModulo] = useState<"inicio" | "rrhh" | "logistica">("inicio");
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
        {modulo === "inicio" && (
          <>
            <section className="hero">
              <p className="label">PLATAFORMA INTERNA</p>
              <h2>Oficina Central</h2>
              <p>Selecciona el módulo al que deseas ingresar.</p>
            </section>

            <section className="options">
              <div className="card" onClick={() => setModulo("rrhh")}>
                <div className="icon">RH</div>
                <div>
                  <h3>Recursos Humanos</h3>
                  <p>Personal, documentos y boletas de pago</p>
                </div>
                <span>→</span>
              </div>

              <div className="card" onClick={() => setModulo("logistica")}>
                <div className="icon">LG</div>
                <div>
                  <h3>Logística</h3>
                  <p>Gestión y consulta de información logística</p>
                </div>
                <span>→</span>
              </div>
            </section>
          </>
        )}

        {modulo === "rrhh" && (
          <>
            <button className="back" onClick={() => setModulo("inicio")}>
              ← Volver
            </button>

            <section className="hero">
              <p className="label">MÓDULO</p>
              <h2>Recursos Humanos</h2>
              <p>Consulta de información y documentos del personal.</p>
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
          </>
        )}

        {modulo === "logistica" && (
          <>
            <button className="back" onClick={() => setModulo("inicio")}>
              ← Volver
            </button>

            <section className="hero">
              <p className="label">MÓDULO</p>
              <h2>Logística</h2>
              <p>Gestión y consulta de información logística.</p>
            </section>

            <section className="options">
              <div className="card">
                <div className="icon">OC</div>
                <div>
                  <h3>Órdenes y documentos</h3>
                  <p>Consulta de documentación logística</p>
                </div>
                <span>→</span>
              </div>

              <div className="card">
                <div className="icon">PR</div>
                <div>
                  <h3>Proveedores</h3>
                  <p>Consulta y gestión de proveedores</p>
                </div>
                <span>→</span>
              </div>
            </section>
          </>
        )}
      </main>

      <footer>OFICINA CENTRAL · Sistema de Gestión Interna</footer>
    </div>
  );
}

export default App;
