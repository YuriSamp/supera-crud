import { RenderOptions, render } from '@testing-library/react'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom';

//eslint-disable-next-line
const AllTheProviders = ({ children }: { children: JSX.Element }) => {
  return (
    <BrowserRouter>
      <ChakraProvider>
        {children}
      </ChakraProvider>
    </BrowserRouter>
  )
}

const customRender = (ui: JSX.Element, options?: Omit<RenderOptions, 'wrapper'>) => render(ui, { wrapper: AllTheProviders, ...options })

//eslint-disable-next-line
export * from '@testing-library/react'
export { customRender as render }
