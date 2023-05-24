import React from 'react'
import { Link } from 'react-router-dom'

function Landingscreen() {
  return (
    <div className='row landing justify-content-center'>
        {/* <video autoPlay loop muted plays-inline className='back-video'>

          <source src='images/video.mp4' type='video/mp4'/> 

        </video> */}
        <div className='col-md-9 my-auto text-center' style={{borderRight :'8px solid white'}}>
            <h2 style={{color:'white',fontSize:'130px'}} >GoOfyus</h2>
            <h1 style={{color:'white'}}>"College — where Monday could feel like a Friday."</h1>
            <Link to='/home'>
                <button className='btn landingbtn' style={{color:'black'}}>Get Started</button>
            </Link>
        </div>
    </div>
  )
}


export default Landingscreen