import React from 'react'
import './pdf.css'
import { useParams } from 'react-router-dom'

function ViewImage(props) {

  const {link} = useParams

  return (
    <div className='imageview' >
        <div className="close" style={{marginRight:'1rem', marginTop:'1rem'}} onClick={()=>{props.callbacc(false)}} >X</div>
        <div className="imgname">
            {props.imgname}
        </div>
        <center><img src={link} alt="" /></center>
    </div>
  )
}

export default ViewImage