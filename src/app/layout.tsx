"use client"

import React, { ReactNode, useEffect } from "react";
import { Inter } from "next/font/google";
import { Metadata } from "next";
import "./globals.css";
import NavBar from "./../components/navBar";
import { Providers } from "./GlobalRedux/provider";
import Notification from "../components/Notifications";
import "react-toastify/dist/ReactToastify.css";
import ThemeMode from "../components/ThemeMode";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Education Platform",
  description: "Education Platform",
};

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {

  useEffect(() => {
    (document.documentElement.style as any).zoom = "1";

    // Zoom control logic
    const handleZoom = (e: WheelEvent | KeyboardEvent) => {
      if ((e as KeyboardEvent).ctrlKey || (e as WheelEvent).ctrlKey) {
        e.preventDefault();
        
        const currentZoom = (document.documentElement.style as any).zoom 
          ? parseFloat((document.documentElement.style as any).zoom) 
          : 1;

        let newZoom = currentZoom;
        
        if (e.type === 'wheel') {
          const wheelEvent = e as WheelEvent;
          if (wheelEvent.deltaY < 0) {
            newZoom = Math.min(currentZoom + 0.1, 1.1); // Max 110%
          } else {
            newZoom = Math.max(currentZoom - 0.1, 0.7); // Min 70%
          }
        }
        
        if (e.type === 'keydown') {
          const keyEvent = e as KeyboardEvent;
          if (keyEvent.key === '+' || keyEvent.key === '=') {
            newZoom = Math.min(currentZoom + 0.1, 1.1);
          } else if (keyEvent.key === '-') {
            newZoom = Math.max(currentZoom - 0.1, 0.7);
          }
        }
        
        (document.documentElement.style as any).zoom = newZoom.toString();
      }
    };

    // Prevent pinch-to-zoom on touch devices
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    };

    // Prevent double-tap zoom
    let lastTouchEnd = 0;
    const handleTouchEnd = (e: TouchEvent) => {
      const now = Date.now();
      if (now - lastTouchEnd <= 300) {
        e.preventDefault();
      }
      lastTouchEnd = now;
    };

    // Add event listeners
    window.addEventListener('wheel', handleZoom as any, { passive: false });
    window.addEventListener('keydown', handleZoom as any);
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd, { passive: false });

    // Cleanup
    return () => {
      window.removeEventListener('wheel', handleZoom as any);
      window.removeEventListener('keydown', handleZoom as any);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  return (
    <html suppressHydrationWarning={true} lang="en">
      <body className={`${inter.className} duration-300 transition-all `}>
        <Providers>
          <ThemeMode>
            <NavBar />
            <Notification />
            {children}
          </ThemeMode>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
