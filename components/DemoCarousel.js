import React from 'react'
import { Carousel } from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css";

const DemoCarousel = () => {
  return (
    <div>
        <Carousel  showThumbs={false} showStatus={false} autoPlay={true} interval={3000} infiniteLoop={true} showIndicators={false} className='h-[18rem]'>
                <div className='h-[18rem]'>
                    <img src="https://images-eu.ssl-images-amazon.com/images/G/31/img21/MA2024/GW/June/Unrec/166-1._CB555072489_.jpg"  className='object-contain'/>
                </div>
                <div className='h-[18rem]'>
                    <img src="https://images-eu.ssl-images-amazon.com/images/G/31/img22/Wireless/devjyoti/GW/Uber/Nov/D103625178_DesktopTallHero_3000x1200_V3._CB558389732_.jpg" className='object-contain'/>
                </div>
                <div className='h-[18rem]'>
                    <img src="https://images-eu.ssl-images-amazon.com/images/G/31/img21/Luggage/2024/GW/Unrec/FDFO/PC_Row_2_1._CB554222753_.jpg" className='object-contain'/>
                </div>
                <div className='h-[18rem]'>
                    <img src="https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/78e89d02375d5222.jpg?q=20" className='h-[20em] object-cover'/>
                </div>
                <div className='h-[18rem]'>
                    <img src="https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/1aaeb0a6531bef88.jpg?q=20" className='h-[20em]  object-cover'/>
                </div>
                <div className='h-[18rem]'>
                    <img src="https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/bf42fbdd3d37c8c3.jpg?q=20" className='h-[20em]  object-cover'/>
                </div>
                
            </Carousel>
    </div>
  )
}

export default DemoCarousel