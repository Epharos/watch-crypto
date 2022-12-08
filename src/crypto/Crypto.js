import axios from 'axios'
import React, { useEffect, useState } from 'react'
import CryptoListElement from './CryptoListElement'
import CryptoCard from './CryptoCard'
import './Crypto.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRefresh } from '@fortawesome/free-solid-svg-icons'

function Crypto() {
    const [coins, setCoins] = useState([])
    const [favoritedCoins, setFavoritedCoins] = useState([])
    const [favoritedCoinsData, setFavoritedCoinsData] = useState([])
    const [listSearch, setListSearch] = useState("")
    const [dataSearch, setDataSearch] = useState("")

    function fetchCoinGecko()
    {
        axios.get("https://api.coingecko.com/api/v3/coins/list")
        .then(res => {
            setCoins(res.data)
            console.log(res.data)
        })
        .catch(err => console.log(err))
    }

    useEffect(fetchCoinGecko, [])

    const onListSearchChanged = e => {
        setListSearch(e.target.value);
    }

    const onDataSearchChanged = e => {
        setDataSearch(e.target.value);
    }

    const toggleCoin = id => { 
        favoritedCoins.includes(id) ? setFavoritedCoins(removeFromFavorites(id, favoritedCoins)) : favoritedCoins.push(id)
        getCoinData()
    }

    const getCoinData = () => {
        if(favoritedCoins.length === 0)
        {
            setFavoritedCoinsData([])
            return;
        }

        var request = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&ids="

        favoritedCoins.forEach(e => {
            request = request.concat(e.concat(","))
        })

        request.slice(0, request.length - 2)

        console.log(request)

        axios.get(request)
        .then(res => {
            setFavoritedCoinsData(res.data)
            console.log(res.data)
        })
        .catch(err => console.log(err))
    }

    const removeFromFavorites = (id, arr) => {
        const index = arr.indexOf(id)

        if (index >= arr.lenght) { return undefined; }

        if (index === 0) {
            arr.shift();
            return arr;
        }

        if (index === arr.length - 1) {
            arr.pop();
            return arr;
        }

        var newarray = arr.splice(0, index);

        return newarray.concat(arr.splice(1, arr.length))
    }

    const filterCoins = (cl, s) => cl.filter(c => 
        c.name.toLowerCase().includes(s.toLowerCase()) || 
        c.symbol.toLowerCase().includes(s.toLowerCase() || 
        c.id.toLowerCase().includes(s.toLowerCase())))

    return (
        <>
            <h1>Cryptocurrencies watcher</h1>

            <hr></hr>

            <div className="coins-container">
                <div className="allCoins">
                    <h2>Currencies list</h2>

                    <div className="search">
                        <form action="">
                            <input type="text" placeholder="Search coin (name/symbol)" onChange={onListSearchChanged} />
                        </form>
                    </div>

                    <ul>
                        { filterCoins(coins, listSearch).map(c => {
                            return <CryptoListElement key={c.id} toggleCoin={toggleCoin} id={c.id} name={c.name} symbol={c.symbol}/>
                        })}    
                    </ul>
                </div>

                <div className="favoritedCoins">
                    <h2>Your watched currencies <span onClick={getCoinData}><FontAwesomeIcon icon={faRefresh} /></span></h2>

                    <div className="search">
                        <form action="">
                            <input type="text" placeholder="Search coin (name/symbol)" onChange={onDataSearchChanged} />
                        </form>
                    </div>

                    <ul>
                        {filterCoins(favoritedCoinsData, dataSearch).map(c => {
                            return <CryptoCard key={c.id} coin={c}></CryptoCard>
                        })}
                    </ul>
                </div>
            </div>
        </>
    );
}

export default Crypto;