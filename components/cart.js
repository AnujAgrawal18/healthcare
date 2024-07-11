import React from 'react'
import NavBar from '@/components/NavBar'
import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Cart = () => {
    const location = useLocation()
    const {register, handleSubmit , setValue} = useForm();
    const [cartitems, setcartitems] = useState([])
    const [buyimg, setbuyimg] = useState()
    const [buyitemname, setbuyitemname] = useState()
    const [buyprice, setbuyprice] = useState()
    const [buy, setbuy] = useState(false)
    

    const getitems = async (val) => {
        let a = await fetch("./api/getcart", { method: "POST", body: JSON.stringify({ email: location.state.email }), headers: { 'content-type': 'application/json' } })
        let b = await a.json();
        setcartitems(b[0].items)
    }

    useEffect(() => {
        getitems()
    }, [])

    const deleteitem = async (val) => {
        let a = await fetch("./api/getcart", { method: "DELETE", body: JSON.stringify({ email: location.state.email, title: val }), headers: { 'content-type': 'application/json' } })
        let b = await a.json();
        setcartitems(b[0].items)
    }

    const buyitem = async (val) => {
        setbuyimg(val.img)
        setbuyitemname(val.title)
        setbuyprice(val.price)
        setbuy(true)
    }


    const onSubmit = async (val) => {
        console.log(val)
        if (val.mode.length === 0) {
          toast.error('mode field is empty', { position: "top-right", autoClose: 2000 })
        }
        else {
            console.log("paid")
            toast('Item placed successfully', { position: "top-right", autoClose: 3000 })
            setbuy(false)     
            console.log({email: location.state.email,buyitemname,buyimg,buyprice:buyprice+40-299,buymode: val.mode})
            let a = await fetch("./api/order", { method: "POST", body: JSON.stringify({email: location.state.email,title:buyitemname,img:buyimg,price:buyprice+40-299,mode:val.mode}), headers: { 'content-type': 'application/json' } })

        }
      }

    return (
        <div className={'min-h-screen '}>
            <ToastContainer position="top-right" autoClose={3000} />
            <NavBar details={location.state} />
            <div className={(buy)?'bg-gradient-to-b from-orange-400 to-green-400 p-5 blur-sm h-screen':'bg-gradient-to-b from-orange-400 to-green-400 p-5 h-screen'}>
                {(cartitems.length === 0) ?
                    <div className='w-[95%] p-5 bg-white mx-auto border-2 border-red-600'>
                        <div className='font-bold text-[30px]'>Your FashionMart Cart is Empty</div>
                        <div className='text-[20px]'>our shopping cart is waiting. Give it purpose – fill it with groceries, clothing, household supplies, electronics and more.
                            Continue shopping on the FashionMart homepage</div>
                    </div> :
                    cartitems.map(
                        item => {
                            return (
                                <div className={'w-[95%] p-5 bg-white mx-auto border-2 border-red-600 flex my-5 justify-between h-[200px]'}>
                                    <img src={item.img} alt="" className='h-full w-[200px]' />
                                    <div className='mx-10 flex flex-col text-center justify-between w-[60%]'>
                                        <div className='text-[30px] font-bold '>{item.title.split(' ').slice(0, 7).join(' ')}...</div>
                                        <div className='text-[35px]'>&#8377;{item.price}</div>
                                        <button className='w-full h-[60px] bg-brown bg-orange-700' onClick={e=>deleteitem(item.title)}>DELETE FROM CART</button>
                                    </div>
                                    <button className='w-[250px] h-full bg-brown bg-green-700' onClick={e=>buyitem(item)} >BUY NOW</button>
                                </div>
                            )
                        }
                    )
                }
            </div>
            {buy && <div className='w-[35vw] h-[80vh] mx-auto shadow-[0px_0px_10px_3px] shadow-black border-2 border-black overflow-y-auto overflow-x-hidden absolute top-[15rem] left-[30rem] bg-white'>
                <div className='font-bold text-[30px] flex flex-row justify-between mx-5'>
                    <div>Order Summary</div>
                    <div onClick={e=>{setbuy(false)}} className='hover:cursor-pointer'>x</div></div>
                <div className='flex m-3 w-full'>
                    <img className="h-[80px] w-[80px]" src={buyimg} alt="" />
                    <div className='mx-3 font-bold'>{buyitemname}</div>
                </div>
                <div className='flex justify-between mx-10'>
                    <div>Item cost:</div>
                    <div>&#8377;{buyprice}</div>
                </div>
                <div className='flex justify-between mx-10'>
                    <div>Delivery Charges:</div>
                    <div>&#8377;40</div>
                </div>
                <div className='flex justify-between mx-10'>
                    <div>Promotion Applied:</div>
                    <div>-&#8377;299</div>
                </div>
                <hr className='mx-10 h-[2px] bg-black my-2' />
                <div className='flex justify-between mx-10 font-bold text-[25px] text-red-600'>
                    <div className=''>Total:</div>
                    <div>&#8377;{buyprice+40-299}</div>
                </div>
                <hr className='mx-10 h-[2px] bg-black my-2' />
                <div className='mx-10 font-bold text-[25px]'>Select payment method</div>
                <form action="" onSubmit={handleSubmit(onSubmit)}>
                <div className='flex flex-col mx-10'>
                    <div className='has-[:checked]:bg-yellow-200 h-[30px] has-[:checked]:h-auto'>
                        <input type="radio" name='paymenttype' id="Credit or debit card" value="Credit or debit card" className='peer' {...register("mode")}/>
                        <label htmlFor="Credit or debit card" className='text-[20px] '>Credit or debit card</label>
                        <div className='mx-5 peer-checked:visible collapse'>
                            <label htmlFor="" className='font-bold mr-2 ml-[50px] mb-2'>Card Number</label><input type="text" className='border-[1px] border-black rounded-lg mb-2 pl-2' /><br />
                            <label htmlFor="" className='font-bold mr-2 mb-2'>Card Holder's Name</label><input type="text" className='border-[1px] border-black rounded-lg mb-2 pl-2' /><br />
                            <label htmlFor="" className='font-bold mr-2 ml-[65px]'>Expiry Date</label><input type="text" className='border-[1px] border-black rounded-lg mb-2 pl-2' />
                        </div>
                    </div>
                    <div className='has-[:checked]:bg-yellow-200 h-[30px] has-[:checked]:h-auto'>
                        <input type="radio" name='paymenttype' id="Net Banking" value="Net Banking" className='peer' {...register("mode")}/>
                        <label htmlFor="Net Banking" className='text-[20px]'>Net Banking</label>
                        <div className='mx-5 peer-checked:visible collapse'>
                        <label htmlFor="" className='font-bold mr-2'>Enter Bank Name</label><input type="text" className='border-[1px] border-black rounded-lg mb-2 px-2' />
                        </div>
                    </div>
                    <div className='has-[:checked]:bg-yellow-200 h-[30px] has-[:checked]:h-auto'>
                        <input type="radio" name='paymenttype' id="Other UPI Apps" value="Other UPI Apps" className='peer' {...register("mode")}/>
                        <label htmlFor="Other UPI Apps" className='text-[20px] w-full'>Other UPI Apps</label>
                        <div className='mx-5 peer-checked:visible collapse'>
                        <label htmlFor="" className='font-bold mr-2'>Enter UPI ID</label><input type="text" className='border-[1px] border-black rounded-lg mb-2 px-2' />
                        <div className='text-[14px]'>The UPI ID is in the format of name/phone number@bankname</div>
                        </div>

                    </div>
                    <div className='has-[:checked]:bg-yellow-200 h-[30px] has-[:checked]:h-auto'>
                        <input type="radio" name='paymenttype' id="EMI" value="EMI" className='peer' {...register("mode")}/>
                        <label htmlFor="EMI" className='text-[20px]'>EMI</label>
                        <div className='mx-5 peer-checked:visible collapse'>
                        <label htmlFor="" className='font-bold mr-2 ml-[50px] mb-2'>Card Number</label><input type="text" className='border-[1px] border-black rounded-lg mb-2 pl-2' /><br />
                            <label htmlFor="" className='font-bold mr-2 mb-2'>Card Holder's Name</label><input type="text" className='border-[1px] border-black rounded-lg mb-2 pl-2' /><br />
                            <label htmlFor="" className='font-bold mr-2 ml-[65px]'>Expiry Date</label><input type="text" className='border-[1px] border-black rounded-lg mb-2 pl-2' />
                        </div>
                    </div>
                    <div className='has-[:checked]:bg-yellow-200 h-[30px]'>
                        <input type="radio" name='paymenttype' id="Cash on Delivery/Pay on Delivery" value="Cash on Delivery/Pay on Delivery" className='peer' {...register("mode")}/>
                        <label htmlFor="Cash on Delivery/Pay on Delivery" className='text-[20px]'>Cash on Delivery/Pay on Delivery</label>
                    </div>
                </div>
                <button type="submit" className='h-[50px] w-[93%] mx-5 bg-red-600 font-bold text-white mt-3'>PAY NOW</button>
                </form>
            </div>}

        </div>
    )
}

export default Cart