import React from 'react'
import Aside from './Aside'
import Header from './Header'
import "../App2.css"

const Page = () => {
  return (
    <>
      <div id="main-page">
        <Aside />
        <div id="Right-box" >
          <Header />
        </div>
      </div>
    </>
  )
}

export default Page;
