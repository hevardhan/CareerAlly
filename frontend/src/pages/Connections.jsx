import React from 'react'
import Topbar from '../components/Topbar'
import DownBar from '../components/DownBar'
import ConnectBody from '../components/ConnectBody'
const Connections = () => {
  return (
    <section>
    <div className="p-3">
    <Topbar title='Connections' imgPath='./man.png'/>
    </div>
    <div className="p-3">
    <ConnectBody />
    </div>
     <DownBar page="page2"/>
</section>
  )
}

export default Connections