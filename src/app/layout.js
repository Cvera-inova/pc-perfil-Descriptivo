import Header from "@src/components/header";
import Footer from "@src/components/footer";
import "./globals.css";
import SessionAuthProvider from "@src/context/session-auth-provider";

export const metadata = {
  title: "Inova Solutions",
  description: "Your passport to cloud",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SessionAuthProvider>
          {children}
        </SessionAuthProvider>
      </body>
    </html>
  );
}
