import React from 'react'
import Logo from '../images/AppLogo2.png'
import '../style/Loader.css'

const Loader = () => {
    return (
            <div class="loader">
                <img src={Logo} alt="Logo" class="logo" /> 
                <h1 class="website-name">AI Based Student Development Application</h1>
            </div>
    )
}

export default Loader
