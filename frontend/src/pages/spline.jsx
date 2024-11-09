import React from 'react'
import Spline from '@splinetool/react-spline';
import './css/spline.css'

const spline = () => {
  return (
    <div>
        <Spline scene="https://prod.spline.design/ZLVq4hZEXvP-KpnU/scene.splinecode"/>
        <div>
            <h1 className='text-white'>Spline</h1>
        </div>
    </div>
  )
}

export default spline