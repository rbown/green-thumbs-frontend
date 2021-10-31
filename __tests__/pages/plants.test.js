/**
 * @jest-environment jsdom
 */

import React from 'react'
import { render, screen } from '@testing-library/react'
import Plants from '../../pages/index'

describe('Plants', () => {
  it('renders', () => {
    render(<Plants />)
    
    expect(screen.getByText(/plants/i)).toBeInTheDocument()
  })
  
  it('shows placeholder text when there are no plants', () => {
    render(<Plants />)
    
    expect(screen.getByText(/no plants available, click here to add one/i)).toBeInTheDocument()
  })
  
  it('shows placeholder text when there are no plants', () => {
    render(<Plants />)
    
    expect(screen.getByText(/no plants available, click here to add one/i)).toBeInTheDocument()
  })
  
  it('shows a list of plants', () => {
    render(<Plants plants={plants} />)
    
    expect(screen.getByText(/plant 1/i)).toBeInTheDocument()
    expect(screen.getByText(/plant 2/i)).toBeInTheDocument()
  })
})


const plants = [
  {
    name: 'Plant 1',
    species: 'Bush'
  },
  {
    name: 'Plant 2',
    species: 'Tree'
  }
]
