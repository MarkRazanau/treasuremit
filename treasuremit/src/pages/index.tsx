import React, { useState } from 'react'
import Image from 'next/image'
import background from "../../public/background_noicons.png"
import backIcons from "../../public/background_icons.png"
import mascot from "../../public/beaver.png"
import mascotEyes from "../../public/beaver_eyes.png"
import mascotNose from "../../public/beaver_nose.png"
import mascotArms from "../../public/beaver_loading.png"
import LogNavBar from "../../components/LogNavBar"

export default function Main(){

    const [showLoad, setShowLoad] = useState(false);
    function toggleLoad(){
        setShowLoad(true);
    }

    return(
        <div className="Login-page">
            <LogNavBar/>
            <div className="Login-container-shadow"></div>
            
            <Image className="Login-backimg" src={background} alt="MIT Treasure Map"/>
            <Image className="Login-backimg" src={backIcons} alt="MIT Treasure Map"/>
            <div className="Login-beaver-wrapper">
                <Image className="Login-beaver" src={mascot} alt="TreasureMIT Beaver"/>
                <Image className="Login-loading" src={mascotArms} style={{visibility: showLoad ? "visible" : "hidden"}} alt="TreasureMIT Beaver"/>
            </div>
            <div className="Login-container">
                <div className="Login-welcome">Welcome to TreasureMIT!</div>
                <div className="Login-info">
                    Start your Treasure Hunting adventure right here on MIT campus and start looking for goodies hidden away by your peers!
                </div>
                {/* <a href="https://oidc.mit.edu/authorize?client_id=baa96962-f4a6-4451-9c04-1fcf05c46c12&response_type=code&scope=openid phone email address profile offline_access&redirect_uri=http://localhost:3000/redirect" className='Login-submit' onClick={toggleLoad}><div className="Login-submit-text">Continue With MIT ID</div></a> */}
                <a href="https://oidc.mit.edu/authorize?client_id=baa96962-f4a6-4451-9c04-1fcf05c46c12&response_type=code&scope=openid phone email address profile offline_access&redirect_uri=https://treasuremit.herokuapp.com/redirect" className='Login-submit' onClick={toggleLoad}><div className="Login-submit-text">Continue With MIT ID</div></a>
                {/* <button className="Login-submit">Start Hunting!</button> */}
            </div>
            <div className="Login-backimg-wrapper">
            </div>
        </div>
    )
}
