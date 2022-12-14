import React, { useState } from "react";
import "../App2.css"
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { MdContactPhone} from 'react-icons/md';
import { IoMdCloudDone } from "react-icons/io";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Registrationpage = () => {
    const navigate = useNavigate();

    const [type, setType] = useState("password");
    const [message, setMessage] = useState("");
    const [hide, setHide] = useState({ display: "none" });
    const [show, setShow] = useState({ display: "block" });
    const [form, setForm] = useState({});
    const [popStyle, setPopStyle] = useState({ visiblility: "hidden" });
    const [cnfPassword, setCnf] = useState("");
    const [errormsg, seterrormsg] = useState("Create Your Account")
    const [errcolor, seterrcolor] = useState("#7f8c8d")

    function popup() {
        console.log("clicked")
        setPopStyle({ visibility: "visible" })


    }
    function handleview(action) {
        if (action === "show") {
            setType("text");
            setHide({ display: "block" });
            setShow({ display: "none" });
        } else {
            setType("password");
            setShow({ display: "block" });
            setHide({ display: "none" });
        }
    }
    function handleSubmit(e) {
        e.preventDefault();
        popup();
        if (form.password !== cnfPassword) {
            seterrormsg("Oops password and confirm password does not match");
            seterrcolor("red");
            setPopStyle({ visiblility: "hidden" })

            return;
        }

        const config = {
            headers: {
                "content-type": "application/json",
            },
        };
        axios.post("https://contacts-manager-007-backend.herokuapp.com/register", form, config).then((res) => {
            popup();
            // alert(res.data.message);
            setMessage(res.data.message);

        });

        // navigate("/login");
    }
    return (
        <div className="main-div">
            <div className="popup" style={popStyle}>
                <IoMdCloudDone style={{ fontSize: "60px", color: "green" }} />
                <h1 style={{ color: "#7D8CC4" }}>{`Hii!! ${form.name}`}</h1>
                <p>{message}</p>
                <button className="popup-btn" onClick={() => { navigate("/") }}>Log-In</button>
            </div>
            <form action="" onSubmit={handleSubmit} className="form-box regisform">
                <span id="logo"><MdContactPhone size="2em" color="darkblue"/></span>
                <p id="description" style={{color:errcolor}}>{errormsg}</p>
                <input
                    className="regisName"
                    type="text"
                    placeholder="Name"
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    name="name"
                    id="name-input"
                />
                <input
                    className="upper-input input regisName"
                    onChange={(e) => setForm({ ...form, email: e.target.value })}

                    name="email"
                    type="email"
                    placeholder="Email"
                />

                <div className="password-div">
                    <input
                        className="input"
                        id="password-input"
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                        name="password"
                        type={type}
                        placeholder="Password"
                    />
                    <span className="icon-span">
                        <AiFillEyeInvisible
                            style={hide}
                            onClick={() => handleview("hide")}
                        />
                        <AiFillEye style={show} onClick={() => handleview("show")} />
                    </span>
                </div>
                <div className="password-div">
                    <input
                        className="input"
                        id="password-input"
                        onChange={(e) => setCnf(e.target.value)}
                        name="Confirm-password"
                        type={type}
                        placeholder="Confirm Password"
                    />
                    <span className="icon-span">
                        <AiFillEyeInvisible
                            style={hide}
                            onClick={() => handleview("hide")}
                        />
                        <AiFillEye style={show} onClick={() => handleview("show")} />
                    </span>
                </div>
                <button className="button" type="Submit">
                    Sign UP
                </button>
            </form>
        </div>
    );
};

export default Registrationpage;