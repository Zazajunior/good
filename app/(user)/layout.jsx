import React, { Children } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import AuthProvider from '../components/AuthProvider'
import { Toaster } from '@/components/ui/toaster'

const layout = ({ children }) => {
  return (
    <div>
      <AuthProvider>
        <Navbar />
        {children}
        <Footer />
        <Toaster />
      </AuthProvider>
    </div>
  )
}

export default layout