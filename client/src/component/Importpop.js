import React, { useEffect } from "react";
import "../App2.css";
import { VscNewFile } from "react-icons/vsc";
import { useState } from "react";
import { IoCloudDone } from "react-icons/io5";
import { MdOutlineDone } from "react-icons/md";

import axios from "axios";


const Importpop = ({ popstate }) => {
    const [fileName, setFileName] = useState("");
    const [button, setButton] = useState("Upload");
    const [filestate, setfilestate] = useState("block")
    const [cloud, setcloud] = useState("none");
    const [title, settitle] = useState("Drag & Drop a csv File and click to Upload")
    const [path, setpath] = useState("")
    console.log("reloaded")

    const ControlUseeffect = () => {
        useEffect(() => {

            /* setfilestate("block")
            setcloud("none")
            setButton("Cancel")
            setFileName("")
            settitle("Drag & Drop a csv File and click to Upload")
            setpath("")
            alert("page reloaded") */


        }, [])
    }


    const Submit = (e) => {
        e.preventDefault();
        if (e.target.files !== null) {
            setfilestate("none")
            setcloud("block")
            setButton("File has been Uploaded")
            setFileName(e.target.csvfile.files[0].name)
            settitle("Import Completed")


            const fileDetails = new FormData();
            fileDetails.append("csvfile", e.target.csvfile.files[0])
            console.log(fileDetails)
            console.log(`Bearer ${localStorage.getItem("token")}`)

            axios.post("https://contacts-manager-007-backend.herokuapp.com/contact", fileDetails, {
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "multipart/form-data",
                    "authorization": `Bearer ${localStorage.getItem("token")}`,
                },
            }).then((res) =>{
                setfilestate("block")
                    setcloud("none")
                    setButton("Upload")
                    setFileName("")
                    settitle("Drag & Drop a csv File and click to Upload")
                    setpath("")
                    alert("File has been Uploaded Successfully");
                    document.getElementById("selectfile").value=""

            })
        }


    }

    return (
        <div>
            <div id="drop-main">
                <form onSubmit={Submit} className="drop">
                    <div id="circle">
                        <VscNewFile size="1.5em" style={{ display: filestate, margin: 0 }} />
                        <MdOutlineDone size="1.5em" style={{ color: "black", display: cloud, margin: 0, fontWeight: "bold" }} />
                        <input id="selectfile" onChange={(e) => {
                            setButton("Upload File")
                            setpath(e.target.csvfile.files[0])
                        }} type="file" accept=".csv" name='csvfile' />
                    </div>
                    <div style={{ color: "blue", fontFamily: 'Titillium Web', fontWeight: "bold" }}>
                        {title}
                        <br />
                        {fileName}
                    </div>
                    <button type="submit" id="cancel-btn">{button}</button>

                </form>

            </div>
        </div>
    );
};
export default Importpop;