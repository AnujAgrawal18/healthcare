"use client"
import NavBar from '@/components/NavBar'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useLocation , useNavigate} from 'react-router-dom'

const Itemgrid = () => {
    const navigate = useNavigate()
  const location = useLocation()
  const [items, setitems] = useState([])

  const getitems = async (val) => {
    let a = await fetch("./api/grid", { method: "POST", body: JSON.stringify({ name: location.state.name }), headers: { 'content-type': 'application/json' } })
    let b = await a.json();
    setitems(b)
  }

  useEffect(() => {
    getitems()
  }, [location.state.name])

  const gotoitem = async(item)=>{
    navigate('/item', {state: {title : item.title, category: location.state.name, email : location.state.email }})
  }

  return (
    <div className='bg-gradient-to-b from-orange-400 to-green-400'>
      <NavBar details={location.state}/>
      <div className='grid grid-cols-4 w-[95%] mx-auto'>
        {
          items.map(item => {
            const amount = Math.round(item.price-item.price*item.discount/100)
            return (
              <div onClick={e=>gotoitem(item)} className='w-[300px] h-[400px] bg-white p-3 text-center m-4 shadow-[0px_0px_10px_3px] shadow-black'>
                <img src={item.img} alt="" className='w-[350px] h-[280px]' />
                <div className='text-[20px] font-bold mt-2 h-[25px] overflow-hidden'>
                  {item.title.split(' ').slice(0, 5).join(' ')}...
                </div>
                <div>{item.features.split(' ').slice(0, 3).join(' ')}</div>
                <div className='flex items-center align-middle content-center justify-evenly mt-1'>
                  <div className='font-bold text-[20px]'>&#8377;{amount}</div>
                  <div className='line-through font-bold text-gray-700'>&#8377;{item.price}</div>
                  <div className='font-bold text-green-600'>{item.discount}% off</div>
                </div>
              </div>
            )})}
      </div>
    </div>
  )
}

export default Itemgrid