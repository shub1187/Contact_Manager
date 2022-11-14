import React, { Fragment, useEffect } from "react";
import "../App2.css";
import { BsPersonCircle, BsSearch } from "react-icons/bs";
import { useState } from "react"
import { MdOutlineDeleteOutline, MdImportExport } from "react-icons/md";
import { BiExport, BiFilter } from "react-icons/bi";

import Table from "./Table";


function Header() {

  const [input, setinput] = useState("")
  const [clicked, setclicked] = useState(false);
  const [username, setusername] = useState("");
  const [email, setemail] = useState("")

  const handleInput = (e) => {
    let text = e.target.value.toLowerCase();
    setinput(text);
  }

  useEffect(() => {
    fetch("https://contacts-manager-007-backend.herokuapp.com/", {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "authorization": `Bearer ${localStorage.getItem("token")}`
        },
    }).then((data) => data.json())
        .then((response) => {
            console.log(response)
            setusername(response.data[0].name)
            setemail(response.data[0].email)
        })
}, [])

  
  /* Navabr functionalities */
  /* Navabr functionalities */

  return (
    <>
      <div id="man-header">
        <div id="main-header">
          <div id="man-top">
            <div id="contact">Total Contacts</div>
            <div id="searchbar">

              <div id="man-searchdiv">
                <input onChange={handleInput}
                  id="searchtext"
                  type="search"
                  size="40"
                  placeholder="Search By Email Id...."
                />

                <BsSearch size="0.5em" style={{position:"absolute", top:"38px", left:"609px"}} />

              </div>
            </div>
            <div id="profile-pic">
              <span id="main-pic">
                <BsPersonCircle size="3em" style={{color:"darkBlue"}} />
              </span>
              <div id="name-admin">
                <span>
                  <b>{username}</b>
                </span>
                <span>
                  <small>{email}</small>
                </span>
              </div>
            </div>
          </div>
{/*           <div id="main-navbar">

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

            <button id="deletebtn" className="btn">
              <MdOutlineDeleteOutline />
              Delete
            </button>

            <button className="btn" type="submit" onClick={()=>setclicked(true)}>
              <MdImportExport />
              Import
            </button>
            <button className="btn">
              <BiExport />
              Export
            </button>



          </div> */}
        </div>
        <Table enteredText={input} clicked= {clicked}/>

      </div>
    </>

  );

}
export default Header;
