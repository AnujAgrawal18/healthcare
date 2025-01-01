
import React from 'react'
import NavBar from './NavBar'
import DemoCarousel from './DemoCarousel'
import Items from './items'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'

const Main = () => {
  const location = useLocation()
  const { data: session } = useSession()
  const navigate = useNavigate()
  
  useEffect(() => {
    if(!(session || location.state)){
      navigate('/')
    }
  })

  if(session){
    return (
      <div>
        <NavBar details={session.user}/>
        <DemoCarousel />
        <Items details={session.user}/>
      </div>
    )
  }
  else if(location.state){
    return(
      <div>
      <NavBar details={location.state}/>
      <DemoCarousel />
      <Items details={location.state}/>
    </div>
    )
  }
  }

export default Main
