'use client'

import './globals.css'

import { Provider } from 'react-redux'
import store from '../redux/store'
import Header from '@/components/Header'


export default function RootLayout({ children }) {
  
  return (
    <html lang="en">
      <head />
      <body>
        <Provider store={store}>
          <Header />
          {children}
        </Provider>
      </body>
    </html>
  )
}
