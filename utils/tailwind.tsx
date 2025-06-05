import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { vars, useColorScheme } from 'nativewind'

// Utility function to combine and merge classnames
export const cn = (...inputs: ClassValue[]): string => {
   return twMerge(clsx(inputs))
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

// Theme component to apply the current theme
export function ThemeProvider({ children }: { children: React.ReactNode }) {
   const { colorScheme } = useColorScheme()
   console.log(colorScheme)
   return <>{children}</>
}
