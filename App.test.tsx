import { render, screen, fireEvent } from '@testing-library/react-native'

import App from './App'

const renderComponent = () => render(<App />)

describe('Calculator Tests', () => {
   it('should clear the calc', () => {
      renderComponent()

      const twoBtn = screen.getByText('2')
      expect(twoBtn).toBeDefined()

      const threeBtn = screen.getByText('3')
      expect(threeBtn).toBeDefined()

      const plusBtn = screen.getByText('+')
      expect(plusBtn).toBeDefined()

      const resultBox = screen.getByTestId('result-box')
      expect(resultBox).toBeDefined()

      fireEvent.press(twoBtn)
      fireEvent.press(plusBtn)
      fireEvent.press(threeBtn)

      expect(resultBox).toHaveTextContent('5')

      const clearBtn = screen.getByText('C')
      expect(clearBtn).toBeDefined()

      fireEvent.press(clearBtn)
      expect(resultBox).toHaveTextContent('')
   })
   it('should add two numbers', () => {
      renderComponent()

      const twoBtn = screen.getByText('2')
      expect(twoBtn).toBeDefined()

      const threeBtn = screen.getByText('3')
      expect(threeBtn).toBeDefined()

      const plusBtn = screen.getByText('+')
      expect(plusBtn).toBeDefined()

      const resultBox = screen.getByTestId('result-box')
      expect(resultBox).toBeDefined()

      fireEvent.press(twoBtn)
      fireEvent.press(plusBtn)
      fireEvent.press(threeBtn)

      expect(resultBox).toHaveTextContent('5')
   })
   it('should subtract two numbers', () => {
      renderComponent()

      const twoBtn = screen.getByText('2')
      expect(twoBtn).toBeDefined()

      const threeBtn = screen.getByText('3')
      expect(threeBtn).toBeDefined()

      const minusBtn = screen.getByText('-')
      expect(minusBtn).toBeDefined()

      const resultBox = screen.getByTestId('result-box')
      expect(resultBox).toBeDefined()

      fireEvent.press(threeBtn)
      fireEvent.press(minusBtn)
      fireEvent.press(twoBtn)

      expect(resultBox).toHaveTextContent('1')
   })
   it('should multiply two numbers', () => {
      renderComponent()

      const twoBtn = screen.getByText('2')
      expect(twoBtn).toBeDefined()

      const threeBtn = screen.getByText('3')
      expect(threeBtn).toBeDefined()

      const multiBtn = screen.getByText('x')
      expect(multiBtn).toBeDefined()

      const resultBox = screen.getByTestId('result-box')
      expect(resultBox).toBeDefined()

      fireEvent.press(threeBtn)
      fireEvent.press(multiBtn)
      fireEvent.press(twoBtn)

      expect(resultBox).toHaveTextContent('6')
   })
   it('should divide two numbers', () => {
      renderComponent()

      const twoBtn = screen.getByText('2')
      expect(twoBtn).toBeDefined()

      const threeBtn = screen.getByText('3')
      expect(threeBtn).toBeDefined()

      const divBtn = screen.getByText('/')
      expect(divBtn).toBeDefined()

      const resultBox = screen.getByTestId('result-box')
      expect(resultBox).toBeDefined()

      fireEvent.press(threeBtn)
      fireEvent.press(divBtn)
      fireEvent.press(twoBtn)

      expect(resultBox).toHaveTextContent('1.500')
   })
   it('should add two negative numbers', () => {
      renderComponent()

      const twoBtn = screen.getByText('2')
      expect(twoBtn).toBeDefined()

      const threeBtn = screen.getByText('3')
      expect(threeBtn).toBeDefined()

      const negBtn = screen.getByText('+/-')
      expect(negBtn).toBeDefined()

      const addBtn = screen.getByText('+')
      expect(addBtn).toBeDefined()

      const resultBox = screen.getByTestId('result-box')
      expect(resultBox).toBeDefined()

      fireEvent.press(threeBtn)
      fireEvent.press(negBtn)
      fireEvent.press(addBtn)
      fireEvent.press(twoBtn)
      fireEvent.press(negBtn)

      expect(resultBox).toHaveTextContent('-5')
   })

   it('should multiply with parenthesis', () => {
      renderComponent()

      const twoBtn = screen.getByText('2')
      expect(twoBtn).toBeDefined()

      const threeBtn = screen.getByText('3')
      expect(threeBtn).toBeDefined()

      const paraBtn = screen.getByText('( )')
      expect(paraBtn).toBeDefined()

      const plusBtn = screen.getByText('+')
      expect(plusBtn).toBeDefined()

      const resultBox = screen.getByTestId('result-box')
      expect(resultBox).toBeDefined()

      fireEvent.press(threeBtn)
      fireEvent.press(paraBtn)
      fireEvent.press(threeBtn)
      fireEvent.press(plusBtn)
      fireEvent.press(twoBtn)
      fireEvent.press(paraBtn)

      // Should be in format 3 * (3 + 2) and equal 15
      expect(resultBox).toHaveTextContent('15')
   })
   it('should multiply with parenthesis negative numbers', () => {
      renderComponent()

      const twoBtn = screen.getByText('2')
      expect(twoBtn).toBeDefined()

      const threeBtn = screen.getByText('3')
      expect(threeBtn).toBeDefined()

      const negBtn = screen.getByText('+/-')
      expect(negBtn).toBeDefined()

      const parenBtn = screen.getByText('( )')
      expect(parenBtn).toBeDefined()

      const addBtn = screen.getByText('+')
      expect(addBtn).toBeDefined()

      const resultBox = screen.getByTestId('result-box')
      expect(resultBox).toBeDefined()

      fireEvent.press(threeBtn)
      fireEvent.press(parenBtn)
      fireEvent.press(negBtn)
      fireEvent.press(twoBtn)
      fireEvent.press(addBtn)
      fireEvent.press(negBtn)
      fireEvent.press(threeBtn)
      fireEvent.press(parenBtn)
      fireEvent.press(addBtn)
      fireEvent.press(threeBtn)
      fireEvent.press(twoBtn)

      // 3 x (-2+-3) + 32
      expect(resultBox).toHaveTextContent('17')
   })
})
