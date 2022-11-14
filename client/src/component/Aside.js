import React, { Fragment } from "react";
import "../App2.css"
import { MdContactPhone,MdContacts} from 'react-icons/md';
import { RiDashboardLine,RiLogoutBoxRLine } from 'react-icons/ri';
import { AiOutlinePause } from 'react-icons/ai';
import { useNavigate } from "react-router-dom";

function Aside(){

    const navigate = useNavigate();

    function logout() {

        localStorage.removeItem("token");
        localStorage.setItem("status", "false")
        navigate("/")
    }

    
    return (
        <Fragment>
            <div id="blue-box">
                <span id="logo"><MdContactPhone size="2em" color="darkblue"/></span>
                <div id="dashboard"><RiDashboardLine />Dashboard</div>
                <div id="totalcontacts">
                    <MdContacts size="1.5em"/>
                        <div id="btnnamebb">Total Contacts</div>
                    <AiOutlinePause size="1.8em"/>
                </div>
                <button id="logout" onClick={logout}>
                    <RiLogoutBoxRLine size="1.5em" style={{marginRight:"5px"}}/>
                    Log out
                </button>
            </div>
        </Fragment>
    )
}
export default Aside;