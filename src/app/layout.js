import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "./providers/AuthProvider";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    default: "Car Engineer",
    template: "%s | Car Engineer"
  },
  description: "Motive to implement a next auth app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* data-theme="myTheme" */}
      <body className={inter.className}>
        <AuthProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
