import React, { Component } from 'react';
import SearchBox from './search';
import Card from './card';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      skuID: 6099990 // set initital Product SKU - GOOGLE - PIXEL 2 XL
    }
  }
  render() {
    return (
      <div>
        <SearchBox fetchProductSku={this.fetchProductSku.bind(this)}/>
        <Card data={this.state}/>
      </div>
    )
  } // END render

  // the api request function
  fetchApi(url) {
	//fetch(url).then.((res) => res.json()).then(res => console.log(res))
    fetch(url).then((res) => res.json()).then((data) => {
      // update state with API data
      this.setState({
        productSku: data.products[0].sku,
        productName:data.products[0].name,
        productPrice: data.products[0].salePrice,
        productDesc: data.products[0].shortDescription,
        productThumbnail: data.products[0].image,
		productCategory: data.products[0].categoryPath[1].name

      })
    })

    //.catch((err) => console.log('Sku or Product not found!'))

  } // end function

  fetchProductSku(skuID) {
    let url = `https://api.bestbuy.com/v1/products(sku=${skuID})?show=sku,name,shortDescription,shippingCost,salePrice,image,categoryPath.name&&apiKey=<API_KEY>&format=json`
    this.fetchApi(url)
  } // end function

  componentDidMount() {
    let url = `https://api.bestbuy.com/v1/products(sku=${this.state.skuID})?show=sku,name,shortDescription,shippingCost,salePrice,image,categoryPath.name&&apiKey=<API_KEY>&format=json`
    this.fetchApi(url)

    //========================= BLOODHOUND ==============================//
    let suggests = new Bloodhound({
      datumTokenizer: function(datum) {
        return Bloodhound.tokenizers.whitespace(datum.value);
      },
      queryTokenizer: Bloodhound.tokenizers.whitespace,
      remote: {
        url: 'https://api.bestbuy.com/v1/products(name=%QUERY*)?show=sku,name,shortDescription&&apiKey=<API_KEY>&format=json',
        filter: function(items) {
          // Map the remote source JSON array to a JavaScript object array
          return $.map(items.products, function(item) {
            return {
              value: item.name, // search product name
              id: item.sku // get product sku simultaniously
            };
          });
        } // end filter
      } // end remote
    }); // end new Bloodhound

    suggests.initialize(); // initialise bloodhound suggestion engine

    //========================= END BLOODHOUND ==============================//

    //========================= TYPEAHEAD ==============================//
    // Instantiate the Typeahead UI
    $('.typeahead').typeahead({
      hint: true,
      highlight: true,
      minLength: 2
    }, {source: suggests.ttAdapter()}).on('typeahead:selected', function(obj, datum) {
      this.fetchProductSku(datum.id)
    }.bind(this)); // END Instantiate the Typeahead UI
    //========================= END TYPEAHEAD ==============================//

  } // end component did mount function

  // } // END CLASS - APP
}
module.exports = App;
