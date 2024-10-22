import React from 'react'
import Topbar from '../components/Topbar'
import DownBar from '../components/DownBar'
import ConvoBody from '../components/ConvoBody'

const Conversations = () => {
  return (
    <section>
        <div className="p-3">
        <Topbar title='Conversations' imgPath='./man.png'/>
        </div>
        <div className='p-3'>
        <ConvoBody />
        </div>
        <DownBar page="page1"/>
    </section>
  )
}

export default Conversations