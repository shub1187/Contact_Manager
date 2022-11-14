import React, { useEffect, useState } from "react";
import "../App2.css"
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { MdContactPhone } from 'react-icons/md';
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";


const Loginpage = () => {

  const navigate = useNavigate();
  const [type, setType] = useState("password");
  const [hide, setHide] = useState({ display: "none" });
  const [show, setShow] = useState({ display: "block" });
  const [data, setData] = useState({});
  const [errormsg, seterrormsg] = useState("Enter Your Credentials to Enter Your Account")
  const [errcolor, seterrcolor] = useState("#7f8c8d")

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

    if (!data.password || !data.email) {
      return alert("Kindly fill all the fields");
    }
    const config = {
      headers: {
        "content-type": "application/json",
      },
    };
    axios.post("https://contacts-manager-007-backend.herokuapp.com/login", data, config).then((res) => {

      if(res.data.status!=="success"){
        seterrormsg(res.data.message)
        seterrcolor("red")
      }
      localStorage.setItem('token', res.data.jwt_token);

      if (res.data.jwt_token !== undefined) {
        localStorage.setItem('status', "true");
        navigate("/table")
      }


    });

  }
  return (
    <div className="main-div">

      <form action="" onSubmit={handleSubmit} className="form-box">

        <span id="logo"><MdContactPhone size="2em" color="darkblue" /></span>
        <p id="description" style={{color: errcolor}}>{errormsg}</p>
        <input
          className="upper-input input"
          onChange={(e) => setData({ ...data, email: e.target.value })}
          type="email"
          placeholder="User ID"
        />
        <div className="password-div">
          <input
            className="input"
            id="password-input"
            onChange={(e) => setData({ ...data, password: e.target.value })}
            type={type}
            placeholder="Password"
          />
          <span className="icon-span">
            <AiFillEyeInvisible
              style={hide}
              className="eye"
              onClick={() => handleview("hide")}
            />
            <AiFillEye
              className="eye"
              style={show}
              onClick={() => handleview("show")}
            />
          </span>
        </div>
        <button className="button" type="submit">
          Sign In
        </button>
        <Link to="/register" className="anchor" >
          Sign Up
        </Link>
      </form>
    </div>
  );
};

export default Loginpage;