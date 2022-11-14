import React, { Fragment } from "react";
import "../App2.css";
import { useState, useEffect } from "react"
import { TiPencil } from "react-icons/ti"
import { RiDeleteBinLine } from "react-icons/ri";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { MdOutlineDeleteOutline, MdImportExport } from "react-icons/md";
import { BiExport, BiFilter } from "react-icons/bi";
import { TiDelete } from "react-icons/ti";
import { GrRefresh } from "react-icons/gr";
import Importpop from "./Importpop";


function Table(props) {

    const [input, setinput] = useState("")
    let [InfoData, setInfoData] = useState([])
    const [set, setset] = useState(new Set());
    const [deleteStatus, setdeleteStatus] = useState(false)
    const [visibility, setvisibility] = useState("hidden")
    const [refresh, setrefresh] = useState(false)
    const [popstate, setpopstate] = useState(false)
    

    var arr = [];
    const navigate = useNavigate();

    useEffect(() => {
        
        if (localStorage.getItem("status") === "false") {
            alert("Please login first")
            navigate("/")
        }
        const token = `Bearer ${localStorage.getItem("token")}`
        fetch("https://contacts-manager-007-backend.herokuapp.com/contact", {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "authorization": token
            },
        }).then((data) => data.json())
            .then((response) => {
                setInfoData(response)
                for(let i = 0; i < document.getElementsByClassName("checkbox").length; i++){
                    document.getElementsByClassName("checkbox")[i].checked = false
                }
                set.clear()
            })
    
    },  [deleteStatus, refresh])

    const filterData = InfoData.filter((data) => {
        if (props.enteredText === "") {
            return data
        }
        else {
            if (data.email.toLowerCase().includes(props.enteredText)) {
                return data
            }

        }
    })
    const selectAll = () => {

        let allCheck = document.getElementsByClassName("checkbox");
        if (allCheck[0].checked === true) {
            for (let i = 1; i < allCheck.length; i++) {
                allCheck[i].checked = true;
                filterData.map(value => {
                    set.add(value.email)
                })
            }

        }
        else if (allCheck[0].checked === false) {
            for (let i = 1; i < allCheck.length; i++) {
                allCheck[i].checked = false;
                set.clear()
                arr = [];
            }
        }
        deletemultiple()
    }
    const handleChange = (email, id) => {
        let box = document.getElementById(id);
        if (box.checked == true) {
            set.add(email)
        }
        else if (box.checked == false) {
            set.delete(email)
        }
        deletemultiple()
        console.log(set)
    }

    const datadelete = (email, id) => {
        let array = [];
        array.push(email);
        console.log(array)
        fetch("https://contacts-manager-007-backend.herokuapp.com/deletecontact", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({ emails: array })
        }).then((response) => {
            
            setdeleteStatus(!deleteStatus)
        })
    }

    const deletemultiple = () => {
        arr.push(...set);
    }

    const deletebybtn = () => {
        fetch("https://contacts-manager-007-backend.herokuapp.com/deletecontact", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({ emails: arr })
        }).then((response) => {
            /* console.log(response)
            if (response.statusText === "OK") {
                window.location.reload()
            } */
            setdeleteStatus(!deleteStatus)
        })
    }

    function logout() {

        localStorage.removeItem("token");
        localStorage.setItem("status", "false")
        navigate("/")
    }


    return (
        <Fragment>

            <div id="main-table">
                <div style={{ visibility: visibility, display: "flex" }}>
                    <Importpop popstate={true}/>
                    <TiDelete style={{ color: "red", fontSize: "22px",position:"relative", marginLeft: "100px" ,bottom:"-55px"}} onClick={() => { setvisibility("hidden") }} />
                </div>
                <div id="main-navbar">

                    <input
                        className="btn"
                        type="date"
                        name="entrydate"
                        placeholder="select date"
                    />
                    <select className="btn" name="Filterby">
                        <option>
                            <BiFilter />
                            Filter
                        </option>
                        <option>By Company</option>
                        <option>By Designation</option>
                        <option>By Country</option>
                        <option>By Industry</option>
                    </select>

                    <button id="deletebtn" className="btn" onClick={deletebybtn}>
                        <MdOutlineDeleteOutline />
                        Delete
                    </button>

                    <button className="btn" type="submit" onClick={() => { setvisibility("visible") }}>
                        <MdImportExport />
                        Import
                    </button>
                    <button style={{width:"180px"}} className="btn" onClick={()=>{setrefresh(true) 
                        setdeleteStatus(true)
                        setpopstate(true)}}>
                        <GrRefresh />
                        Refresh Contacts
                    </button>



                </div>

                    <table style={{overflowY:"auto", display:"block"}}>
                        <thead >
                            <tr>
                                <th><input onChange={selectAll} className="checkbox" type="checkbox"></input></th>
                                <th>Name </th>
                                <th>Designation <IoIosArrowDropdownCircle className="react-icons" /></th>
                                <th>Company <IoIosArrowDropdownCircle className="react-icons" /></th>
                                <th >Industry <IoIosArrowDropdownCircle className="react-icons" /></th>
                                <th>Email </th>
                                <th >Phone Number</th>
                                <th >Country </th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        {
                            filterData.map((value, index) => {

                                return (
                                    <tr>
                                        <td>
                                            <input id={value._id} onClick={() => handleChange(value.email, value._id)}
                                                className="checkbox" value="yes" type="checkbox">
                                            </input>
                                        </td>
                                        <td>{value.name}</td>
                                        <td>{value.designation}</td>
                                        <td>{value.company}</td>
                                        <td>{value.industry}</td>
                                        <td>{value.email}</td>
                                        <td>{value.phoneNumber}</td>
                                        <td>{value.country}</td>
                                        <td>
                                            <div className="react-icons-div">
                                                <TiPencil style={{ color: "rgba(8, 132, 255, 1)" }} />
                                                <button id={index} className="deletebtn" onClick={() => datadelete(value.email, index)}>
                                                    <RiDeleteBinLine style={{ color: "red" }} />
                                                </button>

                                            </div>
                                        </td>
                                    </tr>

                                )
                            })
                        }
                    </table>
                </div>

                {/*                 <button onClick={logout}>
                    Logout
                </button>
                <button onClick={deletebybtn}>
                    Delete
                </button> */}
        </Fragment >
    )
}

export default Table;