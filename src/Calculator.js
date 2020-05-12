import React from 'react';
import './App.css';

class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.handleSwap = this.handleSwap.bind(this);
        this.getExchangeRates = this.getExchangeRates.bind(this);
        
        this.state = {
            fromValue: null,
            toValue: null,
            data: null,
        };
    }

    getExchangeRates() {
        let fromSelect = document.getElementById('from');
        let fromValue = fromSelect.value;
        let toSelect = document.getElementById('to');
        let toValue = toSelect.value;

        this.setState({
            fromValue,
            toValue
        });

        fetch(`https://api.exchangeratesapi.io/latest?base=USD&symbols=${fromValue},${toValue}`)
            .then(response => response.json())
            .then(data => this.setState({data}));
    }

    handleSwap() {
        let fromSelect = document.getElementById('from');
        let fromSelectIndex = fromSelect.selectedIndex;

        let toSelect = document.getElementById('to');
        let toSelectIndex = toSelect.selectedIndex;

        this.setState({
            fromValue: toSelect.value,
            toValue: fromSelect.value
        });

        fromSelect.selectedIndex = toSelectIndex;
        toSelect.selectedIndex = fromSelectIndex;
    }

    render() {
        let rates = this.state.data ? this.state.data.rates : null;
        let fromValue = this.state.fromValue;
        let toValue = this.state.toValue;
        let exchangeRate;

        if (rates) {
            let convertedValue = rates[toValue] / rates[fromValue];
            exchangeRate = (Object.keys(rates).length > 1) 
                ? <p>1 {fromValue} = {convertedValue} {toValue}</p>
                : <p>1 {fromValue} = 1 {fromValue}</p>;
        }

        return (
            <div>
                <p>Choose the currency and the amounts to get the exchange rate</p>

                <select id="from">
                    <option value="CAD">CAD</option>
                    <option value="HKD">HKD</option>
                    <option value="ISK">ISK</option>
                    <option value="PHP">PHP</option>
                    <option value="DKK">DKK</option>
                    <option value="HUF">HUF</option>
                    <option value="CZK">CZK</option>
                    <option value="GBP">GBP</option>
                    <option value="RON">RON</option>
                    <option value="IDR">IDR</option>
                    <option value="INR">INR</option>
                    <option value="BRL">BRL</option>
                    <option value="RUB">RUB</option>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                </select>

                <select id="to">
                    <option value="CAD">CAD</option>
                    <option value="HKD">HKD</option>
                    <option value="ISK">ISK</option>
                    <option value="PHP">PHP</option>
                    <option value="DKK">DKK</option>
                    <option value="HUF">HUF</option>
                    <option value="CZK">CZK</option>
                    <option value="GBP">GBP</option>
                    <option value="RON">RON</option>
                    <option value="IDR">IDR</option>
                    <option value="INR">INR</option>
                    <option value="BRL">BRL</option>
                    <option value="RUB">RUB</option>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                </select>

                <button onClick={this.handleSwap}>Swap</button>
                <button onClick={this.getExchangeRates}>Get rate</button>

                {exchangeRate}
            </div>
        );
    }
}

export default Calculator;
