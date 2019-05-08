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
            filtered: '',
        }

        this.selectAllCurrencies = this.selectAllCurrencies.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.viewTopCurrencies = this.viewTopCurrencies.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.filterByPrice = this.filterByPrice.bind(this)
        this.viewGraph = this.viewGraph.bind(this)
        this.sortByColumn = this.sortByColumn.bind(this)

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
                currentData: res.data.data,
                cryptoData: res.data.data,
                viewAll: 1,
                loading: '',
            })
        })
        .catch(err => console.log(err))
    }

    viewTopCurrencies() {
        console.log('boop')
        this.setState({
            currentData: this.state.cryptoData,
            homeView: '',
            viewAll: 1,
            currentCurrency: null,
            viewQuery: '',
            viewGraph: '',
            queryTable: '',
            filtered: '',
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

    filterByPrice = (lower, upper) => {
        let lowerBound = lower
        let upperBound = upper
        const cryptoArray = this.state.cryptoData

        if(lowerBound === undefined || upperBound === undefined){
            return
        }

        const sortPrice = (currObj) => {
            let value = currObj.quote.USD.price
            if(value > lowerBound && value < upperBound) {
                return currObj
            }
        }

        const filteredArray = cryptoArray.filter(sortPrice)

        this.setState({
            currentData: filteredArray,
            queryTable: filteredArray,
            viewQuery: 1,
            viewAll: '',
            homeView: '',
            filtered: 1,
        })

    }

    //View Graph Button Function
    viewGraph = () => {
        let cryptoArray = this.state.currentData
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
              homeView: '',
              viewQuery: '',
          })
    }

    //Sort Table by Respective Column Clicked
    sortByColumn = (category) => {
        const cryptoArray = this.state.currentData
        if (category === 'cmc_rank'){
            if(this.state.rankFiltered === 0){
                const sortedArray = cryptoArray.sort((a, b) => {
                    return b.cmc_rank - a.cmc_rank})
        
                this.setState({
                    currentData: sortedArray,
                    viewQuery: '',
                    viewAll: 1,
                    homeView: '',
                    filtered: 1,
                    rankFiltered: 1,
                })

            }
        else {
            const sortedArray = cryptoArray.sort((a, b) => {
                return a.cmc_rank - b.cmc_rank})
    
            this.setState({
                currentData: sortedArray,
                viewQuery: '',
                viewAll: 1,
                homeView: '',
                filtered: 1,
                rankFiltered: 0,
            })
        }
        }
        else if(category === 'name'){
            if(this.state.nameFiltered === 1){
                const sortedArray = cryptoArray.sort((a, b) => b.name.localeCompare(a.name))
    
            this.setState({
                currentData: sortedArray,
                viewQuery: '',
                viewAll: 1,
                homeView: '',
                filtered: 1,
                nameFiltered: 1,
            })
            }
            else {
            const sortedArray = cryptoArray.sort((a, b) => a.name.localeCompare(b.name))
    
            this.setState({
                currentData: sortedArray,
                viewQuery: '',
                viewAll: 1,
                homeView: '',
                filtered: 1,
                nameFiltered: 1,
            })

        }
        }
        else if (category === 'quote.USD.price'){
            if (this.state.quoteFiltered === 1) {
                const sortedArray = cryptoArray.sort((a, b) => {
                    console.log(b.quote.USD.price - a.quote.USD.price)
                    return b.quote.USD.price - a.quote.USD.price})
        
                this.setState({
                    currentData: sortedArray,
                    viewQuery: '',
                    viewAll: 1,
                    homeView: '',
                    filtered: 1,
                    quoteFiltered: '',
                })
            }
            else {
            const sortedArray = cryptoArray.sort((a, b) => {
                console.log(a.quote.USD.price - b.quote.USD.price)
                return a.quote.USD.price - b.quote.USD.price})
    
            this.setState({
                currentData: sortedArray,
                viewQuery: '',
                viewAll: 1,
                homeView: '',
                filtered: 1,
                quoteFiltered: 1,
            })
        }

        }
        else if (category === 'symbol'){
            if (this.state.symbolFiltered === 1){
                const sortedArray = cryptoArray.sort((a, b) => b.symbol.localeCompare(a.symbol))
    
                this.setState({
                    currentData: sortedArray,
                    viewQuery: '',
                    viewAll: 1,
                    homeView: '',
                    filtered: 1,
                    symbolFiltered: '',
                })
            }
        else {
            const sortedArray = cryptoArray.sort((a, b) => a.symbol.localeCompare(b.symbol))
    
            this.setState({
                currentData: sortedArray,
                viewQuery: '',
                viewAll: 1,
                homeView: '',
                filtered: 1,
                symbolFiltered: 1,
            })

        }
        }
        else if (category === 'circulating_supply'){
            if (this.state.supplyFiltered === 1){
                const sortedArray = cryptoArray.sort((a, b) => {
                    return b.circulating_supply - a.circulating_supply})
        
                this.setState({
                    currentData: sortedArray,
                    viewQuery: '',
                    viewAll: 1,
                    homeView: '',
                    filtered: 1,
                    supplyFiltered: '',
                })

            }
        else {
            const sortedArray = cryptoArray.sort((a, b) => {
                return a.circulating_supply - b.circulating_supply})
    
            this.setState({
                currentData: sortedArray,
                viewQuery: '',
                viewAll: 1,
                homeView: '',
                filtered: 1,
                supplyFiltered: 1,
            })
        }
        }
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
                            canClear={this.state.filtered}
                            onClear={this.viewTopCurrencies}/>

                        <Table data={this.state.currentData} onSort={this.sortByColumn}/>
                    </div>}
            {/* Queried USD View */}
                {this.state.viewQuery &&
                    <div className='query-table'>
                        <Query
                            onClick={this.viewGraph} 
                            lowerBound={this.state.lowerBound} 
                            upperBound={this.state.upperBound}
                            onQuery={this.filterByPrice}
                            onClear={this.viewTopCurrencies}
                            canClear={this.state.filtered}/>
                        <Table data={this.state.queryTable} onSort={this.sortByColumn}/>
                    </div>}
            {/* Graph View of Currency Quotes */}
                {this.state.viewGraph &&
                    <div className='graph-view'>
                        <Button onClick={this.viewTopCurrencies} label="View Table" />
                        <Graph data={this.state.graphData}/>
                    </div>}
            </div>
        )
    }

}