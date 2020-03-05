import React from 'react';
import occ from '../../api/occ';

const inputFields = ["nameOnCard","cardNumber","cardType","expiryMonth","expiryYear","cardCVV","nickname"];
const inputFieldsLabels = ["Name on card:","Card number:","Card type(visa/mastercard/amex):","Expiration month(mm):","Expiration year(yyyy):","CVV:","Card Nickname:"];
const billingAddressFields = ["firstName","lastName","address1","city","country","selectedCountry","state","selectedState","state_ISOCode","postalCode"];
const billingAddressLabels = ["First Name: ","Last Name: ","Address Line 1: ","City: ","Country: ","Country Code: ","State: ","State Code: ","State ISO Code:","Postal Code: "];
const customPropertiesFields = ["country", "zipcode"];
const customPropertiesLabels = ["Country: ", "Zipcode: "];

class AddCreditCard extends React.Component {

    constructor () {
        super();
        this.state ={
            cardCVV:'',
            nameOnCard: '',
            expiryMonth:'',
            cardType:'',
            nickname:'',
            expiryYear:'',
            customProperties:{
                zipcode:'',
                country:''
            },
            billingAddress:{
                firstName:'Aditya',
                lastName:'Acharya',
                address1:'488 N Wiget Ln',
                city:'Walnut Creek',
                country:'US',
                selectedCountry:'US',
                state:'CA',
                selectedState:'CA',
                state_ISOCode:'US-CA',
                postalCode:'94598'
            },
            cardNumber: '',
            setAsDefault: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleBillingAddress = this.handleBillingAddress.bind(this);
        this.handleCustomProperties = this.handleCustomProperties.bind(this);
        this.handleMakeDefaultCheckbox = this.handleMakeDefaultCheckbox.bind(this);
      }


    async addCreditCard() {
        
        const allCreditCards = await occ.post(`/ccstoreui/v1/profiles/current/creditCards/`, this.state);
        if(allCreditCards.status === 200){
            console.log("Added Card ");
            this.props.refreshCardList();
        }
    }

    handleChange(event) {
        this.setState({ [event.target.id]: event.target.value });
    }

    handleBillingAddress(event) {
        this.setState({ billingAddress: {...this.state.billingAddress, [event.target.id]: event.target.value }});
    }

    handleCustomProperties(event) {
        this.setState({ customProperties: {...this.state.customProperties, [event.target.id]: event.target.value }});
    }

    handleMakeDefaultCheckbox(event) {
        console.log(event.target.checked);
        this.setState({ setAsDefault : event.target.checked });
    }

    cardInputFields(labelId, labelText) {
        return (
            <p className="ui small icon input" style={{display: "block"}}>
                <label>{labelText} </label><br/>
                <input type="text" id={labelId} onChange={this.handleChange} />
            </p>
        );
    }

    billingAddressFields(labelId, labelText) {
        return (
            <p className="ui small icon input" style={{display: "block"}}>
                <label>{labelText} </label><br/>
                <input type="text" id={labelId} onChange={this.handleBillingAddress} />
            </p>
        );
    }

    customPropertyFields(labelId, labelText) {
        return (
            <p className="ui small icon input" style={{display: "block"}}>
                <label>{labelText} </label><br/>
                <input type="text" id={labelId} onChange={this.handleCustomProperties} />
            </p>
        );
    }
     
    render() {
        return (
            <div>
                <div className="ui cards">
                    <div className="card">
                        <div className="content">
                            <h4>Card Details: </h4>
                            {inputFields.map((inputField, index) => {
                                return (this.cardInputFields(inputField, inputFieldsLabels[index]));
                            })}
                            <h4>Billing Information: </h4>
                            {customPropertiesFields.map((inputField, index) => {
                                return (this.customPropertyFields(inputField, customPropertiesLabels[index]));
                            })}
                            <input type="checkbox" onChange={ this.handleMakeDefaultCheckbox }/> Set as default
                            <br/><br/>
                            <button className="ui green button" onClick={() => this.addCreditCard()}>Add Card</button> 
                        </div>
                    </div>
                    {/* <div className="card">
                        <div className="content">
                            <h4>Billing Address: </h4>
                            {billingAddressFields.map((inputField, index) => {
                                return (this.billingAddressFields(inputField, billingAddressLabels[index]));
                            })} 
                        </div>
                    </div> */}
                    {/* <div className="card">
                        <div className="content">
                            <h4>Billing Information: </h4>
                            {customPropertiesFields.map((inputField, index) => {
                                return (this.customPropertyFields(inputField, customPropertiesLabels[index]));
                            })}
                            <button className="ui green button" onClick={() => this.addCreditCard()}>Add Card</button> 
                        </div>
                    </div> */}
                </div>
                {/* <button className="ui green button" onClick={() => this.addCreditCard()}>Add Card</button>  */}
            </div>
        ); 
    }
}
export default AddCreditCard;