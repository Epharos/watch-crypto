import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import './Crypto.css'

export default function CryptoListElement(props) {
    const [active, setActive] = useState(false)

    const toggle = () => {
        props.toggleCoin(props.id)
        setActive(!active)
    }

    return  <li className="list-element">
                <span className={active ? "eye-active" : "eye"} onClick={() => toggle()}><FontAwesomeIcon icon={faEye} /></span>
                <span className="crypto-name">{props.name}</span> 
                <span className="crypto-symbol">{props.symbol}</span>
            </li>
}