import { Inter } from "next/font/google";
import AuthProvider from "./providers/AuthProvider";
import ClientLayout from "./components/ClientLayout";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    default: "Car Engineer",
    template: "%s | Car Engineer",
  },
  description: "Motive to implement a next auth app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* data-theme="myTheme" */}
      <body className={inter.className}>
        <AuthProvider>
          <ClientLayout>{children}</ClientLayout>
        </AuthProvider>
      </body>
    </html>
  );
}
