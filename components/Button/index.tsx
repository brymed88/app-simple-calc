import { Text, TouchableOpacity } from 'react-native'
import { cn } from 'utils/tailwind'
type ButtonProps = {
   text: string
   handlePress: (text: string) => void
   variant?: keyof typeof variantStyles
   icon?: React.ReactNode
}

const variantStyles = {
   default: 'flex-1',
   equals: '',
   icon: 'mr-2',
}

const Button = ({ text, handlePress, variant = 'default', icon }: ButtonProps) => {
   return (
      <TouchableOpacity
         onPress={() => handlePress(text)} // Handle button press
         className={cn(
            'size-16 items-center justify-center rounded-full bg-purple-300',
            variantStyles[variant]
         )}>
         {!icon ? <Text className="text-3xl text-text">{text}</Text> : icon}
      </TouchableOpacity>
   )
}

export default Button
