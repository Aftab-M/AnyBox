import { useState } from 'react'
import { FileUploader } from 'react-drag-drop-files'
import axios from 'axios'
import './App.css'

function App() {

  const [files, setFiles] = useState([])


  const handleDragOver = (e) =>{
    e.preventDefault();
    setDragging(true)
    console.log('Dragging the file now...')
  };


  async function sendFiles(){
    axios.post('http://localhost:3000/sendfiles', {files:files})
    .then((res)=>{console.log(res)})
  }

  

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

  return (
    <>
      <div className="title">
        <div style={{fontSize:"1.3rem"}}>Access Your Files. Anywhere.</div>
        <div className="loginbtn">Log In</div>
      </div>
      <div className="body" onDragOver={(e)=>handleDragOver(e)} onDrop={handleDrop} onDragExit={(handleDragEnd)} onDragEnd={handleDragEnd} onDragLeave={handleDragEnd} >
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
            </div>
            :
            <div>
              <center>No files yet...</center>
            </div>
          
          :
          <div className="inputt" onDragOver={handleDragOver}>
        <input multiple={true} type="file" name="" id="fileinput" onChange={(e)=>{console.log(e.target.value); setFiles([...files, {name: e.target.value}])}} />
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
