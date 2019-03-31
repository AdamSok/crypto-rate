
import React, { Component } from 'react';
import './App.css';
import axios from 'axios'

import CryptoList from './CryptoList';


class Crypto extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cryptoList: []
    }


  }
  fetchData = () => {
    axios.get('https://blockchain.info/pl/ticker')
      .then(response => {
        let cryptoList = [];
        let oldCryptoList = this.state.cryptoList;
        for (let key in response.data) {
          let newRate = {
            currency: key,
            last: response.data[key].last,
            symbol: response.data[key].symbol,
          }
          let oldRate = oldCryptoList.find(oldRate => oldRate.currency === newRate.currency); 
          
          if (oldRate !== undefined) {
            if (newRate.last > oldRate.last) {
              newRate.class ='green';
              newRate.arrow = String.fromCharCode(8593)
            } else if (newRate.last < oldRate.last) {
              newRate.class = 'red';
              newRate.arrow = String.fromCharCode(8595)
            } else if (newRate.last === oldRate.last) {
                newRate.class = 'blue';
                newRate.arrow = String.fromCharCode(8596)
            } 
            

            //console.log(newRate, oldRate)
          }else {
              newRate.class ='blue';
            }

          cryptoList.push(newRate)
        }


        this.setState({ cryptoList })


        
      })
      
  }



  componentDidMount() {
    this.fetchData();
    setInterval(() => {
      if (this.inputValue.value === '') {
        this.fetchData();
      } 
    }, 5000);

    
  }

  onFilter = () => {
    let filter = this.inputValue.value.trim().toLocaleUpperCase()
    let filteredcryptoList = this.state.cryptoList;
  
    filteredcryptoList = filteredcryptoList.filter(rate => {
      return rate.currency.includes(filter);
    })

    this.setState({cryptoList: filteredcryptoList})
  }
  

  render() {

    return (
      <div >
        <input type='text' placeholder='filter'ref={input => this.inputValue = input} 
        onChange={this.onFilter}/>
       
        <CryptoList cryptoList={this.state.cryptoList} />
      </div>

    );
  }
}

export default Crypto;
