"use client"
import { ThemeProvider } from 'next-themes'
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

function ThemeMode({ children }: { children: any }) {

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

    if (!reduxTheme) {
        return <>{children}</>
    }

    return (
        <ThemeProvider defaultTheme="dark">
            {children}
        </ThemeProvider>
    )
}

export default ThemeMode
