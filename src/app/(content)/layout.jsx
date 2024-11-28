import Footer from "@src/components/footer";
import Header from "@src/components/header";

export default function RootLayout({ children }) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
}
