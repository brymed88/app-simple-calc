import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

// Utility function to combine and merge classnames
export const cn = (...inputs: ClassValue[]): string => {
   return twMerge(clsx(inputs))
}
