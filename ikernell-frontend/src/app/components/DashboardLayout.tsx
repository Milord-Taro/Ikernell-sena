import DashboardSidebar from "./dashboard/layout/DashboardSidebar";

interface Props {
  children: React.ReactNode;
}

export default function DashboardLayout({
  children,
}: Props) {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
      }}
    >
      <DashboardSidebar />

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