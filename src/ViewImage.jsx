import React from 'react'
import './pdf.css'

function ViewImage(props) {
  return (
    <div className='imageview' >
        {/* <div className="close" style={{marginRight:'1rem', marginTop:'1rem'}} onClick={()=>{props.callbacc(false)}} >X</div> */}
        <div className="imgname">
            {props.imgname}
        </div>
        <center><img src={props.link} alt="" /></center>
    </div>
  )
}

export default ViewImage