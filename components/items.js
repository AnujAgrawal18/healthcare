import React from 'react'
import { useState, useEffect } from 'react'
import { Carousel } from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link, useNavigate } from 'react-router-dom';
// import Link from 'next/link'

const Items = (props) => {
    const [item, setitem] = useState([])
    const [boxes, setboxes] = useState([])
    let pageno = 1;
    const navigate = useNavigate()

    const getitem = async () => {
        let a = await fetch("./api/products", { method: "POST", body: JSON.stringify({ }), headers: { 'content-type': 'application/json' } })
        let b = await a.json();
        setitem(b)
    }
    const getboxes = async () => {
        let a = await fetch("./api/productboxes", { method: "POST", body: JSON.stringify({}), headers: { 'content-type': 'application/json' } })
        let b = await a.json();
        setboxes(b)
    }

    useEffect(() => {
        getitem()
        getboxes()
    }, [])

    const itemclick = async(b)=>{
        navigate('/Itemgrid', { state: { email: props.details.email, name: b.name } })
    }

    return (
        <div className='bg-gradient-to-b from-orange-300 to-green-300 py-5'>
            {
                
                item.map(a => {
                    return (<>
                        <div className='w-[95%] h-[350px] rounded-xl bg-white text-black shadow-[0px_0px_10px_3px] shadow-black mx-auto my-5 p-5'>
                            <p className='text-[25px] font-bold'>{a.title}</p>
                            <Carousel showThumbs={false} showStatus={false} autoPlay={true} interval={2000} infiniteLoop={true} showIndicators={true} centerMode centerSlidePercentage={20} className='w-[90%] my-4 mx-auto'>
                                {
                                    a.items.map(b => {
                                        return (
                                            <div onClick={e=>itemclick(b)} className='border-[1px] border-black w-[200px] h-[250px] mb-8' value={b.name}>
                                                <img src={b.img} alt="" className='w-[30px] h-[200px]' />
                                                <p>{b.name}</p>
                                                <p className='font-bold'>{b.desc}</p>
                                            </div>
                                        )
                                    }
                                    )
                                }
                            </Carousel>
                        </div>
                        <div className='h-[430px] flex justify-center w-full'>
                            {
                                boxes.slice((pageno-1) * 4 ,pageno * 4).map(y => {
                                    return (
                                        <div className=' h-[400px] w-[350px] mx-2 bg-white text-center flex flex-col items-center p-3 shadow-[0px_0px_10px_3px] shadow-black'>
                                            <p className='text-[25px] font-bold'>{y.title}</p>
                                            <img src="https://images-eu.ssl-images-amazon.com/images/G/31/img18/Lawn_Garden/Ud/2024/PCCC/01-379_X_304-min._SY304_CB556163815_.jpg" alt="" className='w-[350px] h-[300px]' />
                                            <p>Explore More</p>
                                        </div>
                                    )
                                }
                                )
                            }
                            <div className='hidden'>{pageno=pageno+1}</div>
                        </div>
                    </>
                    )
                }
                )
            }


        </div>
    )
}

export default Items