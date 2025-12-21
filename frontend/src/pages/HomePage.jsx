import React from 'react'
import MainBanner from '../components/MainBanner'
import SelectCarImageLogo from './SelectCarImageLogo'
import HomePageService from './HomePageService'
import EmergencyCTA from "../components/EmergencyCTA"


const HomePage = () => {
  return (
    <div>
        <MainBanner />
        <SelectCarImageLogo />
        <HomePageService />
        <EmergencyCTA />
    </div>
  )
}

export default HomePage
