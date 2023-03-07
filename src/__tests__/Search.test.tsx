import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

import Home from '../pages/Home'
import { BrowserRouter } from 'react-router-dom'

describe('Home page', () => {
  test('Shows filters and search button', async () => {
    const { getByPlaceholderText } = render (<Home />, {wrapper: BrowserRouter})

    await waitFor(() => getByPlaceholderText('Where from?'))

    expect(getByPlaceholderText('Where from?')).toBeInTheDocument()
  })
})