import { useState, useEffect } from 'react'
import { SafeAreaView, Text, View } from 'react-native'
import './global.css'
import Button from 'components/Button'
import { ThemeProvider } from 'contexts/ThemeContext'
import { Delete } from 'lucide-react-native'
import { colorScheme } from 'nativewind'

// Define the layout of calculator buttons

const buttons = [
   ['C', '(', ')', '%'], // First row of buttons
   ['7', '8', '9', '/'], // Second row of buttons
   ['4', '5', '6', '*'], // Third row of buttons
   ['1', '2', '3', '-'], // Fourth row of buttons
   ['+/-', '0', '.', '+'],
   ['='], // Fifth row of buttons
]

const App = () => {
   const [input, setInput] = useState('')
   const [result, setResult] = useState('')

   const isDarkMode = colorScheme.get() === 'dark'

   const getChar = (input: string, fromEnd: number) => input.charAt(input.length - fromEnd)

   useEffect(() => {
      try {
         if (input) {
            let finalInput = input.replace(/×/g, '*').replace(/÷/g, '/')
            const stripped =
               getChar(finalInput, 1) === ')' || /\d$/.test(finalInput)
                  ? finalInput
                  : finalInput.slice(0, -1)

            const evalResult: number = eval(stripped)

            if (evalResult % 1 !== 0) setResult(evalResult.toFixed(4).toString())
            else setResult(evalResult.toString())
         } else {
            setResult('')
         }
      } catch (e: unknown) {
         setResult('')
      }
   }, [input])

   const handlePress = (btn: string) => {
      const numRegEx = /\d$/
      const isNumericBtn = numRegEx.test(btn)
      const operatorArr = ['/', '*', '-', '+']

      if (!isNumericBtn) {
         // EX.. only allow one /
         if (btn === '(' || btn === ')') {
            setInput(input + btn)
            return
         }
         if (btn === getChar(input, 1)) return

         // Replace operator with another
         if (operatorArr.includes(getChar(input, 1)) && operatorArr.includes(btn)) {
            let nText = input.slice(0, -1)
            setInput(nText + btn)
            return
         }
      }

      switch (btn) {
         case 'del':
            setInput(input.slice(0, -1))
            break
         case 'C':
            setInput('')
            setResult('')
            break
         case '=':
            setInput(result)
            break
         case '+/-':
            if (input.startsWith('-')) setInput(input.substring(1))
            else setInput('-' + input)
            break
         default:
            setInput((prev) => prev + btn)
            break
      }
   }

   return (
      <ThemeProvider>
         <SafeAreaView className="flex flex-1 justify-between bg-background px-4 py-8">
            {/* Display the input and result */}
            <View className="flex items-end gap-4 p-0.5">
               <Text className="text-3xl text-text/50 dark:text-text/70">{input}</Text>
               {/* Show the current input */}
               <Text className="text-6xl text-text">{result}</Text>
               {/* Show the calculated result */}
            </View>

            {/* Render the calculator buttons */}
            <View>
               <View className="flex flex-row justify-end">
                  <Button
                     text="del"
                     icon={<Delete color={isDarkMode ? '#fff' : '#000'} size={28} />}
                     handlePress={handlePress}
                     variant="icon"
                  />
               </View>

               {buttons.map((row, rowIndex) => (
                  <View key={rowIndex} className="grid grid-cols-4 justify-end w-full gap-2 p-1">
                     {row.map((btn, colIndex) => (
                        <Button
                           key={colIndex}
                           text={btn}
                           handlePress={handlePress}
                           variant={btn !== '=' ? 'default' : 'equals'}
                        />
                     ))}
                  </View>
               ))}
            </View>
         </SafeAreaView>
      </ThemeProvider>
   )
}

export default App
