import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import listing from './components/listing'
import home from './components/home'
import Navigation from './components/navbar'
import login from './components/login'
import signup from './components/signup'
import singleListing from './components/singleListing'
import MyProfile from './components/myProfile'
import ProtectedRoute from './components/protectedRouter'
import UserInfo from './components/UserInfo'
import MyListings from './components/MyListings'
import CreateListing from './components/createListing'
import ProtectedRouteAdmin from './components/protectedRouteAdmin'
import AdminCategories from './components/adminCategories'

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path='/' Component={home} />
        <Route path='/listings' Component={listing} />
        <Route path='/login' Component={login} />
        <Route path='/signup' Component={signup} />
        <Route path='/myListing' Component={MyListings} />
        <Route path='/UserInfo/:userId' Component={UserInfo} />
        <Route path='/createListing' element={<ProtectedRoute><CreateListing /></ProtectedRoute>} />
        <Route path='/admin/categories' element={<ProtectedRouteAdmin><AdminCategories /></ProtectedRouteAdmin>} />
        <Route path='/editListing/:id' element={<ProtectedRoute><CreateListing /></ProtectedRoute>} />
        <Route path='/singleListing/:listingId' Component={singleListing} />
        <Route path='/me' element={
          <ProtectedRoute><MyProfile /></ProtectedRoute>} />
      </Routes>

    </>
  )
}

export default App
