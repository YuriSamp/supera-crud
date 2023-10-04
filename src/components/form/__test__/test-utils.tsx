import { RenderOptions, render } from '@testing-library/react'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

//eslint-disable-next-line
const AllTheProviders = ({ children }: { children: JSX.Element }) => {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient} >
      <BrowserRouter>
        <ChakraProvider>
          {children}
        </ChakraProvider>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

const customRender = (ui: JSX.Element, options?: Omit<RenderOptions, 'wrapper'>) => render(ui, { wrapper: AllTheProviders, ...options })

//eslint-disable-next-line
export * from '@testing-library/react'
export { customRender as render }
