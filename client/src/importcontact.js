import React, { Fragment } from "react";



function ImportContact(){

  const  submitCsv = (e)=>{
        e.preventDefault();
        const filedetails = new FormData ;
        filedetails.append("csvfile",e.target.csvfile.files[0]);
        fetch("http://localhost:8080/upload",{
            method : "POST",
            body : filedetails
        }).then((response)=>{response.json()}).then((data)=>{console.log("We recieved file")})
  }
    return(
        <Fragment>
            <div>
<form onSubmit={submitCsv} method="POST" formEncType="multipart/form-data" >
    <input type="file" name="csvfile" />
    <button type="submit">Upload</button>
</form>
</div>
        </Fragment>
    )
}

export default ImportContact;