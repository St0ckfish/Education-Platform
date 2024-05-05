import React, { ReactNode } from "react";
import { Inter } from "next/font/google";
import { Metadata } from "next";
import "./globals.css";
import NavBar from "./../components/navBar";


const inter = Inter({ subsets: ["latin"] });

const metadata: Metadata = {
  title: "Education Platform",
  description: "Generated by create next app",
};

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {

  return (
    <html lang="en">
      <head>
        <title>Education Platform</title>
        <meta name="description" content="Education Platform" />
        <link rel="icon" type="image/x-icon" href="/images/Login.png"/>
      </head>
      <body>
 
        <NavBar />
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
