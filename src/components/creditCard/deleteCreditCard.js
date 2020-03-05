import React from 'react';
import occ from '../../api/occ';

class DeleteCreditCard extends React.Component {

    async deleteCreditCard() {
        const allCreditCards = await occ.delete(`/ccstoreui/v1/profiles/current/creditCards/${this.props.cardId}`);
        if(allCreditCards.status === 200){
            console.log("Deleted - ",this.props.cardId);
            this.props.refreshCardList();
        }
    }
    
    render() {
        return (
            <button className="ui red button" onClick={() => this.deleteCreditCard()} >DELETE</button>
        ); 
    }
}
export default DeleteCreditCard;