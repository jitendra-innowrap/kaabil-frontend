import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Viewport } from 'next'
import { Poppins, Kalam } from 'next/font/google';
import './globals.css';
import './mobile-responsive.css';
import 'reactjs-popup/dist/index.css';
import ReduxProvider from "@/providers/ReduxProvider";
import SearchSection from "@/components/SearchSection";
import SearchAppear from "@/components/Header/SearchAppear";
import { Toaster } from "react-hot-toast";
import LoadGoogleMapsScript from "@/components/LoadGoogleMapScript";

// Configure Poppins
const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins', // CSS variable for Poppins
});

// Configure Kalam
const kalam = Kalam({
  weight: ['300', '400', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-kalam', // CSS variable for Kalam
});

export const metadata: Metadata = {
  title: "Kaabil - Jobseeker",
  description: "A Job portal by kaabil",
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: false,
  // Also supported but less commonly used
  // interactiveWidget: 'resizes-visual',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{scrollBehavior:'smooth'}}>

      <body
        className={`${kalam.variable} ${poppins.className} antialiased`}
      >
        <ReduxProvider>
        <LoadGoogleMapsScript/>
        <Header />
        <SearchAppear/>
        {children}
        <Footer/>
        </ReduxProvider>
        <Toaster />
      </body>
    </html>
  );
}
