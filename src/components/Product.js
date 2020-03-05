import React from 'react';

const Product = props => {
    const {displayName, contractPrice} = props.product;

    return (
        <div className="card">
            <div className="content">
                <p>{displayName}</p>
                <p>{contractPrice}</p>
            </div>
        </div>
    );

}
export default Product;