import React from 'react'
import logo from '../../images/assets/logo-dark.png'
const DeveloperInfo = () => {
  return (
    <div className='developer_info'>
    <center >
      <img src={logo} alt="" srcset="" style={{
        width:'100px'
      }}/>
      <h3>
        Government College of Engineering Amravati
      </h3>
    </center>
    <center>
      <h6 style={{
        fontWeight:'bold'
      }}>Guided By</h6>
      <p style={{
        fontWeight:'bold'
      }}>Prof. K. N. Tayde</p>
    </center>
    <center>
      <h6>Submitted By</h6>
      <p>Sakshi Khatri (19007046)</p>
      <p>Anchal Budharani (19007072)</p>
      <p>Akshay Khare (19003058)</p>
      <p>Gaurav Bhagat (19007069)</p>
    </center>
    </div>
  )
}

export default DeveloperInfo