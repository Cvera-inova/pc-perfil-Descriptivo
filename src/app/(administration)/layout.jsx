import SidebarAdmin from "@src/components/admin-home/sidebar-admin";
import ProtectedRoute from "@src/components/authentication/protected-route";
import config from "@src/constants/sidebar-home-config";
import { AdminContextProvider } from "@src/context/admin-context";
import SessionAuthProvider from "@src/context/session-auth-provider";

export const metadata = {
  title: "Admin Home",
  description: "Inova Solutions - Admin Home",
};

export default function RootLayout({ children }) {
  return (
    <SessionAuthProvider>
      <ProtectedRoute>
        <AdminContextProvider>
          <SidebarAdmin config={config}>{children}</SidebarAdmin>
        </AdminContextProvider>
      </ProtectedRoute>
    </SessionAuthProvider>
  );
}
