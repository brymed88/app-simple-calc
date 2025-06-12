import { useState, useEffect } from 'react'
import { SafeAreaView, Text, View, Appearance } from 'react-native'
import './global.css'
import Button from './components/Button'
import { ThemeProvider } from './contexts/ThemeContext'
import { Delete } from 'lucide-react-native'

const buttons = [
   ['C', '( )', '+/-', '/'], // First row of buttons
   ['7', '8', '9', 'x'], // Second row of buttons
   ['4', '5', '6', '-'], // Third row of buttons
   ['1', '2', '3', '+'], // Fourth row of buttons
   ['00', '0', '.', '='],
]

const App = () => {
   const [input, setInput] = useState('')
   const [result, setResult] = useState('')

   const isDarkMode = Appearance.getColorScheme() === 'dark'
   const getChar = (input: string, fromEnd: number) => input.charAt(input.length - fromEnd)
   const numRegEx = /\d$/

   function isValidParenthesis(str: string) {
      let stack = []
      for (let i = 0; i < str.length; i++) {
         let char = stack[stack.length - 1]
         if (str[i] === '(') {
            stack.push(str[i])
         } else if (char === '(' && str[i] === ')') {
            stack.pop()
         }
      }
      return !stack.length
   }

   useEffect(() => {
      if (input) {
         let finalInput = input
            .replace(/x/g, '*')
            .replace(/÷/g, '/')
            .replace(/[^-()\d/*+.%]/g, '')

         const finalChar = getChar(finalInput, 1)

         if (isValidParenthesis(finalInput) && (!isNaN(parseInt(finalChar)) || finalChar === ')')) {
            const evalResult: number = eval(finalInput)

            //TODO: allow changing decimal place preference in future
            if (evalResult % 1 !== 0) setResult(evalResult.toFixed(3).toString())
            else setResult(evalResult.toString())
         }
      } else {
         setResult('')
      }
   }, [input])

   const handlePress = (btn: string) => {
      const isNumericBtn = numRegEx.test(btn)
      const operatorArr = ['/', 'x', '-', '+']
      const lastChar = getChar(input, 1)

      if (!isNumericBtn) {
         // Only allow one operator, ex.. only allow one /
         if (btn === lastChar && btn !== '( )') return

         // Parenthesis button
         if (btn === '( )') {
            const isPrevCharNumeric = numRegEx.test(lastChar)

            if (isPrevCharNumeric && isValidParenthesis(input)) setInput(input + '*(')

            // if prev operator
            if (operatorArr.includes(lastChar)) setInput(input + '(')

            // if prev open parenthesis
            if (lastChar === '(') setInput(input + '(')

            // if prev close parenthesis
            if (lastChar === ')') {
               if (isValidParenthesis(input)) {
                  setInput(input + '*(')
               } else {
                  setInput(input + ')')
               }
            }
            // if not valid paranthesis and prev is number
            if (!isValidParenthesis(input) && isPrevCharNumeric) setInput(input + ')')

            return
         }

         //if operator
         if (operatorArr.includes(btn)) {
            // Replace operator with another
            if (operatorArr.includes(lastChar)) {
               setInput(input.slice(0, -1) + btn)
               return
            }
            setInput(input + btn)
            return
         }

         if (btn === '.' || btn === '%') setInput(input + btn)

         if (btn === 'del') setInput(input.slice(0, -1))

         if (btn === 'C') setInput('')

         if (btn === '=') setInput(result)

         if (btn === '+/-') {
            const regex = /([+\-x(*/])(?!.*[+\-x(*/])/
            const lastOpIndex = regex.exec(input)?.index || -1
            const digitsAfterOperator =
               lastOpIndex === -1 ? '' : input.slice(lastOpIndex + 1, input.length)

            if (input[lastOpIndex] === '-') {
               setInput(
                  input.substring(0, lastOpIndex) + input.substring(lastOpIndex + 1, input.length)
               )
               return
            }

            if (digitsAfterOperator.length === 0) {
               if (lastOpIndex !== -1 && input[lastOpIndex] !== '-') {
                  setInput(input + '-')
               } else {
                  setInput('-' + input)
               }
            }

            if (digitsAfterOperator.length >= 1)
               setInput(
                  input.slice(0, input.length - digitsAfterOperator.length) +
                     '-' +
                     digitsAfterOperator
               )
         }
         return
      }

      setInput((prev) => prev + btn)
   }

   return (
      <ThemeProvider>
         <SafeAreaView className="flex w-full flex-1 items-center justify-between bg-background py-8">
            {/* Display the input and result */}
            <View className="flex w-10/12 items-end gap-8 p-0.5 pt-10">
               <Text className="text-2xl text-text/50 dark:text-text/70" testID="input-box">
                  {input}
               </Text>
               {/* Show the current input */}
               <Text className="text-6xl text-text" testID="result-box">
                  {result}
               </Text>
               {/* Show the calculated result */}
            </View>

            {/* Render the calculator buttons */}
            <View className="flex w-10/12 flex-col items-center gap-1">
               <View className="flex w-full flex-row justify-end border-b border-b-slate-100 dark:border-b-slate-800">
                  {/* <Button
                     text="settings"
                     icon={<Settings color={isDarkMode ? '#fff' : '#000'} size={24} />}
                     handlePress={openSettings}
                  /> */}
                  <Button
                     text="del"
                     icon={<Delete color={isDarkMode ? '#fff' : '#000'} size={24} />}
                     handlePress={handlePress}
                     variant="icon"
                  />
               </View>

               {buttons.map((row, rowIndex) => (
                  <View key={rowIndex} className="flex w-full flex-row justify-between">
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
