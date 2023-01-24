import React from 'react'
import Image from 'next/image'
import background from "../../public/mittreasure.png"
import mascot from "../../public/beaver.png"

export default function Login(){
    return(
        <div className="Login-page">
            <div className="Login-container-shadow"></div>
            <div className="Login-beaver-wrapper">
                <Image className="Login-beaver" src={mascot} alt="TreasureMIT Beaver"/>
            </div>
            <div className="Login-container">
                <div className="Login-welcome">Welcome to TreasureMIT!</div>
                <div>
                    <input className='Login-userinput' type='text' placeholder=' '></input>
                    <label  className="Login-user"> Username</label>
                </div>
                <div>
                    <input className='Login-pswdinput' type='password' placeholder=' '></input>
                    <label className="Login-pswd"> Password </label>
                </div>
                <a href="https://oidc.mit.edu/authorize?client_id=baa96962-f4a6-4451-9c04-1fcf05c46c12&response_type=code&scope=openid phone email profile&redirect_uri=https://treasuremit.herokuapp.com/redirect" className='Login-submit'>Continue With MIT ID</a>
                {/* <button className="Login-submit">Start Hunting!</button> */}
            </div>
            <div className="Login-backimg-wrapper">
            <Image className="Login-backimg" src={background} alt="MIT Treasure Map"/>
            </div>
        </div>
    )
}