import { useState } from 'react'
import './App.css'

function App() {
  const [priceText, setPriceText] = useState("")
  const [coinName, setCoinName] = useState("")

  async function check(coin){
    var url = "https://api.coinbase.com/v2/prices/"+coin+"-USD/spot"
    var response = await fetch(url)
    var responsetext = await response.text()
    var responselist = JSON.parse(responsetext)
    if(response.status == "200"){
        setPriceText("1 "+responselist.data.base+" = "+responselist.data.amount+" USD")
    } 
    if (response.status == "404" || response.status == "400"){
        setPriceText("Invalid token")
    }
  }

  return (
    <div>
      <header>
        <Appheader />
      </header>
      <body>
        <p className="app-p">
          <input 
            type="text"
            placeholder="Cryptocurrency Name"
            value={coinName}
            onChange={(e)=>{setCoinName(e.target.value)}}
          />
          <span>&nbsp;</span>
          <button onClick={()=>check(coinName)}>Check</button>
        </p>
        <p className="app-p">{priceText}</p>
      </body>


    </div>

  )
}

function Appheader() {
  return (
    <div className="app-header">
      <h2>Check Crypto</h2>
    </div> 
  )
}

export default App
