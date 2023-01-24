import React from 'react'
import Image from 'next/image'
import background from "../../public/mittreasure.png"
import mascot from "../../public/beaver.png"

export default function Main(){
    return(
        <div className="Login-page">
            <div className="Login-container-shadow"></div>
            <div className="Login-beaver-wrapper">
                <Image className="Login-beaver" src={mascot} alt="TreasureMIT Beaver"/>
            </div>
            <div className="Login-container">
                <div className="Login-welcome">Welcome to TreasureMIT!</div>
                <div className="Login-info">
                    Start your Geocache adventure right here on MIT campus and start looking for hidden treasures and caches!
                </div>
                <a href="https://oidc.mit.edu/authorize?client_id=baa96962-f4a6-4451-9c04-1fcf05c46c12&response_type=code&scope=openid phone email address profile&redirect_uri=https://treasuremit.herokuapp.com/redirect" className='Login-submit'>Continue With MIT ID</a>
                {/* <button className="Login-submit">Start Hunting!</button> */}
            </div>
            <div className="Login-backimg-wrapper">
            <Image className="Login-backimg" src={background} alt="MIT Treasure Map"/>
            </div>
        </div>
    )
}
