import React from 'react'
import Topbar from '../components/Topbar'
import DownBar from '../components/DownBar'
import SettingsBar from '../components/SettingsBar'
import SettingsBody from '../components/SettingsBody'
const Settings = () => {
  return (
    <section>
    <div className="p-3">
      <SettingsBar title='CareerAlly' imgPath='./nobg_logo.png'/>
    </div>
    <div className="p-3">
      <SettingsBody />
    </div>
     <DownBar page="page3"/>
</section>
  )
}

export default Settings