"use client"
import { ThemeProvider } from 'next-themes'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'

function ThemeMode({ children }) {

    const [mounted , setMounted] = useState(true)

    useEffect(() => {
        if(mounted){
            document.documentElement.classList.add('dark')
        }
    }, [])
    
    if (!mounted) {
        return <>{children}</>
    }

    return (
        <ThemeProvider>
            {children}
        </ThemeProvider>
    )
}

export default ThemeMode
