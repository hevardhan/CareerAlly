import React from 'react'
import Topbar from '../components/Topbar'
import DownBar from '../components/DownBar'
const Settings = () => {
  return (
    <section>
    <div className="p-3">
    <Topbar title='CareerAlly' imgPath='./nobg_logo.png'/>
    </div>
    
     <DownBar page="page3"/>
</section>
  )
}

export default Settings