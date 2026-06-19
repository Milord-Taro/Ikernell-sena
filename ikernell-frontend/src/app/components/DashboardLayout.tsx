import { Link } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: Props) {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
      }}
    >
      <aside
        style={{
          width: "250px",
          backgroundColor: "#1e293b",
          color: "white",
          padding: "20px",
        }}
      >
        <h2>IKernell</h2>

        <nav
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            marginTop: "20px",
          }}
        >
          <Link to="/dashboard/proyectos">Proyectos</Link>

          <Link to="/dashboard/etapas">Etapas</Link>

          <Link to="/dashboard/actividades">Actividades</Link>

          <Link to="/dashboard/usuarios">Usuarios</Link>

          <Link to="/dashboard/mensajes">Mensajes</Link>

          <Link to="/dashboard/errores">Errores</Link>

          <Link to="/dashboard/interrupciones">Interrupciones</Link>

          <Link to="/dashboard/tipoerrores">Tipos Error</Link>

          <Link to="/dashboard/tipointerrupciones">Tipos Interrupción</Link>


        </nav>
      </aside>

      <main
        style={{
          flex: 1,
          padding: "20px",
        }}
      >
        {children}
      </main>
    </div>
  );
}
