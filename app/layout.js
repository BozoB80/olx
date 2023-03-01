'use client'

import './globals.css'

import { Provider } from 'react-redux'
import store from '../redux/store'
import Header from '@/components/Header'
import FooterNav from '@/components/FooterNav'


export default function RootLayout({ children }) {
  
  return (
    <html lang="en">
      <head />
      <body>
        <Provider store={store}>
          <Header />
          {children}
          <FooterNav />
        </Provider>
      </body>
    </html>
  )
}
