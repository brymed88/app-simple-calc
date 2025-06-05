import React, { createContext, useContext, useEffect, useState } from 'react'
import { SafeAreaView, useColorScheme as useDeviceColorScheme } from 'react-native'
import { useColorScheme } from 'nativewind'
import { themes } from 'utils/tailwind'
import { StatusBar } from 'expo-status-bar'

type ThemeContextType = {
   theme: 'light' | 'dark'
   setTheme: (theme: 'light' | 'dark' | 'system') => void
   isSystemTheme: boolean
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
   const deviceTheme = useDeviceColorScheme()

   const [isSystemTheme, setIsSystemTheme] = useState(true)
   const { setColorScheme } = useColorScheme()
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
