import React from 'react'
import Topbar from '../components/Topbar'
import DownBar from '../components/DownBar'
const Connections = () => {
  return (
    <section>
    <div className="p-3">
    <Topbar title='Connections' imgPath='./man.png'/>
    </div>
    
     <DownBar page="page2"/>
</section>
  )
}

export default Connections