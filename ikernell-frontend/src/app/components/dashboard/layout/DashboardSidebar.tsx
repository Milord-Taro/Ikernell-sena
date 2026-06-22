import { Code2 } from "lucide-react";

import { useState } from "react";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { Home } from "lucide-react";

import {
  FolderKanban,
  ListTodo,
  Users,
  Mail,
  TriangleAlert,
  PauseCircle,
  Tags,
} from "lucide-react";

import UserPanel from "./UserPanel";

import { NavLink } from "react-router-dom";

function SidebarLink({
  to,
  icon: Icon,
  label,
  collapsed,
}: {
  to: string;
  icon: any;
  label: string;
  collapsed: boolean;
}) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive ? "sidebar-link sidebar-link-active" : "sidebar-link"
      }
    >
      <Icon size={18} />

      {!collapsed && <span>{label}</span>}
    </NavLink>
  );
}

export default function DashboardSidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      style={{
        width: collapsed ? "87px" : "205px",
        background: "#f5f7ff",
        boxShadow: "4px 0 20px rgba(15,23,42,0.04)",
        borderRight: "1px solid #e2e8f0",
        transition: "width 0.25s ease",

        padding: "10px",

        position: "sticky",
        top: 0,

        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: collapsed ? "center" : "flex-end",
          marginBottom: "20px",
        }}
      ></div>

      <div
        style={{
          display: "flex",
          alignItems: "center",

          justifyContent: collapsed ? "center" : "flex-start",

          gap: "12px",

          marginBottom: "30px",
        }}
      >
        <div
          onClick={() => setCollapsed(!collapsed)}
          style={{
            width: "38px",
            height: "38px",
            borderRadius: "12px",

            display: "flex",
            alignItems: "center",
            justifyContent: "center",

            background: "linear-gradient(135deg, #4338ca, #0ea5e9)",

            cursor: "pointer",
          }}
        >
          <Code2 size={20} color="white" />
        </div>

        {!collapsed && (
          <div>
            <div
              style={{
                fontSize: "26px",
                fontWeight: "700",
                color: "#4338ca",
              }}
            >
              IKernell
            </div>

            <div
              style={{
                fontSize: "12px",
                color: "#64748b",
              }}
            >
              Soluciones
            </div>
          </div>
        )}
      </div>

      <nav
        className={collapsed ? "sidebar-collapsed" : ""}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "6px",
        }}
      >
        <SidebarLink
          to="/dashboard"
          icon={Home}
          label="Dashboard"
          collapsed={collapsed}
        />
        <SidebarLink
          to="/dashboard/proyectos"
          icon={FolderKanban}
          label="Proyectos"
          collapsed={collapsed}
        />

        <SidebarLink
          to="/dashboard/actividades"
          icon={ListTodo}
          label="Actividades"
          collapsed={collapsed}
        />

        <SidebarLink
          to="/dashboard/usuarios"
          icon={Users}
          label="Usuarios"
          collapsed={collapsed}
        />

        <SidebarLink
          to="/dashboard/mensajes"
          icon={Mail}
          label="Mensajes"
          collapsed={collapsed}
        />

        <SidebarLink
          to="/dashboard/errores"
          icon={TriangleAlert}
          label="Errores"
          collapsed={collapsed}
        />

        <SidebarLink
          to="/dashboard/interrupciones"
          icon={PauseCircle}
          label="Interrupciones"
          collapsed={collapsed}
        />

        <SidebarLink
          to="/dashboard/tipoerrores"
          icon={Tags}
          label="Tipos Error"
          collapsed={collapsed}
        />

        <SidebarLink
          to="/dashboard/tipointerrupciones"
          icon={Tags}
          label="Tipos Interrupción"
          collapsed={collapsed}
        />
      </nav>
      <div
        style={{
          marginTop: "auto",
        }}
      >
        <UserPanel collapsed={collapsed} />
      </div>
    </aside>
  );
}
