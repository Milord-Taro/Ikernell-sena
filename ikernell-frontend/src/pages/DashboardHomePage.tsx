import { FolderKanban, Users, Bug, MessageSquare } from "lucide-react";

export default function DashboardHomePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Dashboard IKernell
        </h1>

        <p className="text-slate-500">
          Bienvenido al sistema de gestión.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow p-5">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">
              Proyectos
            </h3>

            <FolderKanban size={22} />
          </div>

          <p className="text-3xl font-bold mt-3">
            6
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">
              Usuarios
            </h3>

            <Users size={22} />
          </div>

          <p className="text-3xl font-bold mt-3">
            6
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">
              Errores
            </h3>

            <Bug size={22} />
          </div>

          <p className="text-3xl font-bold mt-3">
            14
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">
              Mensajes
            </h3>

            <MessageSquare size={22} />
          </div>

          <p className="text-3xl font-bold mt-3">
            1
          </p>
        </div>
      </div>
    </div>
  );
}