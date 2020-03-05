import React from 'react';
import occ from '../api/occ';
import Product from './Product';
import Cookies from 'js-cookie';
import { trackPromise } from 'react-promise-tracker';
import LoadingIndicator from './LoadingIndicator';

const countryOptions = [
    {key: 'us', value: 'US', flag: 'us', text: 'United States'},
    {key: 'ca', value: 'CA', flag: 'ca', text: 'Canada'}
]
class ProductList extends React.Component {
    state = { 
        products: [],
        selectedCountry: 'US',
        isVisible: false
    }

    async componentDidMount() {
        const categoryId = 'Antennas';
        const limit = 15;
        const productResponse = await occ.get(`/ccstoreui/v1/products?categoryId=${categoryId}&limit=${limit}`);
        if(productResponse.status === 200){
            this.setState({ products: productResponse.data.items });
            if(this.state.products.length > 0) {
                trackPromise(
                    this.getContractPrices(this.state.products)
                );
            }
        }
    }

    async getContractPrices(products) {
        const currency = {
            'US': 'USD',
            'CA': 'CAD'
        }
        var payload = {
            "items": this.getItems(products),
            "customerNumber": this.getCustomerNumber(),
            "contractId": this.getContractId() || null,
            "transactionId": null,
            "skipCache": false,
            "env": "shop-test2",
            "country": this.state.selectedCountry,
            "currency": currency[this.state.selectedCountry]
        }
        console.log(currency[this.state.selectedCountry]);
        const priceResponse = await occ.post('/ccstorex/custom/v1/price',payload);
        if(priceResponse.status === 200){
            var prices = priceResponse.data.Discount_Price;
            if (prices.length > 0) {
                prices.forEach(price => {
                    this.setState(prevState => {
                        return {products: prevState.products.map(product => 
                            product.id === price.ITEM_NUMBER ? { ...product, contractPrice: price.NET_PRICE }: product)}
                    })
              });
            }
        }
    }
    getItems(products){
        var items = [];
        products.map(product => items.push({ itemId: product.id, quantity: 1 }));
        return items;
    }

    getCustomerNumber() {
        var customerCookie = Cookies.get('chosen_customer_number');
        if(customerCookie){
            return customerCookie.split('-')[0].trim();
        }
        if(!customerCookie && Cookies.get('OCCSESSION') === 'Y'){
            return  'REGISTERED'
        } else {
            return 'GUEST'
        }
    }
    getContractId() {
        return Cookies.get('chosen_contract');
    }
    getPricesForCountry(e){
        this.setState({selectedCountry: e.target.getAttribute('data-value')}, () => {
            trackPromise(
                this.getContractPrices(this.state.products)
            );
        });
    }
    
    render() {
        return (
            <div>
                <h2 className="ui block header">Antennas</h2>
                <LoadingIndicator />

                <div className="ui search selection dropdown" style={{float: "right"}} onClick={e => this.setState(prevState => ({isVisible: !prevState.isVisible}))}>
                    <i className="dropdown icon"></i>
                    <div className="default text">Select Country</div>
                    <div className={`menu transition ${this.state.isVisible ? 'visible' : ''}`}>
                        {countryOptions.map(country => 
                            <div className="item" key={country.key} data-value={country.value} onClick={e => this.getPricesForCountry(e)}><i className={`${country.flag} flag`}></i>{country.text}</div>
                        )}
                    </div>
                </div>
                <div className="ui hidden divider"></div>

                <div className="ui cards">
                    {this.state.products.map(product => 
                        <Product key={product.id} product={product} />
                    )}    
                </div>
                
                
            </div>
        );
    }
}
export default ProductList;