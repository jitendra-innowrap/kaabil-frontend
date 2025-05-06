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
import { IOSZoomFix } from "@/components/utils/IosZoomFix";

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

export function generateViewport(): Viewport {
  return {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    // userScalable will be handled by CSS for iOS specifically
    userScalable: true,
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{scrollBehavior:'smooth'}}>
      <head>
        {/* Regular viewport meta */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        
        {/* iOS-specific meta (will override the previous one on iOS) */}
        <meta 
          name="viewport" 
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" 
          media="(-webkit-touch-callout: none)" 
        />
      </head>
      <body
        className={`${kalam.variable} ${poppins.className} antialiased`}
      >
        <IOSZoomFix/>
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
