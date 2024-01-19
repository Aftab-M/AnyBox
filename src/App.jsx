import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
 
  const [files, setFiles] = useState(['file1', 'file2', 'file3'])

  return (
    <>
      <div className="title">
        <div style={{fontSize:"1.3rem"}}>Access Your Files. Anywhere.</div>
        <div className="loginbtn">Log In</div>
      </div>
      <div className="body">
        <div className="inputt">
        <input type="file" name="" id="fileinput" />
        <div className="or">OR</div>
        <div className="drop">Drop a file here !</div>
        </div>        
      </div>
      <div className="your-files-main">
          <div className="your-files-title">Your Files </div>
          <div className="files">
          {
            files.map((e)=>(
              <div className="one-file">
                {e}
              </div>
            ))
          }
          </div>
        </div>
    </>
  )
}

export default App
