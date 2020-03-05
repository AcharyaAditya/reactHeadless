import React from 'react';
import occ from '../../api/occ';
import $ from 'jquery';

class UpdateCreditCard extends React.Component {

    constructor () {
        super();
        this.state = {nickname: '',
                    setAsDefault: false
                  };
        this.handleChange = this.handleChange.bind(this);
        this.handleMakeDefaultCheckbox = this.handleMakeDefaultCheckbox.bind(this);
      }

    async updateCreditCard() {
        const allCreditCards = await occ.put(`/ccstoreui/v1/profiles/current/creditCards/${this.props.cardId}`, this.state);
        if(allCreditCards.status === 200){
            console.log("Updated - ",this.props.cardId);
            this.props.refreshCardList();
        }
    }

    handleChange(event){
        this.setState({ [event.target.id]: event.target.value });
    }
   
    handleMakeDefaultCheckbox(event) {
        console.log(event.target.checked);
        this.setState({ setAsDefault : event.target.checked });
    }

    render() {
        return (
            <div>
                <br />
                <h4>UPDATE THIS CREDIT CARD</h4>
                <p className="ui input">New nickname: <input type="text" id="nickname" onChange={this.handleChange} /></p>
                <br />
                <input type="checkbox" onChange={ this.handleMakeDefaultCheckbox }/> Set as default
                <br/><br/>
                <button className="ui violet button" onClick={() => this.updateCreditCard()} >UPDATE</button>             
            </div>
        ); 
    }
}
export default UpdateCreditCard;