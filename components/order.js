import React from 'react'
import NavBar from '@/components/NavBar'
import { useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'

const Order = () => {
    const location = useLocation()
    const [orderitems, setorderitems] = useState([])

    const getitems = async (val) => {
        let a = await fetch("./api/getorder", { method: "POST", body: JSON.stringify({ email: location.state.email }), headers: { 'content-type': 'application/json' } })
        let b = await a.json();
        if(b.length!==0) setorderitems(b[0].items)
    }

    useEffect(() => {
        getitems()
    }, [])

  return (
    <div className={'min-h-screen '}>
        <NavBar details={location.state} />
        <div className={'bg-gradient-to-b from-orange-400 to-green-400 p-5 min-h-screen'}>
                {(orderitems.length === 0) ?
                    <div className='w-[95%] p-5 bg-white mx-auto border-2 border-red-600'>
                        <div className='font-bold text-[30px]'>No Order has been placed yet...</div>
                        <div className='text-[20px]'>our shopping cart is waiting. Give it purpose – fill it with groceries, clothing, household supplies, electronics and more.
                            Continue shopping on the FashionMart homepage</div>
                    </div> :
                    orderitems.map(
                        item => {
                            return (
                                <div className={'w-[95%] p-5 bg-white mx-auto border-2 border-red-600 flex my-5 justify-between h-[200px]'}>
                                    <img src={item.img} alt="" className='h-full w-[200px]' />
                                    <div className='mx-10 flex flex-col text-center justify-between w-[80%]'>
                                        <div className='text-[30px] font-bold '>{item.title.split(' ').slice(0, 10).join(' ')}...</div>
                                        <div className='text-[35px]'>&#8377;{item.price}</div>
                                        <div className='text-[30px]'><b>Status: </b> Ready for Shipment</div>
                                    </div>
                                </div>
                            )
                        }
                    )
                }
            </div>
    </div>
  )
}

export default Order