"use client"
import { useSession, signIn, signOut } from "next-auth/react"
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRef } from "react";
import { Link , useNavigate } from "react-router-dom";
import axios from "axios";


export default function Login() {
const {register, handleSubmit , setValue} = useForm();
const ref = useRef()
const navigate = useNavigate()
const { data: session } = useSession()

if(session){
  navigate("/home")
}

const onSubmit = async (val) => {
  if(!session && val===null) return;
  else if (val.password.length === 0 ) {
    toast.error('Password field is empty', { position: "top-right", autoClose: 2000 })
  }
  else if (val.email.length === 0 ) {
    toast.error('Email field is empty', { position: "top-right", autoClose: 2000 })
  }
  else if(val.email.length === 0 && val.password.length===0) {
    toast.error('field is empty', { position: "top-right", autoClose: 2000 })
  }
  else {
    let a = await fetch("/api/login", { method: "POST", body: JSON.stringify(val), headers: { 'content-type': 'application/json' } })
    let b = await a.json();
    if(b.findResult) navigate("/home",{ state: { email: b.login.email } })
    else{ toast('no account found', { position: "top-right", autoClose: 3000 })
    ref.current.reset()}
  }
}

  return (<>
  <ToastContainer position="top-right" autoClose={3000} />
  <div className=" min-h-screen bg-[url('/images/login-bg.jpeg')] bg-bottom brightness-50 relative"></div>
  <div className="absolute top-1 flex justify-center items-center content-between flex-col w-full h-screen">
    <img src="/images/name.png" alt="" className="w-[300px] h-[120px]"/>
    <form className=" w-[400px] p-5 text-white rounded-xl mt-5 shadow-[0px_0px_20px_5px] shadow-black backdrop-brightness-50 mb-10" onSubmit={handleSubmit(onSubmit)} ref={ref} action="./api/data" method="post">
      <div className="text-[2rem]">SIGN IN</div>
      <div className="my-5">
        <p>Enter Email Address</p>
        <input {...register("email")} type="text" className="border-2 border-gray-500 rounded-xl w-full h-[40px] text-black px-5"/>
      </div>
      <div>
        <div className="flex justify-between">
          <p>Enter Password</p>
          <Link to="/forgotpassword" ><p className="text-blue-600 hover:cursor-pointer hover:font-bold">Forgot password</p></Link>
          </div>
        <input {...register("password")} type="text" className="border-2 border-gray-500 rounded-xl w-full h-[40px] text-black px-5"/>
      </div>
      <button type="submit" className="my-5 w-full h-[40px] bg-orange-600 font-bold text-white">SIGN IN</button>
      <button onClick={() => signIn("github")} className="w-full h-[40px] bg-gray-600 font-bold text-white mb-5">Login using Github</button>
      <div className="w-full text-wrap text-[14px]">By continuing, you agree to FashionMart's Conditions of Use and Privacy Notice.</div>
      <div className="flex items-center align-middle justify-between my-4">
        <hr className="bg-white w-[5.2rem] h-[2px]"/>
        <p className="mx-3">New to FashionMart?</p>
        <hr className="bg-white w-[5.2rem] h-[2px]"/>
      </div>
      <Link to="/signup" ><button type="button" className="my-5 w-full h-[40px] bg-green-600 font-bold text-white">Create your FashionMart account</button>
      </Link>
    </form>
    </div>
  </>
  );
}

export const metadata = {
  title: "FashionMart-Login",
  description: "Generated by create next app",
};
