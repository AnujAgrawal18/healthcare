import React, { useEffect } from 'react'
import NavBar from './NavBar'
import { useLocation } from 'react-router-dom'
import { useRef } from 'react'
import { useForm } from 'react-hook-form'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const YourAccount = () => {
    const location = useLocation()
    const ref = useRef()
    const { register, handleSubmit, setValue } = useForm();

    const getinfo=async ()=>{
        let a = await fetch("/api/userinfo", { method: "POST", body: JSON.stringify({email: location.state.email}), headers: { 'content-type': 'application/json' } })
        let b = await a.json();
        let obj = b[0]
        console.log(obj)
        setValue("phone",obj.val.phone);setValue("gender",obj.val.gender);setValue("address",obj.val.address);setValue("addtype",obj.val.addtype)
        ;setValue("pincode",obj.val.pincode);setValue("state",obj.val.state);setValue("district",obj.val.district);setValue("accountname",obj.val.accountname);setValue("accountno",obj.val.accountno);setValue("ifsc",obj.val.ifsc);setValue("upiid",obj.val.upiid)
    }
    useEffect(() => {
        getinfo()
    }, [])

    const onSubmit = async (val) => {
        let a = await fetch("/api/signup", { method: "POST", body: JSON.stringify({val:val ,email: location.state.email}), headers: { 'content-type': 'application/json' } })
        let b = await a.json();
        toast('account details updated', { position: "top-right", autoClose: 3000 })
        ref.current.reset()
    }

    return (
        <div className='bg-gradient-to-b from-orange-400 to-green-400'>
            <ToastContainer position="top-right" autoClose={3000} />
            <NavBar details={location.state} />
            <div className='text-[40px] font-bold text-center'>ACCOUNT DETAILS</div>
            <form action="" method="post" className='flex flex-col my-5 w-[72%] mx-auto px-10' onSubmit={handleSubmit(onSubmit)} ref={ref}>
                <div>
                    <p className='font-bold text-[25px] mb-5'>1. Personal Details</p>
                    <div>
                        <div className='flex'>
                            <div>
                                <p className='font-bold h-3 px-3'>Your Full Name</p>
                                <div className='border-2 border-gray-300 h-[3.5rem] w-[30rem] p-3 m-3 text-black bg-gray-400'>{location.state.name}</div>
                            </div>
                            <div>
                                <p className='font-bold h-3 px-3'>Gender</p>
                                <div className='h-[3.5rem] w-[30rem] p-3 m-3'>
                                    <input type="radio" name='gender' id="male" {...register("gender")} value="male" /><label htmlFor="male" className='mr-28 text-[20px]'>Male</label>
                                    <input type="radio" name='gender' id="female" {...register("gender")} value="female" /><label htmlFor="female" className='mr-28 text-[20px]'>Female</label>
                                    <input type="radio" name='gender' id="other" {...register("gender")} value="other" /><label htmlFor="other" className='text-[20px]'>Other</label>
                                </div>
                            </div>
                        </div>
                        <div className='flex'>
                            <div>
                                <p className='font-bold h-3 px-3'>Email Address</p>
                                <div className='border-2 border-gray-300 bg-gray-400 h-[3.5rem] w-[30rem] p-3 m-3' >{location.state.email}</div>
                            </div>
                            <div>
                                <p className='font-bold h-3 px-3'>Phone Number</p>
                                <input {...register("phone")} type="number" className='border-2 border-gray-300 h-[3.5rem] w-[30rem] p-5 m-3' />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='my-5'>
                    <p className='font-bold text-[25px] mb-5'>2. Delivery Details</p>
                    <div>
                        <div>
                            <p className='font-bold h-3 px-3'>Delivery Address</p>
                            <textarea {...register("address")} type="text" placeholder='' className='border-2 border-gray-300 h-[5rem] w-[97%] p-5 m-3' />
                        </div>
                        <div className='flex'>
                            <div>
                                <p className='font-bold h-3 px-3'>Address Type</p>
                                <div className='h-[3.5rem] w-[30rem] p-3 m-3'>
                                    <input {...register("addtype")} type="radio" name='addtype' id="work" value="work" /><label htmlFor="work" className='mr-28 text-[20px]'>Work</label>
                                    <input {...register("addtype")} type="radio" name='addtype' id="home" value="home" /><label htmlFor="home" className='mr-28 text-[20px]'>Home</label>
                                    <input {...register("addtype")} type="radio" name='addtype' id="other" value="other" /><label htmlFor="other" className='text-[20px]'>Other</label>
                                </div>
                            </div>
                            <div>
                                <p className='font-bold h-3 px-3'>Pin Code</p>
                                <input {...register("pincode")} type="number" className='border-2 border-gray-300 h-[3.5rem] w-[30rem] p-5 m-3' />
                            </div>
                        </div>
                        <div className='flex'>
                            <div>
                                <p className='font-bold h-3 px-3'>State</p>
                                <input {...register("state")} type="text" className='border-2 border-gray-300 h-[3.5rem] w-[30rem] p-5 m-3' />
                            </div>
                            <div>
                                <p className='font-bold h-3 px-3'>District</p>
                                <input {...register("district")} type="text" className='border-2 border-gray-300 h-[3.5rem] w-[30rem] p-5 m-3' />
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <p className='font-bold text-[25px] mb-5'>3. Bank Details</p>
                    <div>
                        <div className='flex'>
                            <div>
                                <p className='font-bold h-3 px-3'>Beneficiary Name</p>
                                <input {...register("accountname")} type="text" className='border-2 border-gray-300 h-[3.5rem] w-[30rem] p-5 m-3' />
                            </div>
                            <div>
                                <p className='font-bold h-3 px-3'>Account Number</p>
                                <input {...register("accountno")} type="number" className='border-2 border-gray-300 h-[3.5rem] w-[30rem] p-5 m-3' />
                            </div>
                        </div>
                        <div className='flex'>
                            <div>
                                <p className='font-bold h-3 px-3'>IFSC Code</p>
                                <input {...register("ifsc")} type="text" className='border-2 border-gray-300 h-[3.5rem] w-[30rem] p-5 m-3' />
                            </div>
                            <div>
                                <p className='font-bold h-3 px-3'>UPI ID</p>
                                <input {...register("upiid")} type="text" className='border-2 border-gray-300 h-[3.5rem] w-[30rem] p-5 m-3' />
                            </div>
                        </div>
                    </div>
                </div>

                <button className='w-[97%] bg-red-500 h-[4rem] text-white font-bold mx-auto' type='submit'>UPDATE DETAILS</button>
            </form>
        </div>
    )
}

export default YourAccount