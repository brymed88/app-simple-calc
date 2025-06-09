import React, { createContext, useContext, useEffect, useState } from 'react'
import { SafeAreaView, useColorScheme as useDeviceColorScheme, Appearance } from 'react-native'
import { vars } from 'nativewind'
import { StatusBar } from 'expo-status-bar'

type ThemeContextType = {
   theme: 'light' | 'dark'
   setTheme: (theme: 'light' | 'dark' | 'system') => void
   isSystemTheme: boolean
}

// Define theme variables
export const themes = {
   light: vars({
      '--color-primary': '0 122 255', // iOS blue
      '--color-secondary': '236 236 236', // Light gray
      '--color-background': '255 255 255', // White
      '--color-text': '44 44 46', // iOS blue
   }),
   dark: vars({
      '--color-primary': '10 132 255', // iOS blue (dark mode)
      '--color-secondary': '44 44 46', // Dark gray
      '--color-background': '0 0 0', // Dark background
      '--color-text': '255 255 255', // White
   }),
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
   const deviceTheme = useDeviceColorScheme()

   const [isSystemTheme, setIsSystemTheme] = useState(true)
   const { setColorScheme } = Appearance
   const [theme, setThemeState] = useState<'light' | 'dark'>(
      deviceTheme === 'dark' ? 'dark' : 'light'
   )

   const setTheme = (newTheme: 'light' | 'dark' | 'system') => {
      if (newTheme === 'system') {
         setIsSystemTheme(true)
         const systemTheme = deviceTheme === 'dark' ? 'dark' : 'light'
         setThemeState(systemTheme)
         setColorScheme(systemTheme)
      } else {
         setIsSystemTheme(false)
         setThemeState(newTheme)
         setColorScheme(newTheme)
      }
   }

   // Listen for device theme changes when using system theme
   useEffect(() => {
      if (isSystemTheme) {
         const newTheme = deviceTheme === 'dark' ? 'dark' : 'light'
         setThemeState(newTheme)
         setColorScheme(newTheme)
      }
   }, [deviceTheme, isSystemTheme, setColorScheme])

   return (
      <ThemeContext.Provider value={{ theme, setTheme, isSystemTheme }}>
         <StatusBar translucent={true} />
         <SafeAreaView className="flex flex-1 bg-background" style={themes[theme]}>
            {children}
         </SafeAreaView>
      </ThemeContext.Provider>
   )
}

export const useTheme = () => {
   const context = useContext(ThemeContext)
   if (context === undefined) {
      throw new Error('useTheme must be used within a ThemeProvider')
   }
   return context
}
