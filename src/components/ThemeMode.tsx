"use client";
import { ThemeProvider } from 'next-themes';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

function ThemeMode({ children }: { children: React.ReactNode }) {
    const reduxTheme = useSelector((state: any) => state.theme.theme);

    useEffect(() => {
        if (reduxTheme) {
            document.documentElement.classList.add('dark');
            document.documentElement.style.colorScheme = 'dark';
        } else {
            document.documentElement.classList.remove('dark');
            document.documentElement.style.colorScheme = 'light';
        }
    }, [reduxTheme]);

    return (
        <ThemeProvider defaultTheme={reduxTheme ? "dark" : "light"}>
            {children}
        </ThemeProvider>
    );
}

export default ThemeMode;
