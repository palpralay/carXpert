import React from 'react'
import MainBanner from '../components/MainBanner'
import SelectCarImageLogo from './SelectCarImageLogo'
import HomePageService from './HomePageService'


const HomePage = () => {
  return (
    <div>
        <MainBanner />
        <SelectCarImageLogo />
        <HomePageService />
    </div>
  )
}

export default HomePage
