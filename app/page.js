"use client"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from '@/components/login'
import Signup from '@/components/signup'
import Main from '@/components/home'
import YourAccount from '@/components/yourAccount'
import Cart from '@/components/cart'
import Itemgrid from '@/components/Itemgrid'
import Item from '@/components/item'
import Order from '@/components/order'

export default function Home() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/home' element={<Main />} />
        <Route path='/yourAccount' element={<YourAccount />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/Itemgrid' element={<Itemgrid />} />
        <Route path='/Item' element={<Item />} />
        <Route path='/myorder' element={<Order />} />
      </Routes>
    </BrowserRouter>
    // <Cart />
  )
}
