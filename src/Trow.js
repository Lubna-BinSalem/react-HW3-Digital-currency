import React from 'react';

const Trow=({topten})=>{



    return(
<tbody>
{topten.map((asset,index)=>{
    let price =Number(asset.priceUsd).toFixed(2);
    let url="https://assets.coincap.io/assets/icons/"+(asset.symbol).toLowerCase()+"@2x.png";
     return (
        <tr key={index}>
        <th scope="row">{asset.rank}</th>
        <td>
         <div className='text-left pl-5' >
          <img src={url} alt="Icon"/>
          <span>{asset.name}</span>
          </div>
        </td>
        <td>{price}</td>
      </tr>
      );
})}

  </tbody> 

    );
}

export default Trow;