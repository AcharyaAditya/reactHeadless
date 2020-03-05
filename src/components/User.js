import React from 'react';

const User = props => {
    const {firstName, lastName, email} = props.data;
    return (
        <div className="ui segment">
            <div className="content">
                <div className="header">
                    {firstName} {lastName}
                </div>
                <div>
                    {email}
                </div>
            </div>
        </div>
    );
}
export default User;