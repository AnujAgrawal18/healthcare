"use client"
import React, { useState, useEffect } from 'react'
import NavBar from '@/components/NavBar'
import Link from 'next/link'
import { useLocation } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Item = () => {
    const location = useLocation()
    const [item, setitem] = useState([])

    const getitem = async (val) => {
        let a = await fetch("./api/item", { method: "POST", body: JSON.stringify({ name: location.state.category, title: location.state.title }), headers: { 'content-type': 'application/json' } })
        let b = await a.json();
        setitem(b)
    }
    const addtocart = async(e)=>{
        let a = await fetch("./api/cart", { method: "POST", body: JSON.stringify({ name: location.state.category, title: location.state.title, email: location.state.email, price: amount , img: item.img}), headers: { 'content-type': 'application/json' } })
        let b = await a.json()
        toast('Added to Cart', { position: "top-right", autoClose: 3000 })
    }

    useEffect(() => {
        getitem()
    }, [])

    const amount = Math.round(item.price - item.price * item.discount / 100)

    return (
        <div className='bg-gray-600'>
            <ToastContainer position="top-right" autoClose={3000} />
            <NavBar details={location.state}/>
            <div>
                <div className='flex p-5 bg-white w-[95%] mx-auto my-5'>
                    <div className='w-[40%]'>
                        <img src={item.img} alt="" className='h-[600px] w-[700px]' />
                        <button className='p-5 bg-green-400 font-bold m-2 w-[97%]' onClick={e=>addtocart(e)}>ADD TO CART</button>
                    </div>
                    <div className='mx-7 w-[60%]'>
                        <div className='font-bold text-[40px]'>{item.title} ({item.features})</div>
                        <div className='text-gray-600 text-[20px]'>#justHere</div>
                        <div className='flex content-center items-center align-middle'>
                            <div className='h-[35px] w-[70px] bg-orange-700 font-bold text-white rounded-lg flex p-1'>
                                <p className='font-bold py-[2px] pl-2'>4.1</p>
                                <img src="https://cdn-icons-png.flaticon.com/128/2893/2893811.png" alt="" className='invert w-[25px] h-[25px] p-[2px]' />
                            </div>
                            <div className='text-gray-700 mx-3'>5,18,133 Ratings & 32,089 Reviews</div>
                            <div><img src="/images/logo.jpg" alt="" className='object-center rounded-[5rem] h-[60px] w-[60px] invert' /></div>
                        </div>
                        <div className='text-green-800 text-[20px] font-bold mt-4'>Special Price</div>
                        <div className='flex content-center items-center align-middle mb-4'>
                            <div className='text-[40px]'>&#8377;{amount}</div>
                            <div className='text-gray-600 line-through text-[30px] mx-7'>&#8377;{item.price}</div>
                            <div className='text-green-600 text-[30px] font-bold'>{item.discount}% off</div>
                        </div>
                        <div className='text-black text-[20px] font-bold'>Available Offers</div>
                        <div className='text-[20px]'>
                            <div className='flex align-middle items-center'>
                                <img src="https://rukminim2.flixcart.com/www/36/36/promos/06/09/2016/c22c9fc4-0555-4460-8401-bf5c28d7ba29.png?q=90" alt="" className='w-[40px] h-[40px] mr-2' />
                                <div><b>Bank Offer</b> Get ₹50 Instant Discount on first FashionMart UPI transaction on order of ₹200 and above <span className="text-blue-800">T&C</span>
                                </div></div>
                            <div className='flex align-middle items-center'>
                                <img src="https://rukminim2.flixcart.com/www/36/36/promos/06/09/2016/c22c9fc4-0555-4460-8401-bf5c28d7ba29.png?q=90" alt="" className='w-[40px] h-[40px] mr-2' />
                                <div><b>Bank Offer</b> 5% Cashback on FashionMart Axis Bank Card <span className="text-blue-800">T&C</span></div></div>
                            <div className='flex align-middle items-center'>
                                <img src="https://rukminim2.flixcart.com/www/36/36/promos/06/09/2016/c22c9fc4-0555-4460-8401-bf5c28d7ba29.png?q=90" alt="" className='w-[40px] h-[40px] mr-2' />
                                <div><b>Bank Offer</b> Flat ₹1,250 off on HDFC Bank Credit Card EMI Txns, Tenure: 6 and 9 months, Min Txn Value: ₹15,000 <span className="text-blue-800">T&C</span></div></div>
                            <div className='flex align-middle items-center'>
                                <img src="https://rukminim2.flixcart.com/www/36/36/promos/06/09/2016/c22c9fc4-0555-4460-8401-bf5c28d7ba29.png?q=90" alt="" className='w-[40px] h-[40px] mr-2' />
                                <div><b>Special Price</b> Get extra 38% off (price inclusive of cashback/coupon) <span className="text-blue-800">T&C</span></div></div>
                            <div className='text-blue-800 text-[20px] font-bold'>View 25 more offers</div>
                        </div>
                        <hr className='my-4 h-[5px] bg-gray-300' />
                        <div className='flex justify-evenly my-4 text-blue-700 font-bold'>
                            <div className='w-[80px] text-center'>
                                <img src="https://m.media-amazon.com/images/G/31/A2I-Convert/mobile/IconFarm/trust_icon_free_shipping_81px._CB630870460_.png" alt="" />
                                <div>Free Shipping</div>
                            </div>
                            <div className='w-[80px] text-center'>
                                <img src="https://m.media-amazon.com/images/G/31/A2I-Convert/mobile/IconFarm/icon-top-brand._CB617044271_.png" alt="" />
                                <div>Top Brand</div>
                            </div>
                            <div className='w-[80px] text-center'>
                                <img src="https://m.media-amazon.com/images/G/31/A2I-Convert/mobile/IconFarm/icon-cod._CB485937110_.png" alt="" />
                                <div>Pay On Delivery</div>
                            </div>
                            <div className='w-[80px] text-center'>
                                <img src="https://m.media-amazon.com/images/G/31/A2I-Convert/mobile/IconFarm/Secure-payment._CB650126890_.png" alt="" />
                                <div>Secure Transactions</div>
                            </div>
                            <div className='w-[80px] text-center'>
                                <img src="https://m.media-amazon.com/images/G/31/A2I-Convert/mobile/IconFarm/icon-amazon-delivered._CB485933725_.png" alt="" />
                                <div>FashionMart Delivered</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='p-5 bg-white w-[95%] mx-auto my-5'>
                    <div className='text-black text-[40px] font-bold'>Product Specifications</div>
                    <div className='flex p-10'>
                        <div className='w-[50%] text-[25px] mt-2'>
                            <div className='text-[30px] font-bold'>Product details</div>
                            <div className='flex'><p className='font-semibold  w-[50%]'>Material Composition</p> <p>Polycotton</p></div>
                            <div className='flex'><p className='font-semibold w-[50%]'>Outer material</p><p> Cotton</p></div>
                            <div className='flex'><p className='font-semibold w-[50%]'>Length</p><p>Ankle length</p></div>
                            <div className='flex'><p className='font-semibold  w-[50%]'>Care instructions </p><p>Machine Wash</p></div>
                            <div className='flex'><p className='font-semibold  w-[50%]'>Country of Origin </p><p>India</p></div>
                        </div>
                        <div className='w-[50%]'>
                            <p className='text-[30px] font-bold mt-2'>About this item</p>
                            <ul className="list-disc text-[25px]">
                                <li>Style : Gown style; Fabric : Rayon</li>
                                <li>Wash Care : Easy Wash, Gently Wash, Wash seperately</li>
                                <li>Package Contains : 1 Readymde Long Kurti for women</li>
                                <li>Colour Declaration : There might be slight variation in the actual color of the product due to different screen resolutions</li>
                                <li>Item Length Description: Floor Length; Sleeve Type: Half Sleeve; Occasion Type: Evening; Age Range Description: Adult; Neck Style: Round Neck</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className='p-5 bg-white w-[95%] mx-auto my-5'>
                    <div className='text-black text-[40px] font-bold'>Comments</div>
                    <div className='flex w-[90%] mx-auto border-[0.9px] border-black p-3 mt-2'>
                        <img src="https://rainbowit.net/html/fatima/fatima/assets/img/others/author-1.jpg" alt="" className='rounded-[30rem] w-[6rem] mr-3' />
                        <div className='flex flex-col'>
                            <div className='flex justify-between'>
                                <div className='flex text-[20px]'><p className='font-bold mr-4'>John Doe</p><p>OCTOBER 24, 2020</p></div>
                                <div className='p-1 px-2 bg-green-300 rounded-[10rem] mr-5'>Reply</div>
                            </div>
                            <div className='text-left mt-3'>
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dignissimos autem quis eius quaerat cum blanditiis voluptatem odio culpa veritatis unde optio magnam quia, nemo maxime, aliquid atque in, ad quos?
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Item