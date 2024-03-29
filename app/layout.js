'use client'

import './globals.css'

import { Provider } from 'react-redux'
import store from '../redux/store'
import Header from '@/components/Header'
import FooterNav from '@/components/FooterNav'
import ToasterProvider from '@/components/providers/ToasterProvider'
import Footer from '@/components/Footer'


export default function RootLayout({ children }) {
  
  return (
    <html lang="en">
      <head />
      <body>
        <Provider store={store}>
          <ToasterProvider />
          <Header />
          {children}
          <FooterNav />
          <Footer />
        </Provider>
      </body>
    </html>
  )
}
