"use client"

import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRef } from "react";
import { Link , useNavigate } from "react-router-dom";


export default function Signup() {
const {register, handleSubmit , setValue} = useForm();
const ref = useRef()
const navigate = useNavigate()

const onSubmit = async (val) => {
  if (val.password.length === 0 || val.pas.length===0) {
    toast.error('Password field is empty', { position: "top-right", autoClose: 2000 })
  }
  else if (val.email.length === 0 ) {
    toast.error('Email field is empty', { position: "top-right", autoClose: 2000 })
  }
  else if (val.name.length === 0 ) {
    toast.error('Email field is empty', { position: "top-right", autoClose: 2000 })
  }
  else if(val.email.length === 0 && val.password.length===0) {
    toast.error('field is empty', { position: "top-right", autoClose: 2000 })
  }
  else if (val.pas.localeCompare(val.password)!=0) {
    toast.error('password do not match', { position: "top-right", autoClose: 2000 })
  }
  else {
    let a = await fetch("/api/signup", { method: "POST", body: JSON.stringify({ id: uuidv4(), name:val.name , email:val.email , password: val.password}), headers: { 'content-type': 'application/json' } })
    let b = await a.json();
    console.log(b)
    if(b) navigate("/")
    toast('Password is submitted', { position: "top-right", autoClose: 3000 })
    ref.current.reset()
  }
}

  return (<>
  <ToastContainer position="top-right" autoClose={3000} />
  <div className=" h-[120vh] bg-[url('/images/login-bg.jpeg')] bg-bottom brightness-50 relative"></div>
  <div className="absolute top-1 flex justify-center items-center content-between flex-col w-full ">
    <img src="/images/name.png" alt="" className="w-[300px] h-[120px]"/>
    <form className=" w-[400px] p-5 text-white rounded-xl my-5 shadow-[0px_0px_20px_5px] shadow-black backdrop-brightness-50" onSubmit={handleSubmit(onSubmit)} ref={ref} action="./api/data" method="post">
      <div className="text-[1.5rem]">CREATE YOUR ACCOUNT</div>
      <div className="my-5">
        <p>Your Name</p>
        <input {...register("name")} type="text" className="border-2 border-gray-500 rounded-xl w-full h-[40px] text-black px-5"/>
      </div>
      <div className="my-5">
        <p>Email Address</p>
        <input {...register("email")} type="text" className="border-2 border-gray-500 rounded-xl w-full h-[40px] text-black px-5"/>
      </div>
      <div className="my-5">
        <p>Password</p>
        <input {...register("pas")} type="password" className="border-2 border-gray-500 rounded-xl w-full h-[40px] text-black px-5"/>
      </div>
      <div className="my-5">
        <p>Password again</p>
        <input {...register("password")} type="password" className="border-2 border-gray-500 rounded-xl w-full h-[40px] text-black px-5"/>
      </div>
      <button type="submit" className="my-5 w-full h-[40px] bg-orange-600 font-bold text-white">CREATE YOUR FASHIONMART ACCOUNT</button>
      <div className="w-full text-wrap text-[14px]">By continuing, you agree to FashionMart's Conditions of Use and Privacy Notice.</div>
        <hr className="bg-white w-full h-[2px] my-5"/>
        <div>Already have an account? <span className="text-blue-600 hover:cursor-pointer" onClick={e=>{navigate("/")}}>Sign in</span></div>
    </form>
    </div>
  </>
  );
}
