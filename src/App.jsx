import { useState } from 'react'
import { FileUploader } from 'react-drag-drop-files'
import './App.css'

function App() {

  const fileTypes = ['JPG', 'PNG', 'PDF'];
  const [count, setCount] = useState(0)
 
  const [files, setFiles] = useState(['file1', 'file2', 'file3'])
  const [isDragging, setDragging] = useState(false)

  function dragDrop(){
    
    
  }

  const [file, setFile] = useState(null)

  const handleChange = (f) =>{
    setFile(f)
    console.log(file)
  }

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

  return (
    <>
      <div className="title">
        <div style={{fontSize:"1.3rem"}}>Access Your Files. Anywhere.</div>
        <div className="loginbtn">Log In</div>
      </div>
      <div className="body" onDragOver={(e)=>handleDragOver(e)} onDrop={handleDrop} onDragExit={(handleDragEnd)} onDragEnd={handleDragEnd} onDragLeave={handleDragEnd} >
        {
          (isDragging)
          ?
          <div className='inputt'>DROP IT LIKE IT'S HOOOOT</div>
          :
          <div className="inputt"onDragOver={handleDragOver}>
        <input type="file" name="" id="fileinput" />
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
            files.map((e)=>(
              <div className="one-file">
                {e.name.toString()}
              </div>
            ))
          }
          </div>
          </div>
          
        </div>
    </>
  )
}

export default App
