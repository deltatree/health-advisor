import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

// Mock axios to prevent actual network calls
jest.mock('axios', () => ({
  get: jest.fn(() => Promise.reject(new Error('Mocked network error'))),
  post: jest.fn(() => Promise.reject(new Error('Mocked network error')))
}));

test('renders connection error when backend is not available', async () => {
  render(<App />);
  
  // Should show connection error
  expect(await screen.findByText('Verbindungsfehler')).toBeInTheDocument();
});

test('renders error message with backend instructions', async () => {
  render(<App />);
  
  // Should show code element with backend command
  expect(await screen.findByText('cd backend')).toBeInTheDocument();
});

test('renders retry button', async () => {
  render(<App />);
  
  // Should show retry button
  expect(await screen.findByText('Erneut versuchen')).toBeInTheDocument();
});
