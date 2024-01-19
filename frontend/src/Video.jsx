import React from 'react'
import vid from "./assets/video.mp4"
function Changer() {
  return (
    <div className='videoContainer'>
    <video autoPlay loop muted className="video">
       
   <source src={vid} type='video/mp4'/>
    </video>

   </div>
  )
}

export default Changer