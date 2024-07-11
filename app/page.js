"use client"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import dynamic from 'next/dynamic'
const Login = dynamic(() => import('@/components/login'), { ssr: false })
const Signup = dynamic(() => import('@/components/signup'), { ssr: false })
const Main = dynamic(() => import('@/components/home'), { ssr: false })
const YourAccount = dynamic(() => import('@/components/yourAccount'), { ssr: false })
const Cart = dynamic(() => import('@/components/cart'), { ssr: false })
const Itemgrid = dynamic(() => import('@/components/Itemgrid'), { ssr: false })
const Item = dynamic(() => import('@/components/item'), { ssr: false })
const Order = dynamic(() => import('@/components/order'), { ssr: false })
const Forgotpassword = dynamic(() => import('@/components/forgotpassword'), { ssr: false })



export default function Home() {
  return (<>
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
          <Route path='/forgotpassword' element={<Forgotpassword />} />
        </Routes>
      </BrowserRouter>
  </>)
}
