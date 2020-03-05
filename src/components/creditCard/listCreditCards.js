import React from 'react';
import DeleteCreditCard from './deleteCreditCard';
import UpdateCreditCard from './updateCreditCard';

const ListCreditCards = props => {
    const {cardNumber, cardType, nickname, expiryYear, savedCardId, isDefault} = props.creditCard;

    return (
        <div className="card">
            <div className="content">
                <h4>CREDIT CARD DETAILS</h4>
                <p><strong>Credit Card Number: </strong>{cardNumber}</p>
                <p><strong>Card Brand: </strong>{cardType}</p>
                <p><strong>Card Nickname: </strong>{nickname}</p>
                <p><strong>Expiry Year: </strong>{expiryYear} {isDefault ? <span class="ui black label">Default</span> : ""}</p>
                
                <DeleteCreditCard cardId={savedCardId} refreshCardList={props.refreshCardList}/>
                <UpdateCreditCard cardId={savedCardId} refreshCardList={props.refreshCardList}/>
            </div>
        </div>
    );

}
export default ListCreditCards;