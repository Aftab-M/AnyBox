import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'
import {ref, uploadBytes, listAll, getDownloadURL, deleteObject} from 'firebase/storage';
import {storage} from './Setup'
import { v4 } from 'uuid';
import ViewPdf from './ViewPdf';
import ViewImage from './ViewImage';
import { DeleteOutline } from '@mui/icons-material';




function App() {

  const [files, setFiles] = useState([])
  const [file, setFile] = useState("")
  const [allUploaded, setAllUploaded] = useState(false)
  const [fileList, setFileList] = useState([])

  const [pdf, showPdf] = useState(false)
  const [pdfLink, setPdfLink] = useState("")

  const [image, showImage] = useState(false)
  const [imageLink, setImageLink] = useState("")
  const [imgName, setImgName] = useState("")

  const [dragging, setDragging] = useState(false)

  const fileListRef = ref(storage, "allfiles/")
  const [valid, setValid] = useState(true)

  useEffect(()=>{

    // var res = prompt('Enter the security code please...')
    // if(res=='#a#b#c'){
    //   setValid(true)
    // }
    


    setFileList([])
    listAll(fileListRef).then((res)=>{
      res.items.forEach((item)=>{
        getDownloadURL(item).then((url)=>{
          
          setFileList((i)=>[...i, url])
          // console.log('got : '+url+'with list as : '+fileList)
        })
      })
      // setFileList()
    })
  }, [])



  const handleDragOver = (e) =>{
    e.preventDefault();
    setDragging(true)
    // console.log('Dragging the file now...')
  };

  const handleDrop = (e) =>{
    e.preventDefault()
    console.log('Dropped !')
    const droppedFiles = Array.from(e.dataTransfer.files)
    setFiles(droppedFiles);
    console.log(droppedFiles)
    setDragging(false)
  };

  const handleDragEnd = (e) =>{
    // setDragging(false)
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
        const fileRef = ref(storage, `allfiles/${oneFile.name+'%'+v4()}`)
      uploadBytes(fileRef, oneFile)
      .then((snapshot)=>{
        getDownloadURL(snapshot.ref).then((url)=>{
          setFileList((prev)=>[...prev, url])
        })
        console.log(fileList)
          // console.log('File uploaded :'+file)
      })
    })
    setAllUploaded(true)
}


  function reset(){
    setFiles([])
    setAllUploaded(false)
  }

  function closePdf(bval){
    showPdf(bval)
  }
  function closeImage(bval){
    showImage(bval)
  }

  function deleteFile(_file){
    if(confirm('Delete for sure ?')== true){
      const theRef = ref(storage, _file)
    deleteObject(theRef).then(()=>{
      location.reload()
      alert('Deleted file successfully !')
      
    }).catch((err)=>{alert('Error while deleting file, please try again later !')})  
    }
    else{
      alert('Cancelled !')
    }
    
  }



  return (
    <>
    

    {

    (valid)
    ?
      <>
        {pdf && <ViewPdf link={pdfLink} callbacc={closePdf} />}
    {image && <ViewImage link={imageLink} imgname={imgName} callbacc={closeImage} />}




      <div className="title">
        <div style={{fontSize:"1.3rem"}}>Access Your Files. Anywhere.</div>
        <div className="loginbtn">Log In</div>
      </div>
      <div className="body" name='file' onDragOver={(e)=>handleDragOver(e)} onDrop={handleDrop}  onDragEnd={()=>{setDragging(false)}}  onDragExitCapture={()=>{setDragging(false)}}  >
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
          name="" 
          multiple={true}
          id="fileinput" 
          onChange={(e)=>{setFiles(Array.from(e.target.files)); console.log(Array.from(e.target.files))}}
          />

        {/* {dragging && <div className="drag-cover">SOPFIHBKJn</div>} */}
        
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
            (fileList.length>=1)
            ?
            fileList.map((e)=>(
              // <a href={e} target='blank' style={{textDecoration: 'none'}}>
              <div className="one-file">
                <div className="del" onClick={()=>{deleteFile(e)}}><DeleteOutline color='white' /></div>
                <div onClick={()=>{
                  if(e.includes('.pdf')){
                    setPdfLink(e); showPdf(true);
                  }
                  else if(e.includes('.png')||e.includes('.jpg')||e.includes('.jpeg')||e.includes('.webp')||e.includes('.gif')||e.includes('.mp4')){
                    setImageLink(e); showImage(true);
                    setImgName(ref(storage, e).name.split('%')[0])
                  }
                  else{
                    
                  }
                }}>
                {
                  
                  e.includes('.pdf')
                  ?
                  
                  <div className='pdf-cover'>
                    <center><img  width={80} height={80} src="https://cdn4.iconfinder.com/data/icons/file-extensions-1/64/pdfs-512.png" alt="PDF IMAGE" /></center>
                  </div>
                  :
                  (e.includes('.png')||e.includes('.jpg')||e.includes('.jpeg')||e.includes('.webp')||e.includes('.gif')||e.includes('.mp4'))?
                  <div>
                    <center><img width={120} height={120} style={{objectFit: 'contain'}} src={e} alt="" /></center>
                  </div>
                  :
                  <div>
                    <center><a onClick={()=>{window.open(e)}}   target='_blank' download={e} ><img  width={100} height={100} src="https://images.freeimages.com/fic/images/icons/2813/flat_jewels/512/file.png" alt="" /></a></center>
                  </div>
                } 
                
                <div className="file-name"> 
                {/* <a href={e}>{e.split('%')[0]}</a>   */}
                {ref(storage, e).name.split('%')[0]} 
                </div>
                </div>
                
              </div>
              // </a>
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


    :
    
    <div className='invalid'>
      {/* <img src="https://images.roadtrafficsigns.com/img/dp/md/traffic-funny-sign.jpg" alt="NOT ALLOWED" /> */}
      Oops, looks like you don't know the password.<br/>
      
    </div>
    
    
    }
    
        </>
  )
}

export default App
