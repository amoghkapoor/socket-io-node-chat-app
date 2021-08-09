import React from 'react'

import "../styles/infobar/infobar.scss"

const InfoBar = ({ room }) => {
    return (
        <div className="infoBar">
            <div className="leftInnerContainer">
                <div className="online-icon"></div>
                <h3>{room}</h3>
            </div>
            <div className="rightInnerContainer">
                <a href="/">&times;</a>
            </div>
        </div>
    )
}

export default InfoBar
