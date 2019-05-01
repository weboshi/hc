import React, { Component } from 'react';
import axios from 'axios';
import Table from '../Table/table';
import Search from '../Search/search';
import Button from '../Button/button';
import Query from '../Query/query';
import Graph from '../Graph/graph';
import './main.css'

export class CryptoData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: 1,
        }

        this.selectAllCurrencies = this.selectAllCurrencies.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.viewTopCurrencies = this.viewTopCurrencies.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.filterByPrice = this.filterByPrice.bind(this)
        this.viewGraph = this.viewGraph.bind(this)

    }


    //make our api call here
    componentDidMount() {
        this.selectAllCurrencies()
    }


    selectSingleCurrency() {
        let selectedCurrency = this.state.search
        console.log(selectedCurrency)
        axios.get(`/api/crypto/getSingleCurrency/${selectedCurrency}`)
            .then(res => {
                console.log(res)
                this.setState({
                    currentCurrency: res.data.data,
                    homeView: ''
                })
            })
            .catch(err => console.log(err))
    }

    selectAllCurrencies() {
        axios.get('/api/crypto/getCrypto')
        .then(res => {
            this.setState({
                cryptoData: res.data.data,
                viewAll: 1,
                loading: '',
            })
        })
        .catch(err => console.log(err))
    }

    viewTopCurrencies() {
        this.setState({
            homeView: '',
            viewAll: 1,
            currentCurrency: null,
            viewQuery: '',
            viewGraph: '',
        })
    }

    handleChange = (event) => {
        this.setState({
          [event.target.name]: event.target.value,
        });
      };

    handleSubmit = () => {
        this.selectSingleCurrency();
    }

    filterByPrice = (e) => {
        let lowerBound = this.state.lowerBound
        let upperBound = this.state.upperBound

        if(lowerBound === undefined || upperBound === undefined){
            e.preventDefault()
            return
        }

        const cryptoArray = this.state.cryptoData

        const sortPrice = (currObj) => {
            console.log(currObj)

            let value = currObj.quote.USD.price
            if(value > lowerBound && value < upperBound) {
                return currObj
            }
        }

        const filteredArray = cryptoArray.filter(sortPrice).sort((a, b) => parseFloat(a.quote.USD.price) - parseFloat(b.quote.USD.price));

        this.setState({
            queryTable: filteredArray,
            viewQuery: 1,
            viewAll: '',
            homeView: '',
        })

    }

    viewGraph = () => {
        let cryptoArray = this.state.cryptoData
        let keys = [];
        let quotes = [];

        for (let i=0; i < cryptoArray.length; i++){
            keys.push(cryptoArray[i].name)
            quotes.push(cryptoArray[i].quote.USD.price)
        }

        const data = {
            labels: keys,
            datasets: [
              {
                label: 'Top 100 Crypto Quotes (USD)',
                backgroundColor: 'rgba(255,99,132,0.2)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor: 'rgba(255,99,132,1)',
                data: quotes
              }
            ]
          };

          this.setState({
              graphData: data,
              viewGraph: 1,
              viewAll: '',
          })
    }



    render(){
        return(
            <div className='main-body'>
            {/* Loading */}
                {this.state.loading &&
                    <div className='loading'>
                        <i style={{fontSize:'3em'}} className="fas fa-cog fa-spin"></i>
                    </div>}
            {/* Top 100 Crypto View */}
                {this.state.viewAll &&
                     <div className='table-view'>
                        <Query
                            onClick={this.viewGraph}
                            onChange={this.handleChange} 
                            lowerBound={this.state.lowerBound} 
                            upperBound={this.state.upperBound}
                            onQuery={this.filterByPrice}
                            canClear={false}/>

                        <Table data={this.state.cryptoData}/>
                    </div>}
            {/* Queried USD View */}
                {this.state.viewQuery &&
                    <div className='query-table'>
                        <Query 
                            onChange={this.handleChange} 
                            lowerBound={this.state.lowerBound} 
                            upperBound={this.state.upperBound}
                            onQuery={this.filterByPrice}
                            onClear={this.viewTopCurrencies}
                            canClear={true}/>
                        <Table data={this.state.queryTable}/>
                    </div>}
            {/* Graph View of Currency Quotes */}
                {this.state.viewGraph &&
                    <div className='graph-view'>
                        <Button onClick={this.viewTopCurrencies} label="View Table" />
                        <Graph data={this.state.graphData}/>
                    </div>}
            {/* Single Currency Search View */}
                {this.state.currentCurrency && <Table data={this.state.currentCurrency}/>}
            </div>
        )
    }

}