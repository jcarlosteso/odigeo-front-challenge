import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'

import Layout from '../Layout'
import { BrowserRouter } from 'react-router-dom'

test ('Loads and shows header', async () => {
  render(<Layout />, { wrapper: BrowserRouter })
  await waitFor(() => screen.getByRole('heading'))

  expect(screen.getByRole('link')).toHaveAttribute('href', '/')
  expect(screen.getByRole('img')).toBeInTheDocument()
  expect(screen.getByRole('heading')).toHaveTextContent('ODIGEO Frontend challenge')
})