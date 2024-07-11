import React from 'react'
import NavBar from './NavBar'
import DemoCarousel from './DemoCarousel'
import Items from './items'
import { useLocation } from 'react-router-dom'

const Main = () => {
  const location = useLocation()
  console.log(location.state)
  return (
    <div>
      <NavBar details={location.state}/>
      <DemoCarousel />
      <Items details={location.state}/>
    </div>
  )
}

export default Main
