import { useState } from 'react'
import axios from 'axios'
import './App.css'
import {ref, uploadBytes} from 'firebase/storage';
import {storage} from './Setup'
import { v4 } from 'uuid';




function App() {

  const [files, setFiles] = useState([])
  const [file, setFile] = useState("")
  const [allUploaded, setAllUploaded] = useState(false)



  const handleDragOver = (e) =>{
    e.preventDefault();
    setDragging(true)
    console.log('Dragging the file now...')
  };

  const handleDrop = (e) =>{
    e.preventDefault()
    console.log('Dropped !')
    const droppedFiles = Array.from(e.dataTransfer.files)
    setFiles(droppedFiles);
    console.log(droppedFiles)
  };

  const handleDragEnd = (e) =>{
    setDragging(false)
  };

  const removeElement=(e)=>{
    var arr = [...files]
    var newarr = arr.filter(item => item !== e)
    setFiles(newarr)

  }


  const upload = () => {
    console.log('In upload...')
    files.forEach((oneFile)=>{
      console.log(oneFile.name)
        const fileRef = ref(storage, `allfiles/${oneFile.name+'_'+v4()}`)
      uploadBytes(fileRef, oneFile)
      .then(()=>{
          console.log('File uploaded :'+file)
      })
    })
    setAllUploaded(true)
}


  function reset(){
    setFiles([])
    setAllUploaded(false)
  }

  return (
    <>
      <div className="title">
        <div style={{fontSize:"1.3rem"}}>Access Your Files. Anywhere.</div>
        <div className="loginbtn">Log In</div>
      </div>
      <div className="body" name='file' onDragOver={(e)=>handleDragOver(e)} onDrop={handleDrop} onDragExit={(handleDragEnd)} onDragEnd={handleDragEnd} onDragLeave={handleDragEnd} >
        {
          (files.length>=1)
          ?

            (files.length>=1)?
            <div className='uploaded-files'>
              {files.map((e)=>(
              <div className="one-uploaded-file">
                <div>{e.name.toString()}</div>
                <div className='cancel' onClick={()=>{removeElement(e)}}>X</div>
              </div>
            ))}
            <div className= {(allUploaded)?"all-done":"upload-btn"} onClick={()=>{(allUploaded)?reset():upload()}}>{(allUploaded)?<>ALL DONE !   Click to upload more...</>:<>Upload</>}</div>
            </div>
            :
            <div>
              <center>No files yet...</center>
            </div>
          
          :
          <div className="inputt" onDragOver={handleDragOver}>


        <input 
          required
          className='form-control'
          type="file" 
          accept='application/pdf'
          name="" 
          multiple={true}
          id="fileinput" 
          on
          onChange={(e)=>{setFiles(Array.from(e.target.files)); console.log(Array.from(e.target.files))}}
          />


        {/* <button onClick={(e)=>{upload()}}>Upload</button> */}
        <div className="or">OR</div>
        <div className="drop">Drop a file here !</div>
        </div>        
        }
      </div>
      <div className="your-files-main">
          <div className="your-files-title">Your Files </div>
          <div className="cover">
          <div className="files">
          {
            (files.length>=1)?
            files.map((e)=>(
              <div className="one-file">
                {e.name.toString()}
              </div>
            ))
            :
            <div>
              <center>No files yet...</center>
            </div>
          }
          </div>
          </div>
          
        </div>
    </>
  )
}

export default App
