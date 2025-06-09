import { Text, TouchableOpacity } from 'react-native'
import { cn } from '../../utils/index'
type ButtonProps = {
   text: string
   handlePress: (text: string) => void
   variant?: keyof typeof variantStyles
   icon?: React.ReactNode
}

const variantStyles = {
   default: '',
   equals: '',
   icon: '',
}

const Button = ({ text, handlePress, variant = 'default', icon }: ButtonProps) => {
   return (
      <TouchableOpacity
         onPress={() => handlePress(text)} // Handle button press
         className={cn('size-20 items-center justify-center rounded-full', variantStyles[variant])}>
         {!icon ? <Text className="text-3xl text-text">{text}</Text> : icon}
      </TouchableOpacity>
   )
}

export default Button
