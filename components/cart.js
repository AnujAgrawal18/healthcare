import React from 'react'
import NavBar from '@/components/NavBar'
import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'

const Cart = () => {
    const location = useLocation()
    const [cartitems, setcartitems] = useState([])

    const getitems = async (val) => {
        let a = await fetch("./api/getcart", { method: "POST", body: JSON.stringify({ email: location.state.email }), headers: { 'content-type': 'application/json' } })
        let b = await a.json();
        setcartitems(b[0].items)
    }

    useEffect(() => {
        getitems()
    }, [])
    return (
        <div className=' min-h-screen'>
            <NavBar details={location.state} />
            <div className='bg-gradient-to-b from-orange-400 to-green-400 p-5'>
                {(cartitems.length === 0) ?
                    <div className='w-[95%] p-5 bg-white mx-auto border-2 border-red-600'>
                        <div className='font-bold text-[30px]'>Your FashionMart Cart is Empty</div>
                        <div className='text-[20px]'>our shopping cart is waiting. Give it purpose – fill it with groceries, clothing, household supplies, electronics and more.
                            Continue shopping on the FashionMart homepage</div>
                    </div> :
                    cartitems.map(
                        item => {
                            return (
                                <div className='w-[95%] p-5 bg-white mx-auto border-2 border-red-600 flex justify-evenly my-5'>
                                    <img src={item.img} alt="" className='h-[200px] w-[200px]' />
                                    <div className='mx-10 flex flex-col justify-between min-w-[50%] text-center'>
                                        <div className='text-[30px] font-bold '>{item.title}</div>
                                        <div className='text-[35px]'>&#8377;{item.price}</div>
                                        <button className='w-full h-[60px] bg-brown bg-orange-700'>DELETE FROM CART</button>
                                    </div>
                                    <button className='w-[20%] h-[200px] bg-brown bg-green-700'>BUY NOW</button>
                                </div>
                            )
                        }
                    )
                }
            </div>
        </div>
    )
}

export default Cart