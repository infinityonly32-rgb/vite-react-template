import { useEffect, useMemo, useState } from "react";
import "./App.css";
import { createClient } from "@supabase/supabase-js";
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);
type Modulo = "inicio" | "rrhh" | "logistica" | "cobranzas";

type Trabajador = {
  numero: number;
  nombre: string;
  dni: string;
  categoria: string;
};

function App() {
  const [trabajadores, setTrabajadores] = useState<Trabajador[]>([]);
  useEffect(() => {
  async function cargarTrabajadores() {
    const { data, error } = await supabase
      .from("trabajadores")
      .select("id, nombre_completo, dni, categoria")
      .order("id", { ascending: true });

    if (error) {
      console.error("Error al cargar trabajadores:", error);
      return;
    }

    const trabajadoresAdaptados: Trabajador[] = (data ?? []).map((t) => ({
      numero: t.id,
      nombre: t.nombre_completo,
      dni: t.dni,
      categoria: t.categoria,
    }));

    setTrabajadores(trabajadoresAdaptados);
  }

  cargarTrabajadores();
}, []);
  const [modulo, setModulo] = useState<Modulo>("inicio");
  const [busqueda, setBusqueda] = useState("");
  const [categoria, setCategoria] = useState("TODAS");
  const [orden, setOrden] = useState<"AZ" | "ZA">("AZ");
  const [seleccionado, setSeleccionado] = useState<Trabajador | null>(null);

  const listaFiltrada = useMemo(() => {
    const texto = busqueda.trim().toUpperCase();

    return [...trabajadores]
      .filter((trabajador) => {
        const coincideBusqueda =
          trabajador.nombre.toUpperCase().includes(texto) ||
          trabajador.dni.includes(texto);

        const coincideCategoria =
          categoria === "TODAS" || trabajador.categoria === categoria;

        return coincideBusqueda && coincideCategoria;
      })
      .sort((a, b) =>
        orden === "AZ"
          ? a.nombre.localeCompare(b.nombre)
          : b.nombre.localeCompare(a.nombre)
      );
  }, [busqueda, categoria, orden]);

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

              <div className="card" onClick={() => setModulo("cobranzas")}>
                <div className="icon">CB</div>
                <div>
                  <h3>Cobranzas</h3>
                  <p>Seguimiento de pagos, pendientes y cobranzas</p>
                </div>
                <span>→</span>
              </div>
            </section>
          </>
        )}

        {modulo === "rrhh" && !seleccionado && (
          <>
            <button
              className="back"
              onClick={() => {
                setModulo("inicio");
                setBusqueda("");
              }}
            >
              ← Volver
            </button>

            <section className="hero">
              <p className="label">MÓDULO</p>
              <h2>Recursos Humanos</h2>
              <p>Consulta de trabajadores, DNI y documentación.</p>
            </section>

            <section
              className="search"
              style={{ display: "grid", gap: "16px" }}
            >
              <div>
                <label>Buscar trabajador</label>
                <input
                  style={{ width: "100%", marginTop: "8px" }}
                  type="text"
                  placeholder="Buscar por nombre o DNI..."
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  flexWrap: "wrap",
                }}
              >
                <select
                  value={categoria}
                  onChange={(e) => setCategoria(e.target.value)}
                  style={{
                    padding: "12px",
                    borderRadius: "8px",
                    border: "1px solid #d1d5db",
                  }}
                >
                  <option value="TODAS">Todas las categorías</option>
                  <option value="OPERARIO">Operario</option>
                  <option value="PEON">Peón</option>
                </select>

                <select
                  value={orden}
                  onChange={(e) => setOrden(e.target.value as "AZ" | "ZA")}
                  style={{
                    padding: "12px",
                    borderRadius: "8px",
                    border: "1px solid #d1d5db",
                  }}
                >
                  <option value="AZ">Ordenar A → Z</option>
                  <option value="ZA">Ordenar Z → A</option>
                </select>
              </div>
            </section>

            <section
              style={{
                background: "#fff",
                border: "1px solid #e5e7eb",
                borderRadius: "14px",
                overflowX: "auto",
              }}
            >
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  minWidth: "700px",
                }}
              >
                <thead>
                  <tr style={{ background: "#f8fafc", textAlign: "left" }}>
                    <th style={{ padding: "16px" }}>Nº</th>
                    <th style={{ padding: "16px" }}>Apellidos y nombres</th>
                    <th style={{ padding: "16px" }}>DNI</th>
                    <th style={{ padding: "16px" }}>Categoría</th>
                    <th style={{ padding: "16px" }}></th>
                  </tr>
                </thead>

                <tbody>
                  {listaFiltrada.map((trabajador) => (
                    <tr
                      key={trabajador.dni}
                      onClick={() => setSeleccionado(trabajador)}
                      style={{
                        borderTop: "1px solid #e5e7eb",
                        cursor: "pointer",
                      }}
                    >
                      <td style={{ padding: "16px" }}>
                        {trabajador.numero}
                      </td>

                      <td
                        style={{
                          padding: "16px",
                          fontWeight: 600,
                        }}
                      >
                        {trabajador.nombre}
                      </td>

                      <td style={{ padding: "16px" }}>
                        {trabajador.dni}
                      </td>

                      <td style={{ padding: "16px" }}>
                        {trabajador.categoria}
                      </td>

                      <td
                        style={{
                          padding: "16px",
                          color: "#2563eb",
                          fontWeight: 600,
                        }}
                      >
                        Ver →
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {listaFiltrada.length === 0 && (
                <div
                  style={{
                    padding: "35px",
                    textAlign: "center",
                    color: "#6b7280",
                  }}
                >
                  No se encontraron trabajadores.
                </div>
              )}
            </section>
          </>
        )}

        {modulo === "rrhh" && seleccionado && (
          <>
            <button className="back" onClick={() => setSeleccionado(null)}>
              ← Volver a trabajadores
            </button>

            <section className="hero">
              <p className="label">FICHA DEL TRABAJADOR</p>
              <h2>{seleccionado.nombre}</h2>
              <p>
                DNI: <strong>{seleccionado.dni}</strong> · Categoría:{" "}
                <strong>{seleccionado.categoria}</strong>
              </p>
            </section>

            <section className="search">
              <h3 style={{ marginTop: 0 }}>Boletas de pago</h3>
              <p style={{ color: "#6b7280" }}>
                Aquí aparecerán automáticamente las boletas asociadas a este
                trabajador.
              </p>

              <div
                style={{
                  marginTop: "20px",
                  padding: "25px",
                  border: "1px dashed #d1d5db",
                  borderRadius: "10px",
                  textAlign: "center",
                  color: "#6b7280",
                }}
              >
                Aún no hay boletas cargadas para {seleccionado.nombre}.
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

        {modulo === "cobranzas" && (
          <>
            <button className="back" onClick={() => setModulo("inicio")}>
              ← Volver
            </button>

            <section className="hero">
              <p className="label">MÓDULO</p>
              <h2>Cobranzas</h2>
              <p>Seguimiento de pagos y estados de cobranza.</p>
            </section>

            <section className="options">
              <div className="card">
                <div className="icon">PC</div>
                <div>
                  <h3>Pendientes de cobro</h3>
                  <p>Facturas, valorizaciones y pagos pendientes</p>
                </div>
                <span>→</span>
              </div>

              <div className="card">
                <div className="icon">HP</div>
                <div>
                  <h3>Historial de pagos</h3>
                  <p>Consulta de pagos y cobranzas registradas</p>
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
