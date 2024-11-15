import React from 'react'
import Sidebar from '../SIdebar/Sidebar'
import DashboardCards from '../DashboardCards/DashboardCards'
import PresentationList from '../PresentationList/PresentationList'
import Header from '../Header/Header'

const PresenterDashBoard = () => {
  return (
    <div  className=' flex'>
      <Sidebar/>
  <div>
  <Header/>
      <DashboardCards/>
  </div>
      

      <div>
      <PresentationList/>
      </div>
      
    
    </div>
  )
}

export default PresenterDashBoard