import React from 'react'
import DownBar from '../components/DownBar'
import Topbar from '../components/Topbar'
import ConvoBody from '../components/ConvoBody'
import RecruiterBody from '../components/RecruiterBody'

const Recruiter = () => {
  return (
    <div>
        < Topbar title='Recruiter' imgPath='./man.png' />
        < RecruiterBody />
        < DownBar page="page1" />
    </div>
  )
}

export default Recruiter