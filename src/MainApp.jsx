import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import ViewImage from './ViewImage'
import ViewPdf from './ViewPdf'
import App from './App'
import { DataProvider } from './DataContext'

function MainApp() {
  return (
    <BrowserRouter>
    <DataProvider>
      <Routes>
      
        
        <Route path='/showDoc/:link' element={<ViewPdf/>} />
        <Route path='/showImg/:link' element={<ViewImage/>} />
        <Route path='/' element={<App/>} />
      </Routes>
      </DataProvider>
    </BrowserRouter>
  )
}

export default MainApp