import React, { createContext, useState, useEffect, useContext } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

type Theme = 'light' | 'dark'

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
)

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme>('light')

  useEffect(() => {
    ;(async () => {
      const savedTheme = await AsyncStorage.getItem('theme')
      if (savedTheme) {
        setTheme(savedTheme as Theme)
      }
    })()
  }, [])

  const toggleTheme = async () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    await AsyncStorage.setItem('theme', newTheme) // Make sure this is awaited
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  console.log('check context', context)

  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
