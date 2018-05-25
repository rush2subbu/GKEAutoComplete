import React, { Component } from 'react';
import ReactDOM from 'react-dom';
let numeral = require('numeral');
let backdropIMG;

class Card extends Component {

  render() {
    let data = this.props.data
      // if sku ID found, then...



      let posterIMG = data.productThumbnail,
          production = data.production,
          productionCountries = data.production_countries,
          genres = data.genre,
          totalRevenue = data.revenue,
          productionList = nestedDataToString(production),
          productionCountriesList = nestedDataToString(productionCountries),
          noData = '-',
          genresList = nestedDataToString(genres);
          backdropIMG = 'https://cdn.vox-cdn.com/thumbor/SJABu-hHQdX0c0prPGN0Wdz7dv8=/0x0:2040x1360/920x613/filters:focal(841x483:1167x809):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/57045389/jbareham_170921_2006_0201.0.jpg';



      // conditional statements for no data

      if(data.productThumbnail== null){
        posterIMG = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSols5HZxlQWyS9JY5d3_L9imbk0LiziHiyDtMZLHt_UNzoYUXs2g';
      }



      return (
        <div className="col-xs-12 cardcont nopadding">

          <div className="meta-data-container col-xs-12 col-md-8 push-md-4 col-lg-7 push-lg-5">
            <h1>{data.productName}</h1>

            <span className="tagline">{data.tagline}</span>
            <p>{data.productCategory}</p>
            <div className="additional-details">
              <span className="shopping-online">{genresList}</span>
                <div className="row nopadding product-details">
                <div className="col-xs-6"> Decription: <span className="meta-data">{data.productDesc}</span></div>
                <div className="col-xs-6"> Sale Price: <span className="meta-data">{data. productPrice} USD</span> </div>
                <div className="col-xs-6"> Category: <span className="meta-data">{data.productCategory}</span></div>
              </div>
            </div>
          </div>
          <div className="poster-container nopadding col-xs-12 col-md-4 pull-md-8 col-lg-5 pull-lg-7 ">
            <img id="postertest" className='poster' src={posterIMG}/>
          </div>
        </div>
      )
    }
  componentDidUpdate() {
    document.body.style.backgroundImage = 'url(' + backdropIMG + ')';
  }
}


function nestedDataToString(nestedData) {
  let nestedArray = [],
      resultString;
  nestedArray.forEach(function(item, i){
    nestedArray.push(item.name);
  });
  resultString = nestedArray.join(', '); // array to string
  return resultString;
};
module.exports = Card;
