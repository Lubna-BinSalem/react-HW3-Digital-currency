import { useEffect,useState } from 'react';
import './App.css';
import Trow from './Trow'
import Swal from "sweetalert2";  


function App() {
const [assets,setAssets]=useState([]);
const [topten,setTopten]=useState([]);
const [inputValue,setInputValue]=useState('');

const[name,setName]=useState('');
const[url,setImage]=useState('');
const [price,setPrice]=useState('');
const [market,setMarket]=useState('');
const [vwap,setVWAP]=useState('');
const [supply,setSupply]=useState('');
const [volume,setVolume]=useState('');
const [change,setChange]=useState('');

const onSearch =async ()=>{
  let found="false";

  for( let index=0;index<assets.length;index++){
    if(assets[index].name===inputValue){
      let oldUrl="https://assets.coincap.io/assets/icons/"+(assets[index].symbol).toLowerCase()+"@2x.png"; 
      setImage(oldUrl);
      setName(assets[index].name);
      setPrice(Number(assets[index].priceUsd).toFixed(2));
      setMarket(Number(assets[index].marketCapUsd).toFixed(2));
      setVWAP(Number(assets[index].vwap24Hr).toFixed(2));
      setSupply(Number(assets[index].supply).toFixed(2));
      setVolume(Number(assets[index].volumeUsd24Hr).toFixed(2));
      setChange(Number(assets[index].changePercent24Hr).toFixed(2));
      found ="true";}
  }
  if(found==="false"){
    console.log("not found");
    Swal.fire({  
      icon: 'error',  
      title: 'Oops...',  
      text: 'Currency name not found',  
    }); 
  }

} 

useEffect(() => {
  const fetchCoinData = async () => {
    const request = await fetch('https://api.coincap.io/v2/assets');
    const data = await request.json();
  

    const asssetsMap = data.data;
    console.log("in use affect")
    console.log(asssetsMap);

    const tenMap=asssetsMap.slice(0,10);
    setAssets(asssetsMap);
    setTopten(tenMap);
    console.log(data);

  };
  fetchCoinData();
}, []);


  return (
    <div className="App">

      <table className="table text-center">
     <thead>
    <tr>
      <th scope="col" className='text-left'>Rank</th>
      <th scope="col">Name</th>
      <th scope="col">Price</th>
     </tr>
       </thead>
      <Trow topten={topten}/>
       </table>

       <form className="d-flex" role="search">
       <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        type='text'
        className='form-control'
        placeholder='Digital currency name'
      />
 <button onClick={onSearch} className='btn btn-secondary' type='button'>Search</button>  
   </form>
    <table className="table">
  <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Price</th>
      <th scope="col">Market cap</th>
      <th scope="col">VWAP (24HR)</th>
      <th scope="col">Supply</th>
      <th scope="col">Volume(24HR)</th>
      <th scope="col">Change (24HR)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">
      <img src={url} />
        <p>{name}</p>
      </th>
      <td>{price}</td>
      <td>{market}</td>
      <td>{vwap}</td>
      <td>{supply}</td>
      <td>{volume}</td>
      <td>{change}</td>

    </tr>
    </tbody>
</table>

    </div>
  );
}

export default App;
