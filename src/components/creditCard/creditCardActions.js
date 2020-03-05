import React from 'react';
import occ from '../../api/occ';
import ListCreditCards from './listCreditCards';
import AddCreditCard from './addCreditCard';

class CreditCardActions extends React.Component {
    state = { 
        creditCards: []
    }

    async componentDidMount() {
        this.getAllCreditCards();
    }

    async getAllCreditCards() {
        const allCreditCards = await occ.get('/ccstoreui/v1/profiles/current/creditCards/');
        if(allCreditCards.status === 200){
            this.setState({creditCards : allCreditCards.data.items});
        }
    }
    
    render() {
        return (
            <div>
                <h2 className="ui block header"> Saved Credit Cards</h2>
                <div className="ui cards">
                    {this.state.creditCards.map( creditCard => {
                            return <ListCreditCards key={creditCard.savedCardId} creditCard={creditCard} refreshCardList={()=> this.getAllCreditCards()}/>
                        })}
                </div>
                <h2 className="ui block header"> Add New Credit Card</h2>
                <AddCreditCard refreshCardList={()=> this.getAllCreditCards()}/>
                <div className="ui cards"></div>
            </div>
        ); 
    }
}
export default CreditCardActions;