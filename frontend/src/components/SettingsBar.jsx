import React from 'react'

const SettingsBar = (props) => {
  return (
    <div className="topBar">
    <div className="t1 d-flex justify-content-between align-items-center">
        <p className="text-white display-4 fw-normal m-0 p-0">{props.title}</p>
        <img src={props.imgPath} alt="" srcset="" />
    </div>
  </div>
  )
}

export default SettingsBar