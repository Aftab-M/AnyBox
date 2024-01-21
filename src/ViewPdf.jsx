import React from 'react'
import './pdf.css'
import { Viewer, Worker } from '@react-pdf-viewer/core'
import { DefaultLayoutPlugin, defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'
import '@react-pdf-viewer/core/lib/styles/index.css'
import '@react-pdf-viewer/default-layout/lib/styles/index.css'



function ViewPdf(props) {



  const plugin = defaultLayoutPlugin()

  return (
    <div className='pdfview'>
      <div className="close" onClick={()=>{props.callbacc(false)}} >X</div>
      <Worker workerUrl='https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js'>
        <Viewer theme={'dark'}
        
          fileUrl={props.link}
          plugins={[plugin]}
        />
      </Worker>
    </div>
  )
}

export default ViewPdf