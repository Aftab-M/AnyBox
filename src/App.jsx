import { useState } from 'react'
import axios from 'axios'
import './App.css'





function App() {

  const [files, setFiles] = useState([])
  const [file, setFile] = useState("")



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

  async function sendFiles(e){
    e.preventDefault();
    const formData = new FormData()
    formData.append('title', 'sometitle');
    formData.append('file', file)
    console.log('dlfn', file)

    const result = await axios.post("http://localhost:3000/upload-files", formData, {headers:{"Content-Type":"multipart/form-data"}});
    console.log(result)
    
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
            <div className="upload-btn" onClick={()=>{sendFiles()}}>Upload</div>
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
          id="fileinput" 
          onChange={(e)=>{setFile(e.target.files[0])}}
          />


        <button onClick={(e)=>{sendFiles(e)}}>Upload</button>
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
            )):
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
