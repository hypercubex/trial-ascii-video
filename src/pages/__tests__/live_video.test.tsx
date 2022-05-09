import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import LiveVideoPage from '../live_video'

describe('LiveVideo', () => {
  it('renders the live video page without error', () => {
    const page = render(<LiveVideoPage />)
    const StartButton = screen.getByTestId('video-page--btn-start-camera')
    const homeButton = screen.getByTestId('video-page-home-link')
    

    expect(page).toBeDefined()
    expect(StartButton).toBeInTheDocument()
    expect(homeButton).toBeInTheDocument()
    
  })
})
