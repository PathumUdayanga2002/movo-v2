import React from 'react'
import DashboardCards from '../DashboardCards/DashboardCards'
import Calendar from '../Calender/Calendar'

const CardAndCalendar = () => {
  return (
    <div className=' flex flex-col space-y-[100px] justify-between items-center '>
        <div className="p-4 bg-white shadow rounded">My Presentation</div>
        <Calendar/>
    </div>
  )
}

export default CardAndCalendar