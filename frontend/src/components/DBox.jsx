import React from 'react'
import './css/DBox.css'
const DBox = (props) => {
  return (
    <div className='py-1'>
        <div className='dbox-box bg-black d-flex align-items-center justify-content-between'>
          <p className='m-0 px-2 text-white'>{props.chatName}</p>
          <p className='px-2 m-0 text-white'>-</p>
        </div>
    </div>
  )
}

export default DBox