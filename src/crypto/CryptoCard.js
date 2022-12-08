import React from 'react'
import "./Crypto.css"

import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function CryptoCard(props) {
    return <li className="crypto-card">
        <div className="crypto-logo">
            <img src={props.coin.image} alt="Coin logo"></img>
        </div>

        <div className="crypto-data">
            <h3><span className="coin-name">{props.coin.name}</span><span className="coin-symbol">{props.coin.symbol}</span></h3>
            <h4>Ranking #<span className="coin-ranking">{props.coin.market_cap_rank}</span></h4>

            <div className="coin-pricing">
                <div className="current-price"><span className="coin-price">{props.coin.current_price}</span> €/u</div>
                <div className="lowest-price"><FontAwesomeIcon icon={faCaretDown}/> {props.coin.low_24h} €</div>
                <div className="highest-price"><FontAwesomeIcon icon={faCaretUp}/> {props.coin.high_24h} €</div>
            </div>
        </div>
    </li>
}