import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "../components/Navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Sleep Assistant",
  description: "A modern sleep audio player website offering various white noise and natural sounds",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{ background: 'linear-gradient(180deg, #021228 55.35%, #EC887D 156.3%)' }}
      >
        <div className="min-h-screen text-white">
          <Navigation />
          {children}
        </div>
      </body>
    </html>
  );
}
