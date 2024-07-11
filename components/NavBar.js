import React, { useRef, useState } from 'react'
import Link from 'next/link'
import { useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

const NavBar = (props) => {
    const [user, setuser] = useState([])
    const ref = useRef()
    const navigate = useNavigate()
    const getuser= async()=>{
        let a = await fetch("/api/navbar", { method: "POST", body: JSON.stringify(props.details), headers: { 'content-type': 'application/json' } })
        let b = await a.json();
        setuser(b)
    }

    useEffect(() => {
        getuser()
    }, [])

    const itemclick = async(b)=>{
        navigate('/Itemgrid', { state: { email: props.details.email, name: b } })
    }

    const logout = ()=>{
        let result = confirm("Do you want to logout from your Account");
        if (result === true) navigate('/')   
    }
const search = ()=>{
    navigate('/Itemgrid', { state: { email: props.details.email, name: ref.current.value } })
}
    

    const items = [{ title: "Groceries", img: "https://cdn-icons-png.flaticon.com/128/1261/1261163.png" }, { title: "Mobiles", img: "https://cdn-icons-png.flaticon.com/128/3930/3930510.png" }, { title: "Fashion", img: "https://cdn-icons-png.flaticon.com/128/7417/7417708.png" }, { title: "Electronics", img: "https://cdn-icons-png.flaticon.com/128/3659/3659899.png" }, { title: "Home & Furniture", img: "https://cdn-icons-png.flaticon.com/128/2603/2603741.png" }, { title: "Appliances", img: "https://cdn-icons-png.flaticon.com/128/3362/3362661.png" }, { title: "Travel", img: "https://cdn-icons-png.flaticon.com/128/15490/15490223.png" }, { title: "Beauty", img: "https://cdn-icons-png.flaticon.com/128/1940/1940993.png" }, { title: "Toys & More", img: "https://cdn-icons-png.flaticon.com/128/3082/3082060.png" }]
    return (
        <div className='w-[99vw] h-auto bg-orange-950 flex flex-col'>
            <div className='flex justify-between items-center align-middle text-white content-center h-[70px] mx-10'>
                <img src="/images/name.png" alt="" className="w-[150px] h-[60px]" />
                <div className='flex text-black'>
                    <select name="" id="" className='w-[50px] h-[40px] border-r-2 border-black'>
                        <option selected="selected" value="search-alias=aps">All</option>
                        <option value="search-alias=alexa-skills">Alexa Skills</option>
                        <option value="search-alias=amazon-devices">Amazon Devices</option>
                        <option value="search-alias=fashion">Amazon Fashion</option>
                        <option value="search-alias=nowstore">Amazon Fresh</option>
                        <option value="search-alias=freshmeat">Amazon Fresh Meat</option>
                        <option value="search-alias=amazon-pharmacy">Amazon Pharmacy</option>
                        <option value="search-alias=appliances">Appliances</option>
                        <option value="search-alias=mobile-apps">Apps &amp; Games</option>
                        <option value="search-alias=audible">Audible Audiobooks</option>
                        <option value="search-alias=baby">Baby</option>
                        <option value="search-alias=beauty">Beauty</option>
                        <option value="search-alias=stripbooks">Books</option>
                        <option value="search-alias=automotive">Car &amp; Motorbike</option>
                        <option value="search-alias=apparel">Clothing &amp; Accessories</option>
                        <option value="search-alias=collectibles">Collectibles</option>
                        <option value="search-alias=computers">Computers &amp; Accessories</option>
                        <option value="search-alias=todays-deals">Deals</option>
                        <option value="search-alias=electronics">Electronics</option>
                        <option value="search-alias=furniture">Furniture</option>
                        <option value="search-alias=lawngarden">Garden &amp; Outdoors</option>
                        <option value="search-alias=gift-cards">Gift Cards</option>
                        <option value="search-alias=grocery">Grocery &amp; Gourmet Foods</option>
                        <option value="search-alias=hpc">Health &amp; Personal Care</option>
                        <option value="search-alias=kitchen">Home &amp; Kitchen</option>
                        <option value="search-alias=industrial">Industrial &amp; Scientific</option>
                        <option value="search-alias=jewelry">Jewellery</option>
                        <option value="search-alias=digital-text">Kindle Store</option>
                        <option value="search-alias=luggage">Luggage &amp; Bags</option>
                        <option value="search-alias=luxury-beauty">Luxury Beauty</option>
                        <option value="search-alias=dvd">Movies &amp; TV Shows</option>
                        <option value="search-alias=digital-music">MP3 Music</option>
                        <option value="search-alias=popular">Music</option>
                        <option value="search-alias=mi">Musical Instruments</option>
                        <option value="search-alias=office-products">Office Products</option>
                        <option value="search-alias=pets">Pet Supplies</option>
                        <option value="search-alias=instant-video">Prime Video</option>
                        <option value="search-alias=shoes">Shoes &amp; Handbags</option>
                        <option value="search-alias=software">Software</option>
                        <option value="search-alias=sporting">Sports, Fitness &amp; Outdoors</option>
                        <option value="search-alias=specialty-aps-sns">Subscribe &amp; Save</option>
                        <option value="search-alias=home-improvement">Tools &amp; Home Improvement</option>
                        <option value="search-alias=toys">Toys &amp; Games</option>
                        <option value="search-alias=under-ten-dollars">Under ₹500</option>
                        <option value="search-alias=videogames">Video Games</option>
                        <option value="search-alias=watches">Watches</option>
                    </select>
                    <input type="Search" className='w-[580px] px-5' placeholder='Search in FashionMart' ref={ref}/>
                    <img src="https://cdn-icons-png.flaticon.com/128/15582/15582721.png" alt="" className='invert w-[50px] h-[40px] border-l-2 border-black bg-blue-500' type="submit" onClick={e=>{search()}}/>
                </div>
                <div className='flex flex-col w-[150px] mx-3 hover:cursor-pointer' onClick={e=>{navigate("/yourAccount",{ state: { email: user.email, name: user.name }})}} >
                    <p className='text-[14px]'>Hello {user.name}</p>
                    <p className='font-bold'>Accounts & Lists</p>
                </div>
                <div className='flex flex-col w-[70px] mx-3 hover:cursor-pointer' onClick={e=>{navigate("/myorder",{ state: { email: user.email, name: user.name }})}}>
                    <p className='text-[14px]'>Returns</p>
                    <p className='font-bold'>& Orders</p>
                </div>
                <div className='flex w-[120px] justify-center content-center align-middle items-center hover:cursor-pointer' onClick={e=>{navigate("/cart",{ state: { email: user.email, name: user.name }})}}>
                    <img src="https://cdn-icons-png.flaticon.com/128/2331/2331970.png" alt="" className='w-[70px] h-[70px]' />
                    <p className='font-bold' >Cart</p>
                </div>
                <button className='h-[30px] px-5 bg-white text-black rounded-lg' onClick={e=>{logout()}}>LOGOUT</button>
            </div>
            <div className='flex justify-evenly h-[95px] bg-green-950 text-white font-bold text-[16px]'>
                {
                    items.map(item => {
                        return (
                                <div className='flex flex-col justify-center items-center content-center hover:cursor-pointer' key={item.title} onClick={e=>itemclick(item.title)}>
                                    <img src={item.img} alt="" className='h-[60px] m-0' />
                                    <p className='p-0'>{item.title}</p>
                                </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default NavBar