import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "./providers/AuthProvider";
import Navbar from "./components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Next Auth App",
  description: "Motive to implement a next auth app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Navbar />
          <main>{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
